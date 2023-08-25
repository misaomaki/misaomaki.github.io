$(function() {
    //ITEM CREATION DIALOG BOX
    $(".item-star").on("click", function(e){
        let _this = $(this);
        let star = +_this.attr("data-star-id");

        if (star === 1 && !_this.hasClass("disabled")) {
            star = 0;
        }

        Item.set_item_level(star);
        Item.redraw();
        Item.clear_sf_history();
    });

    $.ui.dialog.prototype._focusTabbable = function(){}; //prevent autofocus

    let item_is_init = false;
    $(".sf-button.sf-button-cancel").on("click", function() {
        init_item();
    });

    const sfmain =  $(".sf-main-border");
    const cube_menu = $("#cube_menu");
    const item_create = $("#item_create");
    const weapon_init = $("#weapon_init");
    const ddl_item = $("#ddl_item_select");
    const flame_textbox = $(".flame-form");
    const flame_percent = $(".flame-percent");
    const flame_tier = $("#flame_as_tier");
    const scroll_textbox = $(".scroll-form");
    const scroll_type = $("#scroll_type");
    const scroll_type_att = $("#scroll_type_att");
    const scroll_type_box = $("#scroll_type_box");
    const scroll_type_box_att = $("#scroll_type_box_att"); //heart scrolls
    const flame_max_4 = $("#flame_max_4");
    const flame_tier_rec = $("#flame_tier_rec");
    const i_con = $(".item-main-border");

    const cube_select_main = $("#cube_select_main");
    const cube_select_bonus = $("#cube_select_bonus");
    const item_cube_con = $("#item_cube_container");
    const item_scroll_con = $("#item_scroll_container");
    const starforce_input_con = $("#starforce_input_con");
    const ddl_flame_score = $("#ddlFlameScoreStat");
    const ddl_flame_score2 = $("#ddlFlameScoreStat2");
    const ddl_flame_score_con = $("#ddlFlameScoreStat_con");

    /* only show starforce/cube/flame options if the item allows it */
    const starforce_options = $(".starforce-option");
    const cube_options = $(".cube-option");
    const flames_options = $(".flame-option");
    const show_relevant_enhancements = function() {
        starforce_options.addClass("hidden");
        cube_options.addClass("hidden");
        flames_options.addClass("hidden");
        
        if (Item.idata.enhanceable) {
            cube_options.removeClass("hidden");
        }
        if (Item.idata.flame_type > 0) {
            flames_options.removeClass("hidden");
        }
        if (Item.idata.starforce) {
            starforce_options.removeClass("hidden");
        }
    };

    const init_item = function() {
        scroll_options = [];
        item_create.dialog({
            closeOnEscape: false,
            open: function(event, ui) {
                $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
            },
            modal: true,
            height: $(window).height() * 0.9,
            width: 800,
            title: "Maplestory Item Simulator",
            buttons: [{
                /* CREATE A NEW MAPLESTORY ITEM (CREATE ITEM) */
                text: "Create",
                click: async function() {
                    cubes_used = 0; //reset cube log counter

                    let this_star = $("#item_starforce").val();
                    let item_val = ddl_item.val();

                    //no item
                    if (item_val == 0) {
                        return false;
                    }

                    //more than 4 flames when the restriction to 4 flames is in place
                    if (
                        flame_max_4.prop("checked") 
                        && 
                        flame_textbox.map(function() {
                            return $(this).val() > 0
                        }).get().filter((a)=>{return a;}).length > 4) 
                     {
                        alert("Only up to 4 flame types are allowed.");
                        return false;
                    }

                    i_con.removeClass("hidden");
                    sfmain.removeClass("hidden");
                    cube_menu.removeClass("hidden");

                    let item_type = item_val.split(";");

                    let flame_options = {};
                    let scroll_options = [];

                    //set up flame data to send to flame function
                    flame_textbox.each(function() {
                        let _this = $(this);
                        let this_attr = _this.attr("data-id");
                        let type = _this.attr("data-type") || "";
                        let val = +_this.val() || 0;

                        if (flame_tier.prop("checked") && (["str", "dex", "int", "luk"].includes(this_attr) || this_attr.includes(","))) {
                            this_attr = "stats:" + this_attr;
                        } else if (!flame_tier.prop("checked")) {
                            if (type === "%") {
                                val = val / 100;
                            } else if (type === "-") {
                                val = Math.abs(val) * -1;
                            }
                        }

                        flame_options[this_attr] = val;

                        if (flame_options[this_attr] == 0) {
                            delete flame_options[this_attr];
                        }
                    });

                    //set up scroll data to send to scroll function
                    scroll_textbox.each(function(){
                        let _this = $(this);
                        let this_attr = _this.attr("data-id");
                        let val = +_this.val();

                        let scr = {
                            type: this_attr,
                            amount: val
                        };

                        if (!scroll_type_box.hasClass("hidden")) {
                            scr.stat = scroll_type.val();
                        } else if (!scroll_type_box_att.hasClass("hidden")) {
                            scr.stat = scroll_type_att.val();
                        }

                        if (val !== 0) {
                            scroll_options.push(scr);
                        }
                    });
             
                    Item = new item(items_store[item_type[0]][item_type[1]]);
                    
                    Item.set_item_level(this_star);

                    Item.set_item_scroll(scroll_options);

                    Item.set_meta_options({
                        nebulite_compensation: $("#item_neb_comp").prop("checked"),
                        fsstat: ddl_flame_score.val(),
                        fsstat2: ddl_flame_score2.val()
                    });

                    //set cube stuff
                    let cube_main_pot = cube_select_main.val();
                    if (cube_main_pot !== "") {
                        let cube_main_pot_stats = {
                            line_0: $("#cube_stat_line_red_1").val(),
                            line_1: $("#cube_stat_line_red_2").val(),
                            line_2: $("#cube_stat_line_red_3").val()
                        };

                        await Item.set_cube("red", cube_main_pot, cube_main_pot_stats);
                    }

                    let cube_bonus_pot = cube_select_bonus.val();
                    if (cube_bonus_pot !== "") {
                        let cube_bonus_pot_stats = {
                            line_0: $("#cube_stat_line_bonus_1").val(),
                            line_1: $("#cube_stat_line_bonus_2").val(),
                            line_2: $("#cube_stat_line_bonus_3").val()
                        };

                        await Item.set_cube("bonus", cube_bonus_pot, cube_bonus_pot_stats);
                    }

                    //add the image to the cube windows
                    $(".cube-item").attr("class", "cube-item").addClass(Item.idata.img);

                    if (flame_tier.prop("checked")) {
                        Item.set_item_flame_tier(flame_options);
                    } else {
                        Item.set_item_flame(flame_options);
                    }
                    
                    let sys_sfrates = $("#system_sfrates");

                    Item.set_meta_options({
                        starforce_type: sys_sfrates.val()
                    });

                    Item.redraw();
                    item_is_init = true;
                    $(this).dialog("close");
                    show_relevant_enhancements();
                    cube.update_cube_menu.call(Item, cube_menu);

                    /* append shadowknight coin ui if it uses it */
                    if (Item.idata.shadowknight) {
                        sfmain.addClass("masteria");
                    } else {
                        sfmain.removeClass("masteria");
                    }

                    document.title = "Sim: " + Item.idata.name;
                    $("#favicon").attr("href", Item.idata.meta.img_name);

                    return false;
                }
            }, {
                text: "Cancel",
                click: function() {
                    if (!item_is_init) return false;
                    $(this).dialog("close");
                }
            }]
        });

        if (!item_is_init) {
            //set up drop down with item data. should be alphabetical by item class then by item name
            let items_db = {};
            for (let i in items_store) {
                items_db[i] = [];
                for (let j in items_store[i]) {
                    let this_item = items_store[i][j];

                    this_item.value_name = i + ";" + j;

                    items_db[i].push(this_item);
                }

                /* sort by name */
                items_db[i].sort((a,b)=>{
                    if (a.name < b.name) {
                        return -1;
                    } else if (a.name > b.name) {
                        return 1;
                    }

                    return 0;
                });
            }

            let itemsHtml = "";

            let item_keys = Object.keys(items_db).sort();

            for (let i = 0; i < item_keys.length; ++i) {
                let i_key = item_keys[i];
                let _di = items_db[i_key];

                itemsHtml += `<option value="0" disabled>${i_key.replace(/_/gi," ").toUpperCase()}</option>`;
                for (let j = 0; j < _di.length; ++j) {
                    let j_item = _di[j];
                    itemsHtml += `
                        <option value="${j_item.value_name}">${j_item.alt_name || j_item.name}</option>
                    `;
                }
            }

            ddl_item.html(
                `
                    <option value="0">Select an Item</option>
                    ${itemsHtml}
                `
            );

            let item_sel = $("#item_select");
            let scr_amount = $("#item_scroll_amount");
            let item_flame_container = $(".item_flame_container");

            let flame_box = $(".flame-box");
            let scroll_box = $(".scroll-box");
            let all_box =  $([...flame_box, ...scroll_box]);
            let all_textbox = $([...flame_textbox, ...scroll_textbox]);
            let flame_adv = $("#item_has_flame_adv");

            all_textbox.on("change", function(e) {
                let _this = $(this);
                let min = +_this.attr("min") || -1;
                let max = +_this.attr("max") || -1;
                let val = +_this.val();

                if (max !== -1 && val > max) {
                    _this.val(max);
                } else if (min !== -1 && val < min) {
                    _this.val(min);
                }
            });

            /* chatgpt */
            const splitByFirstSemicolon = function(str) {
                const index = str.indexOf(':'); // Find the index of the first colon
                
                if (index === -1) {
                    // If semicolon is not found, return the original string
                    return [str];
                }
                
                const firstPart = str.slice(0, index); // Extract the substring before the semicolon
                const remainingPart = str.slice(index + 1); // Extract the substring after the semicolon
                
                return [firstPart, remainingPart];
            }
            
            ddl_item.select2({
                width: 375,
                /*
                    special search:
                    {query}:{value}
                    queries:
                    type: - search by item type

                    if value starts with =, then do exact search
                */
                matcher: function(params, data) {
                    let term = params.term ?? "";

                    if (term === "") {
                        return data;
                    }

                    /* non-item rows */
                    if (data.id == 0) {
                        return null;
                    }
                    
                    /* no special query. do name search */
                    if (!term.includes(":")) {
                        if (data.text.toUpperCase().includes(term.toUpperCase())) {
                            return data;
                        } else {
                            return null;
                        }
                    }

                    /* get query and its value - type:dagger -> type: | dagger */
                    let [query, value] = splitByFirstSemicolon(term);

                    if (value == null || value === "") {
                        return null;
                    }

                    /* get item data */
                    let [category, iclass] = data.id.split(";");
                    if (category == null || iclass == null) return null;
                    let this_item = items_store[category][iclass];

                    /* check query */
                    if (query == "type") {
                        let this_value = value;
                        let this_type = this_item.type;
                        let is_match = false;

                        if (!value.startsWith("=")) {
                            this_value = this_value.replace(/[-\s]/gi, "").toUpperCase();
                            this_type = this_type.replace(/[-\s]/gi, "").toUpperCase();

                            if (this_type.includes(this_value)) {
                                is_match = true;
                            }
                        } else {
                            this_value = this_value.replace("=", "");
                            if (this_value === this_type) {
                                is_match = true;
                            }
                        }

                        if (is_match) {
                            return data
                        } else {
                            return null;
                        }
                    }

                    return null;
                },
                templateResult: function(a) {
                    if (a.id === undefined || !a.id.includes(";")) return a.text;

                    let item_type = a.id.split(";");
                    let this_item = items_store[item_type[0]][item_type[1]];

                    let specific_job = this_item.job.length === 1 ? this_item.job[0] : "";

                    if (system.ddl_with_name) {
                        return $(`
                            <span>
                                <span class="${this_item.img}" style="display:inline-block;width:30px;height:30px;"></span> ${a.text}
                            </span>
                        `);
                    }

                    return $(`
                        <span class="${this_item.img}" style="display:inline-block;width:30px;height:30px;" title="${a.text}">
                            <span class="job-icon job-${specific_job}"></span>
                        </span>
                    `);
                }
            });

            /* append css for icon blocks in dropdown, depending on setting */
            ddl_item.on("select2:open", function() {
                $("#select2_css").remove();
                if (!system.ddl_with_name) {
                    $("body").append(`
                        <style id="select2_css">
                            #select2-ddl_item_select-results .select2-results__option--selectable {
                                display: inline-block !important;
                            }
                        </style>
                    `);
                }
            });

            //select equipment from dropdown
            ddl_item.on("change", function(e) {
                let _this = $(this);
                let val = _this.val();

                flame_textbox.val(0);
                scroll_textbox.val(0);

                //reset potential options because changing to different equipment changes the stat options
                $("#cube_select_main").val("").trigger("change");
                $("#cube_select_bonus").val("").trigger("change");

                if (val == 0) {
                    weapon_init.addClass("hidden");
                    scr_amount.html("0");
                    item_sel.html("");
                    return false;
                }

                let item_type = val.split(";");
                let this_item = items_store[item_type[0]][item_type[1]];

                item_sel.html(`
                    <span class="${this_item.img}" style="width:30px;height:30px;display:inline-block;position:relative;top:5px;"></span>
                `);

                if (this_item.type === "mechanical heart") {
                    scroll_type_box_att.removeClass("hidden");
                    scroll_type_box.addClass("hidden");
                } else {
                    //weapons don't show the armor-type scrolls
                    if (this_item.class !== "weapon") {
                        scroll_type_box.removeClass("hidden");
                    } else {
                        scroll_type_box.addClass("hidden");
                    }
    
                    scroll_type_box_att.addClass("hidden");
                }

                //set total scroll data for scroll textbox
                let tot_scroll = this_item.upgrades + this_item.hammers_added;
                scr_amount.html(tot_scroll);

                scroll_textbox.attr("max", tot_scroll);

                weapon_init.removeClass("hidden");

                //if the item can even have flames
                if (this_item.flame_type == 0) {
                    item_flame_container.addClass("hidden");
                    ddl_flame_score_con.addClass("hidden");
                } else {
                    item_flame_container.removeClass("hidden");
                    ddl_flame_score_con.removeClass("hidden");

                    /* auto select flame score stat, based on selected value */
                    if (this_item.class === "weapon") {
                        ddl_flame_score_con.addClass("hidden");
                    } else {
                        let this_stat = this_item.meta.fsstat;
                        let this_stat2 = this_item.meta.fsstat2;
                        if (this_stat === "") this_stat = "str";
                        if (this_stat2 === "") this_stat2 = "dex";
                        ddl_flame_score.val(this_stat);
                        ddl_flame_score2.val(this_stat2);
                    }
                }

                flame_box.addClass("hidden");
                scroll_box.addClass("hidden");

                /* show specific or specials scrolls depending on item type */
                if (item_type[0] === "gollux") {
                    scroll_box.filter(function() {
                        return $(this).hasClass("item-gollux");
                    }).removeClass("hidden");
                }

                /* show specific or specials scrolls depending on item type */
                if (this_item.name.toLowerCase().includes("horntail")) {
                    scroll_box.filter(function() {
                        return $(this).hasClass("item-chaos-horn-tail");
                    }).removeClass("hidden");
                }

                if (this_item.type === "mechanical heart") {
                    scroll_box.filter(function() {
                        return $(this).hasClass("item-mechanical-heart");
                    }).removeClass("hidden");
                }

                //show weapon/armor-related flames
                if (this_item.class === "weapon") {
                    all_box.filter(function() {
                        let self = $(this);

                        if (this_item.sub_class == "secondary" && self.hasClass("item-not-secondary")) {
                            return false;
                        }
                        
                        return self.hasClass(`item-weapon`);
                    }).removeClass("hidden");
                } else if (this_item.class === "armor") {
                    all_box.filter(function() {
                        let __this = $(this);
                        let data = __this.data();
                        let has_armor = __this.hasClass("item-armor");

                        /* check if there are restrictions on which types of armor are allowed to see it */
                        if (has_armor && "forArmor" in data) {
                            let armor_types = data.forArmor.split(",");

                            return armor_types.includes(this_item.type);
                        }

                        return __this.hasClass("item-armor");
                    }).removeClass("hidden");
                }

                //has flame advantage
                if (this_item.flame_type == 2) {
                    flame_adv.html("Yes");
                    flame_adv.attr("data-flame-type", 2);
                    flame_tier_rec.html("Gear is flame advantaged. You should set flames between 3 and 7 and have the maximum of 4 flame types.");
                } else {
                    flame_adv.html("No");
                    flame_adv.attr("data-flame-type", 1);
                    flame_tier_rec.html("Gear is not flame advantaged. You should set flames between 1 and 5.");
                }

                //prefill genesis weapon stats, but not enforced
                if (item_type[0] === "genesis") {
                    $("#item_starforce").val(22);
                    $("#scrolls_15").val(8);
                } else {
                    $("#item_starforce").val(0);
                }

                /* item not cubeable so don't display cube options */
                item_cube_con.removeClass("hidden");
                if (!this_item.enhanceable) {
                    item_cube_con.addClass("hidden");
                }

                /* item not scrollable so don't display scroll options */
                item_scroll_con.removeClass("hidden");
                if (!this_item.scrollable) {
                    item_scroll_con.addClass("hidden");
                }

                starforce_input_con.removeClass("hidden");
                /* item not starforceable so don't display starforce box */
                if (!this_item.starforce) {
                    starforce_input_con.addClass("hidden");
                }

                /* auto select scroll based on main stat */
                if (this_item.meta.fsstat != "") {
                    scroll_type.val(this_item.meta.fsstat);
                }
            });

            flame_tier.on("change", function(e) {
                if (e.target.checked) {
                    flame_textbox.attr("max", 7);
                    flame_percent.addClass("hidden");

                    flame_box.filter(":not(.item-custom-flame)").removeClass("hidden");
                } else {
                    flame_textbox.removeAttr("max");
                    flame_percent.removeClass("hidden");

                    flame_box.filter(":not(.item-custom-flame)").addClass("hidden");
                }

                flame_max_4.prop("checked", e.target.checked);

                flame_textbox.val(0);
            });
        }
    };

    //select a potential tier for main/bonus to display the lines and their stats to choose from
    $(".select-cube-type").on("change", async function() {
        let _this = $(this);
        let type = _this.attr("data-type");

        let pot_tier = _this.val();

        let _item = ddl_item.val().split(";");
        let this_item = items_store[_item[0]][_item[1]];

        if (!this_item.enhanceable) {
            return false;
        }

        //get item type, with sub class taking priority (copied from cube.js)
        let item_type = this_item.sub_class;

        if (this_item.class == "weapon") {
            item_type = this_item.class;
        } else if (item_type === "") {
            item_type = this_item.type;
        } 

        item_type = item_type.replace(/\s/gi, "_");

        let cube_type = type === "main" ? "red" : "bonus";

        let tier_html = pot_tier !== "" ? await cube_pot_dropdown_html(this_item, cube_type, pot_tier, {
            wildcard: false
        }) : "";

        $("#cube_line_con_" + type).html(tier_html);

        $(".select-cube-line-" + cube_type).select2();
    });

    init_item(); //start here
});