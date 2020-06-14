Number.prototype.toNumber = function() {
    return this.toLocaleString();
}

var item = function(it) {
    this.idata = it;
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
        result: ""
    }, //object for meta_data
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
        //armor, shoulder trace
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
        }
    } //scroll data
};

item.prototype.clear_sf_history = function() {
    this.idata.meta.sf_meta_data = [];
    return false;
};

item.prototype.is_droppable = function(current_star) {
    if (this.idata.superior) {
        return current_star !== 0;
    };

    return !(current_star < 10 || [10,15,20].includes(current_star));
};

item.prototype.set_item_level = function(star = 0) {
    let sf_data = [];
    this.idata.meta.stars = 0;
    this.idata.boosts.sf_data = [];

    let max_star = star_max(this.idata.level, this.idata.superior);

    if (max_star < star) {
        star = max_star;
    }

    for (let i = 0; i < star; ++i) {
        let sf = this.check_cache(()=>{
            return equip_gain(this.idata);
        }, "eg", "_" + this.idata.level + i);

        sf_data.push(sf);
        this.idata.meta.stars += 1;
    }

    this.idata.boosts.sf_data = sf_data;
};

//houses various lookup tables for flame tiers
item.prototype.flame_lookup = {};

//stat and def related flame tiers
//l refers to the "step" in min and max levels. different stat types have different steps
item.prototype.flame_lookup.linear_lookup = function(l = 1, level = 0) {
    let _lt = [];

    for (let i = 1; i <= 14 / l; ++i) {
        let dt = {
            from: (i - 1) * 20 * l,
            to: i * 20 * l - 1,
            tier: []
        };

        for (let j = 1; j <= 7; ++j) {
            dt.tier.push(j * i);
        }

        _lt.push(dt);
    }

    if (level !== 0) {
        for (let i = 0; i < _lt.length; ++i) {
            if (_lt[i].from <= level && _lt[i].to >= level) {
                return _lt[i].tier;
            }
        }
    }

    return _lt;
};

 //hp and mp related flame tiers
item.prototype.flame_lookup.linear_lookup2 = function(level = 0) {
    let _lt = [];
        
    for (let i = 1; i <= 27; ++ i) {
        let dt = {
            from: (i - 1) * 10,
            to: i * 10 - 1,
            tier: []
        };

        for (let j = 1; j <= 7; ++j) {
            let _i = i - 1;

            dt.tier.push(
                (i === 1 ? 3 : 30) * j * (_i === 0 ? 1 : _i)
            );
        }

        if (level !== 0) {
            for (let i = 0; i < _lt.length; ++i) {
                if (_lt[i].from <= level && _lt[i].to >= level) {
                    return _lt[i].tier;
                }
            }
        }
    
        _lt.push(dt);
    }

    return _lt;
};

//att flame tiers, type parameter for advantage vs normal flames
//if level passed, just get that specfic level
item.prototype.flame_lookup.att_tier_looukup = function(type, level = 0) {
    let lt = [];

    if (type === 1) {
        lt = [{
            from: 120,
            to: 159,
            tier: [0.04, 0.088, 0.145, 0.213, 0.292, 0.352, 0.41]
        },{
            from: 160,
            to: 199,
            tier: [0.05, 0.11, 0.18125, 0.26625, 0.365, 0.44, 0.5125]
        },{
            from: 200,
            to: 239,
            tier: [0.06, 0.132, 0.2175, 0.3195, 0.438, 0.528, 0.615]
        },{
            from: 240,
            to: 275,
            tier: [0.07, 0.154, 0.25375, 0.37275, 0.511, 0.616, 0.7175]
        }];
    } else {
        lt = [{
            from: 120,
            to: 159,
            tier: [0.12, 0.176, 0.242, 0.32, 0.41]
        },{
            from: 160,
            to: 199,
            tier: [0.15, 0.22, 0.3025, 0.4, 0.5125]
        },{
            from: 200,
            to: 239,
            tier: [0.18, 0.264, 0.363, 0.48, 0.615]
        },{
            from: 240,
            to: 275,
            tier: [0.21, 0.308, 0.4235, 0.56, 0.7175]
        }];
    }

    if (level !== 0) {
        for (let i = 0; i < lt.length; ++i) {
            if (lt[i].from <= level && lt[i].to >= level) {
                return lt[i].tier;
            }
        }
    }

    return lt;
};

