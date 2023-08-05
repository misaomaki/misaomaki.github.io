var item = function(it) {
    if (typeof structuredClone != undefined) {
        this.idata = structuredClone(it);
    } else {
        this.idata = JSON.parse(JSON.stringify(it));
    }
};

item.prototype.cache = {
    dom: {}, //ui
    eg: {}, //equipment stat boost, item
    sr: {}, //current star success, level + star
    sc: {}, //current star cost, level + star
    sf_meta_data: {
        id: 0,
        sf_cost: 0,
        sf_cost_discount: {},
        is_safeguard: false,
        prn: 0,
        prn_map: [],
        star: 0,
        result: "",
        sk_cost: 0
    }, //object for meta_data for starforce logging
    scrl: { //item scrolls, start with _  is spell trace
        //weapon trace
        _100w: {
            main: 1,
            att: 3
        },
        _70w: {
            main: 2,
            att: 5
        },
        _30w: {
            main: 3,
            att: 7
        },
        _15w: {
            main: 4,
            att: 9
        },
        //armor, shield, shoulder trace
        _100a: {
            main: 3,
            hp: 30,
            def: 3
        },
        _70a: {
            main: 4,
            hp: 70,
            def: 5
        },
        _30a: {
            main: 7,
            hp: 120,
            def: 10
        },
        //glove trace
        _100g: {
            att: 1
        },
        _70g: {
            att: 2
        },
        _30g: {
            att: 3
        },
        //heart trace
        _100h: {
            att: 2
        },
        _70h: {
            att: 3
        },
        _30h: {
            att: 5
        },
        //other trace
        _100m: {
            main: 2
        },
        _70m: {
            main: 3
        },
        _30m: {
            main: 5
        },
        prime_weapon: {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            watt: 10,
            matt: 10
        },
        prime_armor: {
            str: 10,
            dex: 10,
            int: 10,
            luk: 10,
            def: 10
        },
        prime_accessory: {
            str: 10,
            dex: 10,
            int: 10,
            luk: 10
        },
        basic_gollux: {
            str: 1,
            dex: 1,
            int: 1,
            luk: 1,
            watt: 2,
            matt: 2
        },
        advanced_gollux: {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            watt: 4,
            matt: 4
        },
        evolution: {
            att: 8
        },
        dragon_stone: {
            str: 15,
            dex: 15,
            int: 15,
            luk: 15,
            hp: 750,
            def: 350
        }
    } //scroll data
};

item.prototype.clear_sf_history = function() {
    this.idata.meta.sf_meta_data = [];
    return this;
};

item.prototype.is_droppable = function(current_star) {
    if (this.idata.superior) {
        return current_star !== 0;
    };

    return !(current_star < GLOBAL.starforce.min_droppable_star || [10,15,20].includes(current_star));
};

item.prototype.set_item_level = function(star = 0) {
    let sf_data = [];
    this.idata.meta.stars = 0;
    this.idata.boosts.sf_data = [];

    let max_star = 0;

    if (this.idata.stars !== -1) {
        max_star = this.idata.stars;
    } else {
        max_star = star_max(this.idata.level, this.idata.superior);
    }

    if (max_star < star) {
        star = max_star;
    }

    for (let i = 0; i < star; ++i) {
        let sf = this.check_cache(()=>{
            return equip_gain(this.idata);
        }, "eg", "_" + this.idata.level + i + this.idata.superior);

        sf_data.push(sf);
        this.idata.meta.stars += 1;
    }

    this.idata.meta.chance_time = false;
    this.idata.meta.chance_count = 0;

    this.idata.boosts.sf_data = sf_data;

    return this;
};

//set various metadata values
item.prototype.set_meta_options = function(o) {
    for (let i in o) {
        this.idata.meta[i] = o[i];
    }
};

//[{stat, percent, amount}]
item.prototype.set_item_scroll = function(s) {
    let max_scrolls = this.idata.upgrades + this.idata.max_hammers;
    let curr_scrolls = 0;
    let spell_trace_used = 0;

    this.idata.boosts.scroll_data = [];

    for (let i = 0; i < s.length; ++i) {
        if (curr_scrolls >= max_scrolls) break;

        let _s = s[i];

        /* chaos scroll */
        if (cogs.types.includes(_s.type)) {
            cogs.scroll.call(this, _s.type, false);
            curr_scrolls += 1;
            continue;
        }

        let stat_gain = this.idata.mstat;
        let has_lower_val = false;

        if (_s.type.startsWith("_")) {
            if (this.idata.class === "weapon") {
                _s.type = _s.type + "w";
            } else if (["hat", "top", "bottom", "shoes", "cape", "shoulder", "shield"].includes(this.idata.type)) {
                _s.type = _s.type + "a";
            } else if (this.idata.type === "gloves") {
                _s.type = _s.type + "g";
            } else if (this.idata.type === "mechanical heart") {
                _s.type = _s.type + "h";
                has_lower_val = true;
            } else {
                _s.type = _s.type + "m";
                has_lower_val = true;
            }            
                
            spell_trace_used += _s.amount;
        } else if (_s.type === "prime") {
            if (this.idata.class === "weapon" || this.idata.type === "mechanical heart") {
                _s.type = "prime_weapon";
            } else if (this.idata.class === "armor" && this.idata.sub_class !== "accessory") {
                _s.type = "prime_armor";
            } else if (this.idata.sub_class = "accessory") {
                _s.type = "prime_accessory";
            }
        }

        if (_s.stat != null) {
            stat_gain = _s.stat;
        }

        let scr_type = this.cache.scrl[_s.type];
        let scr_amount = _s.amount;

        if (scr_amount === "max") {
            scr_amount = max_scrolls;
        }

        let this_stat = Object.assign({}, stats);

        this_stat.stat_success = true; //can replace with false if scrolling functionality is added. false will not add the stats of that scroll

        for (let j in scr_type) {
            let _j = j;

            if (j === 'main') {
                _j = stat_gain;
            } else if (j === 'att') { 
                if (this.idata.att_type === "att") {
                    _j = stat_gain;
                } else {
                    _j = this.idata.att_type;
                }
            } 

            let stat_val = (scr_type[j] - (has_lower_val && this.idata.level < 100 ? 1 : 0))

            if (j === "main") {
                stat_val = stat_val * (stat_gain === "hp" ? 50 : 1);
            } else if (j === "hp" && stat_gain === "hp") {
                stat_val = 0;
            }

            this_stat[_j] += stat_val;
        }

        for (let k = 0; k < scr_amount; ++k) {
            if (curr_scrolls >= max_scrolls) break;
            this.idata.boosts.scroll_data.push(this_stat);
            curr_scrolls += 1;
        }
    }

    /* more than 4 spell traces used = +1 att */
    if (spell_trace_used >= 4) {
        this.idata.boosts.other_stats[this.idata.att_type] += 1;   
    }

    return true;
};

