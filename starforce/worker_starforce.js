//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers
//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("vars.js");
importScripts("starforce.js");
importScripts("item_prototype.js");

/*
    top-level settings
*/
let user_settings = {};
let event_options = {};
let Item = {};

//worker event for posting data to worker from page
onmessage = function(d) {
    data = d.data;
    
    //bind default options
    data = Object.assign({
        from: 0,
        to: 10,
        item: {},
        user_settings: {},
        event_options: {},
        safeguard: [],
        starcatch: [],
        heuristic: false
    }, data);
    
    user_settings = data.user_settings; 
    event_options = data.event_options;

    Item = new item(data.item.idata, {
        virtual: true
    }); 

    //todo
    if (data.heuristic) {  
        heuristic_run(data.to);

        postMessage({
            done: true,
            item: Item,
            stars_to: data.to, 
            code: 1,
            type: 2, //heuristic run update
        });

        
        self.close();
        return;
    }

    //max stars allowed for the item type
    let end_star = data.to;
    if (end_star > Item.idata.meta.max_stars) {
        end_star = Item.idata.meta.max_stars; 
    }

    while (Item.idata.meta.stars < end_star) {
        let starcatch = data.starcatch.includes(Item.idata.meta.stars);
        user_settings.starforce.safeguard = data.safeguard.includes(Item.idata.meta.stars); //safeguard for this star level
        Item.starforce(starcatch);
    }

    //return data from worker with the starforce log data
    //type - 1: complete log; type - 2: heuristic run update
    postMessage({done: true, item: Item, stars_to: end_star, type: 1, code: 1});
    self.close();
}





/*
    heuristic process

    TODO
*/
function heuristic_run(end_star) {
    let item_copy = new item(Item.idata, {
        virtual: true 
    });

    const heuristic_log_data = {};
    const heuristic_data = {
        booms: 0,    
        sf_cost: 0,
        sf_cost_discount: {
            "0.03": 0,
            "0.03,0.3": 0,
            "0.05": 0,
            "0.05,0.3": 0,
            "0.1": 0,
            "0.1,0.3": 0,
            "0.3": 0,
        }
    };

    let item_completed = false;
    let starting_star = end_star - 1; //start from the previous star level
    heuristic_log_data[starting_star] = []; //initialize the log for this star level

    do {
        item_completed = run_starforcing(item_copy, starting_star, end_star)

        if (item_completed) {
            heuristic_log_data[--starting_star] = []; //move to the previous star level
        }
    } while (!item_completed && starting_star > 22)

    function run_starforcing(this_item, starting_star, end_star) {
        this_item.set_item_level(starting_star);
    
        while (this_item.idata.meta.stars < end_star) {
            let starcatch = data.starcatch.includes(this_item.idata.meta.stars);
            user_settings.starforce.safeguard = data.safeguard.includes(this_item.idata.meta.stars); //safeguard for this star level
            let result = this_item.starforce(starcatch);
    
            if (result === GLOBAL.starforce_enums.DESTROY) {
                heuristic_log_data[starting_star].push(this_item.idata.meta.sf_meta_data); 
                this_item.clear_sf_history();
                ++heuristic_data.booms;
                this_item.set_item_level(starting_star);
            }
        }
    
        return true;
    }
}