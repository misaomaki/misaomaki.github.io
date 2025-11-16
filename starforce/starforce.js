//previous rates for 25 star
var star_success_rate_25 = function(star, superior = false) {
    
    /*
    //debugging
    return {
        success: 0,
        fail: 1,
        destroy: 0
    };
    */
    let starcatch_rate = 0.045; //starcatch assumption
    
    let base_success_rate = 1;
    let success_rate = 0;
    let destroy_rate = 0;
    let fail_rate = 0;
    let sc_rate = 0;

    if (superior) {
        //success, destroy
        let sup = [
            [0.5,0],
            [0.5,0],
            [0.45,0],
            [0.4,0],
            [0.4,0],
            [0.4,0.018],
            [0.4,0.03],
            [0.4,0.042],
            [0.4,0.06],
            [0.37,0.0945],
            [0.35,0.13],
            [0.35,0.1625],
            [0.03,0.485],
            [0.02,0.49],
            [0.01,0.495]
        ];

        let this_rate = sup[star];
        
        success_rate = this_rate[0];
        destroy_rate = this_rate[1];
        fail_rate = +(base_success_rate - success_rate - destroy_rate).toFixed(4);
        sc_rate = success_rate * starcatch_rate;
    } else {
        let sdiff = 0;

        if (star < 15) {
            sdiff = (star + 1);
            
            if (star > 2 ) sdiff -= 1;

            sdiff = sdiff * 0.05;
        } else if (star < 22) {
            sdiff = 0.7;
        } else if (star < 30) {
            sdiff = (75 + star) / 100;
        }

        if (star < 15) {
            destroy_rate = 0;
        } else if (star < 18) {
            destroy_rate = 0.021;
        } else if (star < 20) {
            destroy_rate = 0.028;
        } else if (star < 22) {
            destroy_rate = 0.07;
        } else if (star === 22) {
            destroy_rate = 0.194;
        } else if (star === 23) {
            destroy_rate = 0.294;
        } else if (star === 24) {
            destroy_rate = 0.396;
        }

        success_rate = +(base_success_rate - sdiff).toFixed(2);
        fail_rate = +(base_success_rate - success_rate - destroy_rate).toFixed(4);

        sc_rate = success_rate * starcatch_rate; //starcatch assumption
    }

    return {
        [GLOBAL.starforce_enums.SUCCESS]: success_rate,
        [GLOBAL.starforce_enums.FAIL]: fail_rate - sc_rate,
        [GLOBAL.starforce_enums.DESTROY]: destroy_rate,
        [GLOBAL.starforce_enums.SC_SUCCESS]: sc_rate
    };
};

