let $ = function() {};

importScripts("init.js");
importScripts("vars.js");
importScripts("item_prototype.js");
importScripts("flames.js");

/* 
    compare flame tiers directly 
    desired_flame_search 0 = exact, 1 = greater than or equal to
*/
var compare_flames_tier = function(item_flame, desired_flame, desired_flame_search) {
    for (let i in desired_flame) {
        if (item_flame[i] == null ) {
            return false;
        } else { 
            if (desired_flame_search[i] == 0) {
                if (item_flame[i].tier !== desired_flame[i]) {
                    return false;
                }
            } else {
                if (item_flame[i].tier < desired_flame[i]) {
                    return false;
                }
            }
        }
    }

    return true;
}

/*
    compare flame stats against tier stats
*/
var all_stat = ["str", "dex", "int", "luk"];
var compare_flames_stats = function(item_flame, desired_flame) {
    for (let i in desired_flame) {
        if (i !== "any_stat") {
            if (item_flame[i] == null) {
                return false;
            } else { 
                if (item_flame[i] < desired_flame[i]) {
                    return false;
                }
            }
        } else {
            let any_greater = false;
            for (let j = 0; j < all_stat.length; ++j) {
                if (item_flame[all_stat[j]] >= desired_flame.any_stat) {
                    any_greater = true;
                    break;
                }
            }

            if (!any_greater) {
                return false;
            }
        }
    }

    return true;
}

var compare_score = function(item_score, desired_score) {
    return item_score >= desired_score;
}

/* determine which one to used based on whether the desired stats are passed as tiers or raw stats */
var compare_flames = function(is_tier, item_flame, desired_flame, desired_flame_search) {
    if (is_tier) {
        return compare_flames_tier(item_flame.tiers, desired_flame, desired_flame_search);
    } else {
        return compare_flames_stats(item_flame.stats, desired_flame);
    }
}

/* check a flame against a flame combo */
var match_combo = function(item_flame, c) {
    /* flame score comparison */
    if (c.calc_type == 2) {
        return compare_score(item_flame.score, c.flame_score);
    }

    return compare_flames(c.is_tier, item_flame, c.flame_options, c.flame_options_search);
}

/*
    chance for a single flame to match each flame combo, and to match any of them.

    goes through every roll of the lines the combos look at. the other lines only matter
    in how many of them take up the flame's line slots.
*/
var estimate_combos = function(this_item, flame, combos) {
    let avail = flames.available_lines.call(this_item);
    let tier_rates = flames.tier_rates(flame);
    let line_rates = flames.line_count_rates.call(this_item);
    let max_lines = line_rates.length - 1;

    /* tier, stats, and flame score of each line on its own. a flame's stats and score are the sum of its lines */
    let line_rolls = {};
    for (let line of avail) {
        line_rolls[line] = [];

        tier_rates.forEach((p, i)=>{
            if (p === 0) return;

            let tier = i + 1 + (this_item.idata.flame_type === 2 ? 2 : 0); /* boss flames always +2 */
            let stats = this_item.set_item_flame_tier({[line]: tier});

            line_rolls[line].push({
                p: p,
                tier: tier,
                stats: Object.fromEntries(Object.entries(stats).filter(([key,value])=>value !== 0)),
                score: this_item.get_flame_score()
            });
        });
    }

    /* lines that can change whether a flame matches any of the combos */
    let watched = avail.filter((line)=>combos.some((c)=>{
        if (c.calc_type == 2) {
            return line_rolls[line].some((r)=>r.score > 0);
        } else if (c.is_tier) {
            return line in c.flame_options;
        } else {
            let keys = Object.keys(c.flame_options).flatMap((k)=>k === "any_stat" ? all_stat : [k]);
            return line_rolls[line].some((r)=>keys.some((k)=>k in r.stats));
        }
    }));

    /* chance that a flame's lines include a specific set of j watched lines and no other watched lines */
    let n = avail.length;
    let w = watched.length;
    let pick_rates = [];
    for (let j = 0; j <= max_lines; ++j) {
        pick_rates[j] = 0;

        for (let l = j; l <= max_lines; ++l) {
            pick_rates[j] += line_rates[l] * n_choose_k(n - w, l - j) / n_choose_k(n, l);
        }
    }

    let combo_rates = combos.map(()=>0);
    let any_rate = 0;

    let walk = function(start, picked, p, tiers, stats, score) {
        let item_flame = {tiers: tiers, stats: stats, score: score};
        let rate = p * pick_rates[picked];
        let any = false;

        combos.forEach((c, i)=>{
            if (match_combo(item_flame, c)) {
                combo_rates[i] += rate;
                any = true;
            }
        });

        if (any) any_rate += rate;

        if (picked === max_lines) return;

        for (let i = start; i < watched.length; ++i) {
            let line = watched[i];

            for (let r of line_rolls[line]) {
                let next_stats = {...stats};
                for (let k in r.stats) {
                    next_stats[k] = (next_stats[k] ?? 0) + r.stats[k];
                }

                walk(i + 1, picked + 1, p * r.p, {...tiers, [line]: {tier: r.tier}}, next_stats, score + r.score);
            }
        }
    }

    walk(0, 0, 1, {}, {}, 0);

    return {
        combos: combo_rates,
        any: any_rate
    };
}

onmessage = function(o) {
    let this_item = new item(o.data.item.idata, {
        virtual: true
    });

    if (o.data.estimate) {
        postMessage(estimate_combos(this_item, o.data.flame, o.data.flame_combos));
        return;
    }

    let current_tiers = {};
    let idx = 0;
    log_cache = [];

    /* flame combos are OR'd together. stop at the first flame that matches any of them */
    let search = function() {
        return o.data.flame_combos.some((c)=>match_combo(current_tiers, c));
    }

    do {
        idx += 1;
        flames.apply.call(this_item, o.data.flame, {
            idx: idx
        });

        current_tiers = this_item.idata.meta.flames_meta_data[0];

        if (this_item.idata.meta.flames_meta_data.length > 2000) {
            this_item.idata.meta.flames_meta_data.pop();
        }

        if (idx % 1000 === 0) {
            let return_message = `Flaming process is still running. ${idx} flames have been used... <br><br> Keeping only the last 2000 records to prevent browser crash.`;

            postMessage({done: false, code: 16, message: return_message});
        }
    } while (!search())

    postMessage({
        done: true, 
        item: this_item,
        code: 1
    });
};