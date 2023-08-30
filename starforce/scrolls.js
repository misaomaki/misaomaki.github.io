
item.prototype.cache.scroll = {
    //item scrolls, start with _  is spell trace
    //spell traces give different stats depending on the "tier" of the item, based on its level. tier stat corresponds to its array index
    //weapon trace
    _100w: {
        main: [0,0,1],
        att: [1,2,3]
    },
    _70w: {
        main: [0,1,2],
        att: [2,3,5]
    },
    _30w: {
        main: [1,2,3],
        att: [3,5,7]
    },
    _15w: {
        main: [2,3,4],
        att: [5,7,9]
    },
    //"hat", "top", "bottom", "shoes", "cape", "shoulder", "shield", "overall" trace
    _100a: {
        main: [1,2,3],
        hp: [5,20,30],
        def: [1,2,3]
    },
    _70a: {
        main: [2,3,4],
        hp: [15,40,70],
        def: [2,4,5]
    },
    _30a: {
        main: [3,5,7],
        hp: [30,70,120],
        def: [4,7,10]
    },
    _15a: {
        main: [4,7,10],
        hp: [45,110,170],
        def: [6,10,15]
    },
    //glove trace
    _100g: {
        att: [0,1],
        def: [3,0]
    },
    _70g: {
        att: [1,2]
    },
    _30g: {
        att: [2,3]
    },
    _15g: {
        att: [3,4]
    },
    //heart trace
    _100h: {
        att: [1,2,3]
    },
    _70h: {
        att: [2,3,4]
    },
    _30h: {
        att: [3,5,7]
    },
    //other trace (accessories etc)
    _100m: {
        main: [1,1,2]
    },
    _70m: {
        main: [2,2,3]
    },
    _30m: {
        main: [3,4,5]
    },
    /* item scrolls */
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

/* different equipment types have different level "tiers". this is used to get the index of stats to use for the spell trace */
item.prototype.get_item_scroll_tier = function() {
    let level = this.idata.level;

    if (this.idata.type === "gloves") {
        if (level <= 74) {
            return 0;
        } else {
            return 1;
        }
    }

    /* everything else */
    if (level <= 74) {
        return 0;
    } else if (level <= 114) {
        return 1;
    } else {
        return 2;
    }
}

//[{stat, percent, amount}]
item.prototype.set_item_scroll = function(s) {
    let max_scrolls = this.idata.upgrades + this.idata.max_hammers;
    let curr_scrolls = 0;
    let spell_trace_used = 0;
    let scroll_tier = this.get_item_scroll_tier();

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
        let is_spell_trace = _s.type.startsWith("_");

        if (is_spell_trace) {
            if (this.idata.class === "weapon") {
                _s.type = _s.type + "w";
            } else if (["hat", "top", "bottom", "shoes", "cape", "shoulder", "shield", "overall"].includes(this.idata.type)) {
                _s.type = _s.type + "a";
            } else if (this.idata.type === "gloves") {
                _s.type = _s.type + "g";
            } else if (this.idata.type === "mechanical heart") {
                _s.type = _s.type + "h";
            } else {
                _s.type = _s.type + "m";
            }            
                
            spell_trace_used += _s.amount;
        } else if (_s.type === "prime") {
            if (this.idata.class === "weapon" || this.idata.type === "mechanical heart") {
                _s.type = "prime_weapon";
            } else if (this.idata.class === "armor" && this.idata.sub_class !== "accessory") {
                _s.type = "prime_armor";
            } else if (this.idata.sub_class === "accessory") {
                _s.type = "prime_accessory";
            }
        }

        if (_s.stat != null) {
            stat_gain = _s.stat;
        }

        let scr_type = this.cache.scroll[_s.type];

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

            let stat_val = scr_type[j];

            if (is_spell_trace) {
                stat_val = stat_val[scroll_tier];
            }

            /* main stat of HP is the main stat gain * 50 */
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