//add or remove star
//type: 0 - increase star, 1 - drop star, 2 - destroy
item.prototype.xgrade_item = function(type = 0) {
    let level = this.idata.level;
    let current_star = this.idata.meta.stars;

    let is_droppable = this.is_droppable(current_star);

    //commit log item
    //don't log on item initialization
    if (this.idata.meta.sf_log_item.id != null) {
        let cb_safeguard = this.check_cache(()=>{
            return sfcon.find(".sf-safeguard");
        }, "dom", "sf_safeguard");

        let is_safeguardable = !this.idata.superior && current_star >= GLOBAL.starforce.safeguard_stars.min && current_star < GLOBAL.starforce.safeguard_stars.max;
        let is_safeguard = !cb_safeguard.hasClass("disabled") && cb_safeguard.hasClass("checked");

        let safeguard_multiplier = is_safeguardable && is_safeguard && !this.idata.meta.chance_time ? 2 : 1;

        //get the log data for the previous run, as we start off with showing the next star cost
        let cache_name_lvl_star = "_" + level + current_star + "_" + this.idata.superior;

        let sc_type = star_cost_type(this.idata.type);

        let this_star_cost_prev = this.check_cache(()=>{
            return star_cost(level, current_star, this.idata.meta.starforce_type, this.idata.superior, sc_type);
        }, "sc", cache_name_lvl_star + "_" + this.idata.meta.starforce_type + "_" + sc_type);

        let this_star_cost_prev_effective = this_star_cost_prev * safeguard_multiplier;

        let cost_chart = this.log_starforce_cost(is_safeguardable && is_safeguard, this_star_cost_prev, this_star_cost_prev_effective, current_star);

        this.idata.meta.sf_log_item.star_cost_discount = cost_chart;
        this.idata.meta.sf_log_item.star_cost = this_star_cost_prev * safeguard_multiplier;
        this.idata.meta.sf_log_item.sk_coin_cost = this.idata.shadowknight ? shadowknight_coin_cost(current_star) : 0;

        //cumulative sf cost
        if (this.idata.meta.sf_meta_data.length === 0) {
            this.idata.meta.sf_log_item.sf_cost = this_star_cost_prev * safeguard_multiplier;
            this.idata.meta.sf_log_item.sf_cost_discount = cost_chart;
            this.idata.meta.sf_log_item.sk_cost = this.idata.meta.sf_log_item.sk_coin_cost;
        } else {
            let prev_item = this.idata.meta.sf_meta_data[0];
            let prev_sf_cost_discount = Object.assign({}, this.idata.meta.sf_meta_data[0].sf_cost_discount);
            this.idata.meta.sf_log_item.sf_cost = prev_item.sf_cost + (this_star_cost_prev * safeguard_multiplier);
            this.idata.meta.sf_log_item.sk_cost += prev_item.sk_cost + this.idata.meta.sf_log_item.sk_coin_cost;

            for (let i in cost_chart) {
                prev_sf_cost_discount[i] += cost_chart[i];
            }

            this.idata.meta.sf_log_item.sf_cost_discount = prev_sf_cost_discount;
        }

        this.idata.meta.sf_meta_data.unshift(this.idata.meta.sf_log_item);
    }

    if (type === 0) {
        let stat_add = this.cache.eg["_" + level + current_star + "_" + this.idata.superior];
        this.idata.boosts.sf_data.push(stat_add);

        this.idata.meta.stars += 1;
    } else if (type === 1) {
        if (is_droppable) {
            this.idata.boosts.sf_data.pop();
            this.idata.meta.stars -= 1;
        }
    } else {
        let d_star = 0;
        
        if (!this.idata.superior) {
            d_star = 12;
        }

        this.set_item_level(d_star);
        this.idata.meta.stars = d_star;
    }

    this.idata.meta.sf_log_item.events = Object.assign({}, event_options);
    let additional_stars = (type === 0 && this.idata.meta.stars <= 11 && event_options.pre10x2 ? 1 : 0);
    this.idata.meta.sf_log_item.star = this.idata.meta.stars + additional_stars;
    this.idata.meta.stars += additional_stars;

    this.redraw();
};


//base att + att from scrolls
//def works, too
item.prototype.starforce_att_percent = function(att = 0, bwatt = 0, p_arr = []) {
    if (att === 0) return 0;

    let curr_att = att;

    for (let i = 0; i < p_arr.length; ++i) {
        if (p_arr[i] === 0) continue;

        let att_gain = 1 + Math.floor(curr_att * p_arr[i]);
        curr_att += att_gain;
    }

    return curr_att - att;
};

