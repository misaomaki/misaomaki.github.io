$(function() {
    var key_label = {};

    /* range cost of item in multiples of 10 billion */
    const cost_range_stat = {};
    const max_cost_range_tier = 30;

    for (let i = 0; i <= max_cost_range_tier; ++i) {
        cost_range_stat[`cost_under_${i}`] = 0;
    }

    /* 
        worker for starforcing. faster than using the Item.starforce() method
        because it only writes necessary log data
    */
    var worker = {terminate:()=>{}};
    var sf_analysis_items = []; /* store analyzed starforce runs */
    /* keep track of highest and lowest costs */
    var sf_minmax = {}; 

    var init_sfminmax = function() {
    /* keep track of highest and lowest for each average run item */
        [-1, 100, 10].forEach((a)=>{
            sf_minmax[a] = {
                highest_cost: {
                    "1.0": 0
                },
                lowest_cost: {
                    "1.0": 1e30
                },
                highest_boom: 0,
                lowest_boom: 1e30
            };
        });
    };
    init_sfminmax();

    var sf_idx = 0; /* keep track of how many runs */
    var sf_data = {
        reload_log: true
    };

    /* init modal */
    let stats_screen = $("#stat_box").dialog({
        position: {
            my: "center top",
            at: "center top",
            of: window
        },
        close: function() {
            worker.terminate();
            sf_analysis_item = {};
            sf_minmax = {};
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
        init_sfminmax();
    };

    let starforce_html = "";

    /* html for starforce analysis screen */
    let starforce_html_f = function() {
        return `
            <div class="form-group">
                <label class="form-label-group">
                    <span class="form-label">
                        Star Start:
                    </span>
                    <input type="number" class="stat-input" id="stat_from" value="0" style="width:75px">
                </label>
                <label class="form-label-group" for="asf_star_to">
                    <span class="form-label">
                        Star To:
                    </span>
                    <input type="number" class="stat-input" id="stat_to" value="${Item.idata.superior ? '12' : '22'}" min="0" style="width:75px">
                </label>
                <button id="begin_sf_statistics" style="width:100px">Analyze</button>  
                <button id="stop_sf_statistics" class="hidden" style="width:100px">Stop</button>
                <button id="reset_sf_statistics" style="width:100px">Reset</button>
            </div>
            <hr>
            <div style="padding:10px" id="stat_options_container">
                Analyze starforce runs by looking at the averages across many items. 
                <br><br>
                <div class="hidden">
                    Starforce Cost Type: <select id="stat_sfrates">
                        <option value="GMS">GMS</option>
                        <option value="KMS">KMS</option>
                    </select> 
                </div>
                ${
                    !Item.idata.superior ? `
                        <br><br>
                        Safeguard at stars: 
                        <div id="stat_options">
                            <label for="stat_cb_all">
                                <input type="checkbox" class="stat_checkbox_all" id="stat_cb_all" value="-1"> [All]
                            </label>
                            ${
                                GLOBAL.starforce.safeguardable_stars.map((a,b)=>{
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
                    ` : ""
                }
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
        `
    };

    let stat_processing = false;
    /* open starforce analysis window */
    $("#statistics_starforce").on("click", function() {
        starforce_html = starforce_html_f();
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

        key_label = {
            "runs": "Runs",
            "tot_success": "Success",
            "sc_success": "Success (Star Catch)",
            "tot_fail": "Fails",
            "sc_fail": "Fails (Star Catch)",
            "cost": "Cost",
            "sk_cost": "Shadowknight Coins",
            "tot_safeguards": "Total Safeguards",
            "safeguards": "Safeguards",
            "tot_booms": "Total Booms",
            "booms": "Booms",
            "min_cost": "Least Cost Item",
            "max_cost": "Most Cost Item",
            "min_boom": "Least Booms",
            "max_boom": "Most Booms"
        };

        for (let range in cost_range_stat) {
            let key = range.split("_");
            let rtier = +key[2];
            if (rtier != max_cost_range_tier) {
                key_label[range] = `${rtier * 10} - ${rtier + 1 * 10}b mesos`;
            } else {
                key_label[range] = `${rtier * 10}+b mesos`;
            }
        }

        /* remove shadowknight coin from table if not needed */
        if (!Item.idata.shadowknight) {
            delete key_label["sk_cost"];
        }

        _this.addClass("hidden");
        $("#stop_sf_statistics").removeClass("hidden");
        $("#reset_sf_statistics").prop("disabled", true);
        $("#stat_options_container").addClass("hidden");
        let stat_from = $("#stat_from");
        let stat_to = $("#stat_to");
        stat_from.prop("disabled", true);
        stat_to.prop("disabled", true);
        stat_processing = true;
        init_worker();
        
        //set up worker data
        sf_data.item = Item.idata;
        sf_data.from = +stat_from.val();
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
        $("#stat_from").prop("disabled", false);
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
        let starcatch = [];
        let val = $("#stat_starcatch").val();

        if (val === "") return starcatch;

        let starcatch_a = val.split(",");
                    
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


        const label_added = {
            price_range: false
        };

        for (let i in key_label) {
            let add_price_range_label = false;
            let sub_row = false;

            let is_cost_under = i.startsWith("cost_under");
            if (!label_added.price_range && is_cost_under) {
                label_added.price_range = true;
                add_price_range_label = true;
            }

            if (is_cost_under) {
                sub_row = true;
            }

            /* 
                append stat item based on its label.
                cost has its own manual due to the struct not properly ordering
                all other ones will order

                this is really wonky
            */
            stat_html += `
                ${
                    add_price_range_label ?
                    `
                        <tr>
                            <td class="data-label-row" colspan="100%">Item Starforce Price Range:</td>
                        </tr>
                    ` : ''
                }
                <tr>
                    <td class="data-label-row ${sub_row ? ' data-sub-row' : ''}">${key_label[i]}:</td> 
                    <td class="data-number-row">
                        ${
                            typeof avg_data[i] === 'object' ?
                            ''
                            : 
                            avg_data[i].toNumber()
                        }
                    </td>
                </tr>
                ${
                    typeof avg_data[i] === 'object' ? `
                    ${
                        "cost,min_cost,max_cost".includes(i) ? `
                            ${
                                Object.keys(cost_key).reduce((a,b)=>{
                                    let j = `
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
        let part_data = part === -1 ? data.slice(0) : data.slice(-part);

        let pdl = part_data.length;

        /* calculate the averages */
        let calculate_avg = (a)=>{
            for (let i in a) {
                if (typeof a[i] === "object") {
                    for (j in a[i]) {
                        a[i][j] = a[i][j] / pdl;
                    }
                } else {
                    a[i] = a[i] / pdl;
                }
            }
        };

        /* reset the stored highest and lowest after [part] runs */
        if (part !== -1 && sf_idx % part === 0) {
            sf_minmax[part].highest_cost = {"1.0": 0};
            sf_minmax[part].lowest_cost = {"1.0": 1e30};
            sf_minmax[part].highest_boom = 0;
            sf_minmax[part].lowest_boom = 1e30;
        }

        /* get the avg totals for each item in the analysis data */
        let total_avg_data = part_data.reduce((a,b,c)=>{
            b = $.extend(true,{},b);

            for (let i in b) {
                /* keep track of min and max cost per part */
                if (i === "cost") {
                    if (b.cost["1.0"] > sf_minmax[part].highest_cost["1.0"]) {
                        sf_minmax[part].highest_cost = {...{}, ...b[i]};
                    }

                    if (b.cost["1.0"] < sf_minmax[part].lowest_cost["1.0"]) {
                        sf_minmax[part].lowest_cost = {...{}, ...b[i]};
                    }

                    if (b.tot_booms > sf_minmax[part].highest_boom) {
                        sf_minmax[part].highest_boom = b.tot_booms;
                    }

                    if (b.tot_booms < sf_minmax[part].lowest_boom) {
                        sf_minmax[part].lowest_boom = b.tot_booms;
                    }
                }


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
        
        total_avg_data.min_cost = sf_minmax[part].lowest_cost;
        total_avg_data.max_cost = sf_minmax[part].highest_cost;
        total_avg_data.max_boom = sf_minmax[part].highest_boom;
        total_avg_data.min_boom = sf_minmax[part].lowest_boom;

        /* keep track of item cost in its range 
            example - if an item cost 35 billion mesos to starforce, it counts up the "30-40 billion range" key
        */
        for (let i = 0; i <= max_cost_range_tier; ++i) {
            total_avg_data[`cost_under_${i}`] = 0;
        }

        for (let i = 0; i < part_data.length; ++i) {
            let cost = part_data[i].cost["1.0"];
            let tier = Math.floor(cost / 1e10);

            if (tier > max_cost_range_tier) {
                tier = max_cost_range_tier;
            }

            ++total_avg_data[`cost_under_${tier}`];
        }
  
        return total_avg_data;
    };
});