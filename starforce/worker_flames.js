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
var compare_flames_stats = function(item_flame, desired_flame) {
    for (let i in desired_flame) {
        if (item_flame[i] == null ) {
            return false;
        } else { 
            if (item_flame[i] < desired_flame[i]) {
                return false;
            }
        }
    }

    return true;
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
    let this_item = new item(o.data.item.idata);
    let current_tiers = {};
    let idx = 0; 

    do {
        idx += 1;
        flames.apply.call(this_item, o.data.flame, {
            update_dom: false,
            idx: idx
        });

        current_tiers = this_item.idata.meta.flames_meta_data[0];

        if (idx !== 1 && idx % 1000 === 0) {
            let return_message = `Flaming process is still running. ${idx} flames have been used... <br><br> Every 20000 records, data is dumped to prevent browser crash.`;

            if (idx % 20000 === 0) {
                this_item.idata.meta.flames_meta_data = [this_item.idata.meta.flames_meta_data[1]];
            }

            postMessage({done: false, code: 16, message: return_message});
        }
    } while (!compare_flames(o.data.is_tier, current_tiers, o.data.flame_options, o.data.flame_options_search))

    postMessage({
        done: true, 
        data: {
            flame_log: this_item.idata.meta.flames_meta_data,
            flame_used: this_item.idata.meta.flames_total,
            flame_stats: this_item.idata.boosts.flames
        }, 
        code: 1
    });
};