//apply flame stats base on tier
item.prototype.flame_tier_list = function(t, type) {
    let lookup_table = [];
    let stat_increase = 0;

    let is_linear_lookup = false;

    if (type === "att") {
        //normal flames
        if (this.idata.flame_type === 1) {
            t = t - 1;
            if (t < 0 || t > 7) {
                return 0;
            }

            lookup_table = this.flame_lookup.att_tier_looukup(1);
        } else {
        //boss-tier flames. min tier is 3
            t = t - 3;

            if (t < 0 || t > 7) {
                return 0;
            }

            lookup_table = this.flame_lookup.att_tier_looukup(2);
        }

        for (let i = 0; i < lookup_table.length; ++i) {
            let att_table = lookup_table[i];

            if (this.idata.level >= att_table.from  && this.idata.level < att_table.to) {
                stat_increase = Math.ceil(att_table.tier[t] * this.idata.bstat.watt);
                break;
            }
        }
    } else if (type === "def") {
        t = t - 1;
        if (t < 0 || t > 7) {
            return 0;
        }

        lookup_table = this.flame_lookup.linear_lookup(1);
        is_linear_lookup = true;
    } else if (type === "hp" || type === "mp") {
        t = t - 1;
        if (t < 0 || t > 7) {
            return 0;
        }

        lookup_table = this.flame_lookup.linear_lookup2();
        is_linear_lookup = true;
    } else if (type.startsWith("stats:")) {
        t = t - 1;
        if (t < 0 || t > 7) {
            return 0;
        }

        let s_type = type.replace("stats:", "");
        let s_arr = s_type.split(",");
        let s_arr_l = s_arr.length;

        if (s_arr_l < 3) {
            lookup_table = this.flame_lookup.linear_lookup(s_arr_l);
        } else {
            return 0;
        }

        is_linear_lookup = true;
    }

    if (is_linear_lookup) {
        for (let i = 0; i < lookup_table.length; ++i) {
            let stat_table = lookup_table[i];

            if (this.idata.level >= stat_table.from  && this.idata.level < stat_table.to) {
                stat_increase = stat_table.tier[t];
                break;
            }
        }
    }

    return stat_increase;
};

