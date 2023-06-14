//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers

//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("starforce.js");
importScripts("vars.js");

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
    result: "",
    sk_cost: 0
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

    return !(current_star < GLOBAL.starforce.min_droppable_star || [10,15,20].includes(current_star));
};

let chance_count = 0; //chance time
let total_cost = 0; //keep track of total sf cost
let total_items = 0; //keep track of total items
let total_sk_cost = 0; //shadowknight coin cost
let cache = {}; //cache starforce rng data
let log_data = []; //capture all log data
let data = {}; //data from the onmessage
let current_star = 0;
let end_star = 0;
let budget_result = {};
//process the starforcing. generate the random map and pick a starforce value
let process_star = function(item, o = {}) {
    o = Object.assign({
        budget: {
            use_budget: false
        },
        log_data: log_data
    }, o);

    let this_log_data = o.log_data;

    let star = item.meta.stars;

    let ld = Object.assign({}, sf_log); //new instance of log data item

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

    /* check for budget and if the next run will go over budget */
    /*
    if (o.budget.use_budget) {
        let budget_result = {
            overbudget: false,
            reason: ""
        };

        if (total_cost > o.budget.items) {
            
        }
        if (total_items > o.budget.items) {
            budget_result.overbudget = true;
            budget_result.reason = `You have used up your spare ${o.budget.items} item(s)`;
        }

        if (total_items > o.budget.items || total_cost > o.budget.mesos) {

        }

        return [ld.star, ld.result, budget_results];
    }
    */

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
        ++total_items;
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
        let prev_cost_discount = Object.assign({}, this_log_data[0].sf_cost_discount);

        for (let a in this_cost_discount) {
            prev_cost_discount[a] += this_cost_discount[a];
        }

        ld.sf_cost_discount = Object.assign({}, prev_cost_discount);
    }

    total_cost += this_cost_actual;
    ld.sf_cost += total_cost;
    ld.star_cost = this_cost_actual;
    ld.sk_coin_cost = item.shadowknight ? shadowknight_coin_cost(star) : 0;
    total_sk_cost += ld.sk_coin_cost;
    ld.sk_cost += total_sk_cost;
    

    this_log_data.unshift(ld);

    return [ld.star, ld.result, null];
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
        reload_log: false,
        budget: {
            use_budget: false,
            items: -1,
            mesos: -1
        }
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
    if (!data.budget.use_budget) {
        while (current_star < end_star) {
            [current_star] = process_star(item);
        }
    } else {
        while (current_star < end_star) {
            [current_star, result, budget_result] = process_star(item, {budget: data.budget});

            if (budget_result.out_of_resources) {
                break;
            }
        }  
    }

    //return data from worker with the starforce log data
    //type - 1: complete log; type - 2: heuristic run update
    postMessage({done: true, data: log_data, stars_to: to, type: 1, budget: budget_result});
}