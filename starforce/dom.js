$(function() {
    var item_create = $("#item_create");

    var cube_menu = $("#cube_menu");

    var sfmain =  $(".sf-main-border");
    var sfpop = $(".sfp-main-border");
    var sfitem = $(".sfi-main-border");
    var sfr = $(".sfi-result");
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
    var enable_starcatch = !$(".sf-starcatch.sf-checkbox").hasClass("checked");
    var enable_safeguard = !$(".sf-starcatch.sf-safeguard").hasClass("checked");

    var sfsc_star_container = {};
    var sfsc_star_trail_left = {};
    var sfsc_star_trail_right = {};
    var sfsc_star_item_status = {};
    var sfsc_star_items = {};
    var sfsc_star_hitbox = {};
    var sfsc_star_road = {};
    var sfsc_star_start = {};

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


    var Item = {};

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
        let bind_val = _this.attr("data-bind");

        system[bind_val] = e.target.checked;
        Item.redraw_sf(); 
    });

    //initialize the item object
    var init_item = function(lvl, item_type = null) { 
        if (item_type != null) {
            Item = new item(item_type);
        }
        Item.set_item_level(lvl);
        Item.set_item_scroll([{
            type: "prime",
            amount: "max"
        }]);
        Item.set_meta_options({
            nebulite_compensation: true
        });
        /*
        Item.set_item_flame_tier({
            "stats:luk,dex": 5,
            "stats:luk":6,
            "stats:luk,str": 6,
            all_stat: 5
        });
       */
        Item.set_item_flame({
            watt: 133,
            boss_damage: 0.1,
            damage: 0.05,
            all_stat: 0.06
        });
        
        Item.redraw();
    };

    //CUBE STUFF

    //init cubing
    //cube containers
    let cc = $("#cube_container");
    let bcc = $("#black_cube_container");
    let cube_black_results = $(".cube-black-result");

    let cube_red_go = $(".cube-red");
    let cube_black_go = $(".cube-black");
    let cube_bonus_go = $(".cube-bonus");

    //while cube aniamtion plays, disallow cube actions
    let cube_loading = false;

    //cubes at the bottom left
    $("#cube_menu .cube").on("click", function() {
        if (cube_loading) return false;

        let _this = $(this);
        let cube_type = _this.attr("data-id");

        cube_loading = true;
        let cr = false; //cube upgrade
        let cube_animation = "cube-use-normal";
        if (cube_type === "black") {
            cr = Item.cube(cube_type, bcc, ()=>{});

            if (cr) {
                cube_animation = "cube-use-tier"; //tier up animation
            }

            bcc.removeClass("hidden");
            cc.addClass("hidden");

            let bcc_play = bcc.find(".cube-black-upgrade").removeClass("hidden").addClass(cube_animation);
            let bcc_button = bcc.find(".btn-one-more-try").addClass("disabled");

            setTimeout(function() {
                bcc_play.addClass("hidden").removeClass(cube_animation);
                bcc_button.removeClass("disabled");
                cube_loading = false;
                Item.redraw_item_tooltip();
            }, 1500 * system.animation_speed_actual);
        } else {
            cr = Item.cube(cube_type, cc, ()=>{});

            if (cr) {
                cube_animation = "cube-use-tier";
            }

            bcc.addClass("hidden");
            cc.removeClass("hidden");

            if (cube_type === "red") {
                cc.find(".cube-main").removeClass("cube-main-bonus");
                cc.find(".reset-cube-red").removeClass("reset-cube-bonus");
            } else if (cube_type === "bonus") {
                cc.find(".cube-main").addClass("cube-main-bonus");
                cc.find(".reset-cube-red").addClass("reset-cube-bonus");
            }

            let cc_play = cc.find(".cube-upgrade").removeClass("hidden").addClass(cube_animation);
            let cc_button = cc.find(".btn-one-more-try").addClass("disabled");
            let cc_ok = cc.find(".btn-cube-ok").addClass("disabled");

            setTimeout(function() {
                cc_play.addClass("hidden").removeClass(cube_animation);
                cc_button.removeClass("disabled");
                cc_ok.removeClass("disabled");
                cube_loading = false;
                Item.redraw_item_tooltip();
            }, 1500 * system.animation_speed_actual);
        }
    });

    //close cube window
    $(".btn-cube-ok").on("click", function() {
        cc.addClass("hidden");
    });

    //one more try
    $(".btn-one-more-try").on("click", function() {
        let _this = $(this);

        if (_this.hasClass("btn-cube-black")) {
            cube_black_go.trigger("click");
        } else {
            let is_bonus = cube_main.find(".cube-main").hasClass("cube-main-bonus");

            if (is_bonus) {
                cube_bonus_go.trigger("click");
            } else {
                cube_red_go.trigger("click");
            }
        }
    });

    //apply before stats
    cube_black_results.on("click", function() {
        let _this = $(this);
        let this_id = _this.attr("data-id");

        let this_pot = Item.idata.meta.cube_meta_data.find(function(a) {
            return a.results.name === this_id;
        });

        let is_before = _this.hasClass("cube-black-window-before");

        //update keep flag when selected for logging
        //update pot tier too in case user is an idiot and wants to keep lower potential
        let curr_pot = Item.idata.meta.cube_meta_data[0];
        curr_pot.keep = !is_before;
        Item.idata.meta.cube_potential = this_pot.tier;

        Item.idata.boosts.cubes.main = this_pot.results.result;
    
        Item.redraw_item_tooltip();

        bcc.addClass("hidden");
    });

    let mapToDisplayHtml = function(a, cb) {
        let html = '';

        let this_data = [];
        //get data from struct to array
        for (let i in a) {
            let _a = a[i];

            for (let j = 0; j < _a.length; ++j) {
                let j_a = _a[j];

                this_data.push({
                    name: i,
                    from: j_a[0],
                    to: j_a[1]
                });
            }
        }

        //sort by "from" range item
        this_data = this_data.sort((a,b)=>{
            if (a.from < b.from) {
                return -1;
            } else if (a.from > b.from) {
                return 1;
            }

            return 0;
        });

        //map to html
        for (let i = 0; i < this_data.length; ++i) {
            let _i = this_data[i];

            _i.from = _i.from.toFixed(5);
            _i.to = _i.to.toFixed(5);
            
            html += cb(_i);
        }

        return html;
    };

    //generate cube log rows.
    var generate_cube_log_table = function(cube_data) {
        let cdl = cube_data.length;

        //show 100 cube log
        let max_start = 100;

        if (cdl < max_start) {
            max_start = cdl;
        }

        let t_body = "";

        for (let i = 0; i < max_start; ++i) {
            let _i_cd = cube_data[i];
            let run = _i_cd.run;

            let i_results = {}; //main
            let i_results_b = {}; //bonus

            let i_cd = {};

            //other is opposite of the cube type used. if cube type is bonus, then other is main and vice-versa
            let i_cd_other = _i_cd.other || {
                type: ""
            };
            
            //check to see which is the main pot and bonus pot since the log logs the current main and bpot
            if (_i_cd.type === "main") {
                i_cd = _i_cd;
                i_cd_b = i_cd_other;
                i_results = _i_cd.results.result;
                
                if (i_cd_other.type !== "") {
                    i_results_b = i_cd_other.results.result;
                }
            } else {
                i_cd = i_cd_other;
                i_cd_b = _i_cd;
                
                if (i_cd_other.type !== "") {
                    i_results = i_cd_other.results.result;
                }

                i_results_b = _i_cd.results.result;
            }

            let lucky3 = false;
            let luckyb3 = false;

            if (i_cd.type !== "") {
                //remove the identifier digit from the stat type id. this allows us to check to see if all 3 lines are the same. if it is, highlight it as noteworthy
                let i1 = i_results[0].id.replace(/\d+$/, "");
                let i2 = i_results[1].id.replace(/\d+$/, "");
                let i3 = i_results[2].id.replace(/\d+$/, "");

                lucky3 = i1 === i2 && i2 === i3; //three in a row
            }

            if (i_cd_b.type !== "") {
                //bpot
                let ib1 = i_results_b[0].id.replace(/\d+$/, "");
                let ib2 = i_results_b[1].id.replace(/\d+$/, "");
                let ib3 = i_results_b[2].id.replace(/\d+$/, "");

                luckyb3 = ib1 === ib2 && ib2 === ib3; 
            }

            t_body += `
                <tr data-run="${run}" data-pot="${_i_cd.tier}" data-pot-b="${i_cd_b.tier}" data-cube="${_i_cd.cube}" data-cube-b="${i_cd_b.cube}">
                    <td>
                        ${run}
                    </td>
                    <td>
                        <div class="cube cube-${_i_cd.cube} cube-tiny"></div>
                    </td>
                    <td>
                        <span class="pot-item">
                            <span class="tooltip-${i_cd.tier}"></span>
                            <span class="tooltip-${i_cd_b.tier}"></span>
                        </span>
                    </td>
                    <td>
                        ${_i_cd.cube === "black" ? (_i_cd.keep ? "Yes" : "No") : ""}
                    </td>
                    ${
                        i_cd.type !== "" ? 
                        `
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[0].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[1].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[2].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                <span class="pot-item-container" style="text-align:left;width:100%;display:inline-block">
                                    <span class="pot-item pot-item-1" data-id="1">• ${i_results[0].display}</span> <br>
                                    <span class="pot-item pot-item-2" data-id="2">• ${i_results[1].display}</span> <br>
                                    <span class="pot-item pot-item-3" data-id="3">• ${i_results[2].display}</span>
                                </span>
                            </td>
                        `
                        :
                        `
                            <td colspan="4"></td>
                        `
                    }
                    ${
                        i_cd_b.type !== "" ? 
                        `
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[0].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[1].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[2].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                <span class="pot-item-container" style="text-align:left;width:100%;display:inline-block">
                                    <span class="pot-item pot-item-1" data-id="1">• ${i_results_b[0].display}</span> <br>
                                    <span class="pot-item pot-item-2" data-id="2">• ${i_results_b[1].display}</span> <br>
                                    <span class="pot-item pot-item-3" data-id="3">• ${i_results_b[2].display}</span>
                                </span>
                            </td>
                        `
                        :
                        `
                            <td colspan="4"></td>
                        `
                    }
                </tr>
            `;
        }

        return t_body;
    };

    //cube log popup
    $("#cube_log").on("click", function() {
        //sim cubes
        /*
        for (let i = 0; i < 10; ++i) {
            Item.cube("red", $());
            Item.cube("black", $());
            Item.cube("bonus", $());
        }
        */

        let cube_data = Item.idata.meta.cube_meta_data;

        let cube_type_html = "";

        for (let i in Item.idata.meta.cubes_used) {
            let cube_count = Item.idata.meta.cubes_used[i];
            cube_type_html += `
                <div class="cube-used">
                    <div class="cube cube-${i} cube-small"></div> <span class="cube-used-count">${cube_count}</span>
                </div>
            `;
        }

        let t_body = "";
        if (cube_data.length === 0) {
            t_body = `
                <tr>
                    <td colspan="20" style="text-align:center">No Records Found</td>
                </tr>
            `;

        } else {
            t_body = generate_cube_log_table(cube_data);
        }

        let html = `
            ${cube_type_html}
            <div id="cube_log_information">
                <div id="cube_log_prng"></div>
                <table style="width:100%;font-size:11px;float:left;" id="cube_log_table">
                    <thead>
                        <tr>
                            <th colspan="12">
                                Click on the cells in the "Main" or "Bonus" columns to view the PRNG info for that cube result.
                            </th>
                        </tr>
                        <tr>
                            <th colspan="4"></th>
                            <th colspan="4">Main</th>
                            <th colspan="4">Bonus</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Cube</th>
                            <th>Potential</th>
                            <th>Keep?</th>
                            <th>Line #1</th>
                            <th>Line #2</th>
                            <th>Line #3</th>
                            <th>Overall</th>
                            <th>Line #1</th>
                            <th>Line #2</th>
                            <th>Line #3</th>
                            <th>Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t_body}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="20">
                                <button id="cube_log_show_more" style="width:100%">Show 100 More</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr>
        `;

        let option_box = $("#option_box");

        optionbox.html(html).dialog({
            title: "Cube Log",
            width: "100%",
            height: 850,
            buttons: [{
                text: "Back",
                class: "hidden",
                id: "btn_cube_log_back2",
                click: function() {
                    $("#btn_cube_log_back").trigger("click");
                }
            },{
                text: "Close",
                click: function() {
                    option_box.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        let cube_log_table = $("#cube_log_table");
        let cube_log_prng = $("#cube_log_prng");

        //show x rows at a time. hitting the show more will load x more rows. we start with showing x rows, so that is offset from the total at the start
        let at_a_time = 100;
        let current_shown = at_a_time;
        let cdl = cube_data.length;
        $("#cube_log_show_more").on("click", function() {
            if (current_shown > cdl) return false;

            let start_index = current_shown;
            current_shown += at_a_time;

            if (current_shown > cdl) {
                current_shown = cdl;
            }

            let nextCubeData = cube_data.slice(start_index, current_shown);

            let new_t_body = generate_cube_log_table(nextCubeData);

            cube_log_table.append(new_t_body);
        });


        let btn_cube_log_back2 = $("#btn_cube_log_back2");
        //click row to get the prng information
        cube_log_table.on("click", ".cube-rng-row", function() {
            let _this = $(this);
            let id = _this.attr("data-id");

            let is_bonus = _this.hasClass("row-bonus");

            let tr = _this.closest("tr");
            let run = tr.attr("data-run");
            let pot_tier = tr.attr(is_bonus ? "data-pot-b" : "data-pot");
            let cube = tr.attr(is_bonus ? "data-cube-b" : "data-cube");

            let cube_object = Item.idata.meta.cube_meta_data.find((a)=>{
                return a.results.name === id;
            });

            let cube_line = [0,1,2];

            //get the cube maps for each line and add it to an array. also add the length to a different array
            let cube_lines_length = [];
            let cube_lines = cube_line.reduce(function(a,b) {
                let b_item = cube_object.results.map["line_" + b];
                a.push(b_item);

                cube_lines_length.push(b_item.length);

                return a;
            },[]);

            //get the rng map and prng for the tier up rate. if already legendary, then this should be undefined
            let cube_log_item = cube_object.results.tier_up.cube_log_item;
            
            let tier_rng = "";
            let tier_map = "";
            let html_tier = "";
            
            if (cube_log_item != undefined) {
                tier_rng = cube_object.results.tier_up.cube_log_item.tier_prng;
                tier_map = cube_object.results.tier_up.cube_log_item.r_map;

                html_tier = mapToDisplayHtml(tier_map, (a)=>{
                    return `
                        <tr class="${tier_rng >= a.from && tier_rng < a.to ? 'highlight-row' : ''}">
                            <td>${a.name}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });
            }

            //get the maximum size of the result maps
            let rng_rows_length = new Array(Math.max(...cube_lines_length)).fill();

            //get the rng value used to determine the stat for each line. used for highlighting the relevant stat row from the probability map
            let chosen_row = [];
            //create a table of prng range values for the lines
            //the lines with the most possible values will determine the table's length
            let dom2 = `
                <button id="btn_cube_log_back" style="width:150px;display:block;margin-bottom:10px;">Back</button> 
                <hr>
                <br>
                <b>Cube Run: #${run} | Cube: <div style="top: 12px;position: relative;" class="cube cube-${cube} cube-tiny" data-id="red"></div> | Pot: <span class="tooltip-${pot_tier}"></span></b>
                ${html_tier !== "" ? 
                `
                    <h2>Tier Up</h2>
                    <div class="tooltip-item" id="tooltip_tier" style="width:100%;display:block;">
                        <table style="width:100%;font-size:11px;">
                            <thead>
                                <tr>
                                    <th>Tier Up?</th>
                                    <th>Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        <b>${tier_rng}</b>
                                    </td>
                                </tr>
                                ${html_tier}
                            </tbody>
                        </table>
                    </div>
                ` : ''
                }
                <h2>Stat Determination</h2>
                <div class="tooltip-item" id="tooltip_item" style="width:100%;height:90%;display:block;">
                    <table style="width:100%;height:100%;font-size:11px;">
                        <thead>
                            <tr>
                            ${
                                cube_line.map(function(a,b) {
                                    return `
                                        <th>Line #${b+1}</th>
                                        <th>Range</th>
                                    `;
                                }).join("")
                            }
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                cube_object.results.result.map(function(x) {
                                    chosen_row.push(x.prng);
                                    return `
                                        <td colspan="2" style="text-align:center" title="The pseudo-random number used to check against the probability map.">
                                            <b>${x.prng}</b>
                                        </td>
                                    `
                                }).join("")
                            }
                            ${
                                rng_rows_length.map(function(a,b,c) {
                                    return `<tr>${
                                        cube_lines.map(function(x,y) {
                                            let _a = x[b];

                                            if (_a === undefined) {
                                                return `
                                                    <td></td>
                                                    <td></td>
                                                `;
                                            }


                                            let _chosen = chosen_row[y];
                                            let isChosen = _chosen >= _a.from && _chosen < _a.to;

                                            return `
                                                <td ${isChosen ? `class="highlight-row"` : ""} title="${(_a.chance * 100).toFixed(4)}% chance" data-id="${_a.id}">${_a.display}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${_a.from.toFixed(5)} - ${_a.to.toFixed(5)}</td>
                                            `;
                                        }).join("")
                                    }</tr>`
                                }).join("")
                            }
                        </tbody>
                    </table>
                </div>
            `;

            cube_log_prng.removeClass("hidden");
            cube_log_prng.html(dom2);

            btn_cube_log_back2.removeClass("hidden");

            //return from viewing the prng info for a cube run
            $("#btn_cube_log_back").on("click", function() {
                cube_log_prng.addClass("hidden");
                cube_log_table.removeClass("hidden");
                btn_cube_log_back2.addClass("hidden");
            });

            cube_log_table.addClass("hidden");

            option_box.scrollTop(0);
        });

        return false;
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
    let optionbox = $("#option_box").dialog({
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

    //auto starforce
    $("#auto_starforce").on("click", function() {
        let html = `
            <b>Automatically run starforcing to the desired star. This will generate starforce log data.</b>
            <hr>
            <div class="form-group">
                <label class="form-label-group">
                    <span class="form-label">
                        Star From:
                    </span>
                    <input type="number" value="${Item.idata.meta.stars}" readonly disabled style="width:75px">
                </label>
                <label class="form-label-group" for="asf_star_to">
                    <span class="form-label">
                        Star To:
                    </span>
                    <input type="number" id="asf_star_to" value="22" min="${Item.idata.meta.stars}" style="width:75px">
                </label>
            </div>
            <div class="form-group">
                <label class="form-label-group">
                    <span class="form-label">
                        Starcatch at stars:
                    </span>
                    <hr>
                    <textarea id="asf_starcatch" 
                        style="width:100%;height:50px"
                        placeholder="Add stars to starcatch in a comma-delimited list here (ex. '14,20,21'). You can specify a range by using '-' (ex. '1-5'). This can be mixed and matched (ex. '10-15,20,21'). Leave blank to not starcatch."
                    ></textarea>
                </label>
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <span class="form-label">
                        Safeguard at stars:
                    </span>
                    <hr>
                    <span style="display: inline-block; padding: 5px;">
                        <label for="asf_cb_all">
                            <input type="checkbox" class="asf_checkbox_all" id="asf_cb_all" value="-1"> [All]
                        </label>
                    </span>
                    ${
                        [12,13,14,15,16].map((a,b)=>{
                            return `
                            <span style="display: inline-block; padding: 5px;">
                                <label for="asf_cb_${b}">
                                    <input type="checkbox" class="asf_checkbox" id="asf_cb_${b}" value="${a}"> ${a}
                                </label>
                            </span>
                            `
                        }).join("")
                    }
                </div>
                <span id="h_update"></span>
            </div>
        `;

        let w_sf = {terminate:()=>{}}; //starforce worker
        optionbox.html(html).dialog({
            title: "Auto Star Force",
            width: 1000,
            height: "auto",
            close: ()=>{
                w_sf.terminate();
            },
            buttons: [{
                text: "Close",
                click: function() {
                    $(this).dialog("close");
                }
            }, {
                text: "Begin Starforcing",
                id: "btnBeginStarforce",
                click: function() {
                    let btn = $("#btnBeginStarforce");

                    btn.prop("disabled", true);
                    btn.html("Processing starforce...");

                    let starcatch_a = $("#asf_starcatch").val().split(",");
                    
                    let starcatch = [];
                    
                    //get the starcatch stars from textarea
                    for (let i = 0; i < starcatch_a.length; ++i) {
                        let _i = starcatch_a[i];

                        if (_i.includes("-")) {
                            let i_range = _i.split("-");

                            for (let j = i_range[0]; j <= i_range[1]; ++j) {
                                starcatch.push(+j);
                            }
                        } else {
                            starcatch.push(+_i);
                        }
                    }

                    //get the safeguard stars from the checkbox list
                    let safeguard = $("#option_box .asf_checkbox:checked").map(function(a,b) {return +$(b).val()}).get();

                    let stars_to = +$("#asf_star_to").val();

                    let data = {
                        to: stars_to,
                        item: Item.idata,
                        sys_type: sys_sfrates.val(),
                        starcatch: starcatch,
                        events: event_options,
                        safeguard: safeguard,
                        heuristic: false
                    };
            
                    //post data to worker to calculate stars
                    w_sf = new Worker("./starforce/worker_starforce.js");
            
                    w_sf.postMessage(data);
            
                    let h_update = $("#h_update");
                    w_sf.onmessage = function(d) {
                        if (d.data.type === 2) {
                            h_update.html(d.data.message);
                            return false;
                        }

                        Item.set_item_level(d.data.stars_to);
                        Item.idata.meta.sf_meta_data = d.data.data;
                        Item.redraw();

                        optionbox.dialog("close");
                    };
                }
            }]
        }).dialog("open");

        $("#asf_cb_all").on("click", function(e) {
            $("#option_box .asf_checkbox").prop("checked", e.target.checked);
        });
    });

    //auto cube
    $("#auto_cube").on("click", function() {
        let html = `
            <b>Automatically cube to the desired lines. This will generate cube log data.</b>
            <hr>
            <div class="form-group">
                <label class="form-label-group">
                    <span class="form-label">
                        Select Cube
                    </span>
                    <div class="cube-selection" id="cube_select">
                        <div class="cube auto-cube cube-red maple-button" data-id="red" data-type="main"></div>
                        <div class="cube auto-cube cube-black maple-button" data-id="black" data-type="main"></div>
                        <div class="cube auto-cube cube-bonus maple-button" data-id="bonus" data-type="bonus"></div>
                    </div>
                </label>
            </div>
            <div class="form-group">
                <div class="form-label">
                    Cube Lines
                </div>
                <div id="auto_cube_lines" class="hidden">
                    <div class="item-cube-form cube-main-form" id="auto_cube_form_main">
                        <label for="auto_cube_select_main">
                            <span class="item-cube-label">Select Main Potential Tier:</span>
                            <select id="auto_cube_select_main" class="auto-select-cube-type" data-type="main">
                                <option value="">No Potential</option>
                                <option value="rare">Rare</option>
                                <option value="epic">Epic</option>
                                <option value="unique">Unique</option>
                                <option value="legendary">Legendary</option>
                            </select>
                        </label>  
                        <div id="auto_cube_line_con_main" style="padding:5px;">
                        </div>           
                    </div>
                    <div class="item-cube-form cube-bonus-form" id="auto_cube_form_bonus">
                        <label for="auto_cube_select_bonus">
                            <span class="item-cube-label">Select Bonus Potential Tier:</span>
                            <select id="auto_cube_select_bonus" class="auto-select-cube-type" data-type="bonus">
                                <option value="">No Potential</option>
                                <option value="rare">Rare</option>
                                <option value="epic">Epic</option>
                                <option value="unique">Unique</option>
                                <option value="legendary">Legendary</option>
                            </select>
                        </label>      
                        <div id="auto_cube_line_con_bonus" style="padding:5px;">
                        </div>  
                    </div>
                </div>
            </div>
            <span id="cube_msg" style="color:red"></span>
        `;

        let w_c = {terminate:()=>{}}; //worker
        optionbox.html(html).dialog({
            title: "Auto Cube",
            width: 1000,
            height: "auto",
            close: ()=>{
                w_c.terminate();
            },
            buttons: [{
                text: "Close",
                click: function() {
                    $(this).dialog("close");
                }
            }, {
                text: "Begin Cubing",
                id: "btnBeginCube",
                click: function() {
                    let _this = $(this);

                    let btn = $("#btnBeginCube");

                    btn.prop("disabled", true);
                    btn.html("Processing cubes...");

                    let c_cube = $("#cube_select .auto-cube-selected");
                    let cube_type = c_cube.attr("data-type");
                    let cube = c_cube.attr("data-id");

                    let line_1 = $("#cube_stat_line_" + cube_type + "_1").val();
                    let line_2 = $("#cube_stat_line_" + cube_type + "_2").val();
                    let line_3 = $("#cube_stat_line_" + cube_type + "_3").val();

                    let pot_tier = $("#option_box #auto_cube_select_" + cube_type).val();

                    if (line_1 == null || line_2 == null || line_3 == null) {
                        alert("Error: Must select a cube and potential lines.");

                        btn.prop("disabled", false);
                        btn.html("Begin Cubing");
                        return false;
                    }

                    let data = {
                        item: Item,
                        cube_lines: [line_1, line_2, line_3],
                        cube_type: cube_type,
                        cube: cube,
                        pot_tier: pot_tier
                    };
            
                    //post data to worker to calculate cubes
                    w_c = new Worker("./starforce/worker_cube.js");   
            
                    w_c.postMessage(data);
                    
                    let cube_msg = $("#cube_msg");
                    w_c.onmessage = function(d) {
                        //codes less than 1 are errors that cannot proceed
                        if (d.data.code < 0) {
                            btn.prop("disabled", false);
                            btn.html("Begin Cubing");
                            alert(d.data.message);
                            return false;
                        };

                        //worker is sending updates about how many cubes are used. used for long-running cubing
                        if ([15,16].includes(d.data.code)) {
                            cube_msg.html(d.data.message);
                            return false;
                        }

                        let cube_log_data = d.data.data.idata.meta.cube_meta_data;

                        let data_cubes_used = d.data.data.idata.meta.cubes_used;

                        //if item tier passed the desired tier, then exit and return the latest cube lines
                        if (d.data.code === 2) {
                            alert(d.data.message);

                            let last_result = cube_log_data[0];
                            let last_result_lines = last_result.results.result.map(a=>a.id);
                            pot_tier = last_result.tier;

                            [line_1, line_2, line_3] = last_result_lines;
                        } else {
                            [line_1, line_2, line_3] = d.data.pot;
                        }

                        Item.idata.meta.cube_meta_data = cube_log_data;
                        Item.idata.meta.cubes_used = data_cubes_used;
                        Item.idata.meta.cubes_total = d.data.data.idata.meta.cubes_total;

                        Item.set_cube(cube_type, pot_tier, {
                            line_0: line_1,
                            line_1: line_2,
                            line_2: line_3
                        }, {
                            write_log_record: false
                        });
            
                        Item.redraw_item_tooltip();

                        _this.dialog("close");
                    };
                }
            }]
        }).dialog("open");

        let cube_line_con = $("#auto_cube_lines");
        $("#cube_select .auto-cube").on("click", function() {
            let _this = $(this);
            let cube_type = _this.attr("data-type");
            
            $(".auto-cube.auto-cube-selected").removeClass("auto-cube-selected");
            $(this).addClass("auto-cube-selected");

            cube_line_con.removeClass("hidden");
            $("#auto_cube_form_main,#auto_cube_form_bonus").addClass("hidden");
            $("#auto_cube_form_" + cube_type).removeClass("hidden");
        });

        $("#option_box .auto-select-cube-type").on("change", function() {
            let _this = $(this);
            let type = _this.attr("data-type");
            let pot_tier = _this.val();

            let tier_html = cube_pot_dropdown_html(Item.idata, type, pot_tier, {
                wildcard: true
            });
        
            $("#auto_cube_line_con_" + type).html(tier_html);

            $(".select-cube-line-" + type).select2();
        });
    });

    $("#reverse_flame_check").on("click", function() {
        let b = Item.reverse_flame_lookup();
        
        let html = '';
        for (let a in b) {
            let val = b[a];

            if (val == 0) continue;

            html += `
                <tr>
                    <td>${a}</td>
                    <td>${val}</td>
                <tr>
            `;
        }

        let no_flame = false;
        let table = "";

        if (html === "") {
            no_flame = true;
            table = "Item has no flames or the flames applied do not correspond to any tiers.";
        } else {
            table = `
                <table id="flame_stat_table" style="width:100%">
                    <thead>
                        <tr>
                            <th>Flame Stat</th>
                            <th>Tier</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${html}
                    </tbody>
                </table>
            `;
        }

        optionbox.html(table).dialog({
            title: "Tiers",
            width: no_flame ? 600 : 200,
            height: "auto",
            buttons: [{
                text: "Close",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        return false;
    });

    let generate_star_force_log_rows = function(this_log) {
        let t_body = "";
        let prn_hidden = $("#cb_show_prn").prop("checked")
        if (this_log.length > 0) {
            for (let i = 0; i < this_log.length; ++i) {
                let _tl = this_log[i];

                let prn_map = _tl.prn_map;

                let prn_map_html = "";

                let sortable_prn = [];

                for (let j in prn_map) {
                    let j_map = prn_map[j];

                    for (let k = 0; k < j_map.length; ++k) {
                        let k_map = j_map[k];
                        sortable_prn.push({type: j, data: k_map});
                    }
                }

                sortable_prn.sort(function(a,b) {return a.data[0] > b.data[0] ? 1 : -1;});

                for (let i = 0; i < sortable_prn.length; ++i) {
                    let sp = sortable_prn[i];

                    let j = sp.type;
                    let map = sp.data;
                    let j2 = j;

                    if (j2 === "sc_success") {
                        j2 = "success";
                    }

                    prn_map_html += `
                        <span class="result-${j2}${j2 === "destroy" ? "2" : ""} r-${j}" style="display:inline-block;width:100px;">
                            ${_tl.prn >= map[0] && _tl.prn < map[1] ? ">" : ""}${j}:
                        </span> 
                        ${map[0].toFixed(5)} - ${map[1].toFixed(5)} <br>
                    `;
                }

                let result = "";
                let this_result = _tl.result;
                let result_type = "";

                switch (this_result) {
                    case "success":
                        result = "Success!";
                        result_type = "result-success";
                        break;
                    case "fail":
                        result = "Failed";
                        result_type = "result-fail";
                        break;
                    case "chance_time_success":
                        result = "Success! (Chance Time)";
                        result_type = "result-success";
                        break;
                    case "sc_fail":
                        result = "Failed (Star Catch)";
                        result_type = "result-fail";
                        break;
                    case "sc_success":
                        result = "Success! (Star Catch)";
                        result_type = "result-success r-sc_success";
                        break;
                    case "destroy":
                        result = "Destroyed!";
                        result_type = "result-destroy-text";
                        break;
                    case "fail-safeguard":
                        result = "Safeguard!";
                        result_type = "result-destroy-text";
                        break;
                }

                let is_destroyed = ["destroy", "fail-safeguard"].includes(this_result);

                let bgColor = "none";
                let color = "black";
                switch (_tl.star) {
                    case 22:
                        bgColor = "#0070dd";
                        color = "white";
                        break;
                    case 23:
                        bgColor = "#a335ee";
                        color = "white";
                        break;
                    case 24:
                        bgColor = "#ff8000";
                        color = "white";
                        break;
                    case 25:
                        bgColor = "#00f70a";
                        color = "white";
                        break;
                }

                t_body += `
                    <tr>
                        <td>${_tl.id}</td>
                        <td style="background-color:${bgColor};color:${color}">${_tl.star}</td>
                        <td ${is_destroyed ? 'class="result-destroy"' : ""}>
                            <span class="${result_type}">${result}</span>
                        </td>
                        <td>
                            ${_tl.star >= 11 && _tl.star < 18 ?
                                _tl.is_safeguard ? "Yes" : "No"
                                :
                                ""
                            }
                        </td>
                        <td>${_tl.sf_cost.toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.03"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.05"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.1"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.3"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.03,0.3"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.05,0.3"].toNumber()}</td>
                        <td>${_tl.sf_cost_discount["0.1,0.3"].toNumber()}</td>
                        <td class="prn_number ${prn_hidden ? "" : "hidden"} ${is_destroyed ? "result-destroy" : ""}" style="white-space:nowrap">
                            <span class="${result_type}">${_tl.prn}</span>
                        </td>
                        <td class="prn_map ${prn_hidden ? "" : "hidden"} style="text-align:left">
                            ${prn_map_html}
                        </td>
                    </tr>
                `;
            }
        } else {
            t_body = `
                <tr>
                    <td colspan="15" style="text-align:center;">
                        No starforce data found.    
                    </td>
                </tr>
            `;
        }

        return t_body;
    }

    //log shows a set amount at a time to prevent long loading times
    let sf_log_default = {
        start: 0,
        end: 100
    };
    let sf_log_start = sf_log_default.start;
    let sf_log_end = sf_log_default.end;
    let sf_log_step = 100;
    //show starforce log table
    $("#starforce_log").on("click", function(){        
        sf_log_start = sf_log_default.start;
        sf_log_end = sf_log_default.end;

        let this_log = Item.idata.meta.sf_meta_data.slice(sf_log_start, sf_log_end);

        let t_body = generate_star_force_log_rows(this_log);

        let html = `
            <div style="max-height:800px">
                <label for="cb_show_prn">
                    <input type="checkbox" id="cb_show_prn"> Show PRNG info   
                </label>
                |
                <label for="cb_show_add_stats">
                    <input type="checkbox" id="cb_show_add_stats"> Show star force stats
                </label>
                <div id="con_sf_add_stats" style="font-size:11px">
                </div>
                <hr>
                <table style="width:100%;font-size:11px;" id="star_force_log">
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Star</th>
                            <th>Result</th>
                            <th>Safeguard</th>
                            <th>Cost</th>
                            <th>Cost, Silver MVP</th>
                            <th>Cost, Gold MVP</th>
                            <th>Cost, Diamond MVP</th>
                            <th>Cost, 30% Off Event</th>
                            <th>Cost, 30% + Silver MVP</th>
                            <th>Cost, 30% + Gold MVP</th>
                            <th>Cost, 30% + Diamond MVP</th>
                            <th class="prn_number hidden">PRN</th>
                            <th class="prn_map hidden">PRN Map</th>
                        </tr>
                    </thead>
                    <tbody id="star_force_log_body">
                        ${t_body}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="20">
                                <button id="star_force_log_show_more" style="width:100%">Show ${sf_log_step} More</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        optionbox.html(html).dialog({
            title: "Starforce Log",
            width: "100%",
            height: "auto",
            buttons: [{
                text: "Close",
                click: function() {
                    optionbox.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        let sf_log_body = $("#star_force_log_body");
        //bind show more button to show more star force log records
        $("#star_force_log_show_more").on("click", function() {
            sf_log_start += sf_log_start + sf_log_step;
            sf_log_end += sf_log_end + sf_log_step;

            let this_log = Item.idata.meta.sf_meta_data.slice(sf_log_start, sf_log_end);

            if (this_log.length === 0) {
                return false;
            }

            let t_body = generate_star_force_log_rows(this_log);

            sf_log_body.append(t_body);
        });

        return false;
    });

    //toggle prn info in starforce log
    body.on("change", "#cb_show_prn", function(e) {
        let prn_row = $("#star_force_log .prn_number, #star_force_log .prn_map");
        if (e.target.checked) {
            prn_row.removeClass("hidden");
        } else {
            prn_row.addClass("hidden");
        }
    });


    let generate_sf_overall_stats = function(s, title) {
        let tbody = '';

        if (s.length === 0) {
            return '';
        }

        let sg_keys = Object.keys(s.safeguards);

        let sg_booms = [];
        let sg_booms2 = [];

        //for booms, only show stars up to the max star
        if ("booms" in s) {
            sg_booms = Object.keys(s.booms);
            sg_booms2 = sg_booms.splice(0, sg_booms.indexOf("b" + s.highest_star));
        }

        let has_boom = sg_booms.length > 0;
        
        tbody += `
            <tr>
                <td>${s.runs}</td>
                <td>${s.final_star}</td>
                <td>${s.highest_star}</td>
                <td>${s.tot_success}</td>
                <td>${s.tot_fail}</td>
                <td>${s.sc_success}</td>
                <td>${s.sc_fail}</td>
                <td>${s.tot_safeguards}</td>
                ${
                    has_boom ?
                    `<td>${s.tot_booms}</td>`
                    :
                    ""
                }
                <td>
                    <table class="sub-table" style="width:100%;font-size:1em;">
                        <thead>
                            <tr>
                                ${
                                    sg_keys.map((a)=>{
                                        return `
                                            <th>${a.replace("sg", "")}</th>
                                        `;
                                    }).join("")
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            ${
                                sg_keys.map((a)=>{
                                    return `
                                        <td>${s.safeguards[a]}</td>
                                    `;
                                }).join("")
                            }
                            </tr>
                        </tbody>
                    </table>
                </td>
                ${
                    has_boom ?
                    `
                    <td>
                        <table class="sub-table" style="width:100%;font-size:1em;">
                            <thead>
                                <tr>
                                    ${
                                        sg_booms2.map((a)=>{
                                            return `
                                                <th>${a.replace("b", "")}</th>
                                            `;
                                        }).join("")
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                ${
                                    sg_booms2.map((a)=>{
                                        return `
                                            <td>${s.booms[a]}</td>
                                        `;
                                    }).join("")
                                }
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    `  
                    : ""
                }
                <td>
                    <table class="sub-table" style="width:100%;font-size:1em;">
                    <thead>
                        <tr>
                            <th>Normal</th>
                            <th>Silver</th>
                            <th>Gold</th>
                            <th>Diamond</th>
                            <th>30%</th>
                            <th>30%+Silver</th>
                            <th>30%+Gold</th>
                            <th>30%+Diamond</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${s.cost["1.0"].toNumber()}</td>
                            <td>${s.cost["0.03"].toNumber()}</td>
                            <td>${s.cost["0.05"].toNumber()}</td>
                            <td>${s.cost["0.1"].toNumber()}</td>
                            <td>${s.cost["0.3"].toNumber()}</td>
                            <td>${s.cost["0.03,0.3"].toNumber()}</td>
                            <td>${s.cost["0.05,0.3"].toNumber()}</td>
                            <td>${s.cost["0.1,0.3"].toNumber()}</td>
                        </tr>
                    </tbody>
                    </table>
                </td>
            </tr>
        `;

        let table = `
            <table style="width:100%;font-size:1em" class="sf-stat-breakdown">
                <thead>
                    <tr>
                        <th colspan="40" style="text-align:center">
                            <b>${title}</b>
                        </th>
                    </tr>
                    <tr>
                        <th style="width:5%">Runs</th>
                        <th style="width:2%">Final Star</th>
                        <th style="width:2%">Highest Star</th>
                        <th style="width:5%">Total Success</th>
                        <th style="width:5%">Total Fail</th> 
                        <th style="width:3%">Success<br>(Star Catch)</th>
                        <th style="width:3%">Fail<br>(Star Catch)</th>
                        <th style="width:2%">Total Safeguards</th>

                        ${
                            has_boom ? `<th style="width:2%">Total Booms</th>` : ""
                        }

                        <th style="width:10%">Safeguards</th>

                        ${
                            has_boom ? `<th style="width:15%">Booms</th>` : ""
                        }

                        <th style="width:46%">Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>
        `;

        return table;
    };

    //toggle additional stats in starforce log
    body.on("change", "#cb_show_add_stats", function(e) {
        let con_stats = $("#con_sf_add_stats");

        if (e.target.checked) {
            let this_stats = analyze_starforce(Item.idata.meta.sf_meta_data);

            let html = '';

            //overall stats table
            html += generate_sf_overall_stats(this_stats.g, "Overall Star Force Stats");

            let tiL = this_stats.i.length;
            //each individual boom stats
            for (let i = 0; i < this_stats.i.length; ++i) {
                let title = `<span style="color:red">Boom #${(i+1)}</span>`;

                if (i === tiL - 1) {
                    title = `<span style="color:green">Current Item</span>`;
                }

                html += generate_sf_overall_stats(this_stats.i[i], title);
            }

            con_stats.html(html);
            con_stats.removeClass("hidden");
        } else {
            con_stats.addClass("hidden");
        }
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
            of: document
        });

        sfpop.draggable({
            handle: ".sfp-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: document
        });

        sfitem.draggable({
            handle: ".sfi-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: document
        });

        sfsc.draggable({
            handle: ".sfsc-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: document
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
            of: document
        });

        cube_black_main.draggable({
            handle: ".cube-black-main-header",
            containment: "window"
        }).position({
            my: "center",
            at: "center",
            of: document
        });
    };

    initialize();

    window.onresize = function() {
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

        item_create.dialog("option", "position", {my: "center", at: "center", of: window});

        if (item_create_was_hidden) {
            item_create.addClass("hidden");
        }

        cc.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (cube_was_hidden) {
            cc.addClass("hidden");
        }

        bcc.removeClass("hidden").position({
            my: "center",
            at: "center",
            of: sfcon
        });

        if (bcube_was_hidden) {
            bcc.addClass("hidden");
        }
    };

    var isLoading = false;

    sfmain.on("click", ".sf-main.sf-no-item", e=>{
        let _this = $(e.target);
        _this.removeClass("sf-no-item");
        _this.addClass("sf-enchant");
    });

    let begin_starforce_pre = function() {
        //don't do starcatch if it's on chance time
        if (enable_starcatch && !Item.idata.meta.chance_time) {
            begin_star_catch();
            sfpop.addClass("hidden");
        } else {
            begin_starforce(false);
        }
    };

    sfmain.on("click", ".sf-button-enhance", e=>{
        if (Item.idata.meta.stars === Item.idata.meta.max_stars) {
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
            enable_starcatch = true;
        } else {
            sf_starcatch.addClass("checked");
            enable_starcatch = false;
        }
    }); 

    sfmain.on("click", ".sf-safeguard", (e, b = false)=>{
        if (sf_safeguard.hasClass("disabled")) {
            return false;
        }

        if (sf_safeguard.hasClass("checked")) {
            if (!b) {
                sf_safeguard.removeClass("checked");
            }
            enable_safeguard = true;
        } else {
            if (!b) {
                sf_safeguard.addClass("checked");
            }
            enable_safeguard = false;
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

            if (result.includes("success")) {
                sfa.play("EnchantSuccess", {playbackRate: system.animation_speed});
                r_type = "sfi-success";
                sfi_text.filter(".sfi-text-success").removeClass("hidden");
                Item.xgrade_item(0);

                if (event_options.pre10x2 && !Item.idata.superior && Item.idata.meta.stars <= 11) {
                    Item.xgrade_item(0);
                }

                Item.idata.meta.starcatch.count += 1;
            } else if (result.includes("fail")) {
                sfa.play("EnchantFail", {playbackRate: system.animation_speed});
                r_type = "sfi-fail";
                sfi_text.filter(".sfi-text-fail").removeClass("hidden");
                Item.xgrade_item(1);
            } else {
                sfa.play("EnchantDestroyed", {playbackRate: system.animation_speed});
                r_type = "sfi-destroy";
                sfi_info_right.addClass("sf-item-boomed");
                sfi_text.filter(".sfi-text-destroyed").removeClass("hidden");

                Item.xgrade_item(2);
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

    let weapon_init = $("#weapon_init");
    let ddl_item = $("#ddl_item_select");
    let flame_textbox = $(".flame-form");
    let flame_percent = $(".flame-percent");
    let flame_tier = $("#flame_as_tier");
    let scroll_textbox = $(".scroll-form");
    let scroll_type = $("#scroll_type");
    let scroll_type_att = $("#scroll_type_att");
    let scroll_type_box = $("#scroll_type_box");
    let scroll_type_box_att = $("#scroll_type_box_att"); //heart scrolls
    let flame_max_4 = $("#flame_max_4");
    let flame_tier_rec = $("#flame_tier_rec");

    let cube_select_main = $("#cube_select_main");
    let cube_select_bonus = $("#cube_select_bonus");

    var init_item = function() {
        scroll_options = [];
        item_create.dialog({
            closeOnEscape: false,
            open: function(event, ui) {
                $(this).parent().children().children('.ui-dialog-titlebar-close').hide();
            },
            modal: true,
            height: $(window).height() * 0.6,
            width: 700,
            title: "Maplestory Item Simulator",
            buttons: [{
                text: "Create",
                click: function() {
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

                    //set cube stuff
                    let cube_main_pot = cube_select_main.val();
                    if (cube_main_pot !== "") {
                        let cube_main_pot_stats = {
                            line_0: $("#cube_stat_line_main_1").val(),
                            line_1: $("#cube_stat_line_main_2").val(),
                            line_2: $("#cube_stat_line_main_3").val()
                        };

                        Item.set_cube("main", cube_main_pot, cube_main_pot_stats);
                    }

                    Item.set_meta_options({
                        nebulite_compensation: $("#item_neb_comp").prop("checked")
                    });

                    let cube_bonus_pot = cube_select_bonus.val();
                    if (cube_bonus_pot !== "") {
                        let cube_bonus_pot_stats = {
                            line_0: $("#cube_stat_line_bonus_1").val(),
                            line_1: $("#cube_stat_line_bonus_2").val(),
                            line_2: $("#cube_stat_line_bonus_3").val()
                        };

                        Item.set_cube("bonus", cube_bonus_pot, cube_bonus_pot_stats);
                    }

                    Item.set_meta_options({
                        nebulite_compensation: $("#item_neb_comp").prop("checked")
                    });

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

                itemsHtml += `<option disabled>${i_key.replace(/_/gi," ").toUpperCase()}</option>`;
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
            
            ddl_item.select2({
                width: 400,
                templateResult: function(a) {
                    if (a.id === undefined || !a.id.includes(";")) return a.text;

                    let item_type = a.id.split(";");
                    let this_item = items_store[item_type[0]][item_type[1]];

                    return $(`
                        <span>
                            <span class="${this_item.img}" style="display:inline-block;width:30px;height:30px;"></span> ${a.text}
                        </span>
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

                //if the item does not have a primary stat, then show the dropdown to choose the stat
                if (this_item.mstat === "" && this_item.type !== "mechanical heart") {
                    scroll_type_box.removeClass("hidden");
                } else {
                    scroll_type_box.addClass("hidden");
                }

                if (this_item.type === "mechanical heart") {
                    scroll_type_box_att.removeClass("hidden");
                } else {
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
                } else {
                    item_flame_container.removeClass("hidden");
                }

                flame_box.addClass("hidden");
                scroll_box.addClass("hidden");

                //show weapon/armor-related flames
                if (this_item.class === "weapon") {
                    all_box.filter(function() {
                        return $(this).hasClass("item-weapon");
                    }).removeClass("hidden");
                } else if (this_item.class === "armor") {
                    all_box.filter(function() {
                        return $(this).hasClass("item-armor");
                    }).removeClass("hidden");
                }

                if (item_type[0] === "gollux") {
                    scroll_box.filter(function() {
                        return $(this).hasClass("item-gollux");
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

    var cube_pot_dropdown_html = function(this_item, type, pot_tier, o) {
        o = Object.assign({
            wildcard: false
        }, o);

        //get item type, with sub class taking priority (copied from cube.js)
        let item_type = this_item.sub_class;

        if (this_item.class == "weapon") {
            item_type = this_item.class;
        } else if (item_type === "") {
            item_type = this_item.type;
        } 

        item_type = item_type.replace(/\s/gi, "_");

        //get the stats available for the main/bonus pot by its tier and item type
        let stats = cube.pot_stats[type][item_type][pot_tier];

        let tier_html = "";

        //generate dropdowns for each line with the available stats
        let idx = 0;
        for (let i in stats) {
            ++idx;

            //remove duplicates from the stat options
            let _s = stats[i];

            let stat_options = _s.map(function(a) {
                let sid = a[0];
                let _st = cube.stat_upgrade(this_item.level,sid); //line stat verbiage

                return `
                    <option value="${sid}">${_st}</option>
                `;
            });

            if (o.wildcard) {
                stat_options.push(`
                <option value="-1">&lt;Any Line&gt;</option>
                `);
            }

            tier_html += `
                <div class="pot-stat-con" style="padding:5px">
                    <span class="pot-stat-line">Line ${idx}:</span>
                    <select id="cube_stat_line_${type}_${idx}" class="select-cube-line-${type}" data-id="${idx}">
                        ${stat_options.join("")}
                    </select>
                </div>
            `;
        }

        return tier_html;
    };

    //select a potential tier for main/bonus to display the lines and their stats to choose from
    $(".select-cube-type").on("change", function() {
        let _this = $(this);
        let type = _this.attr("data-type");

        let pot_tier = _this.val();

        let _item = ddl_item.val().split(";");
        let this_item = items_store[_item[0]][_item[1]];

        //get item type, with sub class taking priority (copied from cube.js)
        let item_type = this_item.sub_class;

        if (this_item.class == "weapon") {
            item_type = this_item.class;
        } else if (item_type === "") {
            item_type = this_item.type;
        } 

        item_type = item_type.replace(/\s/gi, "_");

        //get the stats available for the main/bonus pot by its tier and item type
        let stats = cube.pot_stats[type][item_type][pot_tier];

        let tier_html = "";

        //generate dropdowns for each line with the available stats
        let idx = 0;
        for (let i in stats) {
            ++idx;

            //remove duplicates from the stat options
            let _s = stats[i];

            tier_html += `
                <div class="pot-stat-con" style="padding:5px">
                    <span class="pot-stat-line">Line ${idx}:</span>
                    <select id="cube_stat_line_${type}_${idx}" class="select-cube-line-${type}" data-id="${idx}">
                        ${
                            _s.map(function(a) {
                                let sid = a[0];
                                let _st = cube.stat_upgrade(this_item.level,sid); //line stat verbiage

                                return `
                                    <option value="${sid}">${_st}</option>
                                `;
                            }).join("")
                        }
                    </select>
                </div>
            `;
        }

        $("#cube_line_con_" + type).html(tier_html);

        $(".select-cube-line-" + type).select2();
    });

    init_item(); //start here
});