/*
    see what flame tiers are on the item when flames are applied via the set_item_flame function, 
    if the flames applied are not completely arbitrary
*/
item.prototype.reverse_flame_lookup = function() {
    let flames = Object.assign({}, this.idata.boosts.flames);

    //current flames
    let crf = {
        reqlvl: 0,
        boss_damage: 0,
        damage: 0,
        all_stat: 0,
        watt: 0,
        matt: 0,
        hp: 0,
        mp: 0,
        def: 0,
        str: 0,
        dex: 0,
        int: 0,
        luk: 0,
    };

    //reverse lookup flames
    let rf = Object.assign({}, crf);

    for (let i in flames) {
        let f = flames[i];

        //if these exist, we dont want to look at it
        if (f === 0 || i.startsWith("stats:")) continue;

        crf[i] = f;
    }

    let level = this.idata.level;

    //get the tiers relevant to the item level
    let lookup1_lvl = this.flame_lookup.linear_lookup(1, level);
    let lookup2_lvl = this.flame_lookup.linear_lookup(2, level);
    let lookup1_lvl2 = this.flame_lookup.linear_lookup2(level);

    //att tier
    if (flames.watt > 0 || flames.matt > 0) {
        let lookup_att = item.prototype.flame_lookup.att_tier_looukup(this.idata.flame_type, level);

        for (let i = 0; i < lookup_att.length; ++i) {
            let t_att = lookup_att[i];

            let this_att = 1 + Math.floor(this.idata.bstat.watt * t_att);

            if (this_att === flames.watt || this_att === flames.matt) {
                let wtier = i;

                if (this.idata.flame_type === 1) {
                    wtier += 1;
                } else {
                    wtier += 3;
                }

                rf[this.idata.att_type] = wtier;
                break;
            }
        }
    }

    //boss stat
    if (flames.boss_damage > 0 && flames.boss_damage <= 14) {
        rf.boss_damage = Math.floor((flames.boss_damage*100) / 2);
    }

    //all stat
    if (flames.all_stat > 0 && flames.all_stat <= 7) {
        rf.all_stat = Math.floor(flames.all_stat * 100);
    }

    //speed
    if (flames.speed > 0 && flames.speed <= 7) {
        rf.speed = flames.speed;
    }

    //jump
    if (flames.jump > 0 && flames.jump <= 7) {
        rf.jump = flames.jump;
    }

    //damage
    if (flames.damage > 0 && flames.damage <= 7) {
        rf.damage = Math.floor(flames.damage * 100);
    }

    //hp
    if (flames.hp > 0) {
        for (let i = 0; i < lookup1_lvl2.length; ++i) {
            if (flames.hp === lookup1_lvl2[i]) {
                rf.hp = i + 1;
                break;
            }
        }
    }

    //mp
    if (flames.mp > 0) {
        for (let i = 0; i < lookup1_lvl2.length; ++i) {
            if (flames.mp === lookup1_lvl2[i]) {
                rf.mp = i + 1;
                break;
            }
        }
    }

    //def
    if (flames.def > 0) {
        for (let i = 0; i < lookup1_lvl.length; ++i) {
            if (flames.def === lookup1_lvl[i]) {
                rf.def = i + 1;
                break;
            }
        }
    }

    /*
        stat lookup
        the most complicated one
    */

    //see if there are any stat flames
    let stat_def = ["str", "dex", "int", "luk"];
    let stats = [crf.str,crf.dex,crf.int,crf.luk];
    //get the indexes where the value is greater than 0
    let stat_count = stats.reduce((a,e,i)=>{
        if (e > 0) { a.push(i); }; return a;
    }, []);
    let scl = stat_count.length;

    //non-zero stats
    let stats_p = [];

    for (let i = 0; i < stat_count.length; ++i) {
        stats_p.push(stat_def[stat_count[i]]);
    }

    //all variations of single and double stats
    let stat_permutation = [];

    let stat_permutator = function(p_stat) {
        if (p_stat.length === 1) return true;
        let c_stat = p_stat[0];
        let n_stat = p_stat.slice(1,p_stat.length);

        for (let i = 0; i < n_stat.length; ++i) {
            stat_permutation.push(c_stat + "," + n_stat[i]);
        }

        return stat_permutator(n_stat);
    };

    if (scl > 0) {
        stat_permutator(stats_p);
        stats_p = [...stats_p,...stat_permutation];
    }

    //check the calculated flames against the actual flames
    let flame_check = function(st) {
        let is_match = true;

        for (let i in st) {
            if (st[i] !== flames[i]) {
                is_match = false;
                break;
            }
        }

        return is_match;
    };

    //check all permutations of stats from the passed flame stat types
    let flame_permutator = function(st, stc) {
        //get base initialization of the item's flame stats
        let st_val_base = {};

        for (let i = 0; i < stc.length; ++i) {
            st_val_base[stc[i]] = 0;
        }
    
        /*
            check all permutations of flames. there are 7 tiers,
            so with array starting at 0 and we know at least 1
            flame must be present. if we see 3 stats, we check
            against 3 stats, so we start at 000 and go up to 666.
            we can skip numbers that contain 7,8,9 since flames
            dont go that high. the code checks: 000, 001, ..., 101, 
            102, 103, 104, 105, 106, 110, 111, ..., 165, 166, 200,
            ..., 666
        */
       let p_start = 0;
       let stc_l = st.length;
       let p_end = +("6".repeat(stc_l));
        for (let i = p_start; i <= p_end; ++i ) {
            let _i = 0;

            //skip numbers containing 7, 8, 9
            if (i % 10 === 7) {
                i += 3;
            } 
            if (i % 100 === 70) {
                i += 30;
            }
            if (i % 1000 === 700) {
                i += 300;
            }

            _i = (i + "");
            
            if (_i.length < stc_l) {
                _i = "0".repeat(stc_l-_i.length) + _i;
            }
            
            //000 becomes [0,0,0]
            _i = _i.split("").map(Number);

            let st_val = Object.assign({}, st_val_base);
            let st_flame = {};

            for (let j = 0; j < st.length; ++j) {
                let _st = st[j];
                
                st_flame[_st] = _i[j] + 1;
                if (_st.includes(",")) {
                    curr_val = lookup2_lvl[_i[j]];

                    _st.split(",").map((a)=>{
                        st_val[a] += curr_val;
                    });
                } else {
                    curr_val = lookup1_lvl[_i[j]];

                    st_val[_st] += curr_val;
                }
            }
            
            let too_high = false;
            for (let x = 0; x < st_val.length; ++x) {
                if (st_val[x] > flames[x]) {
                    too_high = true;
                    break;
                }
            }
            
            //if stat goes overboard, then exit and continue with next stat combo
            if (too_high) {
                break;
            }

            let is_match = flame_check(st_val);
            if (is_match) {
                return {success: true, permutation: st_flame};
            }
        }

        return {success: false, permutation: {}};
    };

    //cycle through all combinations of stat flame types
    //combine all stats into a combination subset based on how many stat flames being tested
    let combine = function(a, min) {
        let fn = function(n, src, got, all) {
            if (n == 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (let j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
            }
            return;
        }
        let all = [];
        for (var i = min; i < a.length; i++) {
            fn(i, a, [], all);
        }
        all.push(a);
        return all;
    };

    //starting from 1 up to a maximum of 4 (max flame types allowed)
    let flame_base_permutator = function(p_stat, fc) {
        if (fc > 3) return {success: false, permutation: {}};

        let stat_combination = combine(p_stat, fc);
        
        for (let i = 0; i < stat_combination.length; ++i) {
            let _stat = stat_combination[i];

            if (_stat.length > 4) continue;

            //get the unique stats from the single and double stat flames
            let stat_check = [];
            
            for (let n = 0; n < _stat.length; ++n) {
                let sn = _stat[n];

                if (sn.includes(",")) {
                    let _sn = sn.split(",");

                    if (!stat_check.includes(_sn[0])) {
                        stat_check.push(_sn[0]);
                    }

                    if (!stat_check.includes(_sn[1])) {
                        stat_check.push(_sn[1]);
                    }
                } else {
                    if (!stat_check.includes(sn)) {
                        stat_check.push(sn);
                    }
                }
            }

            /*
                if the flame permutation doesn't have all
                of the flames in the item, then just skip it
            */
            if (stat_check.length !== stat_count.length) continue;

            let fp = flame_permutator(_stat, stat_check);

            if (fp.success) {
                return fp;
            }
        }

        //if reaches here, increase the flame number by 1 and try again
        return flame_base_permutator(p_stat, fc+1);
    };

    //don't run if no flame stats
    if (scl > 0) {
        let stat_flames = flame_base_permutator(stats_p, 1).permutation;

        for (let i in stat_flames) {
            rf[i] = stat_flames[i];
        }
    }

    return rf;
};

//set flame stats directly. can be any value
//overrides non-flammable items, too
item.prototype.set_item_flame = function(s) {
    this.idata.boosts.flames = Object.assign({}, stats, s);
};

//set flame stats based on flame tier.
item.prototype.set_item_flame_tier = function(s) {
    //non-flammable
    if (this.idata.flame_type === 0) {
        return 0;
    }

    this.idata.boosts.flames = {};

    for (let i in s) {
        if (i === "all_stat" || i === "damage") {
            s[i] = 0.01 * s[i];
        } else if (i === "boss_damage") {
            if (this.idata.level >= 90) {
                s[i] = 0.02 * s[i];
            } else {
                s[i] = 0;
            }
        } else if (i === "watt" || i === "matt") {
            //non-weapons get atk based on its tier, but only for level 70+
            if (this.idata.class !== "weapon") {
                if (this.idata.level >= 70) {
                    s[i] = 1 * s[i];
                } else {
                    s[i] = 0;
                }
            } else {
                s[i] = this.flame_tier_list(s[i], "att");
            }
        } else if (i === "def" || i === "hp" || i === "mp") {
            s[i] = this.flame_tier_list(s[i], i);
        } else if (i.startsWith("stats:")) {
            //you can have both double-statted lines and single-statted lines
            let _s = this.flame_tier_list(s[i], i);

            let s_type = i.replace("stats:", "");
            let s_arr = s_type.split(",");

            for (let j = 0; j < s_arr.length; ++j) {
                let _sarr = s_arr[j];

                if (_sarr in s) {
                    s[_sarr] += _s;
                } else {
                    s[_sarr] = _s;
                }
            }
        } else if (i === "reqlvl") {
            s[i] = -5 * s[i];
        }
    }

    this.idata.boosts.flames = Object.assign({}, stats, s);
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

        let stat_gain = this.idata.mstat;

        if (_s.type.startsWith("_")) {
            if (this.idata.class === "weapon") {
                _s.type = _s.type + "w";
            } else if (["hat", "top", "bottom", "shoes", "cape", "shoulder"].includes(this.idata.type)) {
                _s.type = _s.type + "a";
            } else if (this.idata.type === "gloves") {
                _s.type = _s.type + "g";
            } else {
                _s.type = _s.type + "m";
            }

            if (_s.stat !== null) {
                stat_gain = _s.stat;
            }
        } else if (_s.type === "prime") {
            if (this.idata.class === "weapon" || this.idata.type === "mechanical heart") {
                _s.type = "prime_weapon";
            } else if (this.idata.class === "armor" && this.idata.sub_class !== "accessory") {
                _s.type = "prime_armor";
            } else if (this.idata.sub_class = "accessory") {
                _s.type = "prime_accessory";
            }
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
                _j = this.idata.att_type;
            } 

            if (j.startsWith("_")) {
                spell_trace_used += 1;
            }

            this_stat[_j] += scr_type[j] * (stat_gain === "hp" ? 50 : 1);
        }

        for (let k = 0; k < scr_amount; ++k) {
            if (curr_scrolls >= max_scrolls) break;
            this.idata.boosts.scroll_data.push(this_stat);
            curr_scrolls += 1;
        }
    }

    if (spell_trace_used >= 4) {
        this.idata.boosts.other_stats[this.idata.att_type] += 1;   
    }

    return true;
};

