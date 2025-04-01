$(function() {
    var item_create = $("#item_create");
    var sfmain =  $(".sf-main-border");
    var sfpop = $(".sfp-main-border");
    var sfitem = $(".sfi-main-border");
    var sfsc = $(".sfsc-main-border");
    var sfsc_clone = sfsc.html();

    var cube_main = $("#cube_container");
    var cube_black_main = $("#black_cube_container");

    var sf_enchant_effects = $(".sf-enchant-effects");
    var sf_header_text = $(".sf-header-text");
    var sf_chance_time_text = $(".sf-star-chance");

    var sfi_result_con = $(".sfi-result-container");
    var sfi_result = $(".sfi-result");
    var sfi_info_right = $(".sfi-info-right");
    var sfi_text = $(".sfi-text");

    var sf_starcatch = $(".sf-starcatch.sf-checkbox");
    var sf_safeguard = $(".sf-safeguard.sf-checkbox");

    var sfsc_star_container = {};
    var sfsc_star_trail_left = {};
    var sfsc_star_trail_right = {};
    var sfsc_star_item_status = {};
    var sfsc_star_items = {};
    var sfsc_star_hitbox = {};
    var sfsc_star_road = {};
    var sfsc_star_start = {};

    let cc = $("#cube_container");
    let bcc = $("#black_cube_container");

    var i_con = $(".item-main-border");

    let body = $("body");
    //maple button sounds
    body.on("click", ".maple-button", function() {
        let _this = $(this);

        if (_this.hasClass("disabled")) return;
        
        sfa.play("_BtMouseClick");

        return false;
    }).on("mouseenter", ".maple-button", function() {
        let _this = $(this);

        if (_this.hasClass("disabled")) return;

        sfa.play("_BtMouseOver");

        return false;
    });
    
    Item = {};

    //event buttons
    $(".event_cb").on("click", function(e) {
        let _this = $(this);
        let bind_val = _this.attr("data-bind");

        event_options[bind_val] = e.target.checked;
        Item.redraw_sf(); 
    });

    //system buttons
    $(".system_cb").on("click", function(e) {
        let _this = $(this);
        let data = _this.data();
        let redraw = +(data.redraw ?? 1);

        system[data.bind] = e.target.checked;

        if (redraw === 1) {
            Item.redraw_sf(); 
        } else if (redraw === 2) {
            Item.redraw_item_tooltip(); 
        }
    });

    //hover over the main or bonus cells to highlight all cells of that type within a row
    body.on("mouseover", ".cube-rng-row", function() {
        let _this = $(this);

        let row = _this.closest("tr");

        let isBonus = _this.hasClass("row-bonus");

        let _td = row.find(`.cube-rng-row${isBonus  ? ".row-bonus" : ".row-main"}`);

        _td.addClass("row-hover");
    }).on("mouseout", function() {
        $("#cube_log_table .row-hover").removeClass("row-hover");
    });

    //MENU STUFF
    const optionbox = $("#option_box").dialog({
        autoOpen: false,
        modal: false
    });

    const optionbox2 = $("#option_sub_box").dialog({
        autoOpen: false,
        modal: false
    });

    //change rates of starforcing cost between GMS and KMS
    let sys_sfrates = $("#system_sfrates");
    sys_sfrates.on("click", function() {
        let _this = $(this);

        Item.set_meta_options({
            starforce_type: _this.val()
        });

        Item.redraw();
    });

    //END MENU STUFF

    var collision = function($div1, $div2) {
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    };

    var init_starcatch = function() {
        sfsc_star_container = $(".sfsc-star-container");
        sfsc_star_trail_left = $(".sfsc-star-trail-left");
        sfsc_star_trail_right = $(".sfsc-star-trail-right");
        sfsc_star_item_status = $(".sfsc-star-item-status");
        sfsc_star_items = $(".sfsc-star-item");
        sfsc_star_hitbox = $(".sfsc-star-hitbox");
        sfsc_star_road = $(".sfsc-star-road");
        sfsc_star_start = sfsc.find(".sf-button-stop");  
    };

    var initialize = function() {
        sfmain.draggable({
            handle: ".sf-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });

        sfpop.draggable({
            handle: ".sfp-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });

        sfitem.draggable({
            handle: ".sfi-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });

        sfsc.draggable({
            handle: ".sfsc-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });

        i_con.draggable({
            handle: ".item-drag-header",
            containment: "window"
        });

        cube_main.draggable({
            handle: ".cube-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });

        cube_black_main.draggable({
            handle: ".cube-black-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: sfcon
        });
    };

    new ResizeObserver(() => {
        /*
            cannot reposition hidden dom, so when window resizes, check if it was hidden
            unhide then move it then hide it again
        */
        let sfmain_was_hidden = sfmain.hasClass("hidden");
        let sfpop_was_hidden = sfpop.hasClass("hidden");
        let sfitem_was_hidden = sfitem.hasClass("hidden");
        let sfsc_was_hidden = sfsc.hasClass("hidden");
        let item_create_was_hidden = item_create.hasClass("hidden");
        let bcube_was_hidden = bcc.hasClass("hidden");
        let cube_was_hidden = cc.hasClass("hidden");

        sfmain.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (sfmain_was_hidden) {
            sfmain.addClass("hidden");
        }

        sfpop.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (sfpop_was_hidden) {
            sfpop.addClass("hidden");
        }

        sfitem.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (sfitem_was_hidden) {
            sfitem.addClass("hidden");
        }

        sfsc.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (sfsc_was_hidden) {
            sfsc.addClass("hidden");
        }

        /* wait for dialog initialization */
        if (item_create.hasClass("ui-dialog-content")) {
            item_create.dialog("option", "position", {my: "center", at: "center", of: window});

            if (item_create_was_hidden) {
                item_create.addClass("hidden");
            }
        }

        cc.removeClass("hidden").position({
            my: "center",
            at: "center top+30%",
            of: sfcon
        });

        if (cube_was_hidden) {
            cc.addClass("hidden");
        }

        bcc.removeClass("hidden").position({
            my: "center",
            at: "center top+30%",
            of: sfcon
        });

        if (bcube_was_hidden) {
            bcc.addClass("hidden");
        }
    }).observe(document.body);

    var isLoading = false;

    sfmain.on("click", ".sf-main.sf-no-item", e=>{
        let _this = $(e.target);
        _this.removeClass("sf-no-item");
        _this.addClass("sf-enchant");
    });

    let begin_starforce_pre = function() {
        //don't do starcatch if it's on chance time or you're in the enhancement altar
        if (!event_options.starcatch && user_settings.starforce.starcatch && !Item.idata.meta.chance_time) {
            begin_star_catch();
            sfpop.addClass("hidden");
        } else {
            begin_starforce(event_options.starcatch);
        }
    };

    sfmain.on("click", ".sf-button-enhance", e=>{
        /* at max stars or not starforceable */
        if (!Item.idata.starforce || Item.idata.meta.stars === Item.idata.meta.max_stars) {
            return false;
        }

        if (!sfitem.hasClass("hidden") || isLoading) {
            return false;
        }

        if (system.confirmation_popup) {
            sfpop.removeClass("hidden");
        } else {
            begin_starforce_pre();
        }
    });

    sfpop.on("click", ".sfp-button-ok", e=>{
        begin_starforce_pre();
    });

    sfpop.on("click", ".sfp-button-cancel", e=>{
        sfpop.addClass("hidden");
    });

    sfitem.on("click", ".sfi-button-ok", e=>{
        sfitem.addClass("hidden");
        isLoading = false;
    });

    sfmain.on("click", ".sf-starcatch", e=>{
        if (sf_starcatch.hasClass("checked")) {
            sf_starcatch.removeClass("checked");
            user_settings.starforce.starcatch = true;
        } else {
            sf_starcatch.addClass("checked");
            user_settings.starforce.starcatch = false;
        }
    }); 

    sfmain.on("click", ".sf-safeguard", (e, b = false)=>{
        if (sf_safeguard.hasClass("disabled")) {
            user_settings.starforce.safeguard = false;
            return false;
        }

        if (sf_safeguard.hasClass("checked")) {
            if (!b) {
                sf_safeguard.removeClass("checked");
            }
            user_settings.starforce.safeguard = true;
        } else {
            if (!b) {
                sf_safeguard.addClass("checked");
            }
            user_settings.starforce.safeguard = false;
        }

        if (!b) {
            Item.redraw_sf();
        }
    });

    var starcatch_auto_timeout = 0;
    sfsc.on("click", ".sf-button-stop", e=>{
        if (sfsc_star_start.hasClass("disabled")) {
            return false;
        }

        let isSuccess = collision(sfsc_star_hitbox, sfsc_star_road);

        sfsc_star_item_status.addClass("hidden");
        sfsc_star_items.addClass("hidden");
        sfsc_star_start.addClass("disabled");
        sfsc_star_container.stop(true);
        sfsc_star_hitbox.addClass("sfsc-star-stop sf-variable-animation");

        if (isSuccess) {
            sfa.play("EnchantStarSuccess", {playbackRate: system.animation_speed});
            sfsc_star_hitbox.append(
                `
                    <div class="sfsc-star-success sf-variable-animation"></div>
                `
            );
        } else {
            sfa.play("EnchantStarStop", {playbackRate: system.animation_speed});
        }

        setTimeout(()=>{
            //reset star catch
            sfsc.html(sfsc_clone).addClass("hidden");
            begin_starforce(isSuccess);
        }, 1050 * system.animation_speed_actual);

        clearInterval(starcatch_auto_timeout);
    });

    let sc_start_sound = "";
    var begin_starforce = function(starcatch = false) {
        isLoading = true;
        sfa.stop("EnchantChanceTime");
        if (sc_start_sound !== "") {
            sfa.stop(sc_start_sound);
        }
        
        sf_enchant_effects.addClass("sf-enchant-hyper-start-fast");
        sfa.play("EnchantHyperFast", {playbackRate: system.animation_speed});

        sfpop.addClass("hidden");
        setTimeout(()=>{
            sf_enchant_effects.removeClass("sf-enchant-hyper-start-fast");
        
            sfitem.removeClass("hidden");
            sfi_text.addClass("hidden");
            sfi_result_con.removeClass("hidden");

            sf_header_text.removeClass("hidden");
            sf_chance_time_text.addClass("hidden");
            
            let r_type = "";
            let result = Item.starforce(starcatch);

            if (Item.idata.meta.chance_count > 1) {
                sf_header_text.addClass("hidden");
                sf_chance_time_text.removeClass("hidden");
                sfa.play("EnchantChanceTime");
            }

            sfi_info_right.removeClass("sf-item-boomed");

            if (GLOBAL.starforce_enums.__SUCCESS.includes(result)) {
                sfa.play("EnchantSuccess", {playbackRate: system.animation_speed});
                r_type = "sfi-success";
                sfi_text.filter(".sfi-text-success").removeClass("hidden");
            } else if (GLOBAL.starforce_enums.__FAIL.includes(result)) {
                sfa.play("EnchantFail", {playbackRate: system.animation_speed});
                r_type = "sfi-fail";
                sfi_text.filter(".sfi-text-fail").removeClass("hidden");
            } else {
                sfa.play("EnchantDestroyed", {playbackRate: system.animation_speed});
                r_type = "sfi-destroy";
                sfi_info_right.addClass("sf-item-boomed");
                sfi_text.filter(".sfi-text-destroyed").removeClass("hidden");
            }

            sfi_result.addClass(r_type);

            setTimeout(()=>{
                sfi_result_con.addClass("hidden");
                sfi_result.removeClass(r_type);
                isLoading = false;
            }, 1020 * system.animation_speed_actual);
        },850 * system.animation_speed_actual); //slow version - 2500
    };

    var starcatch_active = true;
    
    var begin_star_catch = function() {
        //reset itself after 140+ successes instead of ingame cooldown stuff
        if (Item.idata.meta.starcatch.count > 140) {
            Item.idata.meta.starcatch.count = 0;
        }

        init_starcatch();
        sfsc.removeClass("hidden");
        sfsc_star_container.addClass("hidden");
        sfsc_star_item_status.addClass("sfsc-star-begin");

        //determine the star catch difficulty based on how many tries
        //20 successes increases difficulty by 1
        //max 6 difficulties
        let sc_tries = 1 + Math.floor(Item.idata.meta.starcatch.count / 20);
        let sfsc_road = $(".sfsc-star-road");

        let star_catch_speed = 850;

        sfsc_road.attr("class", "sfsc-star-road");
        if (sc_tries === 1) {
            Item.idata.meta.starcatch.speed = 1;
        } else {
            Item.idata.meta.starcatch.speed = 1 - +(sc_tries * 0.08).toFixed(2);
            sfsc_road.addClass("sf-sc-star-road-lvl-" + sc_tries);
        }

        sc_start_sound = "EnchantStar" + (sc_tries > 5 ? 5 : sc_tries);
                    
        //bounce bounce bounce
        setTimeout(()=>{
            sfa.play(sc_start_sound, {loop: true});
            sfsc_star_start.removeClass("disabled");

            starcatch_auto_timeout = setTimeout(()=>{
                sfsc_star_container.stop(true);
                sfsc.html(sfsc_clone).addClass("hidden");
                begin_starforce(false);
            },6000);

            sfsc_star_item_status
            .removeClass("sfsc-star-begin")
            .addClass("sfsc-star-countdown");

            sfsc_star_container.removeClass("hidden");

            star_catch_speed = star_catch_speed * Item.idata.meta.starcatch.speed;

            var bounce_star = function() {
                sfsc_star_container.stop(true)
                .animate({left: "+=200px"}, {
                    duration: star_catch_speed,
                    easing: "linear",
                    queue: false,
                    complete: () => {
                        sfsc_star_trail_left.addClass("hidden");
                        sfsc_star_trail_right.removeClass("hidden");
                        sfsc_star_container.stop(true)
                        .animate({left: "-=200px"}, {
                            duration: star_catch_speed,
                            easing: "linear",
                            queue: false,
                            complete: () => {
                                sfsc_star_trail_left.removeClass("hidden");
                                sfsc_star_trail_right.addClass("hidden");
                                if (starcatch_active) {
                                    bounce_star();
                                }
                            }
                        });
                    }
                });
            };

            bounce_star();
        }, 1000 * system.animation_speed_actual);
    };

    initialize();
    post_render();

    function post_render() {
        //default to GMS cube
        $("#system_cube_display").val("GMS").trigger("change");
    }
});