/* get the starforce results */
item.prototype.starforce_result = function(starcatch = false) {
    //generate log item
    this.idata.meta.sf_log_item =  Object.assign({}, this.cache.sf_meta_data);
    this.idata.meta.sf_log_item.id = this.idata.meta.sf_meta_data.length + 1; 

    //generate random number to compare against
    let pval = 0;
    
    let level = this.idata.level;
    let current_star = this.idata.meta.stars;
    
    //generate a result map to compare the prng value to
    let sr_catch = this.cache.sr["_" + level + current_star + "_" + this.idata.superior];

    let prn_map = {};
    let r_type = get_random_result(sr_catch, (a)=>{
        prn_map = a;
    }, (a)=>{
        pval = a;
    });

    this.idata.meta.sf_log_item.prn_map = prn_map;
    this.idata.meta.sf_log_item.prn = pval;

    //5/10/15 100% event
    if (!this.idata.superior && event_options._51015 && [5,10,15].includes(current_star)) {
        r_type = "success";
    } 

    let cb_safeguard = this.check_cache(()=>{
        return mcon.find(".sf-safeguard");
    }, "dom", "sf_safeguard"); 
    
    let safeguard = cb_safeguard.hasClass("checked") && !cb_safeguard.hasClass("disabled");

    //no boom pre-15 event
    if (r_type === "destroy" && event_options.nb15) {
        if (!this.idata.superior && current_star < 15) {
            r_type = "fail-safeguard";
        } else if (this.idata.superior && current_star < 8) {
            r_type = "fail-safeguard";
        }
    } 

    if (this.idata.meta.chance_time) {
        r_type = "chance_time_success";

        this.idata.meta.chance_count = 0;
        this.idata.meta.chance_time = false;
    }

    if (r_type !== "chance_time_success") {
        if (r_type === "fail" || (r_type === "sc_success" && !starcatch)) {
            if (r_type === "sc_success" && !starcatch) {
                r_type = "sc_fail";
            }
            let is_droppable = this.is_droppable(current_star);
            if (is_droppable) {
                this.idata.meta.chance_count += 1;

                if (this.idata.meta.chance_count == 2) {
                    this.idata.meta.chance_time = true;
                }
            }
        } else if (r_type === "success" || r_type === "sc_success") {
            this.idata.meta.chance_count = 0;
            this.idata.meta.chance_time = false;
        } else if (r_type === "destroy" && safeguard) {
            r_type = "fail-safeguard";
        }
    }

    this.idata.meta.sf_log_item.result = r_type;
    return r_type;
};

/* get starforce result and update the item's stars */
item.prototype.starforce = function(starcatch = false) {
    let result = this.starforce_result(starcatch);

    if (result.includes("success")) {
        Item.xgrade_item(0);
        Item.idata.meta.starcatch.count += 1;

        /* ??? */
        if (Item.idata.meta.stars >= 22) {
            congrats_from_maki();
        }
    } else if (result.includes("fail")) {
        Item.xgrade_item(1);
    } else {
        Item.xgrade_item(2);
    }

    return result;
}

