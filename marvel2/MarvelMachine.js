const objects = {
    coupon: {
        receiveddate: "",
        couponCode: "",
        couponCode2: "",
        itemName: "",
        itemImageName: "",
        itemID: "",
        redeemBy: "",
        expiredDateTime: "",
        expired: ""
    }
};

const MarvelMachine = {
    game: {
      isGameBeingResetted: !1,
      isReadyToSpin: !0,
      isSpinRunning: !1,
      revealItemsAnimation: !1,
      resultOn: !1,
      resultItems: [],
      resultItemsSpinId: null,
      isDoubleRunning: !1,
      doubleResultOn: !1,
      resultDoubleItem: {},
      nxBalanceMessageOn: !1,
      animationToggle: !0,
      resultItemsAll: [],
      current_prng: [0,0,0],
      current_prngMap: [{},{},{}],
      current_doubleUpPrng: 0,
      current_doubleUpPrngMap: 0,
      totalRuns: 0,
      totalDoubleUp: 0
  },
  actions: {
    userGameReset() {
      if (MarvelMachine.game.isSpinRunning || MarvelMachine.game.isDoubleRunning) {
        return
      }
      MarvelMachine.game.isGameBeingResetted = true
      setTimeout(() => {
        MarvelMachine.game = {
          ...MarvelMachine.game,
          ...{
            resultOn: false,
            isSpinRunning: false,
            isReadyToSpin: true,
            doubleResultOn: false,
            resultItems: [],
            resultItemsSpinId: null,
            isDoubleRunning: false,
            resultDoubleItem: {},
            isGameBeingResetted: false,
            nxBalanceMessageOn: false,
          },
        }
      }, 150)
    },
    async runSpin() {
      // Reset Game before runSpin again.
      if (MarvelMachine.game.isGameBeingResetted) {
        return
      }
      MarvelMachine.game = {
        ...MarvelMachine.game,
        ...{
          resultOn: false,
          isSpinRunning: true,
          isReadyToSpin: false,
          doubleResultOn: false,
          resultItems: [],
          resultItemsSpinId: null,
          isDoubleRunning: false,
          resultDoubleItem: {},
        },
      }
      setTimeout(() => {
        MarvelMachine.game.nxBalanceMessageOn = false
      }, 300)

      // runSpin
      try {
        const { data } = await MarvelCustom.GetCoupons();
        MarvelMachine.game = { ...MarvelMachine.game, ...{ resultItems: data.coupons, resultItemsSpinId: data.spinUseID } }
        if (MarvelMachine.game.animationToggle) {
          MarvelMachine.game.revealItemsAnimation = true
          setTimeout(() => {
            MarvelMachine.game = { ...MarvelMachine.game, ...{ resultOn: true, revealItemsAnimation: false, isSpinRunning: false } }
          }, 6500)
          setTimeout(() => {
            MarvelMachine.game.isReadyToSpin = true
          }, 7200)

          MarvelCustom.playSound();
        } else {
          setTimeout(() => {
            MarvelMachine.game.revealItemsAnimation = true
            MarvelCustom.playSound();
          }, 400)
          setTimeout(() => {
            MarvelMachine.game = { ...MarvelMachine.game, ...{ resultOn: true, isSpinRunning: false, revealItemsAnimation: false } }
          }, 850)
          setTimeout(() => {
            MarvelMachine.game.isReadyToSpin = true
          }, 1850)
        }
      } catch (error) {
        console.log(error);
        //purchaseApiHandler(error)
        setTimeout(() => {
          MarvelMachine.game = { ...MarvelMachine.game, ...{ isReadyToSpin: true, isSpinRunning: false } }
        }, 3000)
      } finally {
        //this.getUserSpinBalance()
      }
    },
    async runDoubleSpin() {
      MarvelMachine.game = { ...MarvelMachine.game, ...{ nxBalanceMessageOn: false, isDoubleRunning: true, isReadyToSpin: false } }
      try {
        const { data } = await MarvelCustom.DoubleSpin();

        setTimeout(() => {
          this.game = {
            ...this.game,
            ...{
              resultDoubleItem: data,
              nxBalanceMessageOn: true,
              doubleResultOn: true,
              isDoubleRunning: false,
            },
          }
        }, 700)
        setTimeout(() => {
          this.game = { ...this.game, ...{ isReadyToSpin: true } }
        }, 1700)
      } catch (error) {
        this.game = {
          ...this.game,
          ...{
            isDoubleRunning: false,
            isReadyToSpin: true,
          },
        }
      }
    },
    // -- ETC
    setAnimationToggle() {
      if (!MarvelMachine.game.isSpinRunning) MarvelMachine.game.animationToggle = !MarvelMachine.game.animationToggle
    },
  }
};