//add or remove star
//type: 1 - increase star, 2 - drop star, 3 - destroy
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

        let is_safeguardable = !this.idata.superior && current_star >= 12 && current_star < 18;
        let is_safeguard = !cb_safeguard.hasClass("disabled") && cb_safeguard.hasClass("checked");

        let safeguard_multiplier = is_safeguardable && is_safeguard ? 2 : 1;

        //get the log data for the previous run, as we start off with showing the next star cost
        let cache_name_lvl_star = "_" + level + current_star + "_" + this.idata.superior;
        let this_star_cost_prev = this.check_cache(()=>{
            return star_cost(level, this_star, this.idata.meta.starforce_type, this.idata.superior);
        }, "sc", cache_name_lvl_star + "_" + this.idata.meta.starforce_type);

        let this_star_cost_prev_effective = this_star_cost_prev * safeguard_multiplier;

        let cost_chart = this.log_starforce_cost(is_safeguardable && is_safeguard, this_star_cost_prev, this_star_cost_prev_effective, current_star);

        //cumulative sf cost
        if (this.idata.meta.sf_meta_data.length === 0) {
            this.idata.meta.sf_log_item.sf_cost = this_star_cost_prev * safeguard_multiplier;
            this.idata.meta.sf_log_item.sf_cost_discount = Object.assign({}, cost_chart);
        } else {
            let prev_item = this.idata.meta.sf_meta_data[this.idata.meta.sf_meta_data.length - 1];
            let prev_sf_cost_discount = Object.assign({}, this.idata.meta.sf_meta_data[this.idata.meta.sf_meta_data.length - 1].sf_cost_discount);
            this.idata.meta.sf_log_item.sf_cost = prev_item.sf_cost + (this_star_cost_prev * safeguard_multiplier);

            for (let i in cost_chart) {
                prev_sf_cost_discount[i] += cost_chart[i];
            }

            this.idata.meta.sf_log_item.sf_cost_discount = Object.assign({}, prev_sf_cost_discount);
        }

        this.idata.meta.sf_meta_data.push(this.idata.meta.sf_log_item);
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
        this.set_item_level(12);
        this.idata.meta.stars = 12;
    }

    this.idata.meta.sf_log_item.star = this.idata.meta.stars;
    this.redraw();
};

