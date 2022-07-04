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

    if (type === "watt" || type === "matt") {
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
                stat_increase = Math.ceil(att_table.tier[t] * this.idata.bstat[type]);
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
    if (this.idata.class === "weapon") {
        if (flames.watt > 0 || flames.matt > 0) {
            let lookup_att = item.prototype.flame_lookup.att_tier_looukup(this.idata.flame_type, level);

            let att_done = {
                watt: flames.watt === 0,
                matt: flames.matt === 0
            };

            let wmatt = ["watt", "matt"];
            for (let i = 0; i < lookup_att.length; ++i) {
                let t_att = lookup_att[i];

                let this_watt = 1 + Math.floor(this.idata.bstat.watt * t_att);

                let this_matt = this_watt;

                if (this.idata.bstat.watt > 0 && this.idata.bstat.matt > 0) {
                    this_matt = 1 + Math.floor(this.idata.bstat.matt * t_att);
                }

                let threshold = {
                    watt: Math.abs(this_watt - flames.watt),
                    matt: Math.abs(this_matt - flames.matt)
                };

                for (let j = 0; j < wmatt.length; ++j) {
                    let j_type = wmatt[j];

                    //some values are wonky, so if they are within 3, it is okay
                    if (
                        threshold[j_type] <= 3
                    ) {
                        let wtier = i;

                        if (this.idata.flame_type === 1) {
                            wtier += 1;
                        } else {
                            wtier += 3;
                        }

                        att_done[j_type] = true;

                        rf[j_type] = wtier;
                    }
                }

                if (att_done.watt && att_done.matt) {
                    break;
                }
            }
        }
    } else {
        if (flames.watt > 0 && flames.watt <= 7) {
            rf.watt = flames.watt;
        }
        if (flames.matt > 0 && flames.matt <= 7) {
            rf.matt = flames.matt;
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
    
    //reqlvl
    let rlvl = Math.abs(flames.reqlvl);
    if (rlvl > 0 && rlvl <= 35) {
        rf.reqlvl = Math.floor(rlvl / 5);
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

    let end_val = "6";
    let over_val = 7;
    let add_val = 3;

    if (Item.idata.flame_type === 1) {
        end_val = "4";
        over_val = 5;
        add_val = 5;
    }

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

            for non-boss flames, do -2 from the tiers
        */
       let p_start = 0;
       let stc_l = st.length;

       let p_end = +(end_val.repeat(stc_l));
        for (let i = p_start; i <= p_end; ++i ) {
            let _i = 0;

            //skip numbers containing 7, 8, 9 for boss and 5, 6, 7, 8, 9 for non-boss
            if (i % 10 === over_val) {
                i += add_val;
            } 
            if (i % 100 === over_val * 10) {
                i += add_val * 10;
            } 
            if (i % 1000 === over_val * 100) {
                i += add_val * 100;
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

    let wmatt_done = false;
    for (let i in s) {
        if (i === "all_stat" || i === "damage") {
            s[i] = 0.01 * s[i];
        } else if (i === "boss_damage") {
            if (this.idata.level >= 90) {
                s[i] = 0.02 * s[i];
            } else {
                s[i] = 0;
            }
        } else if (!wmatt_done && (i === "watt" || i === "matt")) { 
            //non-weapons get atk based on its tier, but only for level 70+
            if (this.idata.class !== "weapon") {
                if (this.idata.level >= 70) {
                    s[i] = 1 * s[i];
                } else {
                    s[i] = 0;
                }
            } else {
                wmatt_done = true;

                if (s.watt > 0) {
                    s.watt = this.flame_tier_list(s.watt, "watt");
                }

                //non-mage weapons use watt for matt flames. mage weapons use their respective att for flames
                if (s.matt > 0) {
                    if (this.idata.bstat.watt > 0 && this.idata.bstat.matt === 0) {
                        s.matt = this.flame_tier_list(s.matt, "watt");
                    } else {
                        s.matt = this.flame_tier_list(s.matt, "matt");
                    }
                }
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

    let flames = Object.assign({}, stats, s);
    this.idata.boosts.flames = flames;
    return flames;
};

/*
    pass main and secondary stat to override the item's internal primrary/secondary stat

    o contains 2 attributes
     {
         mstat - main stat
         sstat - secondary stat
     }

     not relevant to weapons
*/
item.prototype.get_flame_score = function(o) {
    if (this.idata.class === "weapon") return -1;

    let m = "";
    let s = "";
    let a = "";

    if (o != undefined) {
        m = o.mstat;
        s = o.sstat;
        
        if (m === "int") {
            a = "matt";
        } else {
            a = "watt";
        }
    } else {
        m = this.idata.mstat;
        a = this.idata.att_type;

        /* if empty, then ignore as we're not going to assume what the main stat is */
        if (m === "") {
            return -1;
        } else {
            [s] = this.idata.pstat.filter((a)=>{return a !== m});
        }
    }

    let score = this.idata.boosts.flames[m] + this.idata.boosts.flames[a] * 4 + this.idata.boosts.flames.all_stat * 800 + this.idata.boosts.flames[s]/8;

    return score;
}

var flames = {
    /* 
        get rates of flame tier 1-5

        flame = 1 - powerful rebirth, 2 - eternal rebirth
    */
    tier_rates: function(flame) {
        let tiers = [];
        if (flame === 1) {
            tiers = [
                0.20,
                0.30,
                0.36,
                0.14,
                0
            ];
        } else if (flame === 2) {
            tiers = [
                0,
                0.29,
                0.45,
                0.25,
                0.01
            ];
        }

        return tiers;
    },
    /*
        get the amount of flame lines to apply

        boss flames always gets 4.
        non-boss items have at least 1. can't find rates
        info for additional lines, so just making shit up

        this = item object
    */
    line_rates: function() {
        /* item has boss flames, so always 4 */
        if (this.idata.flame_type === 2) {
            return [4, []];
        }

        let flame_lines = 1; /* number of lines to apply */
        let flame_line_apply_rate = 0.20; /* probability to add new line */

        /* log the probability determination */
        let flame_log = [];

        /*
            do probabilty check 3x to see how many
            additional lines to add
        */
        for (let i = 1; i <= 3; ++i) {
            let rng = prng();

            let log = {
                prng: rng,
                apply_rate: flame_line_apply_rate,
                apply: false
            };

            if (rng <= flame_line_apply_rate) {
                ++flame_lines;
                log.apply = true;
            }

            flame_log.push(log);
        }

        return [flame_lines, flame_log];
    },
    /* 
        get the flame tiers to apply to an item
        this = item object
    */
    apply: function(flame, o) {
        o = Object.assign({
            update_dom: true,
            idx: -1 /* for processes that dump data, idx has to be tallied from an outside process and cannot use the meta log length */
        }, o);

        if  (this.idata.flame_type === 0) return false;

        let tr = flames.tier_rates(flame);
        let [lr, lr_log] = flames.line_rates.call(this);

        let avail_flames = [
            "stats:str",
            "stats:dex",
            "stats:int",
            "stats:luk",
            "stats:str,dex",
            "stats:str,int",
            "stats:str,luk",
            "stats:dex,int",
            "stats:dex,luk",
            "stats:int,luk",
            "hp",
            "mp",
            "reqlvl",
            "def",
            "all_stat",
            "watt",
            "matt",
            "jump",
            "speed"
        ];

        if (this.idata.class === "weapon") {
            let weapon_flames = [
                "boss_damage",
                "damage"
            ];

            avail_flames.push(...weapon_flames);
        }

        shuffle(avail_flames);

        /* log flames run */
        let flames_log = {
            tiers: {},
            stats: {},
            flame_type: flame,
            run: o.idx === -1 ? this.idata.meta.flames_meta_data.length + 1 : o.idx,
            flame_list: avail_flames.concat(),
            num_lines: lr,
            num_lines_map: lr_log
        }

        /* 
            SHUFFLE the above array then get the first 4 (or however many lines to apply) items
            REDUCE - using the flame stat as key, set its value to the flame tier from the tier rates table
        */
        let flame_stats = {};
        flames_log.tiers = avail_flames.slice(0,lr).reduce((a,b)=>{
            let log_item = {};
            let tier = +get_random_result(tr,(a)=>{log_item.random_map = a}, (b)=>{log_item.prn = b}) + 1; /* flame tier */

            /* boss flames always +2 */
            if (this.idata.flame_type === 2) {
                tier += 2;
            }

            a[b] = {
                tier: tier,
                log_result: log_item
            };

            flame_stats[b] = tier;
            return a;
        },{});

        ++this.idata.meta.flames_total[flame];

        /* set flame */
        flames_log.stats = this.set_item_flame_tier(flame_stats);

        /* get non-zero stat values from the flame stats */
        flames_log.stats = Object.fromEntries(Object.entries(flames_log.stats).filter(([key,value])=>value !== 0));
     
        /* log run */
        this.idata.meta.flames_meta_data.unshift(flames_log);
        
        if (o.update_dom) {
            this.redraw_item_tooltip();
        }
    }
};

/* flames-related DOM */
$(function(){
    /* flames at bottom left */
    $("#powerfulFlame").on("click", function(){
        sfa.play("_CubeEnchantSuccess");
        flames.apply.call(Item, 1);
    });

    $("#eternalFlame").on("click", function(){
        sfa.play("_CubeEnchantSuccess");
        flames.apply.call(Item, 2);
    });

    let flame_log_default = {
        start: 0,
        end: 25
    };
    let flame_log_start = flame_log_default.start;
    let flame_log_end = flame_log_default.end;
    let flame_log_step = 25;

    let reset_flame_log_vars = function() {
        flame_log_default = {
            start: 0,
            end: 25
        };
        flame_log_start = flame_log_default.start;
        flame_log_end = flame_log_default.end;
        flame_log_step = 25;
    }

    let flame_show_more = function(initial) {
        if (!initial) {
            let this_step = flame_log_step;

            flame_log_start += flame_log_start + this_step;
            flame_log_end += flame_log_end + this_step;
        }

        let this_log = Item.idata.meta.flames_meta_data.slice(flame_log_start, flame_log_end);

        if (this_log.length === 0) {
            return false;
        }

        let t_body = get_flame_rows(this_log);

        $("#flames_body").append(t_body);
    }

    let get_flame_rows = function(flames) {
        let t_body = flames.reduce((a,b)=>{
            a += `
                <tr data-id="${b.run}" class="flame-data-row">
                    <td>${b.run}</td>
                    <td>
                        <div class="flame flame-${b.flame_type === 2 ? "eternal" : "powerful"} flame-small"></div>
                    </td>
                    <td>
                        <div class="flames-sub-table-container">
                            <table class="flames-sub-table">
                                <tbody>
                                ${
                                    Object.keys(b.tiers).sort().reduce((x,y)=>{
                                        x += `
                                            <tr>
                                                <td style="text-align:center;width:50%;">${y}</td>
                                                <td style="text-align:center;width:50%;">${b.tiers[y].tier}</td>
                                            </tr>
                                        `;

                                        return x;
                                    }, "")
                                }
                                </tbody>
                            </table>
                        </div>
                    </td>
                    <td>
                        <div class="flames-sub-table-container">
                            <table class="flames-sub-table">
                                <tbody>
                                ${
                                    Object.keys(b.stats).sort().reduce((x,y)=>{
                                        if (y.startsWith("stats")) return x;
                                        
                                        x += `
                                            <tr>
                                                <td style="text-align:center;width:50%;">${y}</td>
                                                <td style="text-align:center;width:50%;">
                                                    ${
                                                        ["boss_damage", "damage", "all_stat"].includes(y) ? (b.stats[y] * 100).toFixed(0) + "%"
                                                        : 
                                                        b.stats[y]
                                                    }
                                                </td>
                                            </tr>
                                        `;

                                        return x;
                                    }, "")
                                }
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            `;
            return a;
        },"");

        return t_body;
    };

    /* open up flames log */
    let get_flames_html = function() {
        let html = `
            <div id="flames_total">
                <div class="flame flame-powerful flame-small"></div> x${Item.idata.meta.flames_total["1"]}
                &nbsp;
                <div class="flame flame-eternal flame-small"></div> x${Item.idata.meta.flames_total["2"]}
            </div>
            <div id="flames_log_rng_map" class="hidden"></div>
            <div id="flames_log_information">
                <div id="flames_used"></div>
                <table style="width:100%;font-size:11px;float:left;" id="cube_log_table">
                    <thead>
                        <tr>
                            <th colspan="12">
                                Click on the cells to view the flames PRNG info.
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Flame Type</th>
                            <th>Tiers</th>
                            <th>Stats</th>
                        </tr>
                    </thead>
                    <tbody id="flames_body">
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">
                                <span id="infinite_scroller_down">
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        return html;
    };
    
    let flame_prn = "";
    let flame_container = "";
    let flame_back_button = "";
    let option_box = "";

    $("#flames_log").on("click", function() {
        option_box = $("#option_box");

        reset_flame_log_vars();

        let html = get_flames_html();

        let flame_return_to_main = function() {
            flame_prn.html("").addClass("hidden");
            flame_container.removeClass("hidden");

            option_box.dialog({
                position: {my: "center", at: "top center", of: window},
                width: "60vw",
                height: 850
            });

            flame_back_button.addClass("hidden");
        };

        option_box.html(html).dialog({
            position: {my: "center", at: "top center", of: window},
            title: "Flames Log",
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
            width: "60vw",
            height: 850,
            buttons: [{
                text: "Back",
                class: "hidden",
                id: "btn_flames_back",
                click: function() {
                    flame_return_to_main();
                }
            },{
                text: "Close",
                click: function() {
                    option_box.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        flame_show_more(true);

        /* infinite scroller */
        let scroller = new IntersectionObserver((e)=>{
            if (e[0].intersectionRatio <= 0) return;

            flame_show_more(false);
        });
        let scroll_watcher = document.querySelector("#infinite_scroller_down");

        scroller.observe(scroll_watcher);
    });

    /* bind events to rows for flame log */
    /* click flames row to pull up the rng map data */
    $("body").on("click", ".flame-data-row", function() {
        let id = +$(this).attr("data-id");
        let log_item = Item.idata.meta.flames_meta_data.find((a)=>a.run === id);

        let log = log_item.tiers;

        if (log == undefined) return false;

        let log_keys = Object.keys(log).sort();
        let tier_keys = Object.keys(log[log_keys[0]].log_result.random_map);
        
        let html = `
            <h2>
                Run #${id}, Flame: <div class="flame flame-${log_item.flame_type === 2 ? "eternal" : "powerful"} flame-small"></div>
            </h2>
            <hr>
            ${
                Item.idata.flame_type === 1 ? `
                    There is a 20% chance to add a new line to non-boss flame items.
                    <span style="color:red;font-size:0.9em;">
                        Note: Was not able to find the probability rates for how additional lines are added
                        to non-boss flames, so an assumption was made.
                    </span>
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <th colspan="4">
                                    The prng value must be below 0.20 to add an additional line. The first line is always guaranteed.
                                </th>
                            </tr>
                            <tr>
                                <th>Line #1</th>
                                <th>Line #2</th>
                                <th>Line #3</th>
                                <th>Line #4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span style="color:green">
                                        Guaranteed
                                    </span>
                                </td>
                                ${
                                    log_item.num_lines_map.reduce((x,y)=>{
                                        x += `
                                            <td>
                                                <span style="color:${y.apply ? "green": "red"}">
                                                    ${y.prng}
                                                </span>
                                            </td>         
                                        `;

                                        return x;
                                    }, "")
                                }
                            </tr>
                        </tbody>
                    </table>
                ` : `
                    Item is a boss flame equip, so there is a 100% chance to add 4 flame lines to the item.
                `
            }
            <hr>
                Stats are chosen by shuffling the list of possible flame stat types and choosing
                the first ${log_item.num_lines} line(s). <br>
                Randomized list of flame lines with chosen lines highlighted in blue: 
                    <div style="padding:5px;width:100%">${log_item.flame_list.map((a,b)=>{
                        if (b < log_item.num_lines) {
                            return `
                                <span style="color:blue">${a}</span>
                            `;
                        }

                        return a;
                    }).join(" | ")}
                </div>
            <hr>
            <table style="width:100%">
                <thead>
                    <tr>
                        <th>Tier</th>
                        ${
                            log_keys.reduce((a,b)=>{
                                a += `
                                    <th>${b}</th>
                                `;
                                return a;
                            }, "")
                        }
                    </tr>
                    <tr>
                        <th></th>
                        ${
                            log_keys.reduce((a,b)=>{
                                a += `
                                    <th>${log[b].log_result.prn}</th>
                                `;
                                return a;
                            }, "")
                        }
                    </tr>
                </thead>
                <tbody>
                    ${
                        tier_keys.reduce((a,b)=>{
                            a += `
                                <tr>
                                    <td>${+b + 1 + (Item.idata.flame_type === 2 ? 2 : 0)}</td>
                                    ${
                                        log_keys.reduce((x,y)=>{
                                            let map = log[y].log_result.random_map[b];
                                            let prn = log[y].log_result.prn;

                                            x += `
                                                <td>
                                                    ${
                                                        map.reduce((n,[from, to])=>{
                                                            n += `
                                                                <span style="display:block" class="${prn >= from && prn <= to ? "highlight-row" : "" }">
                                                                    ${from} - ${to}
                                                                </span>
                                                            `;
                                                            return n; 
                                                        }, "")
                                                    }
                                                </td>
                                            `;
                                            return x;
                                        }, "")
                                    }
                                </tr>
                            `;
                            return a;
                        }, "")
                    }
                </tbody>
            </table>
        `;

        flame_prn = $("#flames_log_rng_map");
        flame_container = $("#flames_log_information");
        flame_back_button = $("#btn_flames_back");

        flame_prn.html(html).removeClass("hidden");
        flame_container.addClass("hidden");

        option_box.dialog({
            position: {my: "center", at: "top center", of: window},
            width: "100vw",
            height: "auto"
        });

        flame_back_button.removeClass("hidden");
    });
});