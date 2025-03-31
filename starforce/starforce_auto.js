$(function() {
    const optionbox = $("#option_box"); 
    const sys_sfrates = $("#system_sfrates");
    const body = $("body");
    
//#region AUTO STARFORCE
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
                        item: Item,
                        sys_type: sys_sfrates.val(),
                        user_settings: user_settings,
                        event_options: event_options,
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

                        /* set the item  from the worker */
                        Item = new item(d.data.item.idata);

                        Item.redraw(["starforce"]);
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
//#endregion

//#region STARFORCE SHOW PRN AND STAR FORCE SUMMARY
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
//#endregion

//#region STARFORCE LOG
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
//#endregion
});