var item_db_rangified = {};

function pop_db() {
    item_db_rangified = {};
    for (let slot in gacha_db) {
        item_db_rangified[slot] = [];
        let shuffled_slot_items = shuffle(gacha_db[slot].slice(0));
        let startAt = 0;
        for (let i = 0; i < shuffled_slot_items.length; ++i) {
            let this_item = shuffled_slot_items[i];
            let new_start_at = startAt + this_item.chance;
            item_db_rangified[slot].push({
                name: this_item.name,
                item_idx: this_item.item_idx,
                category: this_item.category,
                type: this_item.type,
                from: startAt,
                chance: this_item.chance,
                to: (i == shuffled_slot_items.length - 1 ? 100 : new_start_at)
            });

            startAt += this_item.chance;
        }
    }
};

pop_db();

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var table_body = $("#items");
var max_records = 10;
var myItems = [];
var gach_options = {
    mute: false
};

Number.prototype.toNumber = function() {
    return this.toLocaleString();
};

(function ($) {
    $.fn.itemRotator = function (options) {
        var defaults = {
            speed: 600
        }
        var settings = $.extend(defaults, options);

        this.each(function (n) {
            var $this = $(this),
			item = $('.item-icons div', $this),
            item_panel = $this.find('.item-icons'),
            numOfItems = item.length, // Get number of items
			heightOfItem = item.height(), // Get width of item
			itemStrip = numOfItems * heightOfItem, // Calculate the width to set the item strip
			itemPositions = [], // Create an array to hold our item positions
			currentPosition = 1, // Set the current item position
			play, // Timer variable
			disable = false,
            citem = null; // Used to offset the banner rotation
            // Set the width of the strip size of all items combined
            $('.item-icons', $this).css('width', itemStrip);
            $('.prize-list').eq(n).mouseenter(function () { disable = true; }).mouseleave(function () { disable = false; }).find('li').mouseenter(function () {
                //window.gachapon.sounds['short_stick'].play();
                var idx = $(this).data('idx');
                citem = item_panel.children('[data-idx="{0}"]'.format(idx));
                item_panel.css({ top: -(citem.index() * heightOfItem) });
            });

            function switchItems() {
                if (currentPosition < numOfItems - 1) {
                    currentPosition++;
                } else {
                    currentPosition = 0;
                }
                if (!disable) {
                    item_panel.clearQueue().animate({
                        top: -(currentPosition * heightOfItem)
                    }, settings.speed);
                }
            }

            function rotationTimer() {
                play = setInterval(switchItems, 3000);
            }

            startTime = options.speed * n * 2;
            // Start rotation
            setTimeout(
            function () {
                rotationTimer();
            }, startTime);
        });
    }

    $.fn.tabs = function () {
        var last = $(this).filter('.active');
        $('.content-holder.dn').hide().removeClass('dn');
        return $(this).click(function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) return;
            $this.addClass('active');
            if (last != null) {
                last.removeClass('active');
                $('#' + last.data('tab')).hide();
            }
            $('#' + $this.data('tab')).show();
            last = $this;
        });
    }

    function popupShow(name, callback) {
        return false;
    }

    function popupError(msg) {
        return false;
    }
    var gachapon = function () { this.init(); }
    gachapon.prototype = {
        init: function () {
            //this.items = [];
            this.spin_types = [];
            this.is_service_on = false;
            this.is_spin_service_on = false;
            this.event_no = null;
            this.spin_cnt = 0;
            this.spinItems = [];
            this.spin_use_id = null;
            this.spinning = false;
            this.prizeItems = null;
            this.spin2Interval = null;
            this.itemHeight = 0;

            this.nx = null;
            this.sounds = {};
            this.opts = {
                prepaid: '.nx_prepaid',
                credit: '.nx_credit'
            };
            this.banCountries = ['BE'];
            var _this = this;

            soundManager.setup({
                url: '/assets/js/soundmanager/', // required: path to directory containing SM2 SWF files
                debugMode: false,
                useFlashBlock: false // optional - if used, required flashblock.css
            });

            soundManager.onready(function () {
                _this.soundLoad(['start', 'stop', 'error']); //, 'short_stick', 'button-19']);
                soundManager.setVolume('start', 40);
                if (_this.is_spin_service_on) {
                    _this.onActive();
                }
            });

            this.checkService();
            $(function () { // dom ready

                if (_this.spinItems.length < 2)
                    //$('#machine').startWaiting();

                _this.pager = new pageHelper($('#history_pager'), { prev5Btn: null, next5Btn: null });
                _this.dom = {
                    congrats: $('.congrats'),
                    animations: $('#reels .reel-animation'),
                    multipliers: $('#machine .double.hidden'),
                    slots: $('#machine .slot-artboard'),
                    prizes: $('#machine .slot-item .label.coupon'),
                    spin_more: $('#spend-more'),
                    spin_more_pay_type: $('#spend-more input:radio[name=double_funds_source]')
                };

                for (n = 0; n < 3; n++) {
                    var target = _this.dom.slots.eq(n);
                    target.children().clone().appendTo(target);
                }
                _this.itemHeight = _this.dom.slots.eq(0).children(':first').height();

                _this.dom.spin_more.find('.btn-close').click(function () {
                    _this.showDoubleMarble(false);
                });
                _this.dom.spin_more.find('#spend-btn').click(function () {
                    var pay_type = _this.dom.spin_more_pay_type.filter(':checked').val();
                    _this.runSpin2(pay_type == 'prepaid');
                    return false;
                });
                _this.dom.spin_more.find('#refresh-btn').click(function () {
                    _this.updateNXBalance();
                    _this.dom.spin_more_pay_type.eq(0).click();
                    return false;
                });
                _this.dom.spin_more_pay_type.click(function (e) {
                    var type = $(this).val();
                    var parent = $(this).parents('.nx-total').first();
                    var price = _this.spinItems[1][0].price;
                    var oPrices = parent.find('.spin2_price');
                    oPrice = oPrices.filter('.' + type);
                    oPrice.text(price.digits());
                    oPrices.not(oPrice).empty();
                    parent.find('.remain_prepaid').text((_this.nx.prepaid - (type == 'prepaid' ? price : 0)).digits());
                    //parent.find('.remain_credit').text((_this.nx.credit - (type == 'credit' ? price : 0)).digits());
                });

                _this.dom.prizes.find('ul > li p').text('Coupon Code');

                $('#refresh-count').click(function (x) {
                    x.preventDefault();
                    _this.updateRaffleCount();
                });

                $('#spin-btn').click(function (x) {
                    if (_this.spinning) return
                    x.preventDefault();
                    _this.runSpin1();
                });

                $('#marvelmachine-moreinfo').click(function (e) {
                    e.preventDefault();
                    popupShow('detailedGuide');
                    return false;
                });

                $('#tabs li').tabs().filter('[data-tab="coupon-history"]').click(function (e) {
                    e.preventDefault();
                    _this.showHistory();
                });

                $('#search-box').focus(function () {
                    $(this).addClass('searchFocus');
                    $('#search-options').show();
                });

                /*
                $('#search-box').blur(function () {
                    $(this).removeClass('searchFocus');
                    $('#search-options').hide();
                });
                */
                $('#search-wrap').keydown(function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var text = $('#search-box').val();
                        $('#search-options').hide();
                        _this.searchHistory(1, 10, null, text);
                    }
                });

                $('#search-submit').click(function (e) {
                    e.preventDefault();
                    var text = $('#search-box').val();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, null, text);
                });

                $('#search-equip').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 1, null);
                });

                $('#search-use').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 2, null);
                });

                $('#search-etc').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 4, null);
                });

                $('#search-setup').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 3, null);
                });

                $('#search-cash').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 5, null);
                });

                //// test
                //_this.updateNXBalance({ credit: '#credit', prepaid: '#prepaid' });

                $('#more-spins-btn').click(function (e) {
                    e.preventDefault();
                    if (!_this.is_service_on) { popupShow('stopPurchase'); return; }
                    if (!nexon.sso.isLoggedIn) { nexon.gnt.popupLogin(); return; }

                    _this.updateNXBalance();
                    var p = popupShow('getMoreSpins');
                    var types = p.center.find('input:radio[name=payment-type]');
                    var selector = p.center.find('.currentSpins select');

                    function updatePrices() {
                        var option = selector.find('option:selected').data();
                        if (option.origin_price === undefined) return;
                        var paytype = types.filter(':checked').val();
                        var prepaid = _this.nx.prepaid;
                        //var credit = _this.nx.credit;
                        var remain_prepaid = p.center.find('.remain_prepaid');
                        //var remain_credit = p.center.find('.remain_credit');
                        var spin_origin_prices = p.center.find('.spin_origin_price');
                        var spin_prices = p.center.find('.spin_price');
                        var sales_row = p.center.find('.sales_row');

                        var IsSale = (option.origin_price > option.price);
                        var txt_origin = (IsSale ? '<s>- {0} NX Prepaid</s>' : '- {0} NX Prepaid').format(option.origin_price.digits());

                        sales_row.toggle(IsSale);
                        sales_row.next().toggleClass('add-bg', IsSale);

                        //var ind = (paytype == 'prepaid' ? 0 : 1);
                        var ind = 0;
                        //spin_origin_prices.eq((ind + 1) % 2).html('');
                        spin_origin_prices.eq(ind).html(txt_origin);

                        if (IsSale) {
                            var txt_price = '- {0} NX Prepaid'.format(option.price.digits());
                            spin_prices.eq(ind).text(txt_price);
                            //spin_prices.eq((ind + 1) % 2).text('');
                        }

                        //if (paytype == 'prepaid') prepaid -= option.price; else credit -= option.price;
                        prepaid -= option.price;

                        remain_prepaid.text(prepaid.digits());
                        //remain_credit.text(credit.digits());
                    }

                    types.click(function (e) {
                        updatePrices();
                    });
                    selector.change(function (e) {
                        var changed = $(e.target);
                        updatePrices();
                    });

                    types.eq(0).click();
                    p.center.find('.gnt_bot .gnt_button:eq(0)').click(function (e) {
                        e.preventDefault();
                        var value = selector.val();
                        var paytype = types.filter(':checked').val();
                        if (value == '') {
                            alert('Please select quantity');
                            return;
                        }
                        _this.purchaseSpin(value, paytype == 'prepaid', function () {
                            popupShow('thankYou');
                        });
                    });
                });

                /*
                $(".slot-artboard .icon,.prize-container li").balloon({
                    css: { opacity: 1 },
                    minLifetime: 0, showDuration: 0, hideDuration: 0
                });
                */

                $('.item-scroll').itemRotator({
                    speed: 400
                });

                $('#soundToggle').click(function () {
                    $(this).toggleClass('active');
                    $(this).hasClass('active') ? soundManager.unmute() : soundManager.mute();
                    return false;
                });
                /*
                $('#more-spins-btn,#spin-btn, #soundToggle,#gachapon-text a,#tabs li,.btn-close,#spend-btn,#refresh-btn').mouseenter(function () {
                _this.sounds['short_stick'].play();
                }).click(function () {
                _this.sounds['button-19'].play();
                });*/
            });

            /*
            this.updateSpinCnt();
            this.updateRaffleCount();
            */
        }, //////////////////////////////////////////////////////////////////////////
        soundLoad: function (array) {
            for (var n = 0, len = array.length; n < len; n++) {
                var name = array[n];
                this.sounds[name] = soundManager.createSound({
                    id: name,
                    url: 'http://nxcache.nexon.net/maplestory/shop/gachapon/sound/' + name + '.mp3'
                });
            }
        },
        onActive: function () {
            for (var sound in this.sounds) {
                if (!this.sounds.hasOwnProperty(sound)) continue;
                this.sounds[sound].load();
            }
        },
        checkService: function () {
            return false;
        },
        apicall: function (opts, callback, callback_fail, req_type) {
            return false;
        },
        updateRaffleCount: function () {
            return false;
            $(function () {
                $('#raffle-count').text(bal);
                $('#ticket-count').text(bal);
            });
        },
        updateSpinCnt: function (p = false, o = 1) {
            if (!p) return false;
            this.spin_cnt += o;
            $('.spins-left').html(this.spin_cnt);
        },
        useSpin: function (type, use_id = "", callback, fail) {
            /*
            let testData = {
                spin_use_id: 1,
                prizes: [{
                    item_idx: 8453, //2nd (A)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8533, //3rd (B)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8724, //1st (C)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }]
            };
            */

            let data = this.generate_item();

            callback.call(this, data);

            return false;
        },
        runSpin1: function (thisItem, callback) {
            //this.spin_cnt = 0;
            this.spinning = true;
            var start = +new Date();

            if (!gach_options.mute) {
                this.sounds['start'].play();
            }

            this.dom.congrats.hide();
            this.dom.multipliers.hide();
            //this.dom.animations.show();
            //this.dom.slots.hide();

            this.dom.prizes.find('ul > li:nth-child(2)').remove();
            this.dom.prizes.find('ul > li p').text('Coupon Code');

            this.spin_use_id == null

            this.dom.slots.animate({ top: '-=1000' }, 1000, 'easeInQuad').animate({ top: '-=' + (this.itemHeight * 40) }, 2000, 'linear');

            var _this = this;

            if (typeof thisItem !== 'undefined') {
                var diff = (+new Date()) - start;

                let data = thisItem;
                setTimeout(function () {
                    _this.selectPrize(0, data.prizes[2]);
                    setTimeout(function () {
                        _this.selectPrize(2, data.prizes[1]);
                        setTimeout(function () {
                            _this.selectPrize(1, data.prizes[0], function () {
                                _this.dom.congrats.show().removeClass('hidden');
                                _this.spinning = false;
                                pop_db();
                                $('#spin-btn').prop("disabled", false);
                                if (typeof callback === 'function') {
                                    callback(); 
                                } else {
                                    _this.pop_table([data]);
                                }
                            });
                        }, 700);
                    }, 700);
                }, 1500 - diff);
            } else {
                // call api and get prizes info
                this.useSpin(1, "", function (data) {
                    var diff = (+new Date()) - start;

                    this.spin_use_id = data.spin_use_id;

                    setTimeout(function () {
                        _this.selectPrize(0, data.prizes[2]);
                        setTimeout(function () {
                            _this.selectPrize(2, data.prizes[1]);
                            setTimeout(function () {
                                _this.selectPrize(1, data.prizes[0], function () {
                                    _this.dom.congrats.show().removeClass('hidden');
                                    _this.updateSpinCnt(true);
                                    _this.spinning = false;
                                    pop_db();
                                    $('#spin-btn').prop("disabled", false);
                                    _this.pop_table([data]);
                                });
                            }, 700);
                        }, 700);
                    }, 1500 - diff);
                });
            }
        },
        runSpin1_prog: function(count = 1, callback) {
            let item_arr = [];
            for (var i = 0; i < count; ++i) {
                item_arr.push(this.generate_item());
                pop_db();
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, count);
                    _this.pop_table(item_arr);
                });
            }
        },
        runSpin1_prog2: function(item_idx, callback) {
            let item_arr = [];
            let is_item = false;
            let numSpins = 0;
            while (!is_item) {
                ++numSpins;
                let this_item = this.generate_item();
                item_arr.push(this_item);
                pop_db();

                for (let i = 0; i < this_item.prizes.length; ++i) {
                    let this_prize = this_item.prizes[i];
                    if (this_prize.item_idx === item_idx) {
                        is_item = true;
                        break;
                    }
                }
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, numSpins);
                    _this.pop_table(item_arr);
                });
            }
        },
        generate_item: function() {
            let items = {};
            for (let i in item_db_rangified) {
                let item = item_db_rangified[i];
                let prn = this.cryptoRandom() * 100;

                let thisItem = item.filter((a)=>{return a.from <= prn && prn < a.to})[0];
                let prize = {
                    item_idx: thisItem.item_idx,
                    coupon_code: this.generateCouponCode(),
                    name: thisItem.name,
                    category: thisItem.category,
                    type: thisItem.type,
                    chance: thisItem.chance
                };
                items[i] = prize;
            }

            let data = {
                spin_use_id: 1,
                prizes: [items.a, items.b, items.c]
            };

            return data;
        },
        pop_table: function(data = []) {
            if (data.length > 0) {
                for (let a = 0; a < data.length; ++a) {
                    let _data = data[a];
                    for (let i = 0; i < _data.prizes.length; ++i) {
                        let _tp = _data.prizes[i];
                        myItems.push(_tp);
                    }
                }
            }

            let thesePrizes = "";
            let _myItems = [];
            if (max_records !== -1) {
                _myItems = myItems.slice(Math.max(myItems.length - max_records, 0));
            } else {
                _myItems = myItems;
            }
            var thisDate = new Date().toLocaleDateString();
            for (let i = _myItems.length - 1; i >= 0; --i) {
                let _tp = _myItems[i];
                thesePrizes += `<tr class="item-row">
                    <td>${thisDate}</td>
                    <td>${_tp.name}</td>
                    <td>${_tp.coupon_code}</td>
                    <td>${thisDate}</td>
                </tr>`
            }

            table_body.html(thesePrizes);
            if (myItems.length > 0) {
                let bundle = myItems.length / 3;
                let indivNx =(bundle % 11) * 4900;
                let bundleNx = Math.floor(bundle / 11) * 49000;
                $("#nx-spent").html((bundleNx + indivNx).toNumber() + " NX Spent");
            } else {
                $("#nx-spent").html("0 NX Spent");
            }
        },
        stopSpin1: function () {
            console.log("stopped");
            this.dom.slots.clearQueue().stop().css({ top: 0 });
            this.spinning = false;
            this.sounds['start'].stop();
        },
        selectPrize: function (n, item, callback) {
            //$('.reel-strip').eq(n).show().css({ top: iconReelPositions[prize] }); spin = true;
            var target = this.dom.slots.eq(n);
            var oItems = target.children(`[data-idx="${item.item_idx}"]`);
            var index = oItems.eq(1).index();
            var height = this.itemHeight;
            target.clearQueue().stop().css({ top: -(height * (index - 9)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                //target.clearQueue().stop().css({ top: -(height * (index - 10)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                if (!gach_options.mute) {
                    window.gachapon.sounds['stop'].play();
                }
                $(window.gachapon.dom.prizes[n]).text(item.coupon_code);
                //$(this).css({ top: -((height * oItems.eq(0).index()) + 97), opacity: 0 }).animate({ opacity: 1 });
                $(this).css({ top: -((height * oItems.eq(0).index()) - 70), opacity: 0 }).animate({ opacity: 1 });
                if (typeof callback == 'function') callback.call(this);
            });
            this.dom.animations.eq(n).hide();
        },
        cryptoRandom: function() {
            let arr = new Uint32Array(2);
            crypto.getRandomValues(arr);
            let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
            return m * Math.pow(2,-52);
        },
        generateCouponCode: function() {
            let result = '';
            const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let charactersLength = characters.length;
            for (let i = 0; i < 17; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return "Y" + result;
        }
    }
    window.gachapon = new gachapon();
})(jQuery);