//current rates for 30 star
var star_success_rate = function(star, superior = false, boom_reduction = 0) {
    
    /*
    //debugging
    return {
        success: 0,
        fail: 1,
        destroy: 0
    };
    */
    let starcatch_rate = 0.045; //starcatch assumption
    
    let base_success_rate = 1;
    let success_rate = 0;
    let destroy_rate = 0;
    let fail_rate = 0;
    let sc_rate = 0;

    if (superior) {
        //success, destroy
        let sup = [
            [0.5,0],
            [0.5,0],
            [0.45,0],
            [0.4,0],
            [0.4,0],
            [0.4,0.018],
            [0.4,0.03],
            [0.4,0.042],
            [0.4,0.06],
            [0.37,0.0945],
            [0.35,0.13],
            [0.35,0.1625],
            [0.03,0.485],
            [0.02,0.49],
            [0.01,0.495]
        ];

        let this_rate = sup[star];
        
        success_rate = this_rate[0];
        destroy_rate = this_rate[1];
        sc_rate = success_rate * starcatch_rate;
        fail_rate = +(base_success_rate - success_rate - destroy_rate).toFixed(4);
        
        return {
            [GLOBAL.starforce_enums.SUCCESS]: success_rate,
            [GLOBAL.starforce_enums.FAIL]: fail_rate - sc_rate,
            [GLOBAL.starforce_enums.DESTROY]: destroy_rate,
            [GLOBAL.starforce_enums.SC_SUCCESS]: sc_rate    
        }
    }

    /*
    Enhancement Level	Success Chance	Maintain Chance	Destruction Chance
    15	30.00%	67.90%	2.10%
    16	30.00%	67.90%	2.10%
    17	15.00%	78.20%	6.80%
    18	15.00%	78.20%	6.80%
    19	15.00%	76.50%	8.50%
    20	30.00%	59.50%	10.50%
    21	15.00%	72.25%	12.75%
    22	15.00%	68.00%	17.00%
    23	10.00%	72.00%	18.00%
    24	10.00%	72.00%	18.00%
    25	10.00%	72.00%	18.00%
    26	7.00%	74.40%	18.60%
    27	5.00%	76.00%	19.00%
    28	3.00%	77.60%	19.40%
    29	1.00%	79.20%	19.80%
    */

    let sdiff = 0;

    if (star < 15) {
        sdiff = (star + 1);
        
        if (star > 2 ) sdiff -= 1;

        sdiff = sdiff * 0.05;
    } else if (star === 15 || star === 16) {
        success_rate = 0.3;
        destroy_rate = 0.021;
    } else if (star === 17 || star === 18) {
        success_rate = 0.15;
        destroy_rate = 0.068;
    } else if (star === 19) {
        success_rate = 0.15;
        destroy_rate = 0.085;
    } else if (star === 20) {
        success_rate = 0.3;
        destroy_rate = 0.105;
    } else if (star === 21) {
        success_rate = 0.15;
        destroy_rate = 0.1275;
    } else if (star === 22) {
        success_rate = 0.15;
        destroy_rate = 0.17;
    } else if (star === 23 || star === 24 || star === 25) {
        success_rate = 0.1;
        destroy_rate = 0.18;
    } else if (star === 26) {
        success_rate = 0.07;
        destroy_rate = 0.186;
    } else if (star === 27) {
        success_rate = 0.05;
        destroy_rate = 0.19;
    } else if (star === 28) {
        success_rate = 0.03;
        destroy_rate = 0.194;
    } else if (star === 29) {
        success_rate = 0.01;
        destroy_rate = 0.198;
    }

    success_rate = success_rate === 0 ? +(base_success_rate - sdiff).toFixed(2) : success_rate;
    sc_rate = success_rate * starcatch_rate; //starcatch assumption
    let real_destroy_rate = destroy_rate; /* keep track of real in case of reduction */


    /* apply boom reduction if present, it is mulitplicative, so take it from the boom and add it to the fail rate */
    if (boom_reduction) {
        destroy_rate = +(destroy_rate * (1 - boom_reduction)).toFixed(4);
    }

    fail_rate = +(base_success_rate - success_rate - destroy_rate).toFixed(4);

    return {
        [GLOBAL.starforce_enums.SUCCESS]: success_rate,
        [GLOBAL.starforce_enums.FAIL]: fail_rate - sc_rate,
        [GLOBAL.starforce_enums.DESTROY]: destroy_rate,
        [GLOBAL.starforce_enums.SC_SUCCESS]: sc_rate,
        __real_destroy_rate: real_destroy_rate
    };
};

//zero weapons cost caps at level 150
var star_cost_type = function(item_type) {
    if (item_type === "Long Sword" || item_type === "Heavy Sword") {
        return 2;
    }

    return 1;
};

