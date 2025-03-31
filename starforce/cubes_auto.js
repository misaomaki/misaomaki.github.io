$(function() {
    const optionbox = $("#option_box"); 

//#region AUTO CUBE
    $("#auto_cube").on("click", async function() {
        let user_cube_option = user_settings.cube[Item.idata.name] ?? {
            selected_cube: "none",
            cube_type: "none",
            selected_pot: "none",
            cube_selected: {
                line_0: 0,
                line_1: 0,
                line_2: 0,
                line_3: 0,
                line_4: 0,
                line_5: 0
            }
        };

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
                        <div class="cube auto-cube cube-violet maple-button ${ user_cube_option.selected_cube == "violet" ? "auto-cube-selected" : ""}" data-id="violet" data-type="main" style="top:-3px;position: relative;"></div>
                        <div class="cube auto-cube cube-equality maple-button ${ user_cube_option.selected_cube == "equality" ? "auto-cube-selected" : ""}" data-id="equality" data-type="main"></div>
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
            </div>
            <span id="cube_msg2" class="hidden">
                <span style="color:blue;display:block;padding-bottom:15px;">
                    Estimated cubes to use (binomial probablity): <span id="cube_expected">1</span>
                    <span style="font-size:0.6em;display:block;">
                        Excludes cubes needed to get to desired tier.
                        <div id="autoCubeMsgViolet" class="hidden">
                            <div class="cube cube-violet" data-id="violet" style="width:20px;height:20px;"></div>
                            <span style="position:relative;top:-6px;">
                                Select up to 3 lines to view the probability of the item getting those lines. 
                                Selecting more lines will give you probability of those lines appearing among the 6 lines for the violet cubing process.
                            </span>
                        </div>
                    </span>
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
                    let line_4 = $("#cube_stat_line_" + cube_name + "_4").val();
                    let line_5 = $("#cube_stat_line_" + cube_name + "_5").val();
                    let line_6 = $("#cube_stat_line_" + cube_name + "_6").val();

                    let pot_tier = $("#option_box #auto_cube_select_" + cube_type).val();

                    if (line_1 == null || line_2 == null || line_3 == null) {
                        alert("Error: Must select a cube and potential lines.");

                        btn.prop("disabled", false);
                        btn.html("Begin Cubing");
                        return false;
                    }

                    let lines = $("#auto_cube_lines .cube-selector-auto:visible").map(function(){ return $(this).val()}).get();

                    let data = {
                        item: Item,
                        cube_lines: lines,
                        cube_type: cube_type,
                        cube: cube_name,
                        pot_tier: pot_tier,
                        stat_restriction_map: cube.stat_restriction_map,
                        cube_line_stats: cube.cube_line_stats
                    };
            
                    //post data to worker to calculate cubes
                    w_c = new Worker("./starforce/worker_cube.js");   
            
                    w_c.postMessage(data);
                    
                    let cube_msg = $("#cube_msg");

                    /* reset user cube option and store the lines */
                    user_settings.cube[Item.idata.name] = {
                        selected_cube: cube_name,
                        cube_type: cube_type,
                        selected_pot: pot_tier,
                        selected_lines: {
                            line_0: line_1,
                            line_1: line_2,
                            line_2: line_3,
                            line_3: line_4,
                            line_4: line_5,
                            line_5: line_6
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
                        
                        Item = new item(d.data.data.idata); 

                        //if item tier passed the desired tier, then exit and return the latest cube lines
                        if (d.data.code === 2) {
                            alert(d.data.message);
                        } 

                        /* if violet cube, we open up the violet cube ui instead with the items for them to select */
                        if (d.data.cube === "violet") {             
                            _this.dialog("close");
                            $("#cube_menu .cube[data-id=violet]").trigger("click", {
                                process_as: "worker_violet"
                            });
                            return;
                        }

                        cube.update_cube_menu.call(Item, $("#cube_menu"));
                        Item.redraw_item_tooltip(["cube"]);
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

            if (cube_type === "violet") {
                $("#autoCubeMsgViolet").removeClass("hidden");
            } else {
                $("#autoCubeMsgViolet").addClass("hidden");
            }
        });

        let cube_msg2 = $("#cube_msg2");
        let cube_expected = $("#cube_expected");
        /* change the potential tier for cube */
        $("#option_box .auto-select-cube-type").on("change", async function() {
            let _this = $(this);
            let type = _this.attr("data-type");
            let cube_type = $("#cube_select .auto-cube.auto-cube-selected").attr("data-id");
            let pot_tier = _this.val();

            const lineCon = $("#auto_cube_line_con_" + type);

            cube_msg2.removeClass("hidden");
            cube_expected.html(1); /* changing tier sets cube lines back to any, so probability is always 1 */

            if (pot_tier === "") {
                lineCon.html("");
                return;
            }
            let tier_html = await cube_pot_dropdown_html(Item.idata, cube_type, pot_tier, {
                wildcard: true
            });
        
            lineCon.html(tier_html);
            
            var cube_select = $(".select-cube-line-" + cube_type).select2();
            lineCon.removeClass("hidden");
            /* calculate probabilities based on lines chosen */
            cube_select.on("select2:select", async function(e) {
                let c_cube = $("#cube_select .auto-cube-selected");
                let cube_type = c_cube.attr("data-type");
                let cube_name = c_cube.attr("data-id");

                let lines = $("#auto_cube_lines .cube-selector-auto:visible").map(function(){ return $(this).val()}).get();

                /* estimated cubes to use to desired lines */
                let expected_cubes = parseInt(1 / await cube.stats.calculateProbability.call(Item, cube_name, pot_tier, lines)).toNumber();
                
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
                let selectedLines = Object.keys(user_cube_option.selected_lines);
                let s = {};
                for (let i = 0; i < selectedLines.length; ++i) {
                    let option = user_cube_option.selected_lines[`line_${i}`];

                    if (option == null) break;

                    s = $(`#cube_stat_line_${user_cube_option.selected_cube}_${i+1}`).val(option).trigger("change");
                }

                if (s instanceof jQuery) {
                    s.trigger({type: "select2:select"}); /* update probability */
                }
            },0);
        }
    });
//#endregion

//#region CUBE LOG
    function get_lucky(arr) {
        const countMap = {};

        // Iterate through the array of objects
        for (let obj of arr) {
            const id = obj.id;
            
            // If the id is "All Stats", treat it as STR, DEX, INT, or LUK
            if (id === "All Stats") {
                // Add counts for STR, DEX, INT, LUK
                ["STR", "DEX", "INT", "LUK"].forEach(validId => {
                    countMap[validId] = (countMap[validId] || 0) + 1;
                });
            } else {
                // Regular id, increment count
                countMap[id] = (countMap[id] || 0) + 1;
            }

            // Check if we have 3 same ids
            if (countMap[id] === 3) {
                return id;
            }
        }
        
        // If no ids with count 3 found
        return null;
    }

    
    function mapToDisplayHtml(a, cb) {
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

            let selected_main_idx = [0,1,2];
            
            //check to see which is the main pot and bonus pot since the log logs the current main and bpot
            if (_i_cd.type === "main") {
                i_cd = _i_cd;
                i_cd_b = i_cd_other;
                i_results = _i_cd.results.result;

                //violet cube usage if exists
                if ("selected_idx" in _i_cd) {
                    selected_main_idx = _i_cd.selected_idx;

                    i_results = selected_main_idx.map((a)=>{
                        return _i_cd.results.result[a];
                    });
                }
                
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
                let cube_line_ids = [];
                
                for (let i = 0; i < i_results.length; ++i) {
                    let cube_item_ident =  cube.cube_line_stats[i_results[i].id]?.ident;

                    if (cube_item_ident == undefined) break;

                    cube_line_ids.push({id: cube_item_ident});
                }

                if (cube_line_ids.length === 3) {
                    lucky3 = get_lucky(cube_line_ids);
                }
            }

            if (i_cd_b.type !== "") {
                //bpot
                let cube_line_ids = [];
                
                for (let i = 0; i < i_results_b.length; ++i) {
                    let cube_item_ident =  cube.cube_line_stats[i_results_b[i].id]?.ident;

                    if (cube_item_ident == undefined) break;

                    cube_line_ids.push({id: cube_item_ident});
                }

                if (cube_line_ids.length === 3) {
                    luckyb3 = get_lucky(cube_line_ids);
                }
            }

            let keep_status = "";

            if (_i_cd.cube === "black" || _i_cd.cube === "white") {
                if (_i_cd.keep) {
                    keep_status = `<span style="color:green">After</span>`;
                } else {
                    keep_status = `<span style="color:red">Before</span>`;
                }
            } else if (_i_cd.cube === "uni") {
                if (_i_cd.unicube_proceed) {
                    keep_status = `<span style="color:green">Proceeded, #${_i_cd.unicube_this_line+1}</span>`;
                } else {
                    keep_status = `<span style="color:red">Skipped, #${_i_cd.unicube_this_line+1}</span>`;
                }
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
                        ${keep_status}
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

        /* sort cube usage by cubes used descending */
        let cubeEntries = Object.entries(Item.idata.meta.cubes_used).sort((a, b) => b[1] - a[1]);

        cube_type_html += cubeEntries.reduce((a, [cube_type, cubes_used])=>{
            a += `
                <div class="cube-used">
                    <div class="cube cube-${cube_type} cube-small"></div> <span class="cube-used-count">${cubes_used}</span>
                </div>
            `;

            return a;
        }, "");

        let t_body = "";
        if (cube_data.length === 0) {
            t_body = `
                <tr>
                    <td colspan="100%" style="text-align:center">No Records Found</td>
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
                            <th>Status</th>
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
                    <tbody id="cube_body">
                        ${t_body}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="20">
                                <span id="infinite_scroller_down">
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr>
        `;

        let option_box = $("#option_box");
        let option_box2 = $("#option_sub_box");

        option_box.html(html).dialog({
            position: {my: "center", at: "top center", of: window},
            title: "Cube Log",
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
            width: "100%",
            height: 850,
            buttons: [{
                text: "Close",
                click: function() {
                    option_box.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        let cube_log_table = $("#cube_log_table");
        let cube_log_prng = $("#cube_log_prng");
        let cube_body = $("#cube_body");

        //show x rows at a time. hitting the show more will load x more rows. we start with showing x rows, so that is offset from the total at the start
        let at_a_time = 100;
        let current_shown = at_a_time;
        let cdl = cube_data.length;
        let cube_log_show_more = function() {
            if (current_shown > cdl) return false;

            let start_index = current_shown;
            current_shown += at_a_time;

            if (current_shown > cdl) {
                current_shown = cdl;
            }

            let nextCubeData = cube_data.slice(start_index, current_shown);

            let new_t_body = generate_cube_log_table(nextCubeData);

            cube_body.append(new_t_body);
        };

        /* infinite scroller */
        let scroller = new IntersectionObserver((e)=>{
            if (e[0].intersectionRatio <= 0) return;

            cube_log_show_more(1);
        });
        let scroll_watcher = document.querySelector("#infinite_scroller_down");

        scroller.observe(scroll_watcher);

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

            /* get number of lines */
            let cube_line = cube_object.results.result.reduce((a,b,c)=>{a.push(c); return a;},[]);

            /* violet cube - chosen lines. */
            let chosen_lines = cube_object.selected_idx ?? [];

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
            let html_tier = "";
            
            if (cube_log_item != undefined) {
                tier_rng = cube_object.results.tier_up.cube_log_item.tier_prng;
                let tier_map = cube_object.results.tier_up.cube_log_item.r_map;

                html_tier = mapToDisplayHtml(tier_map, (a)=>{
                    return `
                        <tr class="${tier_rng >= a.from && tier_rng < a.to ? 'highlight-row' : ''}">
                            <td>${a.name}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });
            }

            let line_selection_rng = "";
            let html_uniSelection = "";

            /*
                for unicube, show the prng info for choosing a line to reroll
            */
            if (cube === "uni") {
                line_selection_rng = cube_object.uni_prng.tier_prng;
                let line_selection_map = cube_object.uni_prng.r_map;

                html_uniSelection = mapToDisplayHtml(line_selection_map, (a)=>{
                    return `
                        <tr class="${line_selection_rng >= a.from && line_selection_rng < a.to ? 'highlight-row' : ''}">
                            <td>Cube Line #${+a.name + 1}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });

                chosen_lines = [cube_object.unicube_this_line];
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
                ${
                    html_uniSelection !== "" ? `
                        <h2>Unicube Line Selection</h2>
                        <div class="tooltip-item" id="tooltip_uniSelection" style="width:100%;display:block;">
                            <table style="width:100%;font-size:11px;">
                                <thead>
                                    <tr>
                                        <th>Selected Line</th>
                                        <th>Range</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            <b>${line_selection_rng}</b>
                                        </td>
                                    </tr>
                                    ${html_uniSelection}
                                </tbody>
                            </table>
                        </div>
                    ` : ``
                }
                <h2>Stat Determination</h2>
                <div class="tooltip-item" id="tooltip_item" style="width:100%;height:90%;display:block;">
                    <table style="width:100%;height:100%;font-size:11px;">
                        <thead>
                            <tr>
                            ${
                                cube_line.reduce(function(a,b,c) {
                                    let chosen = chosen_lines.includes(c);

                                    a += `
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Line #${c+1}</th>
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Range</th>
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Chance</th>
                                    `;

                                    return a;
                                }, "")
                            }
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                cube_object.results.result.map(function(x) {
                                    chosen_row.push(x.prng);
                                    return `
                                        <td colspan="3" style="text-align:center" title="The pseudo-random number used to check against the probability map.">
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
                                                    <td></td>
                                                `;
                                            }


                                            let _chosen = chosen_row[y];
                                            let isChosen = _chosen >= _a.from && _chosen < _a.to;
                                            let probability = (_a.chance * 100).toFixed(4);

                                            return `
                                                <td ${isChosen ? `class="highlight-row"` : ""} title="${probability}% chance" data-id="${_a.id}">${_a.display}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${_a.from.toFixed(7)} - ${_a.to.toFixed(7)}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${probability}%</td>
                                            `;
                                        }).join("")
                                    }</tr>`
                                }).join("")
                            }
                        </tbody>
                    </table>
                </div>
            `;

            option_box2.html(dom2);
            option_box2.dialog({            
                position: {my: "center", at: "top center", of: window},
                title: "Cube Log - PRNG Info",
                position: {
                    my: "center top",
                    at: "center top",
                    of: window
                },
                width: "100%",
                height: 850,
                buttons: [{
                    text: "Close",
                    click: function() {
                        option_box2.html("");
                        option_box2.dialog("close");
                    }
                }]
            }).dialog("open");

            //return from viewing the prng info for a cube run
            $("#btn_cube_log_back").on("click", function() {
                option_box2.dialog("close");
            });

            option_box2.scrollTop(0);
        });

        return false;
    });
//#endregion
});
