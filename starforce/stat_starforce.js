$(function() {
    /* clone the Item object to do analysis on */
    let item_clone = null;

    /* init modal */
    let stats_screen = $("#stat_box").dialog({
        position: {
            my: "center top",
            at: "center top",
            of: window
        },
        autoOpen: false,
        modal: false,
        width: "90vw",
        title: "Statistical Analysis of Starforce",
        buttons: [{
            text: "Close",
            click: function() {
                $(this).dialog("close");
            }
        }]
    });

    /* 
        worker for starforcing. faster than using the Item.starforce() method
        because it only writes necessary log data
    */
    var worker = {};
    var sf_analysis_items = []; /* store analyzed starforce runs */
    /* keep track of highest and lowest costs */
    var sf_minmax = {
        highest_cost: 0,
        lowest_cost: 0
    }; 
    var sf_idx = 0; /* keep track of how many runs */
    var sf_data = {
        reload_log: true
    };

    var init_worker = function() {
        worker = new Worker("./starforce/worker_starforce.js");

        /* get log data from worker and write to analysis object. then rerun*/
        worker.onmessage = function(d) {
            let anal_sf = analyze_starforce(d.data.data);
            sf_analysis_items.push(anal_sf.g); 

            /* update ui stats */
            update_stats_ui(sf_analysis_items, -1);
            update_stats_ui(sf_analysis_items, 100);
            update_stats_ui(sf_analysis_items, 10);
            update_main_ui();
            begin_statistical_run();
        };
    }

    /* reset variables */
    var reset_variables = function() {
        sf_idx = 0;
        sf_analysis_items = [];
    };

    /* html for starforce analysis screen */
    let starforce_html = `
        <div class="form-group">
            <label class="form-label-group">
                <span class="form-label">
                    Star Start:
                </span>
                <input type="number" class="stat-input" id="stat_from" value="0" readonly disabled style="width:75px">
            </label>
            <label class="form-label-group" for="asf_star_to">
                <span class="form-label">
                    Star To:
                </span>
                <input type="number" class="stat-input" id="stat_to" value="22" min="0" style="width:75px">
            </label>
            <button id="begin_sf_statistics" style="width:100px">Analyze</button>  
            <button id="stop_sf_statistics" class="hidden" style="width:100px">Stop</button>
            <button id="reset_sf_statistics" style="width:100px">Reset</button>
        </div>
        <hr>
        <div style="padding:10px" id="stat_options_container">
            Analyze starforce runs by looking at the averages across many items. 
            <br><br>
            Starforce Cost Type: <select id="stat_sfrates">
                <option value="GMS">GMS</option>
                <option value="KMS">KMS</option>
            </select> 
            <br><br>
            Safeguard at stars: 
            <div id="stat_options">
                <label for="stat_cb_all">
                    <input type="checkbox" class="stat_checkbox_all" id="stat_cb_all" value="-1"> [All]
                </label>
                ${
                    [12,13,14,15,16].map((a,b)=>{
                        return `
                        <span style="display: inline-block; padding: 5px;">
                            <label for="stat_cb_${b}">
                                <input type="checkbox" class="stat_checkbox_sg" id="stat_cb_${b}" value="${a}"> ${a}
                            </label>
                        </span>
                        `
                    }).join("")
                }
            </div>
            <br>
            Starcatch:
            <textarea id="stat_starcatch" 
            style="width:100%;height:50px"
            placeholder="Add stars to starcatch in a comma-delimited list here (ex. '14,20,21'). You can specify a range by using '-' (ex. '1-5'). This can be mixed and matched (ex. '10-15,20,21'). Leave blank to not starcatch."
        ></textarea>
        </div>
        <hr>
        <div id="stat_results">
            Total Runs: <span id="stat_totalRuns">0</span>
            <hr>
            <div id="stat_10" class="stat-container"></div>
            <div id="stat_100" class="stat-container"></div>
            <div id="stat_-1" class="stat-container"></div>
        </div>
    `;

    let stat_processing = false;
    /* open starforce analysis window */
    $("#statistics_starforce").on("click", function() {
        stats_screen.html(starforce_html).dialog({
            close: ()=>{
                reset_variables();
                worker.terminate();
            }
        }).dialog("open");
    });

    /* continually run starforce from star to star and log the results*/
    stats_screen.on("click", "#begin_sf_statistics", function() {
        let _this = $(this);
        _this.addClass("hidden");
        $("#stop_sf_statistics").removeClass("hidden");
        $("#reset_sf_statistics").prop("disabled", true);
        $("#stat_options_container").addClass("hidden");
        let stat_to = $("#stat_to");
        stat_to.prop("disabled", true);
        stat_processing = true;
        init_worker();
        
        //set up worker data
        sf_data.item = Item.idata;
        sf_data.to = +stat_to.val();
        sf_data.safeguard = $("#stat_options .stat_checkbox_sg:checked").map(function(a,b) {return +$(b).val()}).get();
        sf_data.starcatch = get_starcatch();
        sf_data.sys_type = $("#stat_sfrates").val();

        begin_statistical_run();
    });

    /* stop the starforce run */
    stats_screen.on("click", "#stop_sf_statistics", function() {
        let _this = $(this);
        _this.addClass("hidden");
        $("#begin_sf_statistics").removeClass("hidden");
        $("#stat_to").prop("disabled", false);
        $("#reset_sf_statistics").prop("disabled", false);
        $("#stat_options_container").removeClass("hidden");
        stat_processing = false;
        worker.terminate();
    });

    /* reset variables and ui */
    stats_screen.on("click", "#reset_sf_statistics", function() {
        reset_variables();
        update_main_ui();
        begin_statistical_run();
        $(".stat-container").html("");
    });

    /* check all safeguard */
    stats_screen.on("click", "#stat_cb_all", function(e) {
        $("#stat_options .stat_checkbox_sg").prop("checked", e.target.checked);
    });

    /* recursively starforce item to desired stars while the processing flag is active */
    var begin_statistical_run = function() {        
        if (!stat_processing) return false;
    
        sf_idx += 1;
        worker.postMessage(sf_data);
    };

    /* update the other parts of the stat box */
    var update_main_ui = function() {
        $("#stat_totalRuns").html(sf_idx);
     }

    /* copy from dom.js (todo: make both use same function) - get starcatch values from textarea */
    var get_starcatch = function() {
        let starcatch_a = $("#stat_starcatch").val().split(",");
                    
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

        return starcatch;
    }

    var key_label = {
        "runs": "Runs",
        "tot_success": "Success",
        "sc_success": "Success (Star Catch)",
        "tot_fail": "Fails",
        "sc_fail": "Fails (Star Catch)",
        "cost": "Cost",
        "tot_safeguards": "Total Safeguards",
        "safeguards": "Safeguards",
        "tot_booms": "Total Booms",
        "booms": "Booms"
    };

    var cost_key = {
        "1.0": "Normal",
        "0.03": "Silver",
        "0.05": "Gold",
        "0.1": "Diamond",
        "0.3": "Event",
        "0.03,0.3": "Event + Silver",
        "0.05,0.3": "Event + Gold",
        "0.1,0.3": "Event + Diamond"
    };

    /* from the average data, update the ui with it */
    var update_stats_ui = function(data, part) {
        let avg_data = get_avg_data(data, part);

        let stat_html = '';

        for (let i in key_label) {
            /* 
                append stat item based on its label.
                cost has its own manual due to the struct not properly ordering
                all other ones will order
            */
            stat_html += `
                <tr>
                    <td class="data-label-row">${key_label[i]}:</td> 
                    <td class="data-number-row">
                        ${
                            typeof avg_data[i] === 'object' ?
                            ''
                            : 
                            avg_data[i]
                        }
                    </td>
                </tr>
                ${
                    typeof avg_data[i] === 'object' ? `
                    ${
                        i === "cost" ? `
                            ${
                                Object.keys(cost_key).reduce((a,b)=>{
                                    j = `
                                        <tr>
                                            <td class="data-label-row data-sub-row">
                                                ${cost_key[b]}
                                            </td>
                                            <td class="data-number-row">
                                                ${avg_data[i][b].toNumber()}
                                            </td>
                                        </tr>
                                    `;
                                    return a += j;
                                }, "")
                            }
                        ` 
                        :
                        `
                            ${
                                Object.keys(avg_data[i]).reduce((a,b)=>{
                                    let j = `
                                        <tr>
                                            <td class="data-label-row data-sub-row"">
                                                ${b}
                                            </td>
                                            <td class="data-number-row">
                                                ${avg_data[i][b].toNumber()}
                                            </td>
                                        </tr>
                                    `;

                                    return a += j;
                                }, "")
                            }
                    ` 
                    }
                    ` : ''
                }
            `;
        }

        let html = `
            <div class="stat-group">
                <span class="stat-header">
                ${
                    part !== -1 ?
                    `Average of Last ${part} Runs` : 'Average of All Runs'
                }
                </span>
                <table style="width:100%" class="stat-table">
                    ${stat_html}
                </span>
            </div>
        `;

        $(`#stat_${part}`).html(html);
    };

    /* 
        from the log data, get the average of the data
        -1 for no slice
    */
    var get_avg_data = function(data, part) {
        let part_data = part === -1 ? data : data.slice(-part);

        let pdl = part_data.length;

        //get_min_max_vals(part_data, part);

        /* calculate the averages */
        let calculate_avg = (a)=>{
            for (let i in a) {
                if (i in a) {
                    if (typeof a[i] === "object") {
                        for (j in a[i]) {
                            a[i][j] = a[i][j] / pdl;
                        }
                    } else {
                        a[i] = a[i] / pdl;
                    }
                }
            }
        };

        /* get the avg totals for each item in the analysis data */
        let total_avg_data = part_data.reduce((a,b,c)=>{
            for (let i in b) {
                if (i in a) {
                    if (typeof a[i] === "object") {
                        for (j in a[i]) {
                            a[i][j] += b[i][j];
                        }
                    } else {
                        a[i] += b[i];
                    }
                } else {
                    a[i] = b[i];
                }
            }

            /* on last record, divide the values by the data part to get the avg */
            if (c === pdl - 1) {
                calculate_avg(a);
            }

            return a;
        }, {});

        return total_avg_data;
    };

    /* keep track of min and max values of certain items */
    var get_min_max_vals = function(d, part) {
        for (let i = 0; i < d.length; ++i) {
            let _d = d[i];

            //TODO
        }   
    }
});