let audioTabWithAnimationHistory = 0
let audioTabWithAnimationHistoryBeingUpdated = false
const targetVisibility = {value: false}
const targetAnimateShow = {value: false}
const MarvelCustom = {
  async DoubleSpin() {
    let double_idx = MarvelCustom.doubleUp();

    const items = document.querySelectorAll(".marvel-machine-result-item[data-v-3c112324]");

    items.forEach(item => {
      item.classList.add('doubleRunning');
    });

    const doubleItem = items[double_idx];

    let new_item = JSON.parse(JSON.stringify(MarvelMachine.game.resultItems[double_idx]));
    new_item.couponCode = MarvelCustom.generateRandomCode();

    setTimeout(()=>{
      mva.play("Double");
      items.forEach(item => {
        item.classList.remove('doubleRunning');
      });    
      
      setTimeout(()=>{
        doubleItem.classList.add('doubled');
        //doubleItem.classList.add('show-double-animation');
        MarvelCustom.showDoubleAnimation(doubleItem);
        doubleItem.querySelector(".marvel-machine-result-item__item-code2").classList.remove("hidden");
        doubleItem.querySelector(".couponCode2").innerHTML = new_item.couponCode;
      }, 10);
      setTimeout(()=>{
        MarvelCustom.NXUsageInfo();
        //doubleItem.classList.remove('show-double-animation');
        document.querySelector("#imgAnimationDoubleUp").remove();
      }, 5000);
    }, 700);

    MarvelMachine.game.resultItemsAll.unshift(new_item);

    return await {data: new_item};
  },
  /*
    nexon's implementation of adding the double-up animation class to the container, 
    causes the double up animation gif to be cached, causing a desync in the sound and also the animation when doubling up happens in quick
    succession, as the cached animation starts off where the class was removed. 
    to stop this, we employ an img with a cache buster source so that the gif is always fresh.

    might just be a problem with this hack of the vue component and not the way nexon implemented it, though.
  */
  showDoubleAnimation(doubleItem) {
      const container = doubleItem;
    
      // Remove any previous gif img
      const existing = container.querySelector('img.gif-overlay');
      if (existing) existing.remove();
    
      // Create new gif img
      const gif = document.createElement('img');
      gif.id = "imgAnimationDoubleUp";
      gif.src = "/marvel2/assets/img/doubled-animation-09400c28.png?t=" + new Date().getTime(); // Cache buster
      gif.className = "gif-overlay";
      
      container.appendChild(gif);
  },
  playSound() {
    if (MarvelMachine.game.revealItemsAnimation === true) {
      if (MarvelMachine.game.animationToggle) {
        if (audioTabWithAnimationHistoryBeingUpdated === false) {
          audioTabWithAnimationHistoryBeingUpdated = true;
          mva.play("Start");
          setTimeout(() => {
            audioTabWithAnimationHistory = audioTabWithAnimationHistory === 0 ? 1 : 0;
            audioTabWithAnimationHistoryBeingUpdated = false;
          }, 3500)
        }
      } else {
          mva.play("StartFast");
      }
    }
    if (MarvelMachine.game.doubleResultOn) {
      mva.play("Double")
    }

    this.playAnimation();
  },
  playAnimation() {
    let fastAnimation = !MarvelMachine.game.animationToggle;
    MarvelMachine.game.resultOn = true;
    if (MarvelMachine.game.resultOn === true) {
      targetVisibility.value = true
      
      let itemHtml = "";
      let itemCapsuleHtml = "";

      let animationClass = fastAnimation ? 'animationReduced' : 'animationOn';
      let animationSpeed = fastAnimation ? 400 : 7200;

      setTimeout(() => {
        targetAnimateShow.value = true;
        document.querySelector('.mavel-machine-main')?.classList.add('result-active');
        document.querySelector('.mavel-machine-deco-sun-light').classList.add('spinnning');
        if (!fastAnimation) {
          document.querySelector('.mavel-machine-robot__main-jar').classList.add('mavel-machine-robot__main-jar-animation', 'active');
        }
        document.querySelector('.mavel-machine-robot__main-face').classList.add('spinning');
        document.querySelector('.mavel-machine-robot__capsules').classList.add(animationClass); 

        MarvelCustom.NXUsageInfo();
        document.querySelector(".marvel-machine-result-balance").classList.add('active');

        for (let i = 0; i < 3; ++i) {
          let item = this.generateMarvelItemDisplay(MarvelMachine.game.resultItems[i]);
          itemHtml += item;
          
          let itemCapsule = this.generateMarvelItemCapsule(MarvelMachine.game.resultItems[i], i);
          itemCapsuleHtml += itemCapsule;
        }

        $(".mavel-machine-robot__capsules").html(itemCapsuleHtml);
      }, 100)
      setTimeout(() => {
        document.querySelector('.mavel-machine-robot__main-face').classList.add('resultOn');
        document.querySelector('.mavel-machine-deco-sun-light').classList.remove('spinnning');
        document.querySelector('.marvel-machine-main-play__double-btn').classList.add('showDouble');

        $(".marvel-machine-result__item-list").html(itemHtml);
        $(".marvel-machine-result").addClass("active");
        setTimeout(()=>{
          $(".marvel-machine-result").addClass("show");
          document.querySelector(".marvel-machine-result-balance").classList.add('show');
          document.querySelector('.mavel-machine-robot__capsules').classList.remove(animationClass); 
          document.querySelector('.mavel-machine-robot__capsules').classList.add('resultOn'); 
        }, 100);

        document.querySelector(".marvel-machine-main-play__usable-marvel-balance").innerHTML = MarvelMachine.game.totalRuns;
      }, animationSpeed)
    }
  },
  clearAnimation() {
      let fastAnimation = !MarvelMachine.game.animationToggle;
      let animationClass = fastAnimation ? 'animationReduced' : 'animationOn';

      targetAnimateShow.value = false
      document.querySelector('.mavel-machine-main')?.classList.remove('result-active');
      document.querySelector('.mavel-machine-deco-sun-light').classList.remove('spinnning');
      document.querySelector('.mavel-machine-robot__main-jar').classList.remove('mavel-machine-robot__main-jar-animation', 'active');
      document.querySelector('.mavel-machine-robot__main-face').classList.remove('spinning', 'resultOn');
      document.querySelector('.mavel-machine-robot__capsules').classList.remove(animationClass, "resultOn"); 
      document.querySelector('.marvel-machine-main-play__double-btn').classList.remove('showDouble');
      document.querySelector(".marvel-machine-result-balance").classList.remove('show');

      
      $(".marvel-machine-result__item-list").html(``);
      $(".marvel-machine-result").removeClass("show");        
      
      setTimeout(()=>{
        $(".marvel-machine-result").removeClass("active");
        document.querySelector(".marvel-machine-result-balance").classList.remove('active');
      }, 100);
      setTimeout(() => {
        targetVisibility.value = false
      }, 100)
  },        
  calculateNx: function(value) {
    let indivNx = (value % 11) * 4900;
    let bundleNx = Math.floor(value/11) * 49000;

    return bundleNx + indivNx;
  },
  getSpinsFromNx: function(value) {
      let bundle = Math.floor(value / 49000);
      let bundleCost = bundle * 49000;
      let indiv = Math.floor((value - bundleCost) / 4900);

      return (bundle * 11) + indiv;
  },
  NXUsageInfo() {
    let nx_used = MarvelCustom.calculateNx(MarvelMachine.game.totalRuns);
    let nx_used_double = MarvelMachine.game.totalDoubleUp * 1000;

    $(".marvel-machine-result-balance__previous-nx").html(`Total Double Ups: ${MarvelMachine.game.totalDoubleUp}`);
    $(".marvel-machine-result-balance__double-purchase").html(`Spin Cost: ${nx_used.toNumber()} | Double Up Cost: ${nx_used_double.toNumber()}`);
    $(".marvel-machine-result-balance__current-nx-balance").html(`Total NX Used: ${(nx_used + nx_used_double).toNumber()}`);
  },
  async GetCoupons() {
    let coupons = this.generateCoupons();

    return await 
    {
      success: true,
      code: 1,
      data: {
        spinUseID: this.generateRandomCode(),
        coupons: coupons
      }
    }
  },
  generateCoupons: function() {
    let coupons = [];

    ++MarvelMachine.game.totalRuns;

    MarvelMachine.game.current_prng = [];
    MarvelMachine.game.current_prngMap = [];


    const coupon_amount = 3;
    for (let i = 0; i < coupon_amount; ++i) {
      let coupon = {...{}, ...objects.coupon};

      let generated_item = "";
      
      /* on the off chance that the rates they give fall short of adding up to 100 */
      do {
        generated_item = MarvelCustom.get_random_result(gacha_db[i], (a)=>{
          MarvelMachine.game.current_prngMap.push(a);
        }, (b)=>{
          MarvelMachine.game.current_prng.push(b);
        }) ?? "";
      } while (generated_item === "")
      ;

      let item_url_name = MarvelCustom.get_item_url_name(ItemNameEquivalents[generated_item] ?? generated_item);

      coupon.couponCode = this.generateRandomCode();
      coupon.expiredDateTime = MarvelCustom.now;
      coupon.expired = false;
      coupon.itemName = generated_item;
      coupon.itemImageName = item_url_name;
      coupon.redeemBy = MarvelCustom.now;
      coupon.receiveddate = MarvelCustom.now;

      coupons.push(coupon);
      MarvelMachine.game.resultItemsAll.unshift(coupon);
    }

    return coupons;
  },
  doubleUp() {
    const rates = {
      "1": 0.01,
      "2": 0.3,
      "3": 0.69
    };

    ++MarvelMachine.game.totalDoubleUp;

    return +MarvelCustom.get_random_result(rates, (a)=>{
      MarvelMachine.game.current_doubleUpPrngMap = a;
    }, (b)=>{
      MarvelMachine.game.current_doubleUpPrng = b;
    }) - 1;
  },
  generateRandomCode() {
      const length = 20; // length of the code
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // uppercase letters
      let result = '';

      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
      }

      return result;
  },
  generateMarvelItemDisplay(item) {
    return `
      <div data-v-3c112324="" class="marvel-machine-result-item">
        <div data-v-3c112324="" class="marvel-machine-result-item__item-image" style="background-image: url(&quot;https://nxcache.nexon.net/maplestory/shop/gachapon/img/items/${item.itemImageName}.png&quot;);"></div>
        <div data-v-3c112324="" class="marvel-machine-result-item__item-name">${item.itemName}</div>
        <div data-v-3c112324="" class="marvel-machine-result-item__item-code"> Code: ${item.couponCode}
        <div data-v-3c112324="" class="marvel-machine-result-item__item-code2 hidden">Code: <span data-v-3c112324="" class="couponCode2"></span> </div>
        </div>
      </div>
    `;
  },
  generateMarvelItemCapsule(item, idx) {
    return `
      <div 
        class="mavel-machine-items-animation___capsule-image mavel-machine-items-animation___capsule-image--${idx+1}" data-v-7d995dd0="" 
        style="background-image: url(&quot;https://nxcache.nexon.net/maplestory/shop/gachapon/img/items/${item.itemImageName}.png&quot;);">
      </div>
    `;
  },
  get_item_url_name(item_name) {
    return encodeURIComponent(item_name.replace(/\s/gi,"-")).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/'/g, '%27');
  },

  /* copied from starforce init for RANDOM picker */
  //generate a pseudo-random number
  prng() {
    let arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
    return m * Math.pow(2,-52);
  },

  //random functions
  //Durstenfeld shuffle
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  },

  //pass the generate_r_map result into this and then use a pseudrorandom number
  //to check against that map. return true if it
  //provides a callback that passes the generated random value
  r_map_result(r_map, cb = ()=>{}) {
    let this_rng = MarvelCustom.prng();

    cb(this_rng);

    for (let i in r_map) {
        let i_r = r_map[i];

        for (let j = 0; j < i_r.length; ++j) {
            let j_r = i_r[j];

            let a = j_r[0];
            let b = j_r[1];

            if (this_rng >= a && this_rng < b) {
                return i;
            }
        }
    }

    //if reaches here, then the r_map did not go from 0 to 1 and a rng value
    //fell outside of the range
    return undefined;
  },

  //generate a random result map based off an initial map input
  //genericized version from the item prototype function
  //provides a callback that passes the r map
  generate_r_map(sr, cb = ()=>{}) {
    let poffset = MarvelCustom.prng();

    //randomize the catch map so that the result types are not always in the same order
    let catch_map = {};

    let catch_type = Object.keys(sr);

    MarvelCustom.shuffle(catch_type);

    let i_start = 0;
    let i_current = 0;
    for (let i = 0; i < catch_type.length; ++i) {
        let _i = catch_type[i];

        i_current += sr[_i];
        
        catch_map[_i] = [
            i_start,
            i_current
        ];

        i_start = i_current;
    }

    let catch_map_offset = {};

    for (let i in catch_map) {
        let cval1 = catch_map[i][0] + poffset;
        let cval2 = catch_map[i][1] + poffset;

        if (cval2 - cval1 === 0) continue;

        catch_map_offset[i] = [];

        if (cval2 <= 1) {
            catch_map_offset[i].push([
                cval1,
                cval2
            ]);
        } else if (cval1 < 1 && cval2 > 1) {
            catch_map_offset[i].push([
                cval1,
                1
            ]);

            catch_map_offset[i].push([
                0,
                cval2 - 1
            ]);
        } else {
            catch_map_offset[i].push([
                cval1 - 1,
                cval2 - 1
            ]);
        }
    }

    cb(catch_map_offset);

    return catch_map_offset;
  },

  //combines the r_map generation function with the result determination function
  //cb1 is the callback for r map generation. cb2 is the callback for map result determination
  get_random_result(sr, cb1 = ()=>{}, cb2 = ()=>{}) {
    let grm = MarvelCustom.generate_r_map(sr, cb1);

    let rms = MarvelCustom.r_map_result(grm, cb2);

    return rms;
  },
  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }
};