//generate pseudorandom number
item.prototype.prng = function() {
    let arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
    return m * Math.pow(2,-52);
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

    //neb compensation assumes 25% boss dmg neb was applied
    if (this.idata.meta.nebulite_compensation && this.idata.class === "weapon") {
        curr_att += 1 + Math.floor(bwatt * 0.04);
    }

    return curr_att - att;
};

//generate a star force success map to test the prn against. map goes from 0 to 1.
item.prototype.generate_sresult_map = function(sr, starcatch = false) {
    let poffset = this.prng();

    let sc_success = sr.success * 0.045; //starcatch increase assumption

    let e_success_end = sr.destroy + sr.success;
    let e_fail_start = e_success_end + sc_success;
    
    let catch_map = {
        destroy: [0, sr.destroy],
        success: [sr.destroy, e_success_end],
        sc_success: [e_success_end, e_fail_start],
        fail: [e_fail_start, 1]
    };

    let catch_map_offset = {};

    for (let i in catch_map) {
        let cval1 = catch_map[i][0] + poffset;
        let cval2 = catch_map[i][1] + poffset;

        if (cval2 - cval1 === 0) continue;

        catch_map_offset[i] = [];

        if (cval2 <= 1) {
            catch_map_offset[i].push([
                cval1,
                cval2
            ]);
        } else if (cval1 < 1 && cval2 > 1) {
            catch_map_offset[i].push([
                cval1,
                1
            ]);

            catch_map_offset[i].push([
                0,
                cval2 - 1
            ]);
        } else {
            catch_map_offset[i].push([
                cval1 - 1,
                cval2 - 1
            ]);
        }
    }

    return catch_map_offset;
};

