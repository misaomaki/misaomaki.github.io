//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers

//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

importScripts("init.js");
importScripts("cube_dictionary.js");
importScripts("cube_rates_main.js");
importScripts("cube_rates_bonus.js");
importScripts("cube_rates.js");
importScripts("cubes.js");

/*
    check if array a and b contain the same values.
    a = array 1
    b = array 2
    c = enforce array order. [1,2,3] and [3,2,1] will be considered the same if this is false

    -1 is treated as a wildcard value, so [-1,2,3] is treated as equal to [4,2,3]
*/
let arrayCompare = function(_a, _b, c = false) {   
    if (!c) {
        //copy array
        let a = _a.concat();
        let b = _b.concat();

        //get count of lines in struct format
        a = a.reduce((x,y)=>{if (y in x) {++x[y];} else {x[y] = 1}; return x;},{});
        b = b.reduce((x,y)=>{if (y in x) {++x[y];} else {x[y] = 1}; return x;},{});
        
        //check if key from a exists in b, then compare the count of a and b. if wildcard value, ignore
        for (let i in a) {
            if (i == -1) continue;

            if (b[i] !== a[i]) {
                return false;
            }
        }
    } else {
        //if order is enforced, then compare array lines index to index. if wildcard value, ignore
        for (let i = 0; i < _a.length; ++i) {
            if (a[i] == -1 || b[i] == -1) continue;

            if (a[i] !== b[i]) {
                return false;
            }
        }
    }

    return true;
}

let rarity_enum = {
    "": 0,
    "rare": 1,
    "epic": 2,
    "unique": 3,
    "legendary": 4
};

onmessage = function(o) {
    let d = Object.assign({
        cube_lines: [],
        cube_type: "main",
        pot_tier: "legendary",
        cube: "red",
        item: {},
        enforce_order: false
    }, o.data);

    let lines = [];

    /*
        check if pot lines have stat lines that go over the restriction limit.
    */
    let lines_check = d.cube_lines.map((a)=>{
        return a.replace(/\d+$/, "");
    }).reduce((a,b)=>{
        if (b in a) {
            ++a[b]
        } else {
            a[b] = 1;
        }

        return a;
    }, {});

    for (let i in lines_check) {
        let i_line = lines_check[i];

        let restriction_check = cube.stat_restriction[i];

        if (restriction_check < i_line) {
            postMessage({done: false, code: -1, message: "Potential combination contain lines that are restricted to 2 or fewer instances.", data: d.item.idata.meta.cube_meta_data});
            return false;
        }
    }
    
    let same_tier = false; //desired tier is equal to item tier
    if (d.cube_lines.length !== 0) {
        /*
            run cube proc then check the results against the desired lines.
            keep running until they match.

            log results as they are done.
        */
        let idx = 0;
        do {
            ++idx;

            cube.cube.call(d.item, d.cube, [], ()=>{}, {
                update_dom: false
            });
            
            let cr = d.item.idata.meta.cube_log_item;

            /*
                end the cubing if the item tiers up passed the desire tier, as those lines will never be hit.
                return the last run to update the item's pots with
            */
            if (!same_tier) {
                same_tier = rarity_enum[d.pot_tier] === rarity_enum[cr.tier || ""];
            }
            if (d.pot_tier !== "legendary") {
                if (rarity_enum[d.pot_tier] < rarity_enum[cr.tier || ""]) {
                    postMessage({done: false, code: 2, message: "Item tiered passed the desired potential.", data: d.item});
                    return false;
                }
            }

            //get the raw lines to check against the desired lines
            lines = cr.results.result.map((a)=>{return a.id});

            //let user know the page didn't freeze and the process is still running
            if (idx !== 1 && idx % 1000 === 0) {
                let return_message = `Cubing process is still running. ${idx} cubes have been used... <br><br> Every 2000 records, data is dumped to prevent browser crash.`;
                if (idx % 2000 === 0) {
                    d.item.idata.meta.cube_meta_data = [d.item.idata.meta.cube_meta_data[1]];
                }

                postMessage({done: false, code: 16, message: return_message});
            }
        }
        while (!(same_tier && arrayCompare(d.cube_lines, lines, d.enforce_order)));
    }

    //once process exits, mark the last record as keep
    d.item.idata.meta.cube_meta_data[0].keep = true;

    postMessage({done: true, code: 1, message: "", data: d.item, pot: lines});
}