/* type is deprecated. GMS and KMS have same calculations now */
var star_cost = function(level, star, type = "GMS", superior = false, sc_type) {
    //superior equipment have a fixed cost
    if (superior) {
        return Math.round(Math.pow(level,3.56)/100)*100;
    }

    /*
        specific items like zero weapons have their cost capped at level 150
    */
    if (sc_type === 2) {
        if (level > 150) {
            level = 150;
        }
    }

    let rlevel = parseInt(level/10,10) * 10;
    let divisor = 0;
    let power = 2.7;
    let cost = 0;
    let multiplier = 1;

    if (star < 10) {
        divisor = 2500;
        power = 1;
    } else if (star < 11) {
        divisor = 40000;
    } else if (star < 12) {
        divisor = 22000;
    } else if (star < 13) {
        divisor = 15000;
    } else if (star < 14) {
        divisor = 11000;
    } else if (star < 15) {
        divisor = 7500;
    } else if (star < GLOBAL.starforce.max_stars) {
        divisor = 20000;
    }

    cost = Math.round(( 
        multiplier * Math.pow(rlevel, 3) * (Math.pow(star + 1, power) / divisor)
    ) + 10) * 100;

    return cost;
};

/*
    get the max stars for an item, based on its level
*/
var star_max = function(level, superior = false) {
    let tier = [];

    //min level, max level, max stars
    if (superior) {
        tier = [
            [0,95,3],
            [96,107,5],
            [108,117,8],
            [118,127,10],
            [128,137,12],
            [138,275,15]
        ];
    } else {
        tier = [
            [0,95,5],
            [96,107,8],
            [108,117,10],
            [118,127,15],
            [128,137,20],
            [138,275,GLOBAL.starforce.max_stars]
        ];
    }

    let sm = 0;
    for (let i = 0; i < tier.length; ++i) {
        let t = tier[i];
        if (level >= t[0] && level <= t[1]) {
            sm = t[2];
            break;
        }
    }

    return sm;
};

var shadowknight_coin_cost = function(star) {
    return 5 + star * 5;
}

/*
    get the "tier" for starforcing to apply the appropriate stats
    lower tiers give lower stat gains
*/
let star_tier = function(level, superior = false) {
    let tier = [];

    //min level, max level, tier = index+1
    if (superior) {
        tier = [
            [0,77],
            [78,87],
            [88,97],
            [98,107],
            [108,117],
            [118,127],
            [128,137],
            [138,149],
            [150,275]
        ];
    } else {
        tier = [
            [128,137],
            [138,149],
            [150,159],
            [160,199],
            [200,249],
            [250,300]
        ];
    }

    let star_tier = 0;
    for (let i = 0; i < tier.length; ++i) {
        let t = tier[i];
        if (level >= t[0] && level <= t[1]) {
            star_tier = i+1;
            break;
        }
    }

    return star_tier;
};