//update item stats on tooltip screen
//pass parts to update specific parts of the tooltip
item.prototype.redraw_item_tooltip = function() {
    //dom cache
    let i_con = this.check_cache(()=>{
        return $(".item-main-border");
    }, "dom", "i_con");   
    let istats = this.check_cache(()=>{
        return i_con.find(".item-stats");
    }, "dom", "istats");   
    let icube = this.check_cache(()=>{
        return i_con.find(".item-cube");
    }, "dom", "icube");   
    let imisc = this.check_cache(()=>{
        return i_con.find(".item-misc");
    }, "dom", "imisc");   
    let iname = this.check_cache(()=>{
        return i_con.find(".item-current-name");
    }, "dom", "iname");   
    let istar = this.check_cache(()=>{
        return i_con.find(".item-star");
    }, "dom", "istar");   
    let ipic = this.check_cache(()=>{
        return i_con.find(".item-container-item");
    }, "dom", "ipic");   
    let istar_con = this.check_cache(()=>{
        return i_con.find(".item-star-container");
    }, "dom", "istar_con");
    let iflag = this.check_cache(()=>{
        return i_con.find(".item-container-flag");
    }, "dom", "iflag");    
    let isub = this.check_cache(()=>{
        return i_con.find(".item-sub-description");
    }, "dom", "isub");

    

    //total stats from all sources: flames, stars, and scrolls
    let e_stats = Object.assign({}, stats);

    let base_stats = Object.assign({},this.idata.bstat);
    let flame_stats = Object.assign({},this.idata.boosts.flames);

    let sf_total_gain = equip_gain_total(this.idata.boosts.sf_data);
    let scr_total_gain = equip_gain_total(this.idata.boosts.scroll_data);
    let other_stats = $.extend(true, {}, this.idata.boosts.other_stats);

    let scroll_count = this.idata.boosts.scroll_data.length;
    let item_name = this.idata.name;

    let att_p = [];
    let def_p = [];

    for (let i in e_stats) {
        if (["primary", "star"].includes(i)) continue;

        if (!i.endsWith("_p")) {
            e_stats[i] += base_stats[i];
            //for items that don't have matt, if it has absolutely no base matt, then dont display 
            //and dont apply star force on top of it
            if (i === "matt") {
                if (this.idata.class !== "weapon" || (base_stats.matt + scr_total_gain.matt) > 0) {
                    e_stats[i] += sf_total_gain[i];
                    e_stats[i] += scr_total_gain[i];
                } else {
                    sf_total_gain[i] = 0;
                }
            } else {
                e_stats[i] += sf_total_gain[i];
                e_stats[i] += scr_total_gain[i];
            }
            e_stats[i] += flame_stats[i];
            e_stats[i] += other_stats[i];
        }

        //blue stats in the parenthesis
        let curr_i = i.replace("_p", "") + "_upgrade";
        if (e_stats[curr_i] == null || !e_stats[curr_i]) {
            e_stats[curr_i] = sf_total_gain[i] !== 0 || scr_total_gain[i] !== 0 || flame_stats[i] !== 0;
        }
    }

    for (let i = 0; i < this.idata.boosts.sf_data.length; ++i) {
        let _sf = this.idata.boosts.sf_data[i];

        //att = both
        if (this.idata.att_type === "att") {
            att_p.push(_sf.watt_p);
            att_p.push(_sf.matt_p);
        } else {
            att_p.push(_sf[this.idata.att_type + "_p"]);
        }
        def_p.push(_sf.def_p);
    }

    //job stats
    if (sf_total_gain.job_stats > 0) {
        if (this.idata.pstat.includes("str")) {
            e_stats.str += sf_total_gain.job_stats;
            sf_total_gain.str += sf_total_gain.job_stats;
            e_stats.str_upgrade = true;
        }
        if (this.idata.pstat.includes("dex")) {
            e_stats.dex += sf_total_gain.job_stats;
            sf_total_gain.dex += sf_total_gain.job_stats;
            e_stats.dex_upgrade = true;
        }
        if (this.idata.pstat.includes("int")) {
            e_stats.int += sf_total_gain.job_stats;
            sf_total_gain.int += sf_total_gain.job_stats;
            e_stats.int_upgrade = true;
        }
        if (this.idata.pstat.includes("luk")) {
            e_stats.luk += sf_total_gain.job_stats;
            sf_total_gain.luk += sf_total_gain.job_stats;
            e_stats.luk_upgrade = true;
        }
    }

    //visible stats
    if (sf_total_gain.visible_stats > 0) {
        if (base_stats.str + scr_total_gain.str > 0) {
            e_stats.str += sf_total_gain.visible_stats;
            sf_total_gain.str += sf_total_gain.visible_stats;
            e_stats.str_upgrade = true;
        }
        if (base_stats.dex + scr_total_gain.dex > 0) {
            e_stats.dex += sf_total_gain.visible_stats;
            sf_total_gain.dex += sf_total_gain.visible_stats;
            e_stats.dex_upgrade = true;
        }
        if (base_stats.int + scr_total_gain.int > 0) {
            e_stats.int += sf_total_gain.visible_stats;
            sf_total_gain.int += sf_total_gain.visible_stats;
            e_stats.int_upgrade = true;
        }
        if (base_stats.luk + scr_total_gain.luk > 0) {
            e_stats.luk += sf_total_gain.visible_stats;
            sf_total_gain.luk += sf_total_gain.visible_stats;
            e_stats.luk_upgrade = true;
        }
    }

    if (base_stats.def !== 0 && sf_total_gain.def_p > 0) {
        e_stats.def_upgrade = true;
    }

    //item tooltip stats in order of how Maplestory shows it
    let order = [{
        name: "Rank",
        value: "rank",
        type: "raw" //no +
    }, {
        name: "STR",
        value: "str"
    },{
        name: "DEX",
        value: "dex"
    },{
        name: "INT",
        value: "int"
    },{
        name: "LUK",
        value: "luk"
    },{
        name: "MaxHP",
        value: "hp"
    },{
        name: "MaxHP",
        value: "p_hp",
        type: "%",
        symbol: "%"
    },{
        name: "MaxMP",
        value: "mp"
    },{
        name: "MaxMP",
        value: "p_mp",
        type: "%",
        symbol: "%"
    },{
        name: "Attack Power",
        value: "watt"
    },{
        name: "Magic Attack",
        value: "matt"
    },{
        name: "Defense",
        value: "def"
    },{
        name: "Required Level",
        value: "reqlvl"
    },{
        name: "Speed",
        value: "speed"
    },{
        name: "Jump",
        value: "jump"
    },{
        name: "Knockback Chance",
        value: "knockback",
        type: "%",
        symbol: "%"
    },{
        name: "Boss Damage",
        value: "boss_damage",
        type: "%",
        symbol: "%"
    },{
        name: "Ignored Enemy DEF",
        value: "ied",
        type: "%",
        symbol: "%"
    },{
        name: "Damage",
        value: "damage",
        type: "%",
        symbol: "%"
    },{
        name: "All Stats",
        value: "all_stat",
        type: "%",
        symbol: "%"
    }];

    let b_watt = base_stats.watt + scr_total_gain.watt;

    let percent_stats = {
        watt: 0,
        matt: 0,
        def: 0
    };

    if (att_p.length > 0) {
        percent_stats = {
            watt: this.starforce_att_percent(b_watt, b_watt, att_p),
            matt: this.starforce_att_percent(base_stats.matt + scr_total_gain.matt, b_watt, att_p),
        };

        e_stats.watt += percent_stats.watt;
        e_stats.matt += percent_stats.matt;
    }

    //neb compensation assumes 25% boss dmg neb was applied
    //does it use weapon att for magic-att item?
    if (this.idata.meta.nebulite_compensation && this.idata.class === "weapon") {
        let neb_stats = 1 + Math.floor(b_watt * 0.04);

        other_stats[this.idata.att_type] += neb_stats;
        e_stats[this.idata.att_type] += neb_stats;
        e_stats[this.idata.att_type + "_upgrade"] = true; //display the neb bonus in blue
    }

    if (def_p.length > 0) {
        percent_stats.def = this.starforce_att_percent(base_stats.def + scr_total_gain.def, 0, def_p);
        e_stats.def += percent_stats.def;
    }
    
    let html = `
        Type: ${this.idata.type.capitalize()} <br>
        ${this.idata.class === "weapon" && this.idata.sub_class !== "secondary" ? `
            Attack Speed: ${item_meta.enum.attack_speed[this.idata.weapon_data.speed]} (Stage ${this.idata.weapon_data.speed}) <br>
        ` : ''}
        ${
            order.reduce((b, a)=>{
                let a_type = a.type || "";
                let a_symbol = a.symbol || "";

                if (a_type === "%") {
                    base_stats[a.value] = Math.round(base_stats[a.value] * 100);
                    e_stats[a.value] = Math.round(e_stats[a.value] * 100);
                    flame_stats[a.value] = Math.round(flame_stats[a.value] * 100);
                    other_stats[a.value] = Math.round(other_stats[a.value] * 100);
                }

                let tot_gain = sf_total_gain[a.value] + scr_total_gain[a.value] + other_stats[a.value];

                let sf_gain = sf_total_gain[a.value];
                let other_gain = scr_total_gain[a.value] + other_stats[a.value];

                if (["watt", "matt", "def"].includes(a.value)) {
                    tot_gain += percent_stats[a.value];
                    sf_gain += percent_stats[a.value];
                }

                //for matt, if all sources have no matt, then don't display matt on the tooltip
                if (a.value === "matt") {
                    if (this.idata.class === "weapon" && percent_stats.matt + flame_stats.matt + base_stats.matt + other_stats[a.value] === 0) {
                        return b;
                    } 
                }

                /* keep track of the total calculated stats. used for chaos scrolls */
                this.idata.meta.final_stats[a.value] = e_stats[a.value];

                b += `
                    ${a.value === "reqlvl" ? `
                        ${
                            e_stats[a.value] !== 0 ?
                            `${a.name} : ${e_stats[a.value]}${a_symbol} <br>`
                            :
                            ``
                        }
                    ` : `
                        ${ e_stats[a.value] > 0 ?
                            `<span class="${e_stats[a.value + "_upgrade"] ? "item-color-stat-upgrade" : ""}">
                                ${a.name}: ${a_type !== "raw" ? "+" : ""}${e_stats[a.value]}${a_symbol}
                                ${e_stats[a.value + "_upgrade"] ?
                                    `<span class="item-color-base">(${base_stats[a.value]}${a_symbol}</span>
                                        ${
                                            flame_stats[a.value] > 0 ?
                                            `<span class="item-color-flame">+${flame_stats[a.value]}${a_symbol}</span></span>` : '' 
                                        }
                                        ${
                                            tot_gain != 0 && !system.itt_kms_new ?
                                            `<span class="${tot_gain < 0 ? 'item-color-negative' : 'item-color-stat-upgrade'}">${tot_gain < 0 ? '' : '+'}${tot_gain}${a_symbol}</span>`
                                            :
                                            ''
                                        }
                                        ${
                                            sf_gain != 0 && system.itt_kms_new ? `
                                            <span class="${sf_gain < 0 ? 'item-color-negative' : 'item-color-starforce'}">${sf_gain < 0 ? '' : '+'}${sf_gain}</span>
                                            ` : ""
                                        }
                                        ${
                                            other_gain != 0 && system.itt_kms_new ? `
                                            <span class="${other_gain < 0 ? 'item-color-negative' : 'item-color-scrolls'}">${other_gain < 0 ? '' : '+'}${other_gain}</span>
                                            ` : ""
                                        }
                                        [[remove]]<span class="item-color-base">)</span>` 
                                    : ''
                                }
                            </span> <br>
                            ` : ''
                        }
                    `}
                `;

                return b;
            }, "").replace(/\s\s+\[\[remove\]\]/gi, "")
        }
        ${this.idata.scrollable ? `
        Remaining Enhancements: ${this.idata.hammers_added + this.idata.upgrades - this.idata.boosts.scroll_data.length} <br>
        <span class="item-color-recovery">(Available Recoveries: 0)</span> <br>
        Hammers Applied: ${this.idata.hammers_added} ${this.idata.hammers_added == 2 ? "(MAX)" : ""}
        `: ""}
    `;

    istats.html(html);

    iflag.attr("class", "item-container-flag"); /* reset flag status to nothing */

    let this_pot = this.idata.meta.cube_potential;
    let this_b_pot = this.idata.meta.cube_potential_bonus;
    let cube_html = "";

    isub.html('');
    
    //main and bonus potential stuff
    if (this_pot !== "") {
        isub.html(`(${this_pot.capitalize()} Item)`);
        
        let main_pot = this.idata.boosts.cubes.main;
        let main_pot_keys = Object.keys(this.idata.boosts.cubes.main);

        /* replace the border flag of the item based on the potential of the main pot */
        if (this_pot !== "") {
            iflag.addClass(`item-flag-${this_pot}`);
        }

        //has main pot
        if (main_pot_keys.length > 0) {
            cube_html += `
            <div class="item-dash-border" style="margin-bottom:0px"></div>
            <div class="item-potential item-main-potential">
                <div class="tooltip-${this_pot}"></div> <div class="tooltip-label tooltip-label-${this_pot}">Potential</div>
                ${
                    main_pot_keys.map(function(a) {
                        let b = main_pot[a];
                        return `
                            <span class="potential-line potential-line-main">
                                ${b.display}
                            </span>
                        `;
                    }).join("")
                }
            </div>
            `;
        }
    }

    if (this_b_pot !== "") {
        let b_pot = this.idata.boosts.cubes.bonus;
        let b_pot_keys = Object.keys(this.idata.boosts.cubes.bonus);

        //has bpot
        if (b_pot_keys.length > 0) {
            cube_html += `
            <div class="item-dash-border" style="margin: 1px 0 5px 0;"></div>
            <div class="item-potential item-bonus-potential">
                <div class="tooltip-${this_b_pot}"></div> <div class="tooltip-label tooltip-label-${this_b_pot}">Bonus Potential</div>
                ${
                    b_pot_keys.map(function(a) {
                        let b = b_pot[a];
                        return `
                            <span class="potential-line potential-line-main">
                                + ${b.display}
                            </span>
                        `;
                    }).join("")
                }
            </div>
            `;
        }
    }

    icube.html(cube_html);

    if (this.idata.flavor !== "" || this.idata.skill !== ""){
        imisc.html(`
            <div class="item-dash-border" style="margin-bottom:0px"></div>
            <div class="item-extra">
                <div class="item-skill">
                    <span class="item-color-skill" style="margin:right:10px">
                        ${this.idata.skill}
                    </span>
                    <span class="item-color-flavor">
                        ${this.idata.flavor}
                    </span>
                </div>
            </div>
        `);
    } else {
        imisc.html("");
    }

    iname.html(`
        ${item_name} 
        ${
            scroll_count > 0 ? `(+${scroll_count})` : ""
        }
    `);

    istar.addClass("disabled");
    istar.slice(0, this.idata.meta.stars).removeClass("disabled");

    //required level for item
    //if flame has reduced level requirements, change the required level to display
    let effective_level = this.idata.level + e_stats.reqlvl;

    if (effective_level < 0) {
        effective_level = 0;
    } else if (effective_level > 1000) {
        effective_level = 999;
    }

    effective_level += "";

    if (effective_level.length === 2) {
        effective_level = "0" + effective_level;
    }

    let i_levelreq_con = this.check_cache(()=>{
        return i_con.find(".item-requirements-str, .item-requirements-dex, .item-requirements-int, .item-requirements-luk");
    }, "dom", "i_levelreq_con");  
    
    i_levelreq_con.removeClass("required");

    let i_levelreq = this.check_cache(()=>{
        return i_con.find(".item-lev-num");
    }, "dom", "i_levelreq");   

    i_levelreq.removeClass((i,c) =>{
        return (c.match(/(^|\s)req-num-\S+/g) || []).join(' ');
    });

    let lvl_split = effective_level.split("");

    for (let i = 0; i < 3; ++i) {
        i_levelreq.eq(i).addClass("req-num-" + lvl_split[i]);
    }

    //shows the (200-25) portion in the item tooltip
    if (e_stats.reqlvl !== 0) {
        let i_level = this.idata.level + "";
        let this_e_reqlvl = e_stats.reqlvl;

        if (Math.abs(this_e_reqlvl) > 999) {
            this_e_reqlvl = 999;
        }

        let r_level = (this_e_reqlvl + "").replace("-","");

        let olvl_split = i_level.split("");
        let rlvl_split = r_level.split("");

        i_levelreq.eq(3).addClass("req-num-op white");

        let idx = 0;
        for (let i = 4; i < 7; ++i) {
            i_levelreq.eq(i).addClass("white req-num-" + olvl_split[idx]);
            idx += 1;
        }

        i_levelreq.eq(7).addClass("req-num-minus");

        idx = 0;
        for (let i = 8; i < 11; ++i) {
            if (r_level.length === 2) {
                if (i === 10) {
                    i_levelreq.eq(i).addClass("req-num-0 hidden");
                    continue;
                }
            } else {
                if (i === 10) {
                    i_levelreq.eq(i).removeClass("hidden");
                }
            }

            i_levelreq.eq(i).addClass("req-num-" + rlvl_split[idx]);
            idx += 1;
        }

        i_levelreq.eq(11).addClass("req-num-cp white");
    }

    let item_attr = this.idata.req;

    //required stats for item
    for (let i in item_attr) {
        let ia = item_attr[i];

        let is_required = false;
        if (ia !== 0) {
            is_required = true;
        } else {
            ia = "000";
        };

        let i_attr = this.check_cache(()=>{
            return i_con.find(".item-requirements.item-requirements-" + i);
        }, "dom", "i_attr_" + i);  

        if (is_required) {
            i_attr.addClass("required");
        }

        let i_attr_num = this.check_cache(()=>{
            return i_con.find(".item-" + i + "-num");
        }, "dom", "i_attr_num_" + i); 

        let attr_split = (ia + "").split(""); 

        i_attr_num.removeClass((i,c) =>{
            return (c.match(/(^|\s)req-num-\S+/g) || []).join(' ');
        });

        for (let j = 0; j < attr_split.length; ++j) {
            i_attr_num.eq(j).addClass("req-num-" + attr_split[j]);
        }
    }

    let for_job = this.idata.job;
    let i_job = this.check_cache(()=>{
        return i_con.find(".item-job-items");
    }, "dom", "i_job");   

    i_job.addClass("hide");

    for (let i = 0; i < for_job.length; ++i) {
        i_job.filter(".item-jobs-" + for_job[i]).removeClass("hide");
    }

    //replace pic
    if (!ipic.hasClass(this.idata.img)) {
        ipic.attr("class", "item-container-item sf-item");
        ipic.addClass(this.idata.img);
    }

    istar.removeClass("hidden");
    /* don't show stars at top of tooltip if not starforceable */
    if (!this.idata.starforce) {
        istar_con.addClass("hidden");
    } else {
        istar_con.removeClass("hidden");
        //remove stars based on max stars allowed
        for (let i = 25; i > this.idata.meta.max_stars; --i) {
            istar.filter(".item-star-" + i).addClass("hidden");
        } 
    }
    
    return true;
}

