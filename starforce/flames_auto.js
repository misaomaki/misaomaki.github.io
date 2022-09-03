$(function(){
    let w_f = {terminate:()=>{}}; //worker
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

    let optionbox = $("#option_box").dialog({
        autoOpen: false,
        modal: false
    });

    $("#auto_flames").on("click", function() {
        generate_flame_html(2);
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
                                SECONDARY STAT: +0.125 score per stat<br>
                                WATT/MATT: +4 score per value<br>
                                ALL STAT: +8 score per value<br>
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
            <span id="flame_msg" style="color:red"></span>
        `;

        optionbox.html(html).dialog({
            title: "Auto Flames",
            width: 1000,
            height: "auto",
            close: ()=>{
                w_f.terminate();
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

        let auto_flame_flames = $("#auto_flame_container .auto-flame-flame");
        auto_flame_flames.on("click", function() {
            auto_flame_flames.removeClass("auto-cube-selected");
            let _this = $(this);
            _this.addClass("auto-cube-selected");
            let id = +_this.attr("data-val");

            generate_flame_html(id);

            sfa.play("_BtMouseClick"); /*got overwritten*/
        });
    }
    
    var process_auto_flame = function(min_flames, max_flames) {
        let flame_calc_type = +$("input[name=flame-selector]:checked").val() ?? 1; /* 1 - flame stats, 2 - flame score. default to flame stat if the radio buttons don't exist */
            
        /* get flame values and the type */
        var data = {
            item: Item,
            calc_type: flame_calc_type,
            flame: +$("#auto_flame_container .auto-flame-flame.auto-cube-selected").attr("data-val") /* powerful or eternal flame */
        }

        if (flame_calc_type == 1) {
            /* validation */
            let flames_out_of_bounds = false;

            data.is_tier = $("#auto_flame_as_tier").prop("checked");
            data.max_flames = max_flames;
            data.flame_options = {};
            data.flame_options_search = {};

            /* get non-zero flame values */
            let flames = $("#auto_flame_container .flame-form").filter(function() {
                let fval =  +$(this).val();

                if (fval !== 0 && (fval > max_flames || fval < min_flames)) {
                    flames_out_of_bounds = true;
                }

                return fval > 0;
            });

            if (flames.length === 0) {
                alert("No flames have been selected.");
                return false;
            }

            if (data.is_tier) {
                if (flames.length > 4) {
                    alert("Please limit flame lines to 4 or less.");
                    return false;
                }
                if (flames_out_of_bounds) {
                    alert(`Flame values must be between ${min_flames} and ${max_flames}`);
                    return false;
                }
            }

            //set up flame data to send to flame function
            flames.each(function() {
                let _this = $(this);
                let this_attr = _this.attr("data-id");
                let type = _this.attr("data-type") || "";
                let val = +_this.val() || 0;
                let equal_type = data.is_tier ? $(`#auto_flame_${this_attr}_search`).val() : "1"; /* search type is always greater than or equal to for non-tier values */

                if (data.is_tier && (["str", "dex", "int", "luk"].includes(this_attr) || this_attr.includes(","))) {
                    this_attr = "stats:" + this_attr;
                } else if (!data.is_tier) {
                    if (type === "%") {
                        val = val / 100;
                    } else if (type === "-") {
                        val = Math.abs(val) * -1;
                    }
                }

                data.flame_options[this_attr] = val;
                data.flame_options_search[this_attr] = equal_type;
            });
        } else {
            let flame_score = +$("#af_flame_score").val();

            if (flame_score === "" || isNaN(flame_score) || flame_score <= 0) {
                alert(`Flame Score must be a valid number greater than 0.`);
                return false;
            }

            /* check against flame score */
            data.flame_score = flame_score;
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

            Item.idata.meta.flames_meta_data.unshift(...d.data.data.flame_log);
            Item.idata.meta.flames_total = d.data.data.flame_used;
            Item.idata.boosts.flames = d.data.data.flame_stats;

            Item.redraw_item_tooltip();
            sfa.play("_CubeEnchantSuccess");
            optionbox.dialog("close");
            if (system.auto_open_log) {
                $("#flames_log").trigger("click");
            }
        };

        return true;
    };
});