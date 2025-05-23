//dummy jquery initialization so that any jquery stuff resolves to nothing
//we're not expected to use jquery stuff in web workers

//recreation of starforcing process without dom update and jquery usage. webworkers do be like that
let $ = function() {};

let system = {
    cube: "GMS"
};

importScripts("init.js");
importScripts("vars.js");
importScripts("item_prototype.js");
importScripts("cubes.js");

/*
    callback for REDUCE function. used to resolve cube lines into their stats
    e.g., STR: 13% -> {
        id: "STR",
        value: 0.13
    }
*/
let resolve_stat_lines = function(a,b) {
    if (b == -1) {
        return a;
    }

    /*
        get statline in a grouped format, so STR: 3%, STR: 6%, STR: 9%, STR: 12% all are grouped as STR% line.
    */
    let item = this.stat_lines[b] ?? {
        id: b,
        value: 0,
        is_percent: false
    };

    item.id = item.id.trim();

    if (!(item.id in a)) {
        a[item.id] = Object.assign({}, item);
    } else {
        a[item.id].value += item.value;
    }

    /*
        if true, then for all_stat line, add each primary attribute value to the returned data
    */
    if (this.all_stats) {
        if (item.id.includes("All Stats")) {
            for (let stats = ["STR", "INT", "DEX", "LUK"], i = 0; i < stats.length; ++i) {
                let stat = stats[i];

                if (item.is_percent) {
                    stat += "_p";
                }

                if (stat in a) {
                    a[stat].value += item.value;
                } else {
                    a[stat] = Object.assign({}, item);
                    a[stat].id = stat;
                }
            }
        }
    }

    return a;
};

/*
    compare overall stats from current lines to the desired lines
*/
let stat_compare = function(desired_lines, current_lines_unprocessed, stat_lines) {
    let current_lines = current_lines_unprocessed.reduce(resolve_stat_lines.bind({
        all_stats: true,
        stat_lines: stat_lines
    }),{});
    let has_any_desired = true;
    
    for (desired_line in desired_lines) {
        if (desired_line in current_lines) {
            if (current_lines[desired_line].value < desired_lines[desired_line].value) return false;
        } else if (current_lines[desired_line] == null) {
            return false;
        }
    }
    
    return has_any_desired;
}

onmessage = async function(o) {
    let d = Object.assign({
        cube_lines: [],
        cube_type: "main",
        pot_tier: "legendary",
        cube: "red",
        item: {},
        stat_restriction_map: {},
        cube_line_stats: {}
    }, o.data);

    let lines = [];

    let Item = new item(d.item.idata, {
        virtual: true
    });

    /*
        check if pot lines have stat lines that go over the restriction limit.
    */
    let lines_check = d.cube_lines.map((a)=>{
        return d.stat_restriction_map[a]; /* resolve line into common type to check against (e.g., boss damage 40%/35%/30% becomes boss_dmg) */
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

    const cube_stat_lines = d.cube_line_stats;

    let desired_lines = d.cube_lines.reduce(resolve_stat_lines.bind({
        all_stats: false,
        stat_lines: cube_stat_lines
    }),{});

    let search = function() {
        return stat_compare(desired_lines, lines, cube_stat_lines);
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

            await cube.cube.call(Item, d.cube, [], ()=>{}, {
                update_dom: false,
                auto_select: true
            });
            
            let cr = Item.idata.meta.cube_log_item;

            /*
                end the cubing if the item tiers up passed the desire tier, as those lines will never be hit.
                return the last run to update the item's pots with
            */
            if (!same_tier) {
                same_tier = cube.rarity_enum[d.pot_tier] === cube.rarity_enum[cr.tier || ""];
            }
            if (d.pot_tier !== "legendary") {
                if (cube.rarity_enum[d.pot_tier] < cube.rarity_enum[cr.tier || ""]) {
                    postMessage({done: false, code: 2, message: "Item tiered passed the desired potential.", data: Item});
                    return false;
                }
            }

            //get the raw lines to check against the desired lines
            lines = cr.results.result.map((a)=>{return a.id});

            if (Item.idata.meta.cube_meta_data.length > 2000) {
                Item.idata.meta.cube_meta_data.pop();
            }

            //let user know the page didn't freeze and the process is still running
            if (idx !== 1 && idx % 1000 === 0) {
                let return_message = `Cubing process is still running. ${idx} cubes have been used... <br><br> Keeping only the last 2000 records to prevent browser crash.`;

                postMessage({done: false, code: 16, message: return_message});
            }
        }
        while (!(same_tier && search()));
    }

    let this_record = Item.idata.meta.cube_meta_data[0];

    //once process exits, mark the last record as keep
    this_record.keep = true;
    Item.idata.boosts.cubes[this_record.type] = Item.idata.meta.cube_meta_data[0].results.result;

    postMessage({done: true, code: 1, message: "", data: Item, cube: d.cube});
}