//cache function
item.prototype.check_cache = function(data_call = ()=>{return null;}, cache_name, identifier) {
    let item = {};
    let c_item = this.cache[cache_name][identifier];
    if (typeof c_item == 'undefined') {
        item = data_call();
        if (["string","number"].includes(typeof item) || item instanceof jQuery) {
            this.cache[cache_name][identifier] = item;
        } else {
            this.cache[cache_name][identifier] = Object.assign({}, item);
        }
    } else {
       
        if (["string","number"].includes(typeof c_item) || c_item instanceof jQuery) {
            item = c_item;
        } else {
            item = Object.assign({}, c_item);
        }
    }

    return item;
};

//redraw item tooltip and starforce screen
item.prototype.redraw = function() {
    this.redraw_sf();
    this.redraw_item_tooltip();
};

//log the cost, including discounts
item.prototype.log_starforce_cost = function(sg, base_cost, cost, level) {
    //each index stacks with the other
    let discount_mvp = [0.03,0.05,0.1];
    let discount_event_30 = 0.30;

    let cost_chart = {};
    let event_30 = base_cost * discount_event_30;

    for (let i = 0; i < discount_mvp.length; ++i) {
        let i_d = discount_mvp[i];

        let i_mvp = base_cost * (level > 16 ? 0 : i_d);
        
        cost_chart[i_d] = cost - i_mvp; 
        cost_chart[i_d + ",0.3"] = cost - i_mvp - event_30;
    }

    cost_chart["0.3"] = cost - event_30;

    return cost_chart;
};

