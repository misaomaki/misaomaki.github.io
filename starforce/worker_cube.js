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
    compare overall stats from current lines to the desired lines. both are resolved into their stats
*/
let compare_lines = function(desired_lines, current_lines) {
    for (let desired_line in desired_lines) {
        if (current_lines[desired_line] == null) return false;
        if (current_lines[desired_line].value < desired_lines[desired_line].value) return false;
    }

    return true;
}

/* item type for the cube rates, with sub class taking priority (copied from cube.js) */
let cube_item_type = function(idata) {
    let item_type = idata.sub_class;

    if (idata.class == "weapon") {
        item_type = idata.class;
    } else if (item_type === "") {
        item_type = idata.type;
    }

    return item_type;
}

/*
    chance for a single cube at the desired tier to roll lines matching each cube combo, and to match any of them.
    excludes cubes used to get to the desired tier.

    goes through the rolls of each line, keeping track of only what the combos look at: the totals of the desired stats
    and the count of lines that are limited (e.g., 2 ignore damage lines max), since those get rerolled when over the limit
*/
let estimate_combos = async function(d) {
    let line_rates = await cube.get_cube_type(d.item.idata.effective_level, cube_item_type(d.item.idata), d.cube, d.pot_tier);

    let desired = d.cube_combos.map((a)=>a.reduce(resolve_stat_lines.bind({
        all_stats: false,
        stat_lines: d.cube_line_stats
    }),{}));
    let watched = [...new Set(desired.flatMap((a)=>Object.keys(a)))];

    /* group each line's rolls by what they add to the desired stats and their limit type. other rolls don't change anything */
    let line_groups = line_rates.map((rates)=>{
        let groups = {};

        for (let id in rates) {
            let resolved = [id].reduce(resolve_stat_lines.bind({
                all_stats: true,
                stat_lines: d.cube_line_stats
            }),{});
            let adds = Object.fromEntries(watched.filter((k)=>k in resolved).map((k)=>[k, resolved[k].value]));
            let limit = d.stat_restriction_map[id];

            if (cube.stat_restriction[limit] == null) {
                limit = null;
            }

            if (Object.keys(adds).length === 0 && limit == null) continue;

            let key = JSON.stringify([adds, limit]);
            groups[key] = groups[key] ?? {p: 0, adds: adds, limit: limit};
            groups[key].p += rates[id];
        }

        return Object.values(groups);
    });

    /* chance of matching each combo, then any combo, from line i onwards */
    let memo = new Map();
    let walk = function(i, totals, limited) {
        if (i === line_groups.length) {
            let current = Object.fromEntries(Object.entries(totals).map(([k,v])=>[k, {value: v}]));
            let matches = desired.map((a)=>compare_lines(a, current) ? 1 : 0);

            return [...matches, matches.includes(1) ? 1 : 0];
        }

        let key = JSON.stringify([i, totals, limited]);
        if (memo.has(key)) return memo.get(key);

        let groups = line_groups[i];
        let at_limit = (g)=>g.limit != null && (limited[g.limit] ?? 0) >= cube.stat_restriction[g.limit];
        let reroll = groups.reduce((a,g)=>a + (at_limit(g) ? g.p : 0), 0);
        let rest = 1 - groups.reduce((a,g)=>a + g.p, 0); /* rolls that don't change anything */

        let result = new Array(desired.length + 1).fill(0);
        let add = (p, r)=>r.forEach((v,k)=>{ result[k] += p / (1 - reroll) * v; });

        for (let g of groups) {
            if (at_limit(g)) continue;

            let next_totals = {...totals};
            for (let k in g.adds) {
                next_totals[k] = k in next_totals ? next_totals[k] + g.adds[k] : g.adds[k];
            }

            let next_limited = g.limit == null ? limited : {...limited, [g.limit]: (limited[g.limit] ?? 0) + 1};

            add(g.p, walk(i + 1, next_totals, next_limited));
        }

        if (rest > 1e-12) {
            add(rest, walk(i + 1, totals, limited));
        }

        memo.set(key, result);
        return result;
    }

    let result = walk(0, {}, {});

    return {
        combos: result.slice(0, -1),
        any: result[result.length - 1]
    };
}

onmessage = async function(o) {
    let d = Object.assign({
        cube_combos: [],
        cube_type: "main",
        pot_tier: "legendary",
        cube: "red",
        item: {},
        stat_restriction_map: {},
        cube_line_stats: {}
    }, o.data);

    if (d.estimate) {
        postMessage({id: d.id, ...await estimate_combos(d)});
        return;
    }

    let lines = [];

    let Item = new item(d.item.idata, {
        virtual: true
    });

    const cube_stat_lines = d.cube_line_stats;

    let desired_combos = d.cube_combos.map((a)=>a.reduce(resolve_stat_lines.bind({
        all_stats: false,
        stat_lines: cube_stat_lines
    }),{}));

    /* cube combos are OR'd together. stop at the first cube that matches any of them */
    let search = function() {
        let current_lines = lines.reduce(resolve_stat_lines.bind({
            all_stats: true,
            stat_lines: cube_stat_lines
        }),{});

        return desired_combos.some((a)=>compare_lines(a, current_lines));
    }

    let same_tier = false; //desired tier is equal to item tier
    if (d.cube_combos.length !== 0) {
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