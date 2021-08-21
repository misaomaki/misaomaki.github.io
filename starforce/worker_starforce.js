//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers

//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("starforce.js");

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

//worker event for posting data to worker from page
onmessage = function(d) {
    let data = d.data;
    
    //bind default options
    data = Object.assign({
        to: 10,
        item: {},
        sys_type: "GMS",
        starcatch: [],
        events: {},
        safeguard: [],
        heuristic: false,
        max_records: 5000
    }, data);

    let MAX_LOG_RECORDS = data.max_records;

    let item = d.data.item;

    //get star to start at and star to end at
    let from = data.item.meta.stars;
    let to = data.to;

    //keep track of the current star as it is starforcing
    let current_star = from;

    //override item's current star
    if (d.from != null) {
        current_star = d.from;
    }

    //cache starforce rng data
    let cache = {};

    //get the max stars allowed and see if it's over the "to" stars requested
    let this_max_star = star_max(data.item.level, data.item.superior);

    let end_star = to;

    if (to > this_max_star) {
        end_star = this_max_star;
    }

    //capture all log data
    let log_data = [];

    let chance_count = 0; //chance time
    let total_cost = 0; //keep track of total sf cost
    //process the starforcing. generate the random map and pick a starforce value
    let process_star = function(star) {
        let ld = Object.assign({}, sf_log);

        ld.id = log_data.length + 1;
        ld.starcatch = data.starcatch.includes(current_star);

        ld.is_safeguard = data.safeguard.includes(current_star);

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
            ++current_star;

            if (chance_count === 2) {
                this_results = "chance_time_success";
            }

            chance_count = 0;
        //fail or safeguard
        } else if (this_results === "fail" || this_results === "sc_success" || (this_results === "destroy" && ld.is_safeguard)) {
            let droppable = is_droppable(current_star, item.superior);

            if (droppable) {
                --current_star;
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
            current_star = 12;
            chance_count = 0;
        }

        ld.result = this_results;

        ld.star = current_star;

        let this_cost_discount = log_starforce_cost(this_cost, this_cost_actual, current_star);

        ld.star_cost_discount = Object.assign({}, this_cost_discount);

        //log the starforce cost for all discounts from mvp and events. the cost accumulates with each run
        if (ld.id === 1) {
            ld.sf_cost_discount = Object.assign({}, this_cost_discount);
        } else {
            let prev_cost_discount = Object.assign({}, log_data[ld.id - 2].sf_cost_discount);

            for (let a in this_cost_discount) {
                prev_cost_discount[a] += this_cost_discount[a];
            }

            ld.sf_cost_discount = Object.assign({}, prev_cost_discount);
        }

        total_cost += this_cost_actual;
        ld.sf_cost += total_cost;
        ld.star_cost = this_cost_actual;

        log_data.unshift(ld);
    };

    //while the stars are less than the desired stars, run starforcing and log results
    while (current_star < end_star) {
        process_star(current_star);
    }

    /*
    //limit amount of records returned
    if (log_data.length > MAX_LOG_RECORDS) {
        log_data = log_data.slice(MAX_LOG_RECORDS * -1);
    }
    */

    //return data from worker with the starforce log data
    postMessage({done: true, data: log_data, stars_to: to});
}