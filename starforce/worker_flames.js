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

onmessage = function(o) {
    let this_item = new item(o.data.item.idata, {
        virtual: true
    });

    let current_tiers = {};
    let idx = 0; 
    log_cache = [];

    let search = function() {
        return compare_flames(o.data.is_tier, current_tiers, o.data.flame_options, o.data.flame_options_search);
    }

    /* flame score comparison */
    if (o.data.calc_type == 2) {
        search = function() {
            return compare_score(current_tiers.score, o.data.flame_score);
        }
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