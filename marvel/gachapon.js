var gacha_rarity = [{
    minc: 0,
    maxc: 0.009,
    color: "red"
}, {
    minc: 0.009,
    maxc: 0.01,
    color: "#ff8000"
}, {
    minc: 0.01,
    maxc: 0.04,
    color: "#a335ee"
}, {
    minc: 0.04,
    maxc: 0.07,
    color: "#0070dd"
}, {
    minc: 0.07,
    maxc: 0.1,
    color: "#15ae00",
}, {
    minc: 0.1,
    maxc: 0.5,
    color: "#e0c633"
}, {
    minc: 0.5,
    maxc: 1,
    color: "black"
}, {
    minc: 1,
    maxc: 100,
    color: "#9d9d9d"
}];

$(function() {
    let dialog = $("#dialog");
    let simOptionsBtn = $("#sim-options-btn");
    let simSettingsBtn = $("#sim-settings-btn");
    let cache_options = {
        sim_item: "0",
        sim_nx: 0,
        sim_runs: 0,
        sim_last: 0,
        sim_name_contains: ""
    };

    let sorted_db = {
        s1: gacha_db.c.sort((a,b)=>{
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }),
        s2: gacha_db.a.sort((a,b)=>{
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }),
        s3: gacha_db.b.sort((a,b)=>{
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
    };

    const simOptionTemplate = `
        <label for="rsim1">
            <input type="radio" name="option" value="1" checked class="radio-sim" id="rsim1">
            Run <input type="number" min="0" id="txt_total_runs" style="width:75px;display:inline-block;" value="11"> times.
        </label>
        <hr>
        <label for="rsim4">
            <input type="radio" name="option" value="4" class="radio-sim" id="rsim4">
            Run using <input type="number" min="0" id="txt_nx_cash" style="width:150px;display:inline-block;" value="49000"> NX.
        </label>
        <hr>
        <label for="rsim2">
            <input type="radio" name="option" value="2" class="radio-sim" id="rsim2">
            Run until I get
                <select id="s_item" style="width:200px;display:inline-block">
                    <option value="0">Select an Item</option>
                    <option disabled>Slot 1</option>
                    ${
                        sorted_db.s1.map(m=>{
                            return `<option value="${m.item_idx}">${m.name}</option>`;
                        })
                    }
                    <option disabled>Slot 2</option>
                    ${
                        sorted_db.s2.map(m=>{
                            return `<option value="${m.item_idx}">${m.name}</option>`;
                        })
                    }
                    <option disabled>Slot 3</option>
                    ${
                        sorted_db.s3.map(m=>{
                            return `<option value="${m.item_idx}">${m.name}</option>`;
                        })
                    }
                </select>
        </label>
        <hr>
        <label for="rsim3">
            <input type="radio" name="option" value="3" class="radio-sim" id="rsim3">
            Run until I get an item with name containing <em class="info" style="display:inline-block;" 
            title="If you want a particular class of items but don't care which. For example, if you just want the first Arcane item you find regardless of which one, you can search for 'Arcane'. 
If the name doesn't exist, nothing will happen if you try to simulate.

You can start the filter off with special instructions to change the filter behavior:
[filter:{type}]
  By default, the search just sees if your search is contained within the name. You can pass type =
  start - only if the name starts with the specified string. Example: If you want to search for X Scrolls, search &quot;[filter:start]X &quot;
  end - only if the name ends with the specifed string. Example: &quot;[filter:end]Special Coupon&quot;

[slot:{slot}]
  By default, the search checks all 3 Marvel Slots for the matched name. You can limit it to a specific slot by passing 1, 2, or 3.

All filters can be combined. Example: &quot;[filter:start][slot:3]Absolab&quot;

">[?]</em>
            <input type="text" id="txt_con_item">
        </label>
    `;

    let body = $("body");

    body.on("change", "#txt_nx_cash", function() {
        $("#rsim4").prop("checked", true).trigger("change");
    });

    body.on("change", "#txt_con_item", function() {
        $("#rsim3").prop("checked", true).trigger("change");
    });

    body.on("change", "#s_item", function() {
        $("#rsim2").prop("checked", true).trigger("change");
    });

    body.on("change", "#txt_total_runs", function() {
        $("#rsim1").prop("checked", true).trigger("change");;
    });

    body.on("change", ".radio-sim", function() {
        let val = +$(".radio-sim:checked").val();
        cache_options.sim_last = val;
    });

    body.on("change", ".op", function(e) {
        let _this = $(this);
        let op = _this.attr("data-for");
        gach_options[op] = e.target.checked;
    });

    body.on("input change", "#marvel_sound", function() {
        let _this = $(this);
        let val = +_this.val();

        for (let i in window.gachapon.sounds) {
            window.gachapon.sounds[i].setVolume(val);
        }
    });

    var resolve_rarity = function(c,b,a) {
        let i1_chance = (c.chance != null ? c : c.find(x => {return x.name === item1}) || {"chance": 0}).chance;
        let i1_rarity = "black";

        let i2_chance = (b.chance != null ? a : a.find(x => {return x.name === item2}) || {"chance": 0}).chance;
        let i2_rarity = "black";

        let i3_chance = (a.chance != null ? b : b.find(x => {return x.name === item3}) || {"chance": 0}).chance;
        let i3_rarity = "black";

        for (let i = 0; i < gacha_rarity.length; ++i) {
            let this_rarity = gacha_rarity[i];
            if (i1_chance > this_rarity.minc && i1_chance <= this_rarity.maxc) {
                i1_rarity = this_rarity.color;
            }
            if (i2_chance > this_rarity.minc && i2_chance <= this_rarity.maxc) {
                i2_rarity = this_rarity.color;
            }
            if (i3_chance > this_rarity.minc && i3_chance <= this_rarity.maxc) {
                i3_rarity = this_rarity.color;
            }
        }

        return [i1_rarity, i2_rarity, i3_rarity];
    };

    //merge rarity color determination with other to avoid repeated code
    var debug_template = function() {
        let items_a = item_db_rangified_prev.a;
        let items_b = item_db_rangified_prev.b;
        let items_c = item_db_rangified_prev.c;

        let maxLen = Math.max(items_c.length, items_b.length, items_a.length);
        let fix_length = 5;

        let lastRngs = myItems.slice(-3);
        let curr_prng = {
            a: (lastRngs[0] || {prn: -100}).prn,
            b: (lastRngs[1] || {prn: -100}).prn,
            c: (lastRngs[2] || {prn: -100}).prn
        };

        return `<div>
            Shows the PRNG value used to determine the item that is received for each group. A proc map is also generated to show which items are received based on the PRNG value. 
            <br>The proc map is randomized after each run.

            <br>

            <span style="color:red">
                Note for latest version: The marvel rates posted by Nexon are imprecisely-rounded values, and some groups add up to greater than 100%. Therefore, certain rates 
                are adjusted slightly downward to "fit" it into a 0 to 1 range (values are used from previous marvel rates, which posted slightly more accurate numbers).
            </span>
        </div>
        <table style="width:100%">
            <thead>
                <tr>
                    <th colspan="2" style="text-align:center">Slot 1</th>
                    <th colspan="2" style="text-align:center">Slot 2</th>
                    <th colspan="2" style="text-align:center">Slot 3</th>
                </tr>
                <tr>
                    <th colspan="2" class="rng-header" style="font-size:1.1em;font-weight:bold;text-align:center;cursor:pointer;" onclick="document.getElementById('c-item-received').scrollIntoView()">
                        ${curr_prng.c/100}
                    </th>
                    <th colspan="2" class="rng-header" style="font-size:1.1em;font-weight:bold;text-align:center;cursor:pointer;" onclick="document.getElementById('a-item-received').scrollIntoView()">
                        ${curr_prng.a/100}
                    </th>
                    <th colspan="2" class="rng-header" style="font-size:1.1em;font-weight:bold;text-align:center;cursor:pointer;" onclick="document.getElementById('b-item-received').scrollIntoView()">
                        ${curr_prng.b/100}
                    </th>
                </tr>
            </thead>
            <tbody>
            ${
                Array(maxLen).fill().map((a,b)=>{
                    let thisHtml = '<tr class="item-row">';

                    let item1 = items_c[b] || {chance: 0};
                    let item2 = items_a[b] || {chance: 0};
                    let item3 = items_b[b] || {chance: 0};

                    var rarity = resolve_rarity(item1,item3,item2);

                    let isR1 = item1.from <= curr_prng.c && curr_prng.c < item1.to;
                    let isR2 = item2.from <= curr_prng.a && curr_prng.a < item2.to;
                    let isR3 = item3.from <= curr_prng.b && curr_prng.b < item3.to;

                    if (item1.chance !== 0) {
                        thisHtml += `
                            <td style=${isR1 ? `"background-color:#f9caff" id="c-item-received"` : ""}><span style="color:${rarity[0]};" title="${item1.chance}% Chance">${item1.name}</span></td>
                            <td style=${isR1 ? "background-color:#f9caff" : ""} title="${curr_prng.c/100}">${(item1.from/100).toFixed(fix_length)} - ${(item1.to/100).toFixed(fix_length)}</td>
                        `;
                    } else {
                        thisHtml += '<td colspan="2"></td>';
                    }
                    if (item2.chance !== 0) {
                        thisHtml += `
                            <td style=${isR2 ? `"background-color:#f9caff" id="a-item-received"` : ""}><span style="color:${rarity[1]};" title="${item2.chance}% Chance">${item2.name}</span></td>
                            <td style=${isR2 ? "background-color:#f9caff" : ""} title="${curr_prng.a/100}">${(item2.from/100).toFixed(fix_length)} - ${(item2.to/100).toFixed(fix_length)}</td>
                        `;
                    } else {
                        thisHtml += '<td colspan="2"></td>';
                    }
                    if (item3.chance !== 0) {
                        thisHtml += `
                            <td style=${isR3 ? `"background-color:#f9caff" id="b-item-received"` : ""}><span style="color:${rarity[2]};" title="${item3.chance}% Chance">${item3.name}</span></td>
                            <td style=${isR3 ? "background-color:#f9caff" : ""} title="${curr_prng.b/100}">${(item3.from/100).toFixed(fix_length)} - ${(item3.to/100).toFixed(fix_length)}</td>
                        `;
                    } else {
                        thisHtml += '<td colspan="2"></td>';
                    }
                
                    thisHtml += '</tr>';

                    return thisHtml;
                }).join("")
            }
            </tbody>
        </table>`;
    };

    dialog.on("click", "#chk_debug", function() {
        dialog.html(debug_template());

        dialog.dialog({
            title: "Marvel Machine PRNG",
            width: "75%",
            height: 'auto',
            position: {my: "center", at: "center", of: document},
            modal: true,
            autoOpen: false,
            buttons: [{
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");
    });

    const simSettingTemplate = `
        <label for="txt_max_records">
            <input type="number" min="-1" id="txt_max_records" style="width:75px;display:inline-block;" value="10"> Max Records In Table
            <em class="info">Set the max records to show in the table. -1 for no max.</em>
            <hr>
        </label>
        <label for="chk_mute">
            Volume Control
            <br>
            <input id="marvel_sound" type="range" min="0" max="100" step="1" value="40"></input>
            <hr>
        </label>
        <label for="chk_debug">
            <button id="chk_debug">Show PRNG Map</button>
        </label>
    `;
    
    simSettingsBtn.on("click", function() {
        dialog.html(simSettingTemplate);
        let txt_max_records = $("#txt_max_records");
        let chk_mute = $("#chk_mute");
        txt_max_records.val(max_records);
        let curr_vol =  window.gachapon.sounds.start.volume;
        $("#marvel_sound").val(curr_vol);

        dialog.dialog({
            title: "Marvel Machine Table Settings",
            width: 500,
            height: 400,
            modal: true,
            autoOpen: false,
            position: {my: "center", at: "center", of: window},
            buttons: [{
                text: "Save",
                click: function() {
                    let this_max_records = +txt_max_records.val();

                    if (this_max_records === 0) {
                        return false;
                    }

                    max_records = this_max_records;

                    gachapon.pop_table();
                    $(this).dialog("close");
                    return true;
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");
    });

    simOptionsBtn.on("click", function() {
        dialog.html(simOptionTemplate);

        if (cache_options.sim_runs !== 0) {
            $("#txt_total_runs").val(cache_options.sim_runs);
        }
        if (cache_options.sim_nx !== 0) {
            $("#txt_nx_cash").val(cache_options.sim_nx);
        }
        if (cache_options.sim_item !== "0") {
            $("#s_item").val(cache_options.sim_item);
        }
        if (cache_options.sim_last !== 0) {
            $("#rsim" + cache_options.sim_last).prop("checked", true);
        }

        if (cache_options.sim_name_contains !== "") {
            $("#txt_con_item").val(cache_options.sim_name_contains);
        }

        

        dialog.dialog({
            title: "Marvel Machine Simulation Options",
            width: 500,
            height: "auto",
            modal: true,
            autoOpen: false,
            position: {my: "center", at: "center", of: window},
            buttons: [{
                text: "Simulate",
                click: function() {
                    let _this = $(this);
                    let type = $(".radio-sim:checked").val();

                    if (type == 1) {
                        let spin_times = +$("#txt_total_runs").val();
                        if (spin_times === 0) return false;
                        cache_options.sim_runs = spin_times;
                        gachapon.runSpin1_prog(spin_times, function(item, cb) {
                            gachapon.runSpin1(item, function() {
                                cb();
                            });
                            _this.dialog("close");
                        });
                    } else if (type == 2) {
                        let thisItem = $("#s_item").val();
                        if (thisItem === "0") return false;
                        cache_options.sim_item = thisItem;
                        gachapon.runSpin1_prog2(1, thisItem, function(item, cb) {
                            gachapon.runSpin1(item, function() {
                                cb();
                            });
                            _this.dialog("close");
                        });
                    } else if (type == 3) {
                        let thisItem = $("#txt_con_item").val();
                        if (thisItem === "") return false;
                        cache_options.sim_name_contains = thisItem;

                        let func = "includes";
                        let slot = -1;

                        if (thisItem.includes("[filter:")) {
                            let func_match = thisItem.match(/\[filter\:(.*?)\]/i);

                            if (func_match == null) {
                                cache_options.sim_name_contains = "";
                                return false;
                            }

                            let func_raw = func_match[0];
                            let func_type = func_match[1];

                            if (func_type == 'start') {
                                func = 'startsWith';
                            } else if (func_type == 'end') {
                                func = 'endsWith';
                            }

                            thisItem = thisItem.replace(func_raw,"");
                        };

                        if (thisItem.includes("[slot:")) {
                            let slot_match = thisItem.match(/\[slot\:(.*?)\]/i);

                            if (slot_match == null) {
                                cache_options.sim_name_contains = "";
                                return false;
                            }

                            let slot_raw = slot_match[0];
                            let slot_type = slot_match[1];

                            //0 - 2, 1 - 3, 2 - 1
                            if (slot_type == 1) {
                                slot = 2;
                            } else if (slot_type == 2) {
                                slot = 0;
                            } else if (slot_type == 3) {
                                slot = 1;
                            }

                            thisItem = thisItem.replace(slot_raw,"");
                        };

                        thisItem = thisItem.toUpperCase();

                        let a_not_exists = true;
                        let b_not_exists = true;
                        let c_not_exists = true;

                        if (slot === -1 || slot == 0) {
                            a_not_exists = gacha_db.a.find((a,b)=>{return a.name.toUpperCase()[func](thisItem);}) == null;
                        }
                        if (slot === -1 || slot == 1) {
                            b_not_exists = gacha_db.b.find((a,b)=>{return a.name.toUpperCase()[func](thisItem);}) == null;
                        }
                        if (slot === -1 || slot == 2) {
                            c_not_exists = gacha_db.c.find((a,b)=>{return a.name.toUpperCase()[func](thisItem);}) == null;
                        }
                        
                        if (
                            a_not_exists && b_not_exists && c_not_exists
                        ) {
                            cache_options.sim_name_contains = "";
                            return false;
                        }

                        gachapon.runSpin1_prog2(2, thisItem, function(item, cb) {
                            gachapon.runSpin1(item, function() {
                                cb();
                            });
                            _this.dialog("close");
                        }, {
                            func: func,
                            slot: slot
                        });
                    } else if (type == 4) {
                        let totNx = +$("#txt_nx_cash").val();
                        let spin_times = calc_func.getSpinsFromNx(totNx);
                        if (spin_times === 0) return false;
                        cache_options.sim_nx = totNx;
                        gachapon.runSpin1_prog(spin_times, function(item, cb) {
                            gachapon.runSpin1(item, function() {
                                cb();
                            });
                            _this.dialog("close");
                        });
                    }

                    return true;
                }
            }, {
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");
    });

    $("#sim-reset").on("click", function() {
        myItems = [];
        gachapon.pop_table(myItems);
        gachapon.spin_cnt = 0;
        $('.spins-left').html(0);
    });

    let slot1_count = [];
    let slot2_count = [];
    let slot3_count = [];
    let maxLen = 0;

    body.on("change", "#s_show", function() {
        let _this = $(this);
        let val = _this.val();
        if (val == 0) {
            dialog.html(generate_stat_table());
        } else if (val == 1) {
            let new_s1 = {}
            for (let i in slot1_count) {
                if (slot1_count[i] !== 0) {
                    new_s1[i] = slot1_count[i];
                }
            }

            let new_s2 = {}
            for (let i in slot2_count) {
                if (slot2_count[i] !== 0) {
                    new_s2[i] = slot2_count[i];
                }
            }

            let new_s3 = {}
            for (let i in slot3_count) {
                if (slot3_count[i] !== 0) {
                    new_s3[i] = slot3_count[i];
                }
            }

            dialog.html(generate_stat_table(false, new_s1, new_s2, new_s3, true));
        } else if (val == 2) {
            let new_s1 = {}
            for (let i in slot1_count) {
                if (slot1_count[i] === 0) {
                    new_s1[i] = slot1_count[i];
                }
            }

            let new_s2 = {}
            for (let i in slot2_count) {
                if (slot2_count[i] === 0) {
                    new_s2[i] = slot2_count[i];
                }
            }

            let new_s3 = {}
            for (let i in slot3_count) {
                if (slot3_count[i] === 0) {
                    new_s3[i] = slot3_count[i];
                }
            }

            dialog.html(generate_stat_table(false, new_s1, new_s2, new_s3, true));
        }

        setTimeout(function(){
            $("#s_show").val(val);
        },1);
    });

    let generate_stat_table = function(refresh = false, _s1 = {}, _s2 = {}, _s3 = {}, trigger = false) {
        if (refresh) {
            slot1_count = [];
            slot2_count = [];
            slot3_count = [];

            let s1Len = sorted_db.s1.length;
            let s2Len = sorted_db.s2.length;
            let s3Len = sorted_db.s3.length;

            for (let j = 0; j < s1Len; ++j) {
                let db = sorted_db.s1[j];
                slot1_count[db.name] = 0;
            }

            for (let j = 0; j < s2Len; ++j) {
                let db = sorted_db.s2[j];
                slot2_count[db.name] = 0;
            }

            for (let j = 0; j < s3Len; ++j) {
                let db = sorted_db.s3[j];
                slot3_count[db.name] = 0;
            }
            

            for (let i = 0; i < myItems.length; ++i) {
                let thisItem = myItems[i];
                for (let j = 0; j < s1Len; ++j) {
                    let db = sorted_db.s1[j];
                    if (thisItem.item_idx === db.item_idx) {
                        ++slot1_count[db.name];
                    }
                }

                for (let j = 0; j < s2Len; ++j) {
                    let db = sorted_db.s2[j];
                    if (thisItem.item_idx === db.item_idx) {
                        ++slot2_count[db.name];
                    }
                }

                for (let j = 0; j < s3Len; ++j) {
                    let db = sorted_db.s3[j];
                    if (thisItem.item_idx === db.item_idx) {
                        ++slot3_count[db.name];
                    }
                }
            }
        }

        let s1_count = [];
        let s2_count = [];
        let s3_count = [];

        if (!trigger && Object.keys(_s1).length === 0) {
            s1_count = slot1_count;
        } else {
            s1_count = _s1;
        }
        if (!trigger && Object.keys(_s2).length === 0) {
            s2_count = slot2_count;
        } else {
            s2_count = _s2;
        }
        if (!trigger && Object.keys(_s3).length === 0) {
            s3_count = slot3_count;
        } else {
            s3_count = _s3;
        }

        let i1 = Object.keys(s1_count);
        let i2 = Object.keys(s2_count);
        let i3 = Object.keys(s3_count);

        maxLen = Math.max(i1.length,i2.length,i3.length);

        let stat_table = `
            <table style="width:100%">
                <thead>
                    <tr>
                        <th style="text-align:center">Chance Color Map</th>
                    </tr>
                </thead>
            ${
                gacha_rarity.map(a=>{
                    return `<tr class="item-row">
                        <td style="text-align:center;color:${a.color}">
                            ${a.minc} - ${a.maxc}%
                        </td>
                    </tr>`
                }).join("")
            }
            </table>
            <div style="clear:both"></div>
            <select id="s_show">
                <option value="0">Show All</option>
                <option value="1">Show Items I Received Only</option>
                <option value="2">Show Items I Haven't Received Only</option>
            </select>
            <div style="clear:both"></div>
            <div class="table-container" style="width:100%">
                <table class="stats">
                    <thead>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Name</th>
                        <th>Count</th>
                    </thead>
                    <tbody>
                        ${
                            Array(maxLen).fill().map((a,b)=>{
                                let thisHtml = '<tr class="item-row">';

                                let item1 = i1[b];
                                let item2 = i2[b];
                                let item3 = i3[b];

                                let i1_chance = (gacha_db.c.find(x => {return x.name === item1}) || {"chance": 0}).chance;
                                let i1_rarity = "black";

                                let i2_chance = (gacha_db.a.find(x => {return x.name === item2}) || {"chance": 0}).chance;
                                let i2_rarity = "black";

                                let i3_chance = (gacha_db.b.find(x => {return x.name === item3}) || {"chance": 0}).chance;
                                let i3_rarity = "black";

                                for (let i = 0; i < gacha_rarity.length; ++i) {
                                    let this_rarity = gacha_rarity[i];
                                    if (i1_chance > this_rarity.minc && i1_chance <= this_rarity.maxc) {
                                        i1_rarity = this_rarity.color;
                                    }
                                    if (i2_chance > this_rarity.minc && i2_chance <= this_rarity.maxc) {
                                        i2_rarity = this_rarity.color;
                                    }
                                    if (i3_chance > this_rarity.minc && i3_chance <= this_rarity.maxc) {
                                        i3_rarity = this_rarity.color;
                                    }
                                }

                                if (i1_chance !== 0) {
                                    thisHtml += `
                                        <td><span style="color:${i1_rarity}" title="${i1_chance}% Chance">${item1}</span></td>
                                        <td>${s1_count[item1]}</td>
                                    `;
                                } else {
                                    thisHtml += '<td colspan="2"></td>';
                                }
                                if (i2_chance !== 0) {
                                    thisHtml += `
                                        <td><span style="color:${i2_rarity}" title="${i2_chance}% Chance">${item2}</span></td>
                                        <td>${s2_count[item2]}</td>
                                    `;
                                } else {
                                    thisHtml += '<td colspan="2"></td>';
                                }
                                if (i3_chance !== 0) {
                                    thisHtml += `
                                        <td><span style="color:${i3_rarity}" title="${i3_chance}% Chance">${item3}</span></td>
                                        <td>${s3_count[item3]}</td> 
                                    `;
                                } else {
                                    thisHtml += '<td colspan="2"></td>';
                                }
                            
                                thisHtml += '</tr>';

                                return thisHtml;
                            }).join("")
                        }
        `;

        return stat_table;
    }

    $("#nx-spent").on("click", function() {
        dialog.html(generate_stat_table(true));

        dialog.dialog({
            title: "Marvel Machine Statistics",
            width: 1000,
            height: 'auto',
            position: {my: "center", at: "center", of: document},
            modal: true,
            autoOpen: false,
            buttons: [{
                text: "Cancel",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");
    });
});

var item_db_rangified = {};
var item_db_rangified_prev = {};
var item_db_prev_upd = true;

function pop_db() {
    if (item_db_prev_upd) {
        item_db_rangified_prev = item_db_rangified;
    } else {
        item_db_prev_upd = true;
    }

    item_db_rangified = {};
    for (let slot in gacha_db) {
        item_db_rangified[slot] = [];
        let shuffled_slot_items = shuffle(gacha_db[slot].slice(0));
        let startAt = 0;
        for (let i = 0; i < shuffled_slot_items.length; ++i) {
            let this_item = shuffled_slot_items[i];
            let new_start_at = startAt + this_item.chance;
            item_db_rangified[slot].push({
                name: this_item.name,
                item_idx: this_item.item_idx,
                category: this_item.category,
                type: this_item.type,
                from: startAt,
                chance: this_item.chance,
                to: (i == shuffled_slot_items.length - 1 ? 100 : new_start_at)
            });

            startAt += this_item.chance;
        }
    }

    if (typeof item_db_rangified_prev.a === 'undefined') {
        item_db_rangified_prev = item_db_rangified;
    }
};

pop_db();

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var table_body = $("#items");
var max_records = 10;
var myItems = [];
var gach_options = {};

Number.prototype.toNumber = function() {
    return this.toLocaleString();
};

var calc_func = {
    calculateNx: function(value) {
        let indivNx = (value % 11) * 4900;
        let bundleNx = Math.floor(value/11) * 49000;

        return bundleNx + indivNx;
    },
    getSpinsFromNx: function(value) {
        let bundle = Math.floor(value / 49000);
        let bundleCost = bundle * 49000;
        let indiv = Math.floor((value - bundleCost) / 4900);

        return (bundle * 11) + indiv;
    }
};

(function ($) {
    $.fn.itemRotator = function (options) {
        var defaults = {
            speed: 600
        }
        var settings = $.extend(defaults, options);

        this.each(function (n) {
            var $this = $(this),
			item = $('.item-icons div', $this),
            item_panel = $this.find('.item-icons'),
            numOfItems = item.length, // Get number of items
			heightOfItem = item.height(), // Get width of item
			itemStrip = numOfItems * heightOfItem, // Calculate the width to set the item strip
			itemPositions = [], // Create an array to hold our item positions
			currentPosition = 1, // Set the current item position
			play, // Timer variable
			disable = false,
            citem = null; // Used to offset the banner rotation
            // Set the width of the strip size of all items combined
            $('.item-icons', $this).css('width', itemStrip);
            $('.prize-list').eq(n).mouseenter(function () { disable = true; }).mouseleave(function () { disable = false; }).find('li').mouseenter(function () {
                //window.gachapon.sounds['short_stick'].play();
                var idx = $(this).data('idx');
                citem = item_panel.children('[data-idx="{0}"]'.format(idx));
                item_panel.css({ top: -(citem.index() * heightOfItem) });
            });

            function switchItems() {
                if (currentPosition < numOfItems - 1) {
                    currentPosition++;
                } else {
                    currentPosition = 0;
                }
                if (!disable) {
                    item_panel.clearQueue().animate({
                        top: -(currentPosition * heightOfItem)
                    }, settings.speed);
                }
            }

            function rotationTimer() {
                play = setInterval(switchItems, 3000);
            }

            startTime = options.speed * n * 2;
            // Start rotation
            setTimeout(
            function () {
                rotationTimer();
            }, startTime);
        });
    }

    $.fn.tabs = function () {
        var last = $(this).filter('.active');
        $('.content-holder.dn').hide().removeClass('dn');
        return $(this).click(function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) return;
            $this.addClass('active');
            if (last != null) {
                last.removeClass('active');
                $('#' + last.data('tab')).hide();
            }
            $('#' + $this.data('tab')).show();
            last = $this;
        });
    }

    function popupShow(name, callback) {
        return false;
    }

    function popupError(msg) {
        return false;
    }
    var gachapon = function () { this.init(); }
    gachapon.prototype = {
        init: function () {
            //this.items = [];
            this.spin_types = [];
            this.is_service_on = false;
            this.is_spin_service_on = false;
            this.event_no = null;
            this.spin_cnt = 0;
            this.spinItems = [];
            this.spin_use_id = null;
            this.spinning = false;
            this.prizeItems = null;
            this.spin2Interval = null;
            this.itemHeight = 0;

            this.nx = null;
            this.sounds = {};
            this.opts = {
                prepaid: '.nx_prepaid',
                credit: '.nx_credit'
            };
            this.banCountries = ['BE'];
            var _this = this;

            soundManager.setup({
                url: '/assets/js/soundmanager/', // required: path to directory containing SM2 SWF files
                debugMode: false,
                useFlashBlock: false // optional - if used, required flashblock.css
            });

            soundManager.onready(function () {
                _this.soundLoad(['start', 'stop', 'error']); //, 'short_stick', 'button-19']);
                soundManager.setVolume('start', 40);
                if (_this.is_spin_service_on) {
                    _this.onActive();
                }
            });

            this.checkService();
            $(function () { // dom ready

                if (_this.spinItems.length < 2)
                    //$('#machine').startWaiting();

                _this.pager = new pageHelper($('#history_pager'), { prev5Btn: null, next5Btn: null });
                _this.dom = {
                    congrats: $('.congrats'),
                    animations: $('#reels .reel-animation'),
                    multipliers: $('#machine .double.hidden'),
                    slots: $('#machine .slot-artboard'),
                    prizes: $('#machine .slot-item .label.coupon'),
                    spin_more: $('#spend-more'),
                    spin_more_pay_type: $('#spend-more input:radio[name=double_funds_source]')
                };

                for (n = 0; n < 3; n++) {
                    var target = _this.dom.slots.eq(n);
                    target.children().clone().appendTo(target);
                }
                _this.itemHeight = _this.dom.slots.eq(0).children(':first').height();

                _this.dom.spin_more.find('.btn-close').click(function () {
                    _this.showDoubleMarble(false);
                });
                _this.dom.spin_more.find('#spend-btn').click(function () {
                    var pay_type = _this.dom.spin_more_pay_type.filter(':checked').val();
                    _this.runSpin2(pay_type == 'prepaid');
                    return false;
                });
                _this.dom.spin_more.find('#refresh-btn').click(function () {
                    _this.updateNXBalance();
                    _this.dom.spin_more_pay_type.eq(0).click();
                    return false;
                });
                _this.dom.spin_more_pay_type.click(function (e) {
                    var type = $(this).val();
                    var parent = $(this).parents('.nx-total').first();
                    var price = _this.spinItems[1][0].price;
                    var oPrices = parent.find('.spin2_price');
                    oPrice = oPrices.filter('.' + type);
                    oPrice.text(price.digits());
                    oPrices.not(oPrice).empty();
                    parent.find('.remain_prepaid').text((_this.nx.prepaid - (type == 'prepaid' ? price : 0)).digits());
                    //parent.find('.remain_credit').text((_this.nx.credit - (type == 'credit' ? price : 0)).digits());
                });

                _this.dom.prizes.find('ul > li p').text('Coupon Code');

                $('#refresh-count').click(function (x) {
                    x.preventDefault();
                    _this.updateRaffleCount();
                });

                $('#spin-btn').click(function (x) {
                    if (_this.spinning) return
                    x.preventDefault();
                    _this.runSpin1();
                });

                $('#marvelmachine-moreinfo').click(function (e) {
                    e.preventDefault();
                    popupShow('detailedGuide');
                    return false;
                });

                $('#tabs li').tabs().filter('[data-tab="coupon-history"]').click(function (e) {
                    e.preventDefault();
                    _this.showHistory();
                });

                $('#search-box').focus(function () {
                    $(this).addClass('searchFocus');
                    $('#search-options').show();
                });

                /*
                $('#search-box').blur(function () {
                    $(this).removeClass('searchFocus');
                    $('#search-options').hide();
                });
                */
                $('#search-wrap').keydown(function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var text = $('#search-box').val();
                        $('#search-options').hide();
                        _this.searchHistory(1, 10, null, text);
                    }
                });

                $('#search-submit').click(function (e) {
                    e.preventDefault();
                    var text = $('#search-box').val();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, null, text);
                });

                $('#search-equip').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 1, null);
                });

                $('#search-use').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 2, null);
                });

                $('#search-etc').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 4, null);
                });

                $('#search-setup').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 3, null);
                });

                $('#search-cash').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 5, null);
                });

                //// test
                //_this.updateNXBalance({ credit: '#credit', prepaid: '#prepaid' });

                $('#more-spins-btn').click(function (e) {
                    e.preventDefault();
                    if (!_this.is_service_on) { popupShow('stopPurchase'); return; }
                    if (!nexon.sso.isLoggedIn) { nexon.gnt.popupLogin(); return; }

                    _this.updateNXBalance();
                    var p = popupShow('getMoreSpins');
                    var types = p.center.find('input:radio[name=payment-type]');
                    var selector = p.center.find('.currentSpins select');

                    function updatePrices() {
                        var option = selector.find('option:selected').data();
                        if (option.origin_price === undefined) return;
                        var paytype = types.filter(':checked').val();
                        var prepaid = _this.nx.prepaid;
                        //var credit = _this.nx.credit;
                        var remain_prepaid = p.center.find('.remain_prepaid');
                        //var remain_credit = p.center.find('.remain_credit');
                        var spin_origin_prices = p.center.find('.spin_origin_price');
                        var spin_prices = p.center.find('.spin_price');
                        var sales_row = p.center.find('.sales_row');

                        var IsSale = (option.origin_price > option.price);
                        var txt_origin = (IsSale ? '<s>- {0} NX Prepaid</s>' : '- {0} NX Prepaid').format(option.origin_price.digits());

                        sales_row.toggle(IsSale);
                        sales_row.next().toggleClass('add-bg', IsSale);

                        //var ind = (paytype == 'prepaid' ? 0 : 1);
                        var ind = 0;
                        //spin_origin_prices.eq((ind + 1) % 2).html('');
                        spin_origin_prices.eq(ind).html(txt_origin);

                        if (IsSale) {
                            var txt_price = '- {0} NX Prepaid'.format(option.price.digits());
                            spin_prices.eq(ind).text(txt_price);
                            //spin_prices.eq((ind + 1) % 2).text('');
                        }

                        //if (paytype == 'prepaid') prepaid -= option.price; else credit -= option.price;
                        prepaid -= option.price;

                        remain_prepaid.text(prepaid.digits());
                        //remain_credit.text(credit.digits());
                    }

                    types.click(function (e) {
                        updatePrices();
                    });
                    selector.change(function (e) {
                        var changed = $(e.target);
                        updatePrices();
                    });

                    types.eq(0).click();
                    p.center.find('.gnt_bot .gnt_button:eq(0)').click(function (e) {
                        e.preventDefault();
                        var value = selector.val();
                        var paytype = types.filter(':checked').val();
                        if (value == '') {
                            alert('Please select quantity');
                            return;
                        }
                        _this.purchaseSpin(value, paytype == 'prepaid', function () {
                            popupShow('thankYou');
                        });
                    });
                });

                /*
                $(".slot-artboard .icon,.prize-container li").balloon({
                    css: { opacity: 1 },
                    minLifetime: 0, showDuration: 0, hideDuration: 0
                });
                */

                $('.item-scroll').itemRotator({
                    speed: 400
                });

                $('#soundToggle').click(function () {
                    $(this).toggleClass('active');
                    $(this).hasClass('active') ? soundManager.unmute() : soundManager.mute();
                    return false;
                });
                /*
                $('#more-spins-btn,#spin-btn, #soundToggle,#gachapon-text a,#tabs li,.btn-close,#spend-btn,#refresh-btn').mouseenter(function () {
                _this.sounds['short_stick'].play();
                }).click(function () {
                _this.sounds['button-19'].play();
                });*/
            });

            /*
            this.updateSpinCnt();
            this.updateRaffleCount();
            */
        }, //////////////////////////////////////////////////////////////////////////
        soundLoad: function (array) {
            for (var n = 0, len = array.length; n < len; n++) {
                var name = array[n];
                this.sounds[name] = soundManager.createSound({
                    id: name,
                    url: 'http://nxcache.nexon.net/maplestory/shop/gachapon/sound/' + name + '.mp3'
                });
            }
        },
        onActive: function () {
            for (var sound in this.sounds) {
                if (!this.sounds.hasOwnProperty(sound)) continue;
                this.sounds[sound].load();
            }
        },
        checkService: function () {
            return false;
        },
        apicall: function (opts, callback, callback_fail, req_type) {
            return false;
        },
        updateRaffleCount: function () {
            return false;
            $(function () {
                $('#raffle-count').text(bal);
                $('#ticket-count').text(bal);
            });
        },
        updateSpinCnt: function (p = false, o = 1) {
            if (!p) return false;
            this.spin_cnt += o;
            $('.spins-left').html(this.spin_cnt);
        },
        useSpin: function (type, use_id = "", callback, fail) {
            /*
            let testData = {
                spin_use_id: 1,
                prizes: [{
                    item_idx: 8453, //2nd (A)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8533, //3rd (B)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8724, //1st (C)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }]
            };
            */

            let data = this.generate_item();

            callback.call(this, data);

            return false;
        },
        runSpin1: function (thisItem, callback) {
            //this.spin_cnt = 0;
            this.spinning = true;
            var start = +new Date();

            this.sounds['start'].play();

            this.dom.congrats.hide();
            this.dom.multipliers.hide();
            //this.dom.animations.show();
            //this.dom.slots.hide();

            this.dom.prizes.find('ul > li:nth-child(2)').remove();
            this.dom.prizes.find('ul > li p').text('Coupon Code');

            this.spin_use_id == null

            this.dom.slots.animate({ top: '-=1000' }, 1000, 'easeInQuad').animate({ top: '-=' + (this.itemHeight * 40) }, 2000, 'linear');

            var _this = this;

            if (typeof thisItem !== 'undefined') {
                var diff = (+new Date()) - start;

                let data = thisItem;
                setTimeout(function () {
                    _this.selectPrize(0, data.prizes[2]);
                    setTimeout(function () {
                        _this.selectPrize(2, data.prizes[1]);
                        setTimeout(function () {
                            _this.selectPrize(1, data.prizes[0], function () {
                                _this.dom.congrats.show().removeClass('hidden');
                                _this.spinning = false;
                                item_db_prev_upd = false;
                                pop_db();
                                $('#spin-btn').prop("disabled", false);
                                if (typeof callback === 'function') {
                                    callback(); 
                                } else {
                                    _this.pop_table([data]);
                                }
                            });
                        }, 700);
                    }, 700);
                }, 1500 - diff);
            } else {
                // call api and get prizes info
                this.useSpin(1, "", function (data) {
                    var diff = (+new Date()) - start;

                    this.spin_use_id = data.spin_use_id;

                    setTimeout(function () {
                        _this.selectPrize(0, data.prizes[2]);
                        setTimeout(function () {
                            _this.selectPrize(2, data.prizes[1]);
                            setTimeout(function () {
                                _this.selectPrize(1, data.prizes[0], function () {
                                    _this.dom.congrats.show().removeClass('hidden');
                                    _this.updateSpinCnt(true);
                                    _this.spinning = false;
                                    pop_db();
                                    $('#spin-btn').prop("disabled", false);
                                    _this.pop_table([data]);
                                });
                            }, 700);
                        }, 700);
                    }, 1500 - diff);
                });
            }
        },
        runSpin1_prog: function(count = 1, callback) {
            let item_arr = [];
            for (var i = 0; i < count; ++i) {
                item_arr.push(this.generate_item());
                pop_db();
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, count);
                    _this.pop_table(item_arr);
                });
            }
        },
        runSpin1_prog2: function(type, item_idx, callback, options) {
            let item_arr = [];
            let is_item = false;
            let numSpins = 0;
            
            while (!is_item) {
                ++numSpins;
                let this_item = this.generate_item();
                item_arr.push(this_item);
                pop_db();

                for (let i = 0; i < this_item.prizes.length; ++i) {
                    let this_prize = this_item.prizes[i];
                    if (type == 1) {
                        if (this_prize.item_idx === item_idx) {
                            is_item = true;
                            break;
                        }
                    } else if (type == 2) {
                        if (options.slot >= 0) {
                            if (options.slot !== i) {
                                continue;
                            }
                        }
                        if (this_prize.name.toUpperCase()[options.func](item_idx)) {
                            is_item = true;
                            break;
                        }
                    }
                }
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, numSpins);
                    _this.pop_table(item_arr);
                });
            }
        },
        generate_item: function() {
            let items = {};
            for (let i in item_db_rangified) {
                let item = item_db_rangified[i];
                let prn = this.cryptoRandom() * 100;
                let thisItem = item.find((a)=>{return a.from <= prn && prn < a.to});

                let prize = {
                    item_idx: thisItem.item_idx,
                    coupon_code: this.generateCouponCode(),
                    name: thisItem.name,
                    category: thisItem.category,
                    type: thisItem.type,
                    chance: thisItem.chance,
                    prn: prn
                };
                items[i] = prize;
            }

            let data = {
                spin_use_id: 1,
                prizes: [items.a, items.b, items.c]
            };

            return data;
        },
        pop_table: function(data = []) {
            if (data.length > 0) {
                for (let a = 0; a < data.length; ++a) {
                    let _data = data[a];
                    for (let i = 0; i < _data.prizes.length; ++i) {
                        let _tp = _data.prizes[i];
                        myItems.push(_tp);
                    }
                }
            }

            let thesePrizes = "";
            let _myItems = [];
            if (max_records !== -1) {
                _myItems = myItems.slice(Math.max(myItems.length - max_records, 0));
            } else {
                _myItems = myItems;
            }
            var thisDate = new Date().toLocaleDateString();
            for (let i = _myItems.length - 1; i >= 0; --i) {
                let _tp = _myItems[i];
                thesePrizes += `<tr class="item-row">
                    <td>${thisDate}</td>
                    <td>${_tp.name}</td>
                    <td>${_tp.coupon_code}</td>
                    <td>${thisDate}</td>
                </tr>`
            }

            table_body.html(thesePrizes);
            if (myItems.length > 0) {
                let bundle = myItems.length / 3;

                let nxSpent = calc_func.calculateNx(bundle);

                $("#nx-spent").html(nxSpent.toNumber() + " NX Spent");
            } else {
                $("#nx-spent").html("0 NX Spent");
            }
        },
        stopSpin1: function () {
            console.log("stopped");
            this.dom.slots.clearQueue().stop().css({ top: 0 });
            this.spinning = false;
            this.sounds['start'].stop();
        },
        selectPrize: function (n, item, callback) {
            //$('.reel-strip').eq(n).show().css({ top: iconReelPositions[prize] }); spin = true;
            var target = this.dom.slots.eq(n);
            var oItems = target.children(`[data-idx="${item.item_idx}"]`);
            var index = oItems.eq(1).index();
            var height = this.itemHeight;
            target.clearQueue().stop().css({ top: -(height * (index - 9)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                //target.clearQueue().stop().css({ top: -(height * (index - 10)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                window.gachapon.sounds['stop'].play();
                $(window.gachapon.dom.prizes[n]).text(item.coupon_code);
                //$(this).css({ top: -((height * oItems.eq(0).index()) + 97), opacity: 0 }).animate({ opacity: 1 });
                $(this).css({ top: -((height * oItems.eq(0).index()) - 70), opacity: 0 }).animate({ opacity: 1 });
                if (typeof callback == 'function') callback.call(this);
            });
            this.dom.animations.eq(n).hide();
        },
        cryptoRandom: function() {
            let arr = new Uint32Array(2);
            crypto.getRandomValues(arr);
            let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
            return m * Math.pow(2,-52);
        },
        generateCouponCode: function() {
            let result = '';
            const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let charactersLength = characters.length;
            for (let i = 0; i < 17; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return "Y" + result;
        }
    }
    window.gachapon = new gachapon();
})(jQuery);