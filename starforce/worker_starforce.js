//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers
//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("starforce.js");
importScripts("item_prototype.js");
importScripts("vars.js");

/*
    top-level settings
*/
let user_settings = {};
let event_options = {};

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

    let Item = new item(data.item.idata, {
        virtual: true
    }); 

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
    postMessage({done: true, item: Item, stars_to: end_star, type: 1});
}