/*
    get the equipment stats gained from the starforce based on its current star
*/
var equip_gain = function(item) {
    let add = Object.assign({}, stats);

    let star = item.meta.stars;

    add.star = star;

    if (star === (item.superior ? 15 : item.meta.max_stars)) {
        star = 1;
    }

    let item_star_tier = star_tier(item.effective_level, item.superior);

    //superior equipment max 15 follow different rules
    if (item.superior) {
        let sup_rate = [
            {
                all_stat_1: 1,
                all_stat_2: 2,
                all_stat_3: 4,
                all_stat_4: 7,
                all_stat_5: 9,
                all_stat_6: 12,
                all_stat_7: 14,
                all_stat_8: 17,
                all_stat_9: 19
            },
            {
                all_stat_1: 2,
                all_stat_2: 3,
                all_stat_3: 5,
                all_stat_4: 8,
                all_stat_5: 10,
                all_stat_6: 13,
                all_stat_7: 15,
                all_stat_8: 18,
                all_stat_9: 20
            },
            {
                all_stat_1: 4,
                all_stat_2: 5,
                all_stat_3: 7,
                all_stat_4: 10,
                all_stat_5: 12,
                all_stat_6: 15,
                all_stat_7: 17,
                all_stat_8: 20,
                all_stat_9: 22
            },
            {
                all_stat_3: 10,
                all_stat_4: 13,
                all_stat_5: 15,
                all_stat_6: 18,
                all_stat_7: 20,
                all_stat_8: 23,
                all_stat_9: 25
            },
            {
                all_stat_3: 14,
                all_stat_4: 17,
                all_stat_5: 19,
                all_stat_6: 22,
                all_stat_7: 24,
                all_stat_8: 27,
                all_stat_9: 29
            },
            {
                att_5: 5,
                att_6: 6,
                att_7: 7,
                att_8: 8,   
                att_9: 9
            },
            {
                att_5: 6,
                att_6: 7,
                att_7: 8,
                att_8: 9,   
                att_9: 10
            },
            {
                att_5: 7,
                att_6: 8,
                att_7: 9,
                att_8: 10,   
                att_9: 11
            },
            {
                att_6: 9,
                att_7: 10,
                att_8: 11,   
                att_9: 12
            },
            {
                att_6: 10,
                att_7: 11,
                att_8: 12,   
                att_9: 13
            },
            {
                att_7: 13,
                att_8: 14,   
                att_9: 15
            },
            {
                att_7: 15,
                att_8: 16,   
                att_9: 17
            },
            {
                att_8: 18,   
                att_9: 19
            },
            {
                att_8: 20,   
                att_9: 21
            },
            {
                att_8: 22,   
                att_9: 23
            }
        ];

        let this_rate = sup_rate[star === 15 ? 14 : star];

        add = Object.assign(add,{
            str: this_rate["all_stat_" + item_star_tier] || 0,
            dex: this_rate["all_stat_" + item_star_tier] || 0,
            int: this_rate["all_stat_" + item_star_tier] || 0,
            luk: this_rate["all_stat_" + item_star_tier] || 0,
            watt: this_rate["att_" + item_star_tier] || 0,
            matt: this_rate["att_" + item_star_tier] || 0,
            def_p: 0.05
        });

        return add;
    }

    if (item.class === "weapon") {
        if (star < 15) {
            add.watt_p += 0.02;
            add.matt_p += 0.02;
        }
    } else if (item.type === "gloves") {
        /*
        if (star === 4) {
            add.watt += 1;
            add.matt += 1;
        }
        */

        if ([4,6,8,10,12,13,14].includes(star)) {
            if (item.bstat.watt > 0) {
                add.watt += 1;
            }
            if (item.bstat.matt > 0) {
                add.matt += 1;
            }
        }
    } else if (item.type === "shoes") {
        if (star >= 2 && star < 10) {
            add.speed += 1;
            add.jump += 1;
        } else if (star >= 10 && star < 15) {
            add.speed += 2;
            add.jump += 2;
        }
    }

    if (item.type === "overalls") {
        add.def_p += 0.1;
    } else {
        add.def_p += 0.05;
    }

    let hp = 0;
    let mp = 0;
    if (star < 16 && !["gloves", "shoes"].includes(item.type)) {
        if (star < 3) {
            hp += 5;
            mp += 5;
        } else if (star < 5) {
            hp += 10;
            mp += 10;
        } else if (star < 7) {
            hp += 15;
            mp += 15;
        } else if (star < 9) {
            hp += 20;
            mp += 20;
        } else if (star < 15) {
            hp += 25;
            mp += 25;
        }
    }

    add.hp += hp;
    if (item.type === "weapon") {
        add.mp += mp;
    }

    //core stats
    if (star < 5) {
        add.job_stats += 2;
    } else if (star < 15) {
        add.job_stats += 3;
    } else if (star <= 30) {
        /* starts at 16+ */
        /*
            26->30 stars (inside the spreaded array) unsure of stats
        */
        let tier = [
            /* level 128-137 */
            {
                bonus_stat: 7,
                bonus_att: [7,8,9,10,11],
                bonus_att_weapon: [6,7,7,8,9]
            },
            /* level 138-149 */
            {
                bonus_stat: 9,
                bonus_att: [8,9,10,11,12,13,15,17,19,21, ...[22,23,24,25,26] ],
                bonus_att_weapon: [7,8,8,9,10,11,12,30,31,32, ...[33,34,35,36,37]]
            },
            /* level 150-159 */
            {
                bonus_stat: 11,
                bonus_att: [9,10,11,12,13,14,16,18,20,22, ...[23,24,25,26,27] ],
                bonus_att_weapon: [8,9,9,10,11,12,13,31,32,33, ...[34,35,36,37,38] ]
            },
            /* level 160-199 */
            {
                bonus_stat: 13,
                bonus_att: [10,11,12,13,14,15,17,19,21,23, ...[24,25,26,27,28] ],
                bonus_att_weapon: [9,9,10,11,12,13,14,32,33,34, ...[35,36,37,38,39] ]
            },
            /* level 200-249 */    
            {
                bonus_stat: 15,
                bonus_att: [12,13,14,15,16,17,19,21,23,25, ...[26,27,28,29,30]],
                bonus_att_weapon: [13,13,14,14,15,16,17,34,35,36, ...[37,38,39,40,41]]
            },
            /* level 250-300 */
            {
                bonus_stat: 17,
                bonus_att: [14,15,16,17,18,19,21,23,25,27, ...[28,29,30,31,32]],
                bonus_att_weapon: [17, 17, 18, 18, 19, 20, 21, 38, 39, 40, ...[41,42,43,44,45]] /* CURRENTLY UNKNOWN, EDUCATED GUESS VIA CHATGPT */
            }
        ];

        let base_visible_stat = 0;
        let idx = star - 15;

        let _tier = tier[item_star_tier - 1];;

        if (star < 22) {
            base_visible_stat += _tier.bonus_stat;
        }

        if (item.meta.starforce_gains_att) {
            let base_att = 0;
            
            if (item.class === "weapon") {
                base_att = _tier.bonus_att_weapon[idx];
            } else {
                base_att = _tier.bonus_att[idx];
            }

            add.watt += base_att;
            add.matt += base_att;
        }

        add.visible_stats += base_visible_stat;
    } 

    return add;
}; 

