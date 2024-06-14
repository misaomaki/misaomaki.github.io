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
    var enable_starcatch = !$(".sf-starcatch.sf-checkbox").hasClass("checked");

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
                        GLOBAL.starforce.safeguardable_stars.map((a,b)=>{
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
            <div class="form-group hidden">
                <div class="form-label-group">
                    <span class="form-label">
                        Budget:
                    </span>
                    <hr>
                    <span style="display: inline-block; padding: 5px;">
                        Stop the starforcing if it exceeds the meso budget or number of spare items.
                    </span>
                    <span style="display: inline-block; padding: 5px;">
                        I have <input type="number" id="asf_budget_items" style="width:50px" min="-1" value="-1"> item(s) and 
                        <input type="number" id="asf_budget_mesos" min="-1" value="-1"> mesos.
                        <span style="display:inline-block;padding:5px;font-size:0.6em">-1 for no limit.</span>
                    </span>
                </div>
                <span id="h_update"></span>
            </div>
        `;

        let w_sf = {terminate:()=>{}}; //starforce worker
        optionbox.html(html).dialog({
            title: "Auto Star Force",
            width: 1000,
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
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

                    let starcatch_val = $("#asf_starcatch").val();
                    let starcatch = [];

                    if (starcatch_val !== '') {
                        let starcatch_a = starcatch_val.split(",");

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
                        sfa.play("EnchantSuccess", {playbackRate: 1});
                        optionbox.dialog("close");

                        if (system.auto_open_log) {
                            $("#starforce_log").trigger("click");
                        }
                    };
                }
            }]
        }).dialog("open");

        $("#asf_cb_all").on("click", function(e) {
            $("#option_box .asf_checkbox").prop("checked", e.target.checked);
        });
    });

    //auto cube
    //TODO: move to own file
    $("#auto_cube").on("click", async function() {
        let user_cube_option = cube.user[Item.idata.name] ?? {
            selected_cube: "none",
            cube_type: "none",
            selected_pot: "none",
            cube_selected: {
                line_0: 0,
                line_1: 0,
                line_2: 0
            }
        };

        let cube_lines = await cube.cube_line_as_int_stats;
        
        let html = `
            <b>Automatically cube to the desired lines. This will generate cube log data.</b>
            <hr>
            <div class="form-group">
                <label class="form-label-group">
                    <span class="form-label">
                        Select Cube
                    </span>
                    <div class="cube-selection" id="cube_select">
                        <div class="cube auto-cube cube-occult maple-button ${ user_cube_option.selected_cube == "occult" ? "auto-cube-selected" : ""}" data-id="occult" data-type="main" style="position:relative;top:3px;left:3px"></div>
                        <div class="cube auto-cube cube-bonus-occult maple-button ${ user_cube_option.selected_cube == "bonus_occult" ? "auto-cube-selected" : ""}" data-id="bonus_occult" data-type="bonus" style="position:relative;top:3px;left:3px"></div>
                        <div class="cube auto-cube cube-master maple-button ${ user_cube_option.selected_cube == "master" ? "auto-cube-selected" : ""}" data-id="master" data-type="main"></div>
                        <div class="cube auto-cube cube-meister maple-button ${ user_cube_option.selected_cube == "meister" ? "auto-cube-selected" : ""}" data-id="meister" data-type="main"></div>
                        <div class="cube auto-cube cube-red maple-button ${ user_cube_option.selected_cube == "red" ? "auto-cube-selected" : ""}" data-id="red" data-type="main"></div>
                        <div class="cube auto-cube cube-black maple-button ${ user_cube_option.selected_cube == "black" ? "auto-cube-selected" : ""}" data-id="black" data-type="main"></div>
                        <div class="cube auto-cube cube-bonus maple-button ${ user_cube_option.selected_cube == "bonus" ? "auto-cube-selected" : ""}" data-id="bonus" data-type="bonus"></div>
                        <div class="cube auto-cube cube-white maple-button ${ user_cube_option.selected_cube == "white" ? "auto-cube-selected" : ""}" data-id="white" data-type="bonus"></div>
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
                            <select id="auto_cube_select_main" class="auto_cube_select auto-select-cube-type" data-type="main">
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
                            <select id="auto_cube_select_bonus" class="auto_cube_select auto-select-cube-type" data-type="bonus">
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
                <div>
                    <input type="checkbox" id="auto_cube_gt" checked> 
                    <label for="auto_cube_gt">
                        Get stats greater than or equal to desired lines 
                        <span title="Return lines with value greater than or equal to desired values for the following stats:\r\n${cube_lines.join("\r\n")}">[?]</span>
                    </label>
                </div>
            </div>
            <span id="cube_msg2" class="hidden">
                <span style="color:blue;display:block;padding-bottom:15px;">
                    Estimated cubes to use (based on line probability for the specific line): <span id="cube_expected">1</span>
                    <span style="font-size:0.6em;display:block;">Excludes cubes needed to get to desired tier. Probability is based on lines selected in exact order (number of cubes can be less due to permutations of the lines which is not accounted for).</span>
                </span>
            </span>
            <span id="cube_msg" style="color:red"></span>
        `;

        let w_c = {terminate:()=>{}}; //worker
        optionbox.html(html).dialog({
            title: "Auto Cube",
            width: 1000,
            modal: true,
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
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
                    let cube_name = c_cube.attr("data-id");

                    let line_1 = $("#cube_stat_line_" + cube_name + "_1").val();
                    let line_2 = $("#cube_stat_line_" + cube_name + "_2").val();
                    let line_3 = $("#cube_stat_line_" + cube_name + "_3").val();

                    let pot_tier = $("#option_box #auto_cube_select_" + cube_type).val();

                    if (line_1 == null || line_2 == null || line_3 == null) {
                        alert("Error: Must select a cube and potential lines.");

                        btn.prop("disabled", false);
                        btn.html("Begin Cubing");
                        return false;
                    }

                    let lines = [line_1, line_2, line_3];

                    let data = {
                        item: Item,
                        cube_lines: lines,
                        cube_type: cube_type,
                        cube: cube_name,
                        pot_tier: pot_tier,
                        allow_gt: $("#auto_cube_gt").prop("checked")
                    };
            
                    //post data to worker to calculate cubes
                    w_c = new Worker("./starforce/worker_cube.js");   
            
                    w_c.postMessage(data);
                    
                    let cube_msg = $("#cube_msg");

                    /* reset user cube option and store the lines */
                    cube.user[Item.idata.name] = {
                        selected_cube: cube_name,
                        cube_type: cube_type,
                        selected_pot: pot_tier,
                        selected_lines: {
                            line_0: line_1,
                            line_1: line_2,
                            line_2: line_3
                        }
                    };

                    w_c.onmessage = async function(d) {
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

                        await Item.set_cube(cube_name, pot_tier, {
                            line_0: line_1,
                            line_1: line_2,
                            line_2: line_3
                        }, {
                            write_log_record: false,
                            force_keep: true
                        });

                        cube.update_cube_menu.call(Item, $("#cube_menu"));
                        Item.redraw_item_tooltip();
                        sfa.play("_CubeEnchantSuccess");

                        _this.dialog("close");

                        if (system.auto_open_log) {
                            $("#cube_log").trigger("click");
                        }
                    };
                }
            }]
        }).dialog("open");

        cube.update_cube_menu.call(Item, $("#cube_select"));

        let cube_line_con = $("#auto_cube_lines");
        /* change the cube type */
        $("#cube_select .auto-cube").on("click", function() {
            let _this = $(this);
            if (_this.hasClass("disabled")) return false;
            let type = _this.attr("data-type");
            let cube_type = _this.attr("data-id");

            let ddl_options = cube.get_dropdown_option(cube_type);
            
            $(".auto-cube.auto-cube-selected").removeClass("auto-cube-selected");
            $(this).addClass("auto-cube-selected");

            cube_line_con.removeClass("hidden");
            $("#auto_cube_form_main,#auto_cube_form_bonus").addClass("hidden");
            $("#auto_cube_form_" + type).removeClass("hidden");

            $(`#auto_cube_select_${type}`).html(ddl_options);
            
            cube_msg2.addClass("hidden");
            $(`#auto_cube_line_con_${type}`).addClass("hidden");
        });

        let cube_msg2 = $("#cube_msg2");
        let cube_expected = $("#cube_expected");
        /* change the potential tier for cube */
        $("#option_box .auto-select-cube-type").on("change", async function() {
            let _this = $(this);
            let type = _this.attr("data-type");
            let cube_type = $("#cube_select .auto-cube.auto-cube-selected").attr("data-id");
            let pot_tier = _this.val();
            
            cube_msg2.removeClass("hidden");
            cube_expected.html(1); /* changing tier sets cube lines back to any, so probability is always 1 */

            let tier_html = await cube_pot_dropdown_html(Item.idata, cube_type, pot_tier, {
                wildcard: true
            });
        
            $("#auto_cube_line_con_" + type).html(tier_html);
            
            var cube_select = $(".select-cube-line-" + cube_type).select2();
            $(`#auto_cube_line_con_${type}`).removeClass("hidden");
            /* calculate probabilities based on lines chosen */
            cube_select.on("select2:select", async function(e) {
                let c_cube = $("#cube_select .auto-cube-selected");
                let cube_type = c_cube.attr("data-type");
                let cube_name = c_cube.attr("data-id");

                let line_1 = $("#cube_stat_line_" + cube_name + "_1").val();
                let line_2 = $("#cube_stat_line_" + cube_name + "_2").val();
                let line_3 = $("#cube_stat_line_" + cube_name + "_3").val();
                let lines = [line_1, line_2, line_3];

                /* estimated cubes to use to desired lines */
                let expected_cubes = parseInt(1 / await cube.stats.get_probability.call(Item, lines, cube_name, pot_tier)).toNumber();
                cube_expected.html(expected_cubes);
            });
        });

        /* if user options are present, init them */
        if (user_cube_option.selected_cube != "none") {
            /* select the cube */
            $("#cube_select .auto-cube-selected").trigger("click"); 

            /* select the potential */
            $("#auto_cube_lines .auto_cube_select:visible").val(user_cube_option.selected_pot).trigger("change");
        
            /* select the lines */
            setTimeout(()=>{
                $(`#cube_stat_line_${user_cube_option.selected_cube}_1`).val(user_cube_option.selected_lines.line_0).trigger("change");
                $(`#cube_stat_line_${user_cube_option.selected_cube}_2`).val(user_cube_option.selected_lines.line_1).trigger("change");
                let s3 = $(`#cube_stat_line_${user_cube_option.selected_cube}_3`).val(user_cube_option.selected_lines.line_2).trigger("change");
                s3.trigger({type: "select2:select"}); /* update probability */
            },0);
        }
    });

    $("#reverse_flame_check").on("click", function() {
        let b = Item.reverse_flame_lookup();
        let score = Item.get_flame_score();
        
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
                <br><br>
                ${score !== -1 ? `
                Your flame score is:<br> ${score}
                ` : ""}
                
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

                    let row_selected = _tl.prn >= map[0] && _tl.prn < map[1];

                    prn_map_html += `
                        <span style="display:inline-block;width:100%" class="${row_selected ? 'highlight-row' : ''}">
                            <span class="result-${j2}${j2 === "destroy" ? "2" : ""} r-${j}" style="display:inline-block;width:100px;text-align:left;">
                                ${j}:
                            </span> 
                            ${map[0].toFixed(5)} - ${map[1].toFixed(5)} 
                        </span>
                        <br>
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
                            ${_tl.star >= GLOBAL.starforce.safeguard_stars.min && _tl.star <= GLOBAL.starforce.safeguard_stars.max ?
                                _tl.is_safeguard ? "Yes" : "No"
                                :
                                ""
                            }
                        </td>
                        <td>${_tl.sf_cost.toNumber()}</td>
                        ${
                            Item.idata.shadowknight ? `
                                <td>${_tl.sk_cost.toNumber()}</td>
                            ` : ""
                        }
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
                    <td colspan="16" style="text-align:center;">
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
                    <input type="checkbox" id="cb_show_add_stats"> Show Starforce Summary
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
                            ${
                                Item.idata.shadowknight ? `
                                    <th title="Shadowknight Coins">SK Coins</th>
                                ` : ""
                            }
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
                                <class id="infinite_scroller_down">
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
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
            buttons: [{
                text: "Close",
                click: function() {
                    optionbox.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        let sf_log_body = $("#star_force_log_body");

        let sf_log_show_more = function(direction) {
            let this_step = sf_log_step * direction;

            sf_log_start += sf_log_start + this_step;
            sf_log_end += sf_log_end + this_step;

            let this_log = Item.idata.meta.sf_meta_data.slice(sf_log_start, sf_log_end);

            if (this_log.length === 0) {
                return false;
            }

            let t_body = generate_star_force_log_rows(this_log);

            sf_log_body.append(t_body);
        }

        /* infinite scroller */
        let scroller = new IntersectionObserver((e)=>{
            if (e[0].intersectionRatio <= 0) return;

            sf_log_show_more(1);
        });
        let scroll_watcher = document.querySelector("#infinite_scroller_down");

        scroller.observe(scroll_watcher);

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
            sg_booms2 = sg_booms.splice(0, sg_booms.indexOf("b" + s.highest_star) + 1);
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
                ${
                    Item.idata.shadowknight ? `
                        <td>${s.sk_cost.toNumber()}</td>
                    ` : ""
                }
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
                        <th style="width:4%">Total Success</th>
                        <th style="width:4%">Total Fail</th> 
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
                        ${
                            Item.idata.shadowknight ? `
                                <th title="Shadowknight Coins" style="width:2%">Total SK Coins</th>
                            ` : ""
                        }
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
            if (!con_stats.hasClass("data-loaded")) {
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
            }
            con_stats.addClass("data-loaded").removeClass("hidden");
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
    }).observe(document.body);

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
            } else if (result.includes("fail")) {
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