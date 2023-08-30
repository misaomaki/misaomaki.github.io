/*
    chaos scrolls
*/

const cogs = {
    rates: {
        "cog": { /* chaos scroll of goodness */
            "0": 0.1838,
            "1": 0.3301,
            "2": 0.2387,
            "3": 0.1387,
            "4": 0.0494,
            "5": 0.0593
        },
        "icog": { /* incredible chaos scroll of goodness */
            "0": 0.1838,
            "1": 0.3301,
            "2": 0.2387,
            "3": 0.1387,
            "4": 0.0494,
            "6": 0.0593
        },
        "c": { /* chaos scroll */
            "-5": 0.0494,
            "-4": 0.0297,
            "-3": 0.0365,
            "-2": 0.0800,
            "-1": 0.1370,
            "0": 0.1838,
            "1": 0.1931,
            "2": 0.1587,
            "3": 0.1021,
            "4": 0.0198,
            "5": 0.0099
        }
    },
    /* 
        stats affected by chaos scrolls 
        hp and mp is cog value * 10
    */
    stats: [
        "str",
        "dex",
        "int",
        "luk",
        "watt",
        "matt",
        "def",
        "jump",
        "speed",
        "hp",
        "mp"
    ],
    /*
        this = Item

        apply chaos scroll. loop through the item's stat list and if it is in cogs.stats, then
        run cog probability and apply the stat
    */
    scroll: function(type, redraw = false) {
        let scroll = cogs.rates[type];

        let stats_modified = Object.assign({
            stat_success: true
        }, stats);

        /* 
            loop through the base stats and see if it will be modified 
            chaos scrolls do not affect stats that were added by other means. only base stats
        */
        for (stat in this.idata.bstat) {
            /* stat is not chaos-able or base stat value is 0 */
            if (!cogs.stats.includes(stat) || this.idata.bstat[stat] === 0) continue;
            /* once a chaos scroll causes the stat to negative, it can't be brought back */
            if (Item.idata.meta.final_stats[stat] <= 0) continue; 

            let cog_rng = {};
        
            let tier_result = get_random_result(scroll, (a) => {
                cog_rng.r_map = a;
            }, (a)=>{
                cog_rng.tier_prng = a;
            });

            stats_modified[stat] = +tier_result;
        }

        this.idata.boosts.scroll_data.push(stats_modified);

        if (redraw) {
            this.redraw_item_tooltip();
        }
    }
};

/* chaos scroll names */
cogs.types = Object.keys(cogs.rates);