var equip_gain_total = function(sa = []) {
    let tot = Object.assign({}, stats);

    for (let i = 0; i < sa.length; ++i) {
        let stat = sa[i];

        if (stat.stat_success == null || stat.stat_success) {
            for (let j in stat) {
                tot[j] += stat[j];
            }
        }
    }

    return tot;
};  

var boom_starting_star = function(superior = false, star = 0) {
    if (superior) {
        return 0;
    }

    if (GLOBAL.starforce.boom_type === 1) {
        return 12;
    } else {
        if (star >= 15 && star <= 19) {
            return 12;
        } else if (star === 20) {
            return 15;
        } else if (star >= 21 && star <= 22) {
            return 17;
        } else if (star >= 23 && star <= 25) {
            return 19;
        } else {
            return 20;
        }
    }
}

//generate html after analyzing item log data for starforce
//pass in Item.idata.meta.sf_meta_data
let analyze_starforce = function(d) {
    let s = {
        g: {
            runs: d.length,
            highest_star: 0,
            final_star: 0,
            [GLOBAL.starforce_enums.SUCCESS]: 0,
            [GLOBAL.starforce_enums.CHANCE_TIME_SUCCESS]: 0,
            [GLOBAL.starforce_enums.FAIL]: 0,
            [GLOBAL.starforce_enums.SC_SUCCESS]: 0,
            [GLOBAL.starforce_enums.SC_FAIL]: 0,
            booms: {}, //broken down by level
            safeguards: {}, //broken down by level
            tot_safeguards: 0,
            tot_booms: 0,
            //cost broken down by events and mvp discounts
            cost: {
                "1.0": 0,
                "0.1": 0,
                "0.1,0.3": 0,
                "0.03": 0,
                "0.03,0.3": 0,
                "0.3": 0,
                "0.05": 0,
                "0.05,0.3": 0
            },
            sk_cost: 0
        }, //global stats from all items
        i: [] //boomed items get their own stats here
    };

    let is_new_item = false;

    //base log item
    let _sd = {
        runs: 0,
        highest_star: 0,
        final_star: 0,
        total_cost: 0,
        [GLOBAL.starforce_enums.SUCCESS]: 0,
        [GLOBAL.starforce_enums.CHANCE_TIME_SUCCESS]: 0,
        [GLOBAL.starforce_enums.FAIL]: 0,
        [GLOBAL.starforce_enums.SC_SUCCESS]: 0,
        [GLOBAL.starforce_enums.SC_FAIL]: 0,
        safeguards: {},
        total_cost: 0,
        tot_safeguards: 0,
        cost: {
            "1.0": 0,
            "0.1": 0,
            "0.1,0.3": 0,
            "0.03": 0,
            "0.03,0.3": 0,
            "0.3": 0,
            "0.05": 0,
            "0.05,0.3": 0
        },
        sk_cost: 0
    };

    //init boom count for each level to 0
    for (let i = GLOBAL.starforce.safeguard_stars.min; i <= GLOBAL.starforce.max_stars; ++i) {
        s.g.booms["b" + i] = 0;
        if (i < GLOBAL.starforce.safeguard_stars.max) {
            s.g.safeguards["sg" + i] = 0;
            _sd.safeguards["sg" + i] = 0;
        }
    }

    let sd = $.extend(true, {}, _sd);

    let dL1 = d.length - 1;

    for (let i = dL1; i >= 0; --i) {
        let _d = d[i];

        //increment sf attempts count
        ++sd.runs;

        let result = _d.result;

        if (_d.star > s.g.highest_star) {
            s.g.highest_star = _d.star;
        }

        if (_d.star > sd.highest_star) {
            sd.highest_star = _d.star;
        }

        //get total cost for global and individual boomed run
        sd.cost["1.0"] += _d.star_cost;
        s.g.cost["1.0"] += _d.star_cost;

        /* shadowknight coin cost, if relevant */
        sd.sk_cost += _d.sk_coin_cost;
        s.g.sk_cost += _d.sk_coin_cost;

        for (let j in _d.sf_cost_discount) {
            sd.cost[j] += _d.star_cost_discount[j];
            s.g.cost[j] += _d.star_cost_discount[j];
        }

        //increment result count
        if (result !== GLOBAL.starforce_enums.DESTROY) {
            if (result === GLOBAL.starforce_enums.FAIL_SAFEGUARD) {
                let _pd = d[i+1];

                if (_pd == undefined) continue;

                ++s.g.safeguards["sg" + _pd.star];
                ++sd.safeguards["sg" + _pd.star];

                ++s.g.tot_safeguards;
                ++sd.tot_safeguards;

                //fail safeguard counts as fail
                ++s.g.fail;
                ++sd.fail;
            } else {
                ++sd[result];
                ++s.g[result];
            }
        } else {
            let _pd = d[i+1];

            if (_pd == undefined) continue;

            ++s.g.booms["b" + _pd.star];
            ++s.g.tot_booms;

            sd.final_star = _pd.star;

            is_new_item = true;
        }

        //if item boomed, then commit item to s item store and init a new log item
        //if no booms, then the final run is the same as total cost, so don't show it
        if (is_new_item || (i === 0 && s.g.tot_booms > 0)) {
            sd.tot_success = sd[GLOBAL.starforce_enums.SUCCESS] + sd[GLOBAL.starforce_enums.CHANCE_TIME_SUCCESS] + sd[GLOBAL.starforce_enums.SC_SUCCESS];
            sd.tot_fail = sd[GLOBAL.starforce_enums.FAIL] + sd[GLOBAL.starforce_enums.SC_FAIL];

            if (i === 0) {
            sd.final_star = _d.star;
            }

            s.i.push(sd);
            sd = $.extend(true, {}, _sd);
            is_new_item = false;
        }
    }

    s.g.tot_success = s.g[GLOBAL.starforce_enums.SUCCESS] + s.g[GLOBAL.starforce_enums.CHANCE_TIME_SUCCESS] + s.g[GLOBAL.starforce_enums.SC_SUCCESS];
    s.g.tot_fail = s.g[GLOBAL.starforce_enums.FAIL] + s.g[GLOBAL.starforce_enums.SC_FAIL];
    s.g.final_star = d[0].star;

    return s;
};