//update starforce screen
item.prototype.redraw_sf = function() {
    //dom cache
    let mcon = this.check_cache(()=>{
        return $(".sf-main-container");
    }, "dom", "mcon");
    let sfcon = this.check_cache(()=>{
        return $("#sfcon");
    }, "dom", "sfcon");        
    let sficon = this.check_cache(()=>{
        return $(".sfi-main-border");
    }, "dom", "sficon");    
    let dcon = this.check_cache(()=>{
        return mcon.find(".sf-starforce-data-description:first");
    }, "dom", "dcon");        
    let lvl_flag = this.check_cache(()=>{
        return mcon.find(".sf-star-item");
    }, "dom", "lvl_flag");        
    let safeguard = this.check_cache(()=>{
        return mcon.find(".sf-safeguard");
    }, "dom", "sf_safeguard");        
    let current_meso = this.check_cache(()=>{
        return sfcon.find(".sf-data-meso");
    }, "dom", "current_meso");
    let current_shadowknight = this.check_cache(()=>{
        return sfcon.find(".sf-data-shadowknight");
    }, "dom", "current_shadowknight");
    let sf_text = this.check_cache(()=>{
        return sfcon.find(".sf-text");
    }, "dom", "sf_text");
    let sf_img = this.check_cache(()=>{
        return $.merge(mcon.find(".sf-item"), sficon.find(".sf-item"));
    }, "dom", "sf_img");
    let sf_header_text = this.check_cache(()=>{
        return $(".sf-header-text");
    }, "dom", "sf_header_text");
    let sf_chance_time_text = this.check_cache(()=>{
        return $(".sf-star-chance");
    }, "dom", "sf_chance_time_text");

    //starcatch ui is reset using an initialized clone
    sf_img = $.merge(sf_img, $(".sfsc-main-border .sf-item"));
    let sf_description = this.check_cache(()=>{
        return $(".sfp-data-description");
    }, "dom", "sf_description");

    //replace pic
    sf_img.removeClass((i,c)=>{
        let carr = c.split(" ");

        let newc = [];
        for (let j = 0; j < carr.length; ++j) {
            let _c = carr[j];
            if (_c.startsWith("item-")) {
                newc.push(_c);
                break;
            }
        }

        return newc.join(" ");
    });

    sf_img.addClass(this.idata.img);


    lvl_flag.removeClass("sf-star10 sf-star15 sf-star20");

    let level = this.idata.level;

    let this_star = this.idata.meta.stars;

    if (this_star === this.idata.meta.max_stars) {
        this_star = 1;
    }

    let next_star = this_star + 1;
    let cache_name_lvl_star = "_" + level + this_star + "_" + this.idata.superior;
    
    //total stats from all sources: flames, scrolls, and stars
    let nstats = this.check_cache(()=>{
        return equip_gain(this.idata);
    }, "eg", cache_name_lvl_star);

    let srate = this.check_cache(()=>{
        return star_success_rate(this_star, this.idata.superior);
    }, "sr", cache_name_lvl_star);

    let sc_type = star_cost_type(this.idata.type);

    let this_star_cost = this.check_cache(()=>{
        return star_cost(level, this_star, this.idata.meta.starforce_type, this.idata.superior, sc_type);
    }, "sc", cache_name_lvl_star + "_" + this.idata.meta.starforce_type + "_" + sc_type);

    if (nstats.watt_p !== 0 || nstats.matt_p !== 0 || nstats !== 0) {
        let flame_gain = this.idata.boosts.flames;
        let total_gain = equip_gain_total(this.idata.sf_data);
        total_watt = this.idata.bstat.watt + total_gain.watt + flame_gain.watt;
        total_matt = this.idata.bstat.matt + total_gain.matt + flame_gain.matt;
        total_def = this.idata.bstat.def + total_gain.def + flame_gain.def;
    
        nstats.watt += Math.ceil(total_watt * nstats.watt_p);
        nstats.matt += Math.ceil(total_matt * nstats.matt_p);
        nstats.def += Math.ceil(total_def * nstats.def_p);
    }

    let use_job_stats = this_star < 15;

    let _str = use_job_stats ? (this.idata.pstat.includes("str") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _dex = use_job_stats ? (this.idata.pstat.includes("dex") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _int = use_job_stats ? (this.idata.pstat.includes("int") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _luk = use_job_stats ? (this.idata.pstat.includes("luk") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;

    if ("str" in nstats) {
        _str += nstats.str;
    }
    if ("dex" in nstats) {
        _dex += nstats.dex;
    }
    if ("str" in nstats) {
        _int += nstats.int;
    }
    if ("luk" in nstats) {
        _luk += nstats.luk;
    }

    let is_droppable = this.is_droppable(this_star);

    let is_event_droppable = false;
    
    if (event_options.nb15) {
        if (!this.idata.superior && this_star < 15) {
            is_event_droppable = true;
        } else if (this.idata.superior && this_star < 8) {
            is_event_droppable = true;
        }
    }

    let is_2x = false;

    if (!this.idata.superior && event_options.pre10x2 && this_star <= 10) {
        is_2x = true;
    }

    let html = `
        <span class="sf-item-desc-current-stars">
            <span style="display: inline-block;width: 48px;">${this_star} Star</span>
            <span class="sf-arrow-description sf-item-arrow"></span> 
            <span style="margin-left:20px;" ${is_2x ? `class="sf-crossed-out` : ``}">${next_star} Star</span>
            ${is_2x ? `
            <span style="margin-left:5px;">${next_star + 1} Star</span>` : ``}
            <br>
            ${this.idata.meta.chance_time ? `
                Success Chance: 100% <br>
            ` 
            : 
            `
                ${!this.idata.superior && event_options._51015 && [5,10,15].includes(this_star) ?
                `
                Success Chance: <span class="sf-crossed-out">
                    ${(srate.success * 100).toFixed(1)}%
                </span> 100% <br>
                `
                :

                `
                    Success Chance: ${(srate.success * 100).toFixed(1)}% <br>
                    <span style="transform: scale(0.95,1);display: inline-block;margin-left: -3px;">Failure (${is_droppable ? "Drop" : "Keep"}) Chance:</span> 
                    <span style="display:inline-block;margin-left: -5px;">
                        ${((srate.fail + srate.sc_success + (is_event_droppable ? srate.destroy : 0)) * 100).toFixed(1)}%
                    </span> <br>
                    ${
                        !is_event_droppable && srate.destroy !== 0 ?
                        `
                            Chance of item destruction: 
                            ${
                                srate.destroy > 0.1 ? "<br>" + (srate.destroy * 100).toFixed(1) 
                                : 
                                ((srate.destroy * 100).toFixed(1) + '').replace(".", ".<br>")
                            }%
                        ` : ''
                    }
                `
                }
            `}
            <span style="display:block;padding:15px;"></span>
            ${ _str !== 0 ?
                `<span class="sf-item-desc-attr">STR</span>: +${_str}<br>` : ''
            }
            ${ _dex !== 0 ?
                `<span class="sf-item-desc-attr">DEX</span>: +${_dex}<br>` : ''
            }
            ${ _int !== 0 ?
                `<span class="sf-item-desc-attr">INT</span>: +${_int}<br>` : ''
            }
            ${ _luk !== 0 ?
                `<span class="sf-item-desc-attr">LUK</span>: +${_luk}<br>` : ''
            }
            ${nstats.hp !== 0 ?
                `MaxHP : +${nstats.hp} <br>` : ''
            }
            ${nstats.mp !== 0 ?
                `MaxMP : +${nstats.mp} <br>` : ''
            }
            ${nstats.speed !== 0 ?
                `Speed: +${nstats.speed} <br>` : ''
            }
            ${nstats.jump !== 0 ?
                `Jump: +${nstats.jump} <br>` : ''
            }
            ${nstats.watt !== 0 ?
                `Attack Power: +${nstats.watt} <br>` : ''
            }
            ${nstats.matt !== 0 ?
                `Magic Attack: +${nstats.matt} <br>` : ''
            }
            ${nstats.def !== 0 ?
                `Defense : +${nstats.def} <br>` : ''
            }
            &nbsp;
        </span>
    `;

    dcon.html(html);

    //reset chance time
    if (!sf_chance_time_text.hasClass("hidden") && this.idata.meta.chance_count < 2) {
        sf_header_text.removeClass("hidden");
        sf_chance_time_text.addClass("hidden");
        sfa.stop("EnchantChanceTime");
    }

    if (next_star <= 10) {
        //nothing
    } else if (next_star <= 15) {
        lvl_flag.addClass("sf-star10");
    } else if (next_star <= 20) {
        lvl_flag.addClass("sf-star15");
    } else if (next_star <= 26) {
        lvl_flag.addClass("sf-star20");
    }

    let safeguard_multiplier = 1;
    let is_safeguardable = !this.idata.superior && this_star >= GLOBAL.starforce.safeguard_stars.min && this_star <= GLOBAL.starforce.safeguard_stars.max;
    if (is_safeguardable) {
        safeguard.removeClass("disabled");
        safeguard.trigger("click", true);
    } else {
        safeguard.addClass("disabled");
        safeguard.trigger("click", true);
    }

    let is_safeguard = !safeguard.hasClass("disabled") && safeguard.hasClass("checked");

    //text description in starforce screen
    //this part is wonky. fix later
    sf_text.attr("class", "sf-text");
    sf_description.addClass("hidden");

    let is_destroyable = srate.destroy > 0;
    
    if (is_droppable) {
        if (is_destroyable) {
            sf_text.addClass("sf-text-bothways");
        } else {
            sf_text.addClass("sf-text-downgradeable");
        }
    } else if (is_destroyable) {
        sf_text.addClass("sf-text-destroyable");
    } else {
        sf_text.addClass("sf-text-start");
    }

    if (is_safeguard && is_destroyable) {
        sf_text.attr("class", "sf-text");
        if (is_droppable) {
            sf_text.addClass("sf-text-downgradeable");
            sf_description.filter(".sfp-data-downgradeable").removeClass("hidden");
        } else {
            sf_text.addClass("sf-text-start");
        }
    } else if (is_destroyable && is_droppable) {
        sf_description.filter(".sfp-data-bothways").removeClass("hidden");   
    } else if (is_destroyable) {
        sf_description.filter(".sfp-data-destroyable").removeClass("hidden");   
    } else if (is_droppable) {
        sf_description.filter(".sfp-data-downgradeable").removeClass("hidden");
    }

    if (is_safeguardable && is_safeguard && !this.idata.meta.chance_time) {
        this.idata.meta.sf_log_item.is_safeguard = true;
        safeguard_multiplier = 2;
    }

    //displayed starforce cost
    for (let i = 0; i < current_meso.length; ++i) {
        let cm = current_meso.eq(i);
        let this_cost = this_star_cost * safeguard_multiplier;
        if (cm.hasClass("number-locale")) {
            cm.html(this_cost.toNumber());
        } else {
            cm.html(this_cost);
        }
    }

    //display shadowknight cost if relevant
    if (this.idata.shadowknight) {
        let sk = shadowknight_coin_cost(this_star);
        current_shadowknight.html(sk);
    }
   
    this.idata.meta.sf_log_item = {};
    return true;
};