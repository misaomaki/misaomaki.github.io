$(function(){
    let w_f = {terminate:()=>{}}; //worker
    let w_e = {terminate:()=>{}}; //worker for flame combo estimates
    let flame_combos = []; /* saved flame combos. auto flame stops at the first flame matching any of them */
    let selected_flame = 2; /* flame selected in auto flames. the saved combos are for this flame */
    const lines_1 = [
        {
            name: "Any Stat",
            type: "any_stat",
            tier: 3  /* 1 - tiers and custom, 2 - tiers only, 3 - custom only */
        },
        {
            name: "STR",
            type: "str",
            tier: 1
        },
        {
            name: "DEX",
            type: "dex",
            tier: 1
        },
        {
            name: "INT",
            type: "int",
            tier: 1
        },
        {
            name: "LUK",
            type: "luk",
            tier: 1
        },
        {
            name: "STR,DEX",
            type: "str,dex",
            tier: 2
        },
        {
            name: "STR,INT",
            type: "str,int",
            tier: 2
        },
        {
            name: "STR,LUK",
            type: "str,luk",
            tier: 2
        },
        {
            name: "DEX,INT",
            type: "dex,int",
            tier: 2
        },
        {
            name: "INT,LUK",
            type: "int,luk",
            tier: 2
        },
        {
            name: "All Stats",
            type: "all_stat",
            tier: 1,
            value: "%"
        }
    ];

    const lines_2 = [
        {
            name: "Attack Power",
            type: "watt",
            tier: 1
        },
        {
            name: "Magic Attack",
            type: "matt",
            tier: 1
        },
        {
            name: "Damage",
            type: "damage",
            tier: 1,
            for: 2, /* weapon only */
            value: "%"
        },
        {
            name: "Boss Damage",
            type: "boss_damage",
            tier: 1,
            for: 2,
            value: "%"
        },
        {
            name: "Req Level",
            type: "reqlvl",
            tier: 1,
            value: "-"
        },
        {
            name: "Max HP",
            type: "hp",
            tier: 1
        },
        {
            name: "Max MP",
            type: "mp",
            tier: 1
        },
        {
            name: "DEF",
            type: "def",
            tier: 1
        },
        {
            name: "Jump",
            type: "jump",
            tier: 1
        },
        {
            name: "Speed",
            type: "Speed",
            tier: 1
        }
    ];

    /* flame line definitions keyed by type */
    const flame_lines = Object.fromEntries([...lines_1, ...lines_2].map(a=>[a.type, a]));

    let optionbox = $("#option_box").dialog({
        autoOpen: false,
        modal: false
    });

//#region AUTO FLAMES
    $("#auto_flames").on("click", function() {
        generate_flame_html(selected_flame);
    });

    var generate_flame_html = function(flame_type) {
        let min_flames = 1;
        let max_flames = 5;

        /* red flames can't get tier 5 stats */
        if (flame_type === 1) {
            max_flames = 4;
        } else if (flame_type === 2) {
            min_flames = 2; /* rainbow flames can't get tier 1 stats */
        }

        if (Item.idata.flame_type === 2) {
            min_flames += 2;
            max_flames += 2;
        }

        const lines_generater = (a,b)=>{
            /* skip weapon-specific lines if not a weapon */
            if (b.for != null && b.for === 2 && Item.idata.class === "armor") {
                return a;
            }

            a += `
                <span class="flame-box item-armor ${b.tier == 1 ? "item-custom-flame" : ""}  ${b.tier == 3 ? "item-custom-only hidden" : ""}">
                    <span class="item-flame-label">${b.name}</span> 
                    <select class="flame-search" data-for="${b.type}" id="auto_flame_${b.type}_search">
                        <option value="1">>=</option>
                        <option value="0">=</option>
                    </select>
                    <input type="number" class="flame-form" min="0" max="${max_flames}" value="0" data-id="${b.type}" ${
                        b.value != null ? `data-type="${b.value}"` : ""
                    }/>
                    ${
                        b.value === "%" ? `
                            <span class="flame-percent hidden">%</span>
                        ` : ""
                    }
                </span>
            `;

            return a;
        };

        let html = `
            <b>Automatically flame to the desired lines. This will generate flame log data.</b>
            <hr>
            <div class="item-form auto_flame_container" id="auto_flame_container" style="min-height:375px;">                    
                <span class="item-label">
                    <b>Select Flame</b>
                </span>
                <br>
                <div class="flame flame-powerful flame-small maple-button auto-flame-flame ${flame_type === 1 ? "auto-cube-selected" : ""}" style="padding:5px" data-val="1"></div>
                <div class="flame flame-eternal flame-small maple-button auto-flame-flame ${flame_type === 2 ? "auto-cube-selected" : ""}" style="padding:5px" data-val="2"></div>
                <div class="flame flame-abyssal flame-small maple-button auto-flame-flame ${flame_type === 3 ? "auto-cube-selected" : ""}" style="padding:5px" data-val="3"></div>
                <hr>
                <span class="item-form item-label">                
                    ${
                        Item.idata.class === "armor" ? 
                        `
                            <input type="radio" name="flame-selector" id="flame-selector-flame" value="1" checked> 
                        ` : ""
                    }
                    <label for="flame-selector-flame"> 
                        <b>Flames</b>
                    </label>
                </span>
                <div id="af_flame_con" class="item-form">
                    <hr>                
                        <label for="auto_flame_as_tier" style="margin-right:10px">
                            <input type="checkbox" id="auto_flame_as_tier" checked> Value is Flame Tiers
                        </label>
                    <hr>
                    <label style="font-size:0.9em">
                        Select up to 4 flame tiers between ${min_flames} and ${max_flames}, or input custom flame tier values. 
                        <br><br>For tiers, you can have the auto flame process either only get flames exactly equal to the tier, or greater than or equal to the tier.
                        <br><br>For custom values, it will always search as greater than or equal to. <br>
                        <span style="color:red">WARNING: There is no validation for custom values, so if you give impossible stats for the eternal or powerful flames to attain, the process will run forever.</span>
                    </label>
                    <hr>
                    <div class="item-flame-form">
                        ${
                            lines_1.reduce(lines_generater, "")
                        }
                    </div>
                    <div class="item-flame-form">
                        ${
                            lines_2.reduce(lines_generater, "")
                        }
                    </div>
                </div>
                ${
                    Item.idata.class === "armor" ? 
                    `
                        <span class="item-form item-label">
                            <input type="radio" name="flame-selector" id="flame-selector-score" value="2"> 
                            <label for="flame-selector-score"> 
                                <b>Flame Score</b>
                            </label>
                        </span>
                        <div id="af_score_con" class="item-form item-armor form-disabled">
                            <hr>
                            <label style="font-size:0.9em">
                                Run until a desired flame score or greater is reached. Flame score is calculated by:<br>
                                PRIMARY STAT: +1 score per stat<br>
                                SECONDARY STAT: +0.083 (1/12) score per stat<br>
                                WATT/MATT: +3 score per value<br>
                                ALL STAT: +10 score per value<br>
                            </label>
                            <hr>
                            <span class="flame-box flame-score-box item-armor">
                                <span class="item-flame-label">Flame Score</span> 
                                <input type="number" id="af_flame_score" class="flame-form flame-score-form" value="0">
                            </span>
                        </div>
                    ` : ""
                } 
            </div>
            <div class="auto-combo-add">
                <button id="btnAddNewFlame">Add Flame Combo</button>
                <label style="font-size:0.9em">
                    Save the values above as a combo to search for multiple combos at once. Flaming stops at the first flame that matches ANY saved combo or the values currently entered above.
                </label>
            </div>
            <hr>
            <div id="conFlameOptions">
            </div>
            <span id="flame_msg" style="color:red"></span>
        `;

        optionbox.html(html).dialog({
            title: "Auto Flames",
            width: 1000,
            height: "auto",
            close: ()=>{
                w_f.terminate();
                w_e.terminate();
            },
            buttons: [{
                text: "Close",
                click: function() {
                    $(this).dialog("close");
                }
            }, {
                text: "Begin Flaming",
                id: "btnBeginFlame",
                click: function() {
                    let btn = $("#btnBeginFlame");

                    btn.prop("disabled", true);
                    btn.html("Processing flaming...");

                    var f = process_auto_flame(min_flames, max_flames);

                    if (!f) {
                        btn.prop("disabled", false);
                        btn.html("Begin Flaming");
                    }
                }
            }]
        }).dialog("open");

        /* radio buttons for selecting flame or score */
        if (Item.idata.class === "armor") {
            let flame_con = $("#af_flame_con");
            let score_con = $("#af_score_con");
            $("#flame-selector-flame,#flame-selector-score").on("change", function(e) {
                if (e.target.value == 1) {
                    score_con.addClass("form-disabled").find(".flame-form").prop("disabled", true);
                    flame_con.removeClass("form-disabled").find(".flame-form").prop("disabled", false);
                } else {
                    score_con.removeClass("form-disabled").find(".flame-form").prop("disabled", false);
                    flame_con.addClass("form-disabled").find(".flame-form").prop("disabled", true);
                }
            });
        }

        /* change to custom flames */
        let flame_box = $("#auto_flame_container .flame-box:not(.flame-score-box)");
        let flame_search = $("#auto_flame_container .flame-search");
        let flame_textbox = $("#auto_flame_container .flame-form:not(.flame-score-form)");
        let flame_percent = $("#auto_flame_container .flame-percent");

        $("#auto_flame_as_tier").on("change", function(e) {
            if (e.target.checked) {
                flame_textbox.attr("max", max_flames);
                flame_percent.addClass("hidden");
                flame_search.removeClass("hidden");

                flame_box.filter(":not(.item-custom-flame)").removeClass("hidden");
                flame_box.filter(".item-custom-only").addClass("hidden");
            } else {
                flame_textbox.removeAttr("max");
                flame_percent.removeClass("hidden");
                flame_search.addClass("hidden");

                flame_box.filter(":not(.item-custom-flame)").addClass("hidden");
                flame_box.filter(".item-custom-only").removeClass("hidden");
            }

            flame_textbox.val(0);
        });

        /* save the entered flame values as a combo. auto flame stops at the first flame matching any saved combo */
        $("#btnAddNewFlame").on("click", function() {
            let combo = read_flame_combo(min_flames, max_flames);

            if (typeof combo === "string") {
                alert(combo);
                return;
            }

            flame_combos.push(combo);

            /* clear the form for the next combo */
            $("#auto_flame_container .flame-form").val(0);

            draw_flame_combos(min_flames, max_flames);
        });

        $("#conFlameOptions").on("click", ".auto-combo-remove", function() {
            flame_combos.splice(+$(this).attr("data-idx"), 1);
            draw_flame_combos(min_flames, max_flames);
        });

        /* update the estimate for the values entered in the form as they're typed */
        let draw_timer = 0;
        $("#auto_flame_container").on("input change", function() {
            clearTimeout(draw_timer);
            draw_timer = setTimeout(()=>draw_flame_combos(min_flames, max_flames), 300);
        });

        draw_flame_combos(min_flames, max_flames);

        let auto_flame_flames = $("#auto_flame_container .auto-flame-flame");
        auto_flame_flames.on("click", function() {
            auto_flame_flames.removeClass("auto-cube-selected");
            let _this = $(this);
            _this.addClass("auto-cube-selected");
            let id = +_this.attr("data-val");

            /* saved combos are for one flame, so changing the flame clears them */
            if (id !== selected_flame) {
                flame_combos = [];
                selected_flame = id;
            }

            generate_flame_html(id);

            sfa.play("_BtMouseClick"); /*got overwritten*/
        });
    }
    
    /* 1 - flame stats, 2 - flame score. default to flame stat if the radio buttons don't exist */
    var get_flame_calc_type = function() {
        return $("input[name=flame-selector]:checked").val() ?? 1;
    }

    /* non-zero flame line inputs */
    var get_flame_inputs = function() {
        return $("#auto_flame_container .flame-form:not(.flame-score-form)").filter(function() {
            return +$(this).val() > 0;
        });
    }

    /* true if nothing has been entered in the flame form */
    var flame_form_empty = function() {
        if (get_flame_calc_type() == 2) {
            return !(+$("#af_flame_score").val() > 0);
        }

        return get_flame_inputs().length === 0;
    }

    /* read the values entered in the flame form as a flame combo. returns an error message if the values are invalid */
    var read_flame_combo = function(min_flames, max_flames) {
        if (get_flame_calc_type() == 2) {
            let flame_score = +$("#af_flame_score").val();

            if (flame_score === "" || isNaN(flame_score) || flame_score <= 0) {
                return `Flame Score must be a valid number greater than 0.`;
            }

            /* check against flame score */
            return {
                calc_type: 2,
                flame_score: flame_score,
                labels: [`Flame Score &ge; ${flame_score}`]
            };
        }

        let combo = {
            calc_type: 1,
            is_tier: $("#auto_flame_as_tier").prop("checked"),
            flame_options: {},
            flame_options_search: {},
            lines: [], /* line types, to check the combo is still valid if the item changes */
            labels: []
        };

        /* validation */
        let flames_out_of_bounds = false;

        $("#auto_flame_container .flame-form:not(.flame-score-form)").each(function() {
            let fval = +$(this).val();

            if (fval !== 0 && (fval > max_flames || fval < min_flames)) {
                flames_out_of_bounds = true;
            }
        });

        /* get non-zero flame values */
        let flames = get_flame_inputs();

        if (flames.length === 0) {
            return "No flames have been selected.";
        }

        if (combo.is_tier) {
            if (flames.length > 4) {
                return "Please limit flame lines to 4 or less.";
            }
            if (flames_out_of_bounds) {
                return `Flame values must be between ${min_flames} and ${max_flames}`;
            }
        }

        //set up flame data to send to flame function
        flames.each(function() {
            let _this = $(this);
            let this_attr = _this.attr("data-id");
            let type = _this.attr("data-type") || "";
            let val = +_this.val() || 0;
            let equal_type = combo.is_tier ? $(`#auto_flame_${this_attr}_search`).val() : "1"; /* search type is always greater than or equal to for non-tier values */

            combo.lines.push(this_attr);

            if (combo.is_tier) {
                combo.labels.push(`${flame_lines[this_attr].name} ${equal_type == 0 ? "=" : "&ge;"} T${val}`);
            } else {
                combo.labels.push(`${flame_lines[this_attr].name} &ge; ${type === "-" ? "-" : ""}${val}${type === "%" ? "%" : ""}`);
            }

            if (combo.is_tier && (["str", "dex", "int", "luk"].includes(this_attr) || this_attr.includes(","))) {
                this_attr = "stats:" + this_attr;
            } else if (!combo.is_tier) {
                if (type === "%") {
                    val = val / 100;
                } else if (type === "-") {
                    val = Math.abs(val) * -1;
                }
            }

            combo.flame_options[this_attr] = val;
            combo.flame_options_search[this_attr] = equal_type;
        });

        return combo;
    }

    /* saved combos are kept between flame types and items, so check they can still be rolled. returns an error message or "" */
    var check_flame_combo = function(combo, min_flames, max_flames) {
        if (combo.calc_type == 2) {
            return Item.idata.class === "armor" ? "" : "Flame Score is only available for armor.";
        }

        for (let a of combo.lines) {
            if (flame_lines[a].for === 2 && Item.idata.class === "armor") {
                return `${flame_lines[a].name} is only available for weapons.`;
            }
        }

        if (combo.is_tier && Object.values(combo.flame_options).some(a=>a > max_flames || a < min_flames)) {
            return `Flame values must be between ${min_flames} and ${max_flames}`;
        }

        return "";
    }

    /* draw the saved flame combos and the values entered in the form, with the chance to roll each of them */
    var draw_flame_combos = function(min_flames, max_flames) {
        let con = $("#conFlameOptions");

        w_e.terminate();

        /* dialog was closed */
        if (con.length === 0) return;

        let rows = flame_combos.map((a,i)=>({
            combo: a,
            labels: a.labels,
            idx: i,
            error: check_flame_combo(a, min_flames, max_flames)
        }));

        /* values entered in the form are searched too */
        if (!flame_form_empty()) {
            let combo = read_flame_combo(min_flames, max_flames);

            rows.push(typeof combo === "string" ? {labels: [], idx: null, error: combo} : {combo: combo, labels: combo.labels, idx: null, error: ""});
        }

        let set_estimate = draw_combo_table(con, rows, "Flame");

        let valid = rows.map((a,i)=>({...a, row: i})).filter((a)=>a.error === "");

        if (valid.length === 0) {
            set_estimate("total", null);
            return;
        }

        /* the worker goes through every roll of the lines in the combos, so let it run off the main thread */
        w_e = new Worker("./starforce/worker_flames.js");

        w_e.onmessage = function(d) {
            d.data.combos.forEach((p,i)=>set_estimate(valid[i].row, p));

            /* no total if a combo can't be used, since flaming won't start */
            set_estimate("total", valid.length === rows.length ? d.data.any : null);
        };

        w_e.postMessage({
            estimate: true,
            item: combo_estimate_item(Item),
            flame: +$("#auto_flame_container .auto-flame-flame.auto-cube-selected").attr("data-val"),
            flame_combos: valid.map((a)=>a.combo)
        });
    }

    var process_auto_flame = function(min_flames, max_flames) {
        for (let i = 0; i < flame_combos.length; ++i) {
            let err = check_flame_combo(flame_combos[i], min_flames, max_flames);

            if (err !== "") {
                alert(`Saved flame combo ${i + 1}: ${err}`);
                return false;
            }
        }

        let combos = flame_combos.concat();

        /* the values entered in the form are searched too, so a single combo doesn't need to be saved first */
        if (combos.length === 0 || !flame_form_empty()) {
            let combo = read_flame_combo(min_flames, max_flames);

            if (typeof combo === "string") {
                alert(combo);
                return false;
            }

            combos.push(combo);
        }

        /* get flame values and the type */
        var data = {
            item: Item,
            flame: +$("#auto_flame_container .auto-flame-flame.auto-cube-selected").attr("data-val"), /* powerful, eternal, abyssal flame */
            flame_combos: combos
        }

        w_f = new Worker("./starforce/worker_flames.js");
            
        w_f.postMessage(data);

        let flame_msg = $("#flame_msg");
        w_f.onmessage = function(d) {
            //worker is sending updates about how many flames are used. used for long-running flaming
            if (d.data.code == 16) {
                flame_msg.html(d.data.message);
                return false;
            }

            Item = new item(d.data.item.idata);

            Item.redraw_item_tooltip(["flames"]);
            sfa.play("_CubeEnchantSuccess");
            optionbox.dialog("close");
            if (system.auto_open_log) {
                $("#flames_log").trigger("click");
            }
        };

        return true;
    };
//#endregion

    
//#region REVERSE FLAME CHECK
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
//#endregion
});