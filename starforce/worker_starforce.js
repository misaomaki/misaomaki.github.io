//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers

//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("starforce.js");

/*
    while this is copied code from item_prototype.js, this starforcing is considerably faster
    because it does not do a lot of the processes the real starforcing code does. useful for pure
    starforce calculations without any interactions with the DOM
*/

let sf_log = {
    id: 0,
    sf_cost: 0,
    sf_cost_discount: {},
    is_safeguard: false,
    prn: 0,
    prn_map: [],
    star: 0,
    result: ""
}; //starforce log item

//from item_prototype.js
let log_starforce_cost = function(base_cost, cost, level) {
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

//from item_prototype.js
let is_droppable = function(current_star, superior) {
    if (superior) {
        return current_star !== 0;
    };

    return !(current_star < 10 || [10,15,20].includes(current_star));
};

let chance_count = 0; //chance time
let total_cost = 0; //keep track of total sf cost
let cache = {}; //cache starforce rng data
let log_data = []; //capture all log data
let h_log_data = []; //meta variable. captures log data for heuristic runs which will be pushed to the master heuristic log data on boom
let h_log_data_master = []; //meta heuristic log data that keeps track of booms by heuristic default star.
let data = {}; //data from the onmessage
let current_star = 0;
let end_star = 0;
let h_current_star = 0;
let h_end_star = 0;
//process the starforcing. generate the random map and pick a starforce value
let process_star = function(item, o = {}) {
    o = {
        heuristic: false,
        log_data: log_data,
        ...o
    };

    let this_log_data = o.log_data;

    let star = item.meta.stars;

    let ld = Object.assign({}, sf_log);

    ld.id = log_data.length + 1;
    ld.starcatch = data.starcatch.includes(star);

    ld.is_safeguard = data.safeguard.includes(star);

    //if star is at safeguard, then increase the cost accordingly
    let cost_multiplier = ld.is_safeguard ? 2 : 1;

    let name = "sf" + star;

    let this_sr = {};
    let this_cost = 0;
    let this_cost_actual = 0;

    //cache star success rates and cost
    if (name in cache) {
        this_sr = cache[name].sr;
        this_cost = cache[name].cost;
    } else {
        this_sr = star_success_rate(star, item.superior);
        this_cost = star_cost(item.level, star, data.sys_type, data.superior, star_cost_type(item.type));
    
        cache[name] = {
            sr: this_sr,
            cost: this_cost
        };
    }

    this_cost_actual = this_cost * cost_multiplier;

    let this_results = get_random_result(this_sr, (a)=>{ld.prn_map = a;}, (b)=>{ld.prn = b;});

    //change star depending on result.
    //chance time or success or starcatch success
    if (chance_count === 2 || this_results === "success" || (this_results === "sc_success" && ld.starcatch)) {
        ++item.meta.stars;

        if (chance_count === 2) {
            this_results = "chance_time_success";
        }

        chance_count = 0;
    //fail or safeguard
    } else if (this_results === "fail" || this_results === "sc_success" || (this_results === "destroy" && ld.is_safeguard)) {
        let droppable = is_droppable(item.meta.stars, item.superior);

        if (droppable) {
            --item.meta.stars;
            ++chance_count;
        }

        //destroy, but safeguarded
        if (this_results === "destroy") {
            this_results = "fail-safeguard";
        //sc-success but wasn't star catched
        } else if (this_results === "sc_success") {
            this_results = "sc_fail";
        }
    //destroy
    } else if (this_results === "destroy") {
        item.meta.stars = 12;
        chance_count = 0;
    }

    ld.result = this_results;

    ld.star = item.meta.stars;

    let this_cost_discount = log_starforce_cost(this_cost, this_cost_actual, item.meta.stars);

    ld.star_cost_discount = Object.assign({}, this_cost_discount);

    //log the starforce cost for all discounts from mvp and events. the cost accumulates with each run
    if (ld.id === 1) {
        ld.sf_cost_discount = Object.assign({}, this_cost_discount);
    } else {
        //keep an ongoing sum of sf cost
        //heuristic runs don't need thisd at as it doesn't make sense
        if (!o.heuristic) {
            let prev_cost_discount = Object.assign({}, this_log_data[0].sf_cost_discount);

            for (let a in this_cost_discount) {
                prev_cost_discount[a] += this_cost_discount[a];
            }

            ld.sf_cost_discount = Object.assign({}, prev_cost_discount);
        }
    }

    total_cost += this_cost_actual;
    ld.sf_cost += total_cost;
    ld.star_cost = this_cost_actual;

    this_log_data.unshift(ld);

    return [ld.star, ld.result];
};

//worker event for posting data to worker from page
onmessage = function(d) {
    data = d.data;
    
    //bind default options
    data = Object.assign({
        from: 0,
        to: 10,
        item: {},
        sys_type: "GMS",
        starcatch: [],
        events: {},
        safeguard: [],
        heuristic: false,
        reload_log: false
    }, data);

    if (data.reload_log) {
        log_data = [];
    }

    let item = data.item;

    //get star to start at and star to end at
    let current_star = item.meta.stars;
    let to = data.to;
    //override item's current star
    if (data.from != null) {
        current_star = data.from;
        item.meta.stars = current_star;
    }

    //get the max stars allowed and see if it's over the "to" stars requested
    let this_max_star = star_max(data.item.level, data.item.superior);

    let end_star = to;

    if (to > this_max_star) {
        end_star = this_max_star;
    }

    //while the stars are less than the desired stars, run starforcing and log results
    if (!data.heuristic || end_star <= 22) {
        while (current_star < end_star) {
            [current_star] = process_star(item);
        }
    } else {
        heuristic_starforce(item, current_star, end_star);
    }

    //return data from worker with the starforce log data
    //type - 1: complete log; type - 2: heuristic run update
    postMessage({done: true, data: log_data, stars_to: to, type: 1});
}

//NOT DONE
var heuristic_starforce = function(item, current_star, end_star) {
    //init a dummy heuristic item. flimsy method for deep copy
    let h_item = JSON.parse(JSON.stringify(item));

    let h_current_star_default = end_star - 1;

    let hidx_add = 0;

    let h_boom = {}; //keep track of boom by star

    /*
        starforce between the given stars. for stars above 22, it is always [star], [star+1]. below 22, the h_start = 12
        if the item booms, toss trace and start again at initial h_start. log the boomed item
    */
    let heuristic_starforce = function(h_start, h_end, o) {
        o = {
            log_to: h_log_data_master,
            cb: (hld)=>{
                o.log_to.unshift(...hld);
            },
            ...o
        };

        h_item.meta.stars = h_start;

        let h_end_m1 = h_end - 1;
        let h_end_name = "b" + h_end_m1;
        if (!(h_end_name in h_boom)) {
            h_boom["b" + h_end_m1] = 0;
        }

        if (h_end <= 22) {
            while (h_start < h_end) {
                [h_start] = process_star(h_item, {
                    heuristic: true,
                    log_data: h_log_data
                });
            }
        } else {
            while (h_start < h_end) {
                let h_result = "";
                let h_start_pre = h_start;
                [h_start, h_result] = process_star(h_item, {
                    heuristic: true,
                    log_data: h_log_data
                });

                //if the item booms, reset the item to below the desired star and try again
                if (h_result === "destroy" && h_start_pre >= 22) {
                    ++h_boom[h_end_name];
                    //keep track of what the boomed run was trying to get to
                    h_log_data[0].h_end_star = h_end_m1;
                    h_item.meta.stars = h_start = h_end_m1;
                    o.cb(h_log_data);
                    hidx_add += h_log_data.length;
                    h_log_data = [];
                }
            }
        }

        o.cb(h_log_data);
        hidx_add += h_log_data.length;
        h_log_data = [];
    }

    //first run will get data for current star to end star
    heuristic_starforce(current_star, end_star);
    
    let hldmL = h_log_data_master.length;
    hidx_add = 0;

    let callstack_update = 0;
    let boom_count = 0;
    let upd_message = "";
    /*
        starting from the desired, run the heuristic starforce function. the first run with the end star will set the initial data
        this part will then go through that data, and for any booms, run heuristic starforcing to the desired star. this will be done
        recursively for all booms above 22. at 22, the runs will be real runs from 12->22.

        code does the following for a run to 24 stars:

        1. run heuristic starforcing from [current star]. if boom, start again at [desired star - 1]. bracket value is where the code starts with a new item set at [desired star - 1].
        assuming the item started at 15. while the stars are below 22, it will not toss trace
        15 -> 15 -> 12 -> 13 -> ... -> 23 -> 22 -> 23 -> {12 -> 23} -> ... -> 24

        3. look for anywhere there is a boom (star = 12) in the sf records, fill in the gap, but starting at where it boomed -1 (so 12 -> 23 will start starforcing at 22)
        any booms will start at [end star - 1]
        15 -> ... -> 23 -> 22 -> 23 -> {12 -> [22} -> 21 -> 20 -> 21 -> {12 -> 22} -> ...] -> 23 ... -> 24

        4. recursively do this until there are only 12 -> 22 gaps left, in which case, run starforcing normally to complete the starforce records
        15 -> ... -> 23 -> 22 -> 23 -> 12 -> [13 -> 14 -> 13 -> ... ] -> 22 -> 21 -> 20 -> 21 -> 12 -> [11 -> 10 -> 11 -> ... ] -> 22 -> 23 ... -> 24

        the purpose of this is to start at the end to get a definitive "end" to the starforcing, then work backwards to fill the gap. this allows us to track the progress of the starforcing, 
        whereas if we starforced normally, getting to the end takes much longer and we can't track its progress since it's random


        ISSUE: for 25: eventually crashes because too much data.
    */
    while (h_current_star_default >= 22) {
        upd_message = "Beginning backfill of star: " + h_current_star_default;
        callstack_update = 0;
        postMessage({done: true, message: upd_message, type: 2});
        for (let i = 0; i < hldmL; ++i) {
            let h_i = h_log_data_master[i];

            if (
                h_i.h_end_star !== h_current_star_default
            ) {
                continue;
            }

            let i_start = h_i.h_end_star - 1;
            let i_end = h_i.h_end_star;

            if (i ===hldmL - 1) {
                i_start = h_log_data_master[i+1]
            }

            if (i_end <= 22) {
                i_start = 12;
            }

            //star force, then splice those records to before the current index to fill the "gap" from boom and new item with starforce records
            heuristic_starforce(i_start, i_end, {
                cb: (hld)=>{
                    h_log_data_master.splice(i, 0, ...hld);
                }
            });

            i += hidx_add;
            hidx_add = 0;

            hldmL = h_log_data_master.length;
            delete h_i.h_end_star;
            ++callstack_update;
            ++boom_count;

            if (callstack_update % 50 === 0 || i === hldmL) {
                postMessage({done: true, message: `${upd_message} (${((boom_count/h_boom["b" + h_current_star_default])*100).toFixed(2)}%)`, type: 2});
            }
        }

        h_current_star_default--;
        boom_count = 0;
    }

    postMessage({done: true, message: `Post-processing of heuristically-generated star force data...`, type: 2});

    //post process
    //TODO. NO POINT IF ALL THE DATA CRASHES ANYWAY
    for (let i = hldmL - 1; i >= 0; --i) {
        let h_i = h_log_data_master[i];
        let h_i2 = h_log_data_master[i+1];

        
    }

    postMessage({done: true, message: `Passing ${hldmL} records to be processed...`, type: 2});
    log_data = h_log_data_master;
};