Number.prototype.toNumber = function() {
  return this.toLocaleString();
};

MarvelCustom.now = MarvelCustom.formatDate(new Date());

$(function() {
  $("#btnPlay").on("click", async function() {
    if (MarvelMachine.game.isSpinRunning) return false;
    
    MarvelMachine.game.resultOn = false;
    MarvelCustom.clearAnimation();
    
    await MarvelMachine.actions.runSpin();
  });

  $("#btnDouble").on("click", async function() {
    if (MarvelMachine.game.isSpinRunning || MarvelMachine.game.isDoubleRunning) return false;
        
    await MarvelMachine.actions.runDoubleSpin();
  });

  $("#btnToggleAnimation").on("click", function() { 
    MarvelMachine.actions.setAnimationToggle();
    const animationToggle = $(this).find(".marvel-machine-animation-toggle__icon");
    if (!MarvelMachine.game.animationToggle) {
      animationToggle.addClass("inactive");
    } else {
      animationToggle.removeClass("inactive");
    }
  });

  $("#btnPrizes").on("click", async function() {
      let r = await fetch("/marvel2/marvel_prizelist.html");
      let html = await r.text();
      
      $("body").append(html);

      const pl = $(".c-lightbox.forComponent.marvel-machine-game-lightbox");

      pl.addClass("active");

      setTimeout(()=>{
        pl.addClass("show");
      }, 100);

      prizeEvents.bindClose();
      prizeEvents.bindHref();
      prizeEvents.bindItemViewer();
      prizeEvents.bind_color_rates();
  });

  const prizeEvents = {
    bindClose() {
      $(".c-lightbox.forComponent.marvel-machine-game-lightbox .c-lightbox__close-icon[data-v-b39f2c8a]").on("click", function() {
        const pl = $(".c-lightbox.forComponent.marvel-machine-game-lightbox");

        pl.removeClass("show");

        setTimeout(()=>{
          pl.remove();
        }, 100);
      });
    },
    bindHref() {
      let anchors = $(".c-lightbox.forComponent.marvel-machine-game-lightbox a[href]");

      for (let i = 0; i < anchors.length; ++i) {
        var anchor = anchors.eq(i);

        if (anchor.text().trim() === "HERE") {
          anchor.attr("href", "https://www.nexon.com/maplestory/general-post/5763");
          break;
        }
      }
    },
    bind_color_rates() {
      const parents = $(".c-lightbox.forComponent.marvel-machine-game-lightbox .mavel-machine-prizes-list__each");

      for (let i = 0; i < parents.length; ++i) {
        const parent = parents.eq(i);

        const items = parent.find('.mavel-machine-prizes-list__item[data-v-c4c80a03]');

        items.each(function(idx) {
          const _this = $(this);

          /* to show the rates */
          if (idx === 0) {
            _this.trigger("click");
          }

          let text = _this.text();

          let gacha_rate = get_gacha_rate(i, text);
          let color = getColorByValue(gacha_rate);

          _this.css("color", color);
        });
      }
    },
    bindItemViewer() {
      $(".c-lightbox.forComponent.marvel-machine-game-lightbox .mavel-machine-prizes-list__item[data-v-c4c80a03]").on("click", function() {
        const _this = $(this);
        let text = _this.text();
        let item = MarvelCustom.get_item_url_name(text);

        let url = `https://nxcache.nexon.net/maplestory/shop/gachapon/img/items/${item}.png`;

        let parent = _this.closest(".mavel-machine-prizes-list__each");
        let viewer = parent.find(".mavel-machine-prizes-list__item-detail-img[data-v-c4c80a03]");
        let label = parent.find(".mavel-machine-prizes-list__item-detail-text[data-v-c4c80a03]");
        
        let index = parent.index();

        let gacha_rate = get_gacha_rate(index, text);

        viewer.css("background-image", `url(${url})`);
        label.html(`<span style="white-space:nowrap;">${text}</span><div style="font-size:0.8em">Chance: ${isNaN(gacha_rate) ? 'Not in rates page!' : `${gacha_rate}%`}</div>`);
      });
    }
  }

  const gacha_rarity = [{
      minc: 0,
      maxc: 0.009,
      color: "red"
  }, {
      minc: 0.009,
      maxc: 0.01,
      color: "#ff8000" //orange
  }, {
      minc: 0.01,
      maxc: 0.04,
      color: "#a335ee" //purple
  }, {
      minc: 0.04,
      maxc: 0.07,
      color: "#0070dd" //blue
  }, {
      minc: 0.07,
      maxc: 0.1,
      color: "#15ae00", //green
  }, {
      minc: 0.1,
      maxc: 0.5,
      color: "#e0c633" //gold
  }, {
      minc: 0.5,
      maxc: 1,
      color: "black"
  }, {
      minc: 1,
      maxc: 100,
      color: "#9d9d9d" //grey
  }];

  function getColorByValue(value) {
    if (isNaN(value)) {
      return "white";
    }

    for (var i = 0; i < gacha_rarity.length; i++) {
        var rarity = gacha_rarity[i];
        if (value > rarity.minc && value <= rarity.maxc) {
            return rarity.color;
        }
    }
    return "white"; 
  }

  /* there are STILL differences between some names in rates page and marvel page */
  function get_gacha_name(item_name) {
    item_name = ItemNameEquivalents[item_name] ?? item_name;

    return item_name;
  }

  function get_gacha_rate(index, item_name) {
    item_name = get_gacha_name(item_name);

    return gacha_db[index][item_name];
  }

  /* item stuff */
  $("#btnMyItems").on("click", async function() {
    let r = await fetch("/marvel2/marvel_myitems.html");
    let html = await r.text();
    
    $("body").append(html);

    const pl = $(".c-lightbox.forComponent.marvel-machine-game-lightbox");

    pl.addClass("active");

    setTimeout(()=>{
      pl.addClass("show");
    }, 100);

    const myItems = {
      maxRows: 13, /* max number of rows per paging */
      maxPage: 10, /* max number of paging numbers to show */
      currentPage: 1, /* current paging number selected */
      currentPageView: 1, /* current page frame (1-10, 10-20, etc) */
      myItemsFiltered: [], /* store of marvel items, filtered if searched on */
      totalPages: 0, /* total pages from all marvel items */
      lastSearch: "", /* keep track of searching for filtering purposes */
      getMyItems(search = "") {
        if (search === "") {
          this.myItemsFiltered = MarvelMachine.game.resultItemsAll;
        } else {
          /* backspacing sets the filtered list back to the total, otherwise we keep filtering from the filtered list */
          if (myItems.lastSearch.length > search.length) {
            this.myItemsFiltered = MarvelMachine.game.resultItemsAll;
          }
          this.myItemsFiltered = this.myItemsFiltered.filter(a=>a.itemName.toUpperCase().includes(search));
        }

        this.currentPageView = 1;
        this.totalPages = Math.ceil(this.myItemsFiltered.length / this.maxRows);

        if (this.totalPages === 0) {
          this.totalPages = 1;
        }

        myItems.lastSearch = search;
        return this.myItemsFiltered;
      },
      populateMyItems() {
        myItems.checkFirstArrowPaging();
        myItems.checkLastArrowPaging();
        const container = $(".marvel-machine-my-items-list[data-v-927f66ae]");
    
        let html = "";

        let currentPageSlice = this.myItemsFiltered.slice((this.currentPage - 1) * this.maxRows, this.maxRows * this.currentPage);
    
        for (let i = 0; i < currentPageSlice.length; ++i) {
          let item = currentPageSlice[i];
    
          let row = this.generateItemRow(item);
    
          html += row;
        }
    
        container.html(html);
      },
      /* populate paging numbers at bottom */
      populatePaging(pageAt = "first") {
        const container = $(".pagination__numbers[data-v-6314d05e]");
    
        let maxItemPage = Math.ceil((this.myItemsFiltered.length - ((this.currentPageView - 1) * this.maxPage * this.maxRows)) / this.maxRows);

        if (maxItemPage === 0) {
          maxItemPage = 1;
        }
    
        let hasExtraPagesLeft = false;
        let hasExtraPagesRight = false;

        if (maxItemPage > this.maxPage) {
          maxItemPage = this.maxPage;
          hasExtraPagesRight = true;
        } 

        if (this.currentPageView > 1) {
          hasExtraPagesLeft = true;
        }

        let html = "";
    
        for (let i = 1; i <= maxItemPage; ++i) {
          let row = this.generatePagingNumber(i + ((this.currentPageView - 1) * this.maxPage), i === 1);
    
          html += row;
        }
    
        container.html(html);

        const dotLeft = $(".pagination_dotbackward[data-v-6314d05e]");
        if (hasExtraPagesLeft) {
          dotLeft.removeClass("hidden");
        } else {
          dotLeft.addClass("hidden");
        }

        const dotRight = $(".pagination_dotforward[data-v-6314d05e]");
        if (hasExtraPagesRight) {
          dotRight.removeClass("hidden");
        } else {
          dotRight.addClass("hidden");
        }

        /* first or last of the paging numbers to be defaulted to */
        if (pageAt === "first") {
          container.find(".pagination__number[data-v-6314d05e]:first").trigger("click");
        } else {
          container.find(".pagination__number[data-v-6314d05e]:last").trigger("click");
        }
      },
      generateItemRow(item) {
        //let prng = MarvelCustom.prng();
        let redeemed = false; //prng < 0.3;
    
        return `
          <div data-v-927f66ae="" class="marvel-machine-my-items-list__item">
            <div data-v-927f66ae="" class="marvel-machine-my-items-list__item-date-received">${ item.receiveddate }</div>
            <div data-v-927f66ae="" class="marvel-machine-my-items-list__item-name">
              <div data-v-927f66ae="" class="marvel-machine-my-items-list__item-image" style="background-image: url(&quot;https://nxcache.nexon.net/maplestory/shop/gachapon/img/items/${item.itemImageName}.png&quot;);"></div>
              <div data-v-927f66ae="">${item.itemName}</div>
            </div>
            <div data-v-927f66ae="" class="marvel-machine-my-items-list__item-code ${ redeemed ? 'redeemed' : ''}">${ redeemed ? 'Redeemed' : item.couponCode }</div>
            <div data-v-927f66ae="" class="marvel-machine-my-items-list__item-exp-date">${ redeemed ? '-' : item.expiredDateTime }</div>
          </div>
        `;
      },
      generatePagingNumber(pageId, select) {
        return `
          <div data-v-6314d05e="" class="pagination__number ${select ? 'current' : ''}">
            <span data-v-6314d05e="" class="pagination__number-text">
              ${pageId}
            </span>
          </div>
        `;
      },        
      checkFirstArrowPaging() {
        const leftArrow = $(".pagination__go-prev-page[data-v-6314d05e],.pagination__go-first-page[data-v-6314d05e]");
        if (this.currentPage != 1) {
          leftArrow.removeClass("inactive");
        } else {
          leftArrow.addClass("inactive");
        }
      },   
      checkLastArrowPaging() {
        const rightArrow = $(".pagination__go-next-page[data-v-6314d05e],.pagination__go-last-page[data-v-6314d05e]");
        if (this.currentPage != this.totalPages) {
          rightArrow.removeClass("inactive");
        } else {
          rightArrow.addClass("inactive");
        }
      },
      bindEvents() {
        /* click paging number */
        $(".pagination__numbers").on("click", ".pagination__number[data-v-6314d05e]", function() {
          $(".pagination__number[data-v-6314d05e].current").removeClass("current");
          const _this = $(this);
          _this.addClass("current");
    
          let page = +_this.find(".pagination__number-text").text();
          
          myItems.currentPage = page;

          myItems.populateMyItems();
        });

        /* type in search */
        $(".marvel-machine-my-items-seach__input[data-v-927f66ae]").on("keydown keyup", function() {
          let val = $(this).val().trim().toUpperCase();

          myItems.getMyItems(val);

          myItems.populateMyItems();
          myItems.populatePaging();
        });

        /* click left or right nav arrows */
        $(".pagination__go-prev-page[data-v-6314d05e]").on("click", function() {
          const _this = $(this);

          if (_this.hasClass("inactive")) return false;

           let prev = $(".pagination__number[data-v-6314d05e].current").prev();

           if (prev.length > 0) {
            prev.trigger("click");
           } else {
            --myItems.currentPageView;

            myItems.populateMyItems();
            myItems.populatePaging("last");
           }
        });

        $(".pagination__go-first-page[data-v-6314d05e]").on("click", function() {
          const _this = $(this);

          if (_this.hasClass("inactive")) return false;

          myItems.currentPageView = 1;

          myItems.populateMyItems();
          myItems.populatePaging();
        });

        $(".pagination__go-next-page[data-v-6314d05e]").on("click", function() {
          const _this = $(this);

          if (_this.hasClass("inactive")) return false;

           let next = $(".pagination__number[data-v-6314d05e].current").next();

           if (next.length > 0) {
            next.trigger("click");
           } else {
            ++myItems.currentPageView;

            myItems.populateMyItems();
            myItems.populatePaging();
           }
        });

        $(".pagination__go-last-page[data-v-6314d05e]").on("click", function() {
          const _this = $(this);

          if (_this.hasClass("inactive")) return false;

          myItems.currentPageView = Math.ceil(myItems.totalPages / myItems.maxPage);

          myItems.populateMyItems();
          myItems.populatePaging("last");
        });
      }
    };

    $(".marvel-machine-my-items-column-titles__date-filter-item.year[data-v-927f66ae]").html(new Date().getFullYear());
    prizeEvents.bindClose();
    myItems.getMyItems();
    myItems.populateMyItems();
    myItems.populatePaging();
    myItems.bindEvents();
  });
});

//TEST
if (1 == 0) {
  setTimeout(()=>{
    for (let i = 0; i < 66; ++i) {
      MarvelCustom.generateCoupons();
    }
  }, 100);
}


function createTwoWayEnum(pairs) {
  const enumObj = {};
  for (const [key, value] of Object.entries(pairs)) {
    enumObj[key] = value;
    enumObj[value] = key;
  }
  return enumObj;
}

const ItemNameEquivalents = createTwoWayEnum({
  "Electronic Heart O-Series": "Electronic Heart Ω-Series",
  "Commander Magician's Ring Coupon": "Commander Magician's Ring Coupon (90 Days)",
  "AbsoLab Whip Blade (Pirate)": "AbsoLab Whip Blade",
  "AbsoLab Whip Blade (Thief)": "AbsoLab Whip Blade"
});