item.prototype.starforce = function(starcatch = false) {
    //generate log item
    this.idata.meta.sf_log_item =  Object.assign({}, this.cache.sf_meta_data);
    this.idata.meta.sf_log_item.id = this.idata.meta.sf_meta_data.length + 1; 

    //generate random number to compare against
    let pval = this.prng();

    this.idata.meta.sf_log_item.prn = pval;
    
    let level = this.idata.level;
    let current_star = this.idata.meta.stars;
    
    //generate a result map to compare the prng value to
    let sr_catch = this.cache.sr["_" + level + current_star + "_" + this.idata.superior];
    let catch_map = {};
    
    catch_map = this.generate_sresult_map(sr_catch, starcatch);

    this.idata.meta.sf_log_item.prn_map = Object.assign({},catch_map);

    let r_type = "";


    //5/10/15 100% event
    if (!this.idata.superior && event_options._51015 && [5,10,15].includes(current_star)) {
        r_type = "success";
    } else {
        //get result of catch_map: success, fail, destroyed, sc-success
        for (let i in catch_map) {
            let c_map = catch_map[i];
            if (typeof c_map === 'undefined') continue;

            for (let j = 0; j < c_map.length; ++j) {
                let cm_val = c_map[j];
                if (pval >= cm_val[0] && pval < cm_val[1]) {
                    r_type = i;
                    break;
                }
            }
        }
    }

    //no boom pre-15 event
    if (r_type === "destroy" && !this.idata.superior && event_options.nb15 && current_star < 15) {
        r_type = "fail";
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
        }
    }

    this.idata.meta.sf_log_item.result = r_type;
    return r_type;
};

//update item stats on tooltip screen
item.prototype.redraw_item_tooltip = function() {
    //dom cache
    let i_con = this.check_cache(()=>{
        return $(".item-main-border");
    }, "dom", "i_con");   
    let istats = this.check_cache(()=>{
        return i_con.find(".item-stats");
    }, "dom", "istats");   
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

    let this_max_stars = star_max(this.idata.level, this.idata.superior);

    //total stats from all sources: flames, stars, and scrolls
    let e_stats = Object.assign({}, stats);

    let base_stats = Object.assign({},this.idata.bstat);
    let flame_stats = Object.assign({},this.idata.boosts.flames);

    let sf_total_gain = equip_gain_total(this.idata.boosts.sf_data);
    let scr_total_gain = equip_gain_total(this.idata.boosts.scroll_data);
    let other_stats = this.idata.boosts.other_stats;

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
            e_stats.str_upgrade = true
        }
        if (this.idata.pstat.includes("dex")) {
            e_stats.dex += sf_total_gain.job_stats;
            sf_total_gain.dex += sf_total_gain.job_stats;
            e_stats.dex_upgrade = true
        }
        if (this.idata.pstat.includes("int")) {
            e_stats.int += sf_total_gain.job_stats;
            sf_total_gain.int += sf_total_gain.job_stats;
            e_stats.int_upgrade = true
        }
        if (this.idata.pstat.includes("luk")) {
            e_stats.luk += sf_total_gain.job_stats;
            sf_total_gain.luk += sf_total_gain.job_stats;
            e_stats.luk_upgrade = true
        }
    }

    //visible stats
    if (sf_total_gain.visible_stats > 0) {
        if (base_stats.str + scr_total_gain.str > 0) {
            e_stats.str += sf_total_gain.visible_stats;
            sf_total_gain.str += sf_total_gain.visible_stats;
            e_stats.str_upgrade = true
        }
        if (base_stats.dex + scr_total_gain.dex > 0) {
            e_stats.dex += sf_total_gain.visible_stats;
            sf_total_gain.dex += sf_total_gain.visible_stats;
            e_stats.dex_upgrade = true
        }
        if (base_stats.int + scr_total_gain.int > 0) {
            e_stats.int += sf_total_gain.visible_stats;
            sf_total_gain.int += sf_total_gain.visible_stats;
            e_stats.int_upgrade = true
        }
        if (base_stats.luk + scr_total_gain.luk > 0) {
            e_stats.luk += sf_total_gain.visible_stats;
            sf_total_gain.luk += sf_total_gain.visible_stats;
            e_stats.luk_upgrade = true
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
        name: "MaxMP",
        value: "mp"
    },{
        name: "Required Level",
        value: "reqlvl"
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

    if (def_p.length > 0) {
        percent_stats.def = this.starforce_att_percent(base_stats.def + scr_total_gain.def, 0, def_p);
        e_stats.def += percent_stats.def;
    }

    let html = `
        Type: ${this.idata.type.toUpperCase()} <br>
        ${this.idata.class === "weapon" ? `
            Attack Speed: ${this.idata.speed.toUpperCase()} <br>
        ` : ''}
        ${
            order.map((a)=>{
                let a_type = a.type || "";
                let a_symbol = a.symbol || "";

                if (a_type === "%") {
                    base_stats[a.value] = Math.round(base_stats[a.value] * 100);
                    e_stats[a.value] = Math.round(e_stats[a.value] * 100);
                    flame_stats[a.value] = Math.round(flame_stats[a.value] * 100);
                }

                let tot_gain = sf_total_gain[a.value] + scr_total_gain[a.value] + other_stats[a.value];

                if (["watt", "matt", "def"].includes(a.value)) {
                    tot_gain += percent_stats[a.value];
                }

                if (a.value === "matt") {
                    if (this.idata.class === "weapon" && percent_stats.matt + flame_stats.matt === 0) {
                        return '';
                    } 
                }

                return `
                    ${a.value === "reqlvl" ? `
                        ${
                            e_stats[a.value] !== 0 ?
                            `${a.name} : ${e_stats[a.value]}${a_symbol} <br>`
                            :
                            ``
                        }
                    ` : `
                        ${ e_stats[a.value] !== 0 ?
                            `<span class="${e_stats[a.value + "_upgrade"] ? "item-color-stat-upgrade" : ""}">
                                ${a.name}: ${a_type !== "raw" ? "+" : ""}${e_stats[a.value]}${a_symbol}
                                ${e_stats[a.value + "_upgrade"] ?
                                    `<span class="item-color-base">(${base_stats[a.value]}${a_symbol}</span>
                                        ${
                                            flame_stats[a.value] > 0 ?
                                            `<span class="item-color-flame">+${flame_stats[a.value]}${a_symbol}</span></span>` : '' 
                                        }
                                        ${
                                            tot_gain > 0 ?
                                            `<span class="item-color-stat-upgrade">+${tot_gain}${a_symbol}</span>`
                                            :
                                            ''
                                        }
                                        [[remove]]<span class="item-color-base">)</span>` 
                                    : ''
                                }
                            </span> <br>
                            ` : ''
                        }
                    `}
                `;
            }).join("").replace(/\s\s+\[\[remove\]\]/gi, "")

        }
        Remaining Enhancements: ${this.idata.hammers_added + this.idata.upgrades - this.idata.boosts.scroll_data.length} <br>
        <span class="item-color-recovery">(Available Recoveries: 0)</span> <br>
        Hammers Applied: ${this.idata.hammers_added} ${this.idata.hammers_added == 2 ? "(MAX)" : ""}
    `;

    istats.html(html);
    
    if (this.idata.flavor !== "" || this.idata.skill !== ""){
        imisc.html(`
            ${
                
                `
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
                </div class="item-extra">
                `
            }
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

        if (this_e_reqlvl > 1000) {
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
        if (ia === 0) continue;

        let i_attr = this.check_cache(()=>{
            return i_con.find(".item-requirements.item-requirements-" + i);
        }, "dom", "i_attr_" + i);  

        i_attr.addClass("required");

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
    //remove stars based on max stars allowed
    for (let i = 25; i > this_max_stars; --i) {
        istar.filter(".item-star-" + i).addClass("hidden");
    } 

    return true
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
    }, "dom", "safeguard");        
    let current_meso = this.check_cache(()=>{
        return sfcon.find(".sf-data-meso");
    }, "dom", "current_meso");
    let sf_text = this.check_cache(()=>{
        return sfcon.find(".sf-text");
    }, "dom", "sf_text");
    let cb_safeguard = this.check_cache(()=>{
        return sfcon.find(".sf-safeguard");
    }, "dom", "sf_safeguard");
    let sf_img = this.check_cache(()=>{
        return $.merge(mcon.find(".sf-item"), sficon.find(".sf-item"));
    }, "dom", "sf_img");

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

    if (this_star === (this.idata.superior ? 15 : 25)) {
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

    let this_star_cost = this.check_cache(()=>{
        return star_cost(level, this_star, this.idata.meta.starforce_type, this.idata.superior);
    }, "sc", cache_name_lvl_star + "_" + this.idata.meta.starforce_type);

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

    let html = `
        <span class="sf-item-desc-current-stars">
            <span style="display: inline-block;width: 48px;">${this_star} Star</span>
            <span class="sf-arrow-description sf-item-arrow"></span> 
            <span style="margin-left:20px;">${next_star} Star</span>
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
                        ${((srate.fail + (!this.idata.superior && event_options.nb15 && this_star < 15 ? srate.destroy : 0)) * 100).toFixed(1)}%
                    </span> <br>
                    ${
                        !(!this.idata.superior && event_options.nb15 && this_star < 15) && srate.destroy !== 0 ?
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
    let is_safeguardable = !this.idata.superior && this_star >= 12 && this_star < 18;
    if (is_safeguardable) {
        safeguard.removeClass("disabled");
        safeguard.trigger("click", true);
    } else {
        safeguard.addClass("disabled");
        safeguard.trigger("click", true);
    }

    let is_safeguard = !cb_safeguard.hasClass("disabled") && cb_safeguard.hasClass("checked");

    //text description in starforce screen
    //this part is wonky. fix later
    sf_text.attr("class", "sf-text");
    sf_description.addClass("hidden");
    let is_destroyable = false;
    if (this_star <= 10) {
        sf_text.addClass("sf-text-start");
    } else if (this_star < 12) {
        sf_text.addClass("sf-text-downgradeable");
    } else if (this_star < 15) {
        sf_text.addClass("sf-text-bothways");
        is_destroyable = true;
    } else if (this_star === 15 || this_star === 20) {
        sf_text.addClass("sf-text-destroyable");
        is_destroyable = true;
    } else {
        sf_text.addClass("sf-text-bothways");
        is_destroyable = true;
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

    if (is_safeguardable && is_safeguard) {
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
   
    this.idata.meta.sf_log_item = {};
    return true;
};