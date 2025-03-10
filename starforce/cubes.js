var cube = {
    rates: {},
    type: {},
    user: {}  /* save user options (for auto cube) for each item type (saves lines selected and cube type) */
};

//some stats cannot exceed a certain number of lines. if not listed here, then assumes max lines allowed
//the stat value doesn't matter. stats of the same type will count towards the limit
//if the stat is encountered when at the limit, it will reroll until it's not that stat
cube.stat_restriction = {
    invinc: 1,
    decent_skill: 1,
    ignore_dmg: 2,
    invinc2: 2
};

cube.rarity_enum = {
    "": 0,
    "rare": 1,
    "epic": 2,
    "unique": 3,
    "legendary": 4
};

/* 
    turn on and off cubes depending on item's current tier (e.g., disable occult if current item is passed epic tier)

    targets = container of cubes

    this = item
*/
cube.update_cube_menu = function(targets) {
    let tier = cube.rarity_enum[this.idata.meta.cube_potential];
    let bonus_tier = cube.rarity_enum[this.idata.meta.cube_potential_bonus];

    targets.find(".cube").removeClass("disabled");

    if (tier > 2) {
        targets.find(".cube[data-id=occult]").addClass("disabled");
    }

    if (tier > 3) {
        targets.find(".cube[data-id=master]").addClass("disabled");
    }

    if (bonus_tier > 2) {
        targets.find(".cube[data-id=bonus_occult]").addClass("disabled");
    }
}

/*
    calculate cube line restriction types map. ran manually whenever cube_hash files are updated with new lines (rare)
*/
cube.calculate_restriction_type = async function() {
    let cube_restrict_type = {};
    let data = await cube.fetch_cube_rates();

    for (let hash in data) {
        for (let lines in data[hash]) {
            if (lines.includes("chance to ignore")) {
                cube_restrict_type[lines] = "ignore_dmg";
            } else if (lines.includes("Item Drop Rate")) {
                cube_restrict_type[lines] = "item_drop";
            } else if (lines.includes("chance to become invincible for")) {
                cube_restrict_type[lines] = "invinc";
            } else if (lines.includes("Ignored Enemy DEF")) {
                cube_restrict_type[lines] = "ied";
            } else if (lines.includes("Invincibility time after")) {
                cube_restrict_type[lines] = "invinc2";
            } else if (lines.includes("Decent")) {
                cube_restrict_type[lines] = "decent_skill";
            } else if (lines.includes("Boss Monster Damage")) {
                cube_restrict_type[lines] = "boss_dmg";
            }
        }
    }

    return cube_restrict_type;
}

/*
    get the numerical value for stats for cube lines
*/

cube.cube_line_as_int_stats = [
    "STR", 
    "DEX", 
    "INT", 
    "LUK", 
    "All Stats",
    "DEF",
    "ATT", 
    "Magic ATT", 
    "Damage", 
    "Boss Monster Damage", 
    "Ignored Enemy DEF", 
    "Max HP", 
    "Max MP", 
    "Critical Damage", 
    "Critical Rate", 
    "Item Drop Rate", 
    "Mesos Obtained",
    "HP Recovery Items and Skills",
    "Cooldown"
];

cube.get_cube_line_as_int_value = async function() {
    if ("cube_line_stats" in cube) {
        return cube.cube_line_stats;
    }

    const cube_lines = {};
    let data = await cube.fetch_cube_rates();
    
    for (let hash in data) {
        for (let line in data[hash]) {
            let base_line_id = cube.cube_line_as_int_stats.find(a => line.startsWith(a));

            let has_line = base_line_id != null;

            if (!has_line) continue;
            if (line in cube_lines) continue;

            line = line.trim();

            let orig_int_value = "";
            let int_value = "";
            let is_percent = false;
            let line_id = base_line_id;
            let real_line_id = base_line_id;

            /*
                match as
                (description) -2 (description)
            */
            if (line.includes("Cooldown")) {
                int_value = line.match(/\-(\d)/)[0] ?? "";

                if (int_value == "") continue;
                
                int_value = +int_value * -1;

            /* 
                match as 
                (description): +5
                (description): +30%
            */
            } else {
                int_value = line.match(/\d+%?/)[0] ?? "";
                orig_int_value = int_value;
                is_percent = false;

                if (int_value == "") continue;

                if (int_value.includes("%")) {
                    orig_int_value = +int_value.replace("%", "");
                    int_value = orig_int_value / 100;
                    line_id += "_p";
                    is_percent = true;
                } else {
                    int_value = +int_value;
                }
            }

            cube_lines[line] = {
                id: line_id,
                value: int_value,
                is_percent: is_percent,
                category: real_line_id,
                ident: `${real_line_id}${is_percent ? '' : 'f'}`
            };

            //+1 for next tier
            let new_line = `${real_line_id}: +${orig_int_value + 1}${is_percent ? "%" : ""}`;
            cube_lines[new_line] = {
                id: new_line,
                value: int_value + 0.01,
                is_percent: is_percent,
                category: real_line_id,
                ident: `${real_line_id}${is_percent ? '' : 'f'}`
            };
        }
    }

    return cube_lines;
}

//tier up rate
cube.rates.tier_up_region = {
    KMS: {
        red: {
            epic: 0.06,
            unique: 0.018,
            legendary: 0.003
        },
        black: {
            epic: 0.15,
            unique: 0.035,
            legendary: 0.01
        },
        bonus: {
            epic: 0.047619,
            unique: 0.019608,
            legendary: 0.007
        },
        white: {
            epic: 0.047619,
            unique: 0.019608,
            legendary: 0.007
        },
        occult: {
            epic: 0.009901,
            unique: 0,
            legendary: 0
        },
        bonus_occult: {
            epic: 0.004,
            unique: 0,
            legendary: 0
        },
        master: {
            epic: 0.047619,
            unique: 0.011858,
            legendary: 0
        },
        meister: {
            epic: 0.079994,
            unique: 0.016959,
            legendary: 0.001996
        },

        /* 
            there is no information on these rates, 
            so using red cube rates as a placeholder.
            violet is known as having terrible tier-up rates,
            so using meister cube rates for it.
        */
        violet: {
            epic: 0.079994,
            unique: 0.016959,
            legendary: 0.001996
        },
        uni: {
            epic: 0.06,
            unique: 0.018,
            legendary: 0.003
        },
        equality: {
            epic: 0.06,
            unique: 0.018,
            legendary: 0.003
        }
    },
    /* from maple wiki */
    GMS: {
        red: {
            epic: 0.141,
            unique: 0.06,
            legendary: 0.024
        },
        black: {
            epic: 0.16,
            unique: 0.11,
            legendary: 0.047
        },
        bonus: {
            epic: 0.047619,
            unique: 0.019608,
            legendary: 0.007
        },
        white: {
            epic: 0.047619,
            unique: 0.019608,
            legendary: 0.007
        },
        occult: {
            epic: 0.01,
            unique: 0,
            legendary: 0
        },
        bonus_occult: {
            epic: 0.004,
            unique: 0,
            legendary: 0
        },
        master: {
            epic: 0.118,
            unique: 0.038,
            legendary: 0
        },
        meister: {
            epic: 0.141,
            unique: 0.06,
            legendary: 0.024
        },
        
        /* 
            there is no information on these rates, 
            so using red cube rates as a placeholder.
            violet is known as having terrible tier-up rates,
            so using meister cube rates for it.
        */
        violet: {
            epic: 0.079994,
            unique: 0.016959,
            legendary: 0.001996
        },
        uni: {
            epic: 0.06,
            unique: 0.018,
            legendary: 0.003
        },
        equality: {
            epic: 0.06,
            unique: 0.018,
            legendary: 0.003
        }
    }
}

//hardcode for now
cube.rates.tier_up = cube.rates.tier_up_region["GMS"];

let stats_affected = ["STR", "DEX", "INT", "LUK", "ATT", "Magic ATT", "All Stats", "Max HP", "Max MP", "Damage"];
cube.rates.cube_stat_increase = function(stat) {
    let stat_check = stat.split(":");

    if (!stats_affected.includes(stat_check[0])) {
        return stat;
    } 

    /* non-percentage max HP/MP */
    if (stat.startsWith("Max") && !stat.includes("%")) return stat;

    let new_stat = stat.replace(/(\d+)/, (match) => {
        return parseInt(match) + 1;
    });

    return new_stat;
}

//tier in order
cube.rarity_tier = ['rare', 'epic', 'unique', 'legendary'];

//get the next rarity based on the current rarity. if at last rarity, then return that.
cube.get_next_rarity = function(type) {
    let ridx = cube.rarity_tier.indexOf(type);

    if (ridx === -1) return 'rare';

    let next_rarity = cube.rarity_tier[ridx + 1];

    if (next_rarity === undefined) {
        return cube.rarity_tier[cube.rarity_tier.length - 1];
    }

    return next_rarity;
};

//try to tier up. c = cube type. r = pot tier, o = additional options
cube.try_tier_up = function(c, r, o) {
    //highest value, so never tier up.
    if (r === "legendary" || o.no_tier_up) {
        return {
            upgrade: false,
            next_tier: r
        };
    }

    let nt = cube.get_next_rarity(r);

    let t_rate = cube.rates.tier_up[c][nt];

    let map = {
        yes: t_rate,
        no: 1 - t_rate  
    };

    let prng_results = {};

    //get whether it tier'd up or not. pass callbacks to log the 
    //prng results
    let tier_result = get_random_result(map, (a) => {
        prng_results.r_map = a;
    }, (a)=>{
        prng_results.tier_prng = a;
    });

    return {
        upgrade: tier_result === "yes",
        next_tier: nt,
        cube_log_item: prng_results
    }
}

/*
    get the cube probability rates based on current tier, item type, and level

    type is equipment type (gloves, top, etc.)
*/
cube_lines = {};
cube_rates = {};

/* some item types share cubing data, so we point to that one */
cube.equivalents = {
    cape: ["cape", "belt", "shoulder"],
    face_accessory: ["face_accessory", "accessory", "eye_accessory", "earrings", "ring", "pendant"],
    mechanical_heart: ["mechanical_heart", "badge"],
    weapon: ["weapon", "secondary"]
};

cube.get_cube_type = async function(level, type, cube_type, cube_tier) {
    /* these types share the same cube potential rates and lines with the type it is set to */
    type = type.replace(/\s/gi, "_");
    if (cube.equivalents.cape.includes(type)) {
        type = "cape";
    } else if (cube.equivalents.face_accessory.includes(type)) {
        type = "face_accessory";
    } else if (cube.equivalents.mechanical_heart.includes(type)) {
        type = "mechanical_heart";
    } else if (cube.equivalents.weapon.includes(type)) {
        type = "weapon";
    }

    if (cube_tier === "") {
        cube_tier = "rare";
    }

    let level_tier = cube.get_item_level_tier(level);
    let cube_rates = await cube.resolve_cube_rates(cube_type, type);
         
    return cube_rates[level_tier][cube_tier];
}

/* from the cube lines and cube rates, resolve into a single object */
cube.resolve_cube_rates = async function(cube_type, type) {
    let cube_type_original = cube_type;

    /* bonus/white share same lines */
    if (cube_type === "white") {
        cube_type = "bonus";

    /* 
        if equality cubes, set cube to red and then set all the line items to the first line (all prime) 
        if violet, set cube to red and then set the 6 lines as per TMS prime rates
        if uni, set cube to red and use those lines as the basis for rates (15%/85% prime/nonprime)
    */
    } else if (["equality", "violet", "uni"].includes(cube_type)) {
        cube_type = "red";
    }

    if (`${cube_type_original}_${type}` in cube_lines) {
        return cube_lines[`${cube_type_original}_${type}`];
    }
    
    let [crates, clines] = await Promise.all([
        cube.fetch_cube_rates(),
        cube.fetch_cube_lines(cube_type, type)
    ]);

    let r_cube_lines = {};

    /* item type with "_" */
    let type_check = type.replace(/\s/gi, "_");

    for (let level in clines) {
        r_cube_lines[level] = {};

        /* if equality, set the lines for each grade to line #1 (100% prime) */
        if (cube_type_original === "equality") {
            for (let tier in clines[level]) {
                if (clines[level][tier].length === 3) {
                    clines[level][tier][1] = clines[level][tier][0];
                    clines[level][tier][2] = clines[level][tier][0];
                }
            }
        }

        /*
            GMS - for level 150+ items, add 1 to specific stats
        */
        for (let tier in clines[level]) {
            r_cube_lines[level][tier] = clines[level][tier].map((a)=>{
                /* cube lines of item based on its level and potential */
                let this_cube_lines = {};

                /* face accessory equivalents seem to have their tier stats already included in the data, so don't append another tier to it */
                if (level > 150 && !cube.equivalents.face_accessory.includes(type_check)) {
                    for (let cl in crates[a]) {
                        let new_stat = cube.rates.cube_stat_increase(cl);
                        this_cube_lines[new_stat] = crates[a][cl];
                    }
                } else {
                    this_cube_lines = crates[a];
                }

                return this_cube_lines;
            });
        }
    }

    /* recalculate for violet */
    if (cube_type_original === "violet") {
        r_cube_lines = cube.recalculate_rates_for_violet(r_cube_lines);
    } else if (cube_type_original === "uni") {
        r_cube_lines = cube.recalculate_rates_for_uni(r_cube_lines);
    }

    cube_lines[`${cube_type_original}_${type}`] = r_cube_lines;

    return cube_lines[`${cube_type_original}_${type}`];
}

/*
    official GMS rates unknown. using the following logic from TMS (using MapleSEA rates), lazified so i don't have to reinput the rates:
    general assumption ->
    100% -> line 1 of red cube
    10% -> line 2 of red cube
    1% -> line 3 of red cube

    line 1: 100% prime 
    line 2: 10% prime 
    line 3: 1% prime 
    line 4: 1% prime 
    line 5: 10% prime 
    line 6: 1% prime 
*/
cube.recalculate_rates_for_violet = function(r_cube_lines) {
    for (let level in r_cube_lines ) {
        for (let grade in r_cube_lines[level]) {
            const lines = r_cube_lines[level][grade];

            if (lines.lenghth === 0) continue;

            let new_lines = [];
            
            new_lines.push(lines[0]);
            new_lines.push(lines[1]);
            new_lines.push(lines[2]);
            new_lines.push(lines[2]);
            new_lines.push(lines[1]);
            new_lines.push(lines[1]);

            r_cube_lines[level][grade] = new_lines;
        }
    }

    return r_cube_lines;
}

/*
    official GMS rates unknown. using the following logic from TMS:
    prime -> 15%
    non-prime -> 85%

    we use red cube line #3 and use odds scaling to determine what line is prime vs. non-prime. the prime lines
    will eat the share of 15% and the non-prime will eat the share of 85%

    all 3 lines of the unicube share this 15/85 split. first line is not guaranteed prime like other cubes.
*/
cube.recalculate_rates_for_uni = function(r_cube_lines) {
    for (let level in r_cube_lines ) {
        for (let grade in r_cube_lines[level]) {
            const lines = r_cube_lines[level][grade];

            if (lines.length === 0) continue;

            let new_lines = [];
            
            /* determining lines are prime or not */
            let base_line = lines[2];
            let prime_lines = {};
            let non_prime_lines = {};

            /* 
                get their odds scaling to visualize prime vs. nonprime. prime lines will have very low odds scaling and non-prime will have very large values  
                (this is not necessary but i can't deal with decimals right now)
            */
            const prime_tester = cube.odds_scaler(base_line);
            
            /* assume an odds scaling of greater than 10 is nonprime */
            for (let stat in prime_tester) {
                if (prime_tester[stat] < 10) {
                    prime_lines[stat] = 0.15;
                } else {
                    non_prime_lines[stat] = 0.85;
                }
            }

            let prime_length = Object.keys(prime_lines).length;
            let nonprime_length = Object.keys(non_prime_lines).length;

            /* loop through prime and non prime and divide their baser value by the number of items in their class */
            for (let stat in prime_lines) {
                prime_lines[stat] = prime_lines[stat] / prime_length;
            }
            for (let stat in non_prime_lines) {
                non_prime_lines[stat] = non_prime_lines[stat] / nonprime_length;
            }

            /* 
                combine them. this should add up to 1, or close to it 
                check at: Object.entries(unicube_lines).reduce((a,b)=>{ a += b[1]; return a; }, 0);
            */
            let unicube_lines = {...prime_lines, ...non_prime_lines};

            new_lines.push(unicube_lines);
            new_lines.push(unicube_lines);
            new_lines.push(unicube_lines);

            r_cube_lines[level][grade] = new_lines;
        }
    }

    return r_cube_lines;
}

cube.odds_scaler = function(inputObject) {
    // Get the smallest value from the object
    const values = Object.values(inputObject);
    const smallestValue = Math.min(...values);

    // Create a new object with values divided by the smallest value
    const scaledObject = {};
    for (const [key, value] of Object.entries(inputObject)) {
        scaledObject[key] = value / smallestValue;
    }

    return scaledObject;
}

/* get the cube line hash data that points to cube line data */
cube.fetch_cube_rates = async function() { 
    if (!("hash" in cube_rates)) {
        let response = await fetch(`/starforce/cube_rates/cube_hashes_gms.txt`);
        cube_rates["hash"] = response.json();
    }
    
    return cube_rates["hash"];    
}

/* get the cube data from site store and cache it to window, then pull from that if needed again */
cube.fetch_cube_lines = async function(cube_type, type) {
    let response = await fetch(`/starforce/cube_rates/cube_rates_json_${cube_type}_${type}.txt`);
    return response.json();
}

cube.init_cube_data = async function() {
    /* map the line to a common type */
    cube.stat_restriction_map = await cube.calculate_restriction_type();
    /* select cube line's raw int value */
    cube.cube_line_stats = await cube.get_cube_line_as_int_value();
}

cube.init_cube_data();

/*
    get what tier the cubing stats belong to
*/
cube.get_item_level_tier = function(level) {
    /* round down to nearest 10s */
    let l = (Math.floor(level / 10) * 10);

    /* max cube stat level tier is hit */
    if (l > 160) {
        l = 160;
    }

    /* keep level in multiples of 10 */
    l = l - (l%10);

    return l + "";
}

//type = cube_type
//cube item, type is cube type; dom is the active cubing window
//cb is callback passed to the cube_draw function
//o is any additional options
cube.cube = async function(type, dom, cb, o) {
    o = Object.assign({
        force_keep: false,
        no_tier_up: false,
        force_stats: false,
        stats: {},
        force_tier: false,
        tier: {},
        update_dom: true,
        write_log_record: true,
        /*
            if current_lines, then show the lines already ran for. this is for
            worker_cube.js processing that wants to display the lines to the user
            in the cube window
        */
        display_as: "new_lines"
    }, o);

    //no cube window passed means the function is used progranmatically
    //don't update dom stuff in that case, but continue with all the other stuff
    let hasDom = dom.length !== 0;

    if (hasDom) {
        sfa.play("_CubeEnchantSuccess");
    }

    //get item type, with sub class taking priority
    let item_type = this.idata.sub_class;

    if (this.idata.class == "weapon") {
        item_type = this.idata.class;
    } else if (item_type === "") {
        item_type = this.idata.type;
    } 

    let cube_type = "main";
    let cube_type_opposite = "bonus"; //log the current bonus/main pot, if the current is main/bonus 
    let pot_type = "cube_potential";

    if (GLOBAL.cubes.bonus.includes(type)) {
        cube_type = "bonus";
        cube_type_opposite = "main";
        pot_type = "cube_potential_bonus";
    }

    let cube_pot = this.idata.meta[pot_type]; //current potential

    //if a tier is forced, set it to that
    if (o.force_tier) {
        cube_pot = o.tier;
        this.idata.meta[pot_type] = cube_pot;
    }
    
    //if no potential, set it to rare
    if (cube_pot === "") {
        /* 
            for a first black run where the item has no potential, we need an initial pot, so
            we force a red cube run with no chance of tier up to initiallity set a potential,
            then do the black cube

            uni cube also needs an inital potential
        */
        if (type === "black" || type === "uni") {
            await cube.cube.call(this, "red", [], ()=>{}, {
                no_tier_up: true
            });
        } else if (type === "white") {
            await cube.cube.call(this, "bonus", [], ()=>{}, {
                no_tier_up: true
            });
        }

        cube_pot = "rare";

        this.idata.meta[pot_type] = cube_pot;
    }

    //get new cube potentials
    let cube_results = o.display_as === "new_lines" ? 
        await cube.stats.main(item_type, cube_pot, type, cube_type, this.idata.level, o) :
        Item.idata.meta.cube_meta_data[0].results
    ;

    //get the last item that is opposite of the cube type
    let opposite_current_pot = this.idata.meta.cube_meta_data.find((a)=>{
        return a.type === cube_type_opposite && a.keep
    });

    if (o.write_log_record) {
        ++this.idata.meta.cubes_total;
        ++this.idata.meta.cubes_used[type];
    }

    //log cube results
    this.idata.meta.cube_log_item = {
        cube: type,
        type: cube_type,
        tier: cube_results.tier_up.upgrade ? cube_results.tier_up.next_tier : cube_pot,
        results: cube_results,
        keep: true,
        other: opposite_current_pot, //current bonus/main depending on if current type is main/bonus
        run: this.idata.meta.cubes_total
    };

    /* unicube highlights one item first */
    if (type === "uni") {
        let uni_select_line = {
            "0": 0.33333,
            "1": 0.33333,
            "2": 0.33333
        };

        let uni_prng = {};
        this.idata.meta.cube_log_item.unicube_proceed = false;
        this.idata.meta.cube_log_item.unicube_this_line = +get_random_result(uni_select_line, (a) => {
            uni_prng.r_map = a;
        }, (a)=>{
            uni_prng.tier_prng = a;
        });

        this.idata.meta.cube_log_item.uni_prng = uni_prng;
    }

    //post-processing and update cube window
    cube.cube_draw.call(this, cube_results, dom, type, cb, o);

    return cube_results.tier_up.upgrade;
}

if (typeof item != 'undefined') {
    //set the cube type directly. go through the cube function to force a flimsy record write
    /*
        f = main or bonus pot type
        r = pot tier
        s = struct of stat ids from cube.stat_type
    */
    item.prototype.set_cube = async function(f, r, s, o) {
        o = Object.assign({
            force_keep: false,
            no_tier_up: true,
            force_stats: true,
            stats: s,
            force_tier: true,
            tier: r,
            write_log_record: true
        }, o);

        let _this = this;

        //go through the cube proc, but pass options that force the tier and stats
        await _this.cube(f, [], ()=>{}, o);
    }

    item.prototype.cube = async function(type, dom, cb, o) {
        return await cube.cube.call(this, type, dom, cb, o);
    };
}

//type = cube_type
//redraw the cube window, as well as update the item tooltip
//cb is callback if tooltip is to be drawn later or other things need to happen
//o for any other options
cube.cube_draw = function(cube_results, dom, type, cb, o) {
    o = Object.assign({
        force_keep: false,
        update_dom: true,
        write_log_record: true
    }, o);

    let hasDom = dom.length !== 0;

    let prevResults = this.idata.boosts.cubes.main;
    let results = cube_results.result;
    let this_pot = "";
    let this_pot_type = "cube_potential";

    if (GLOBAL.cubes.bonus.includes(this.idata.meta.cube_log_item.type)) {
        this_pot_type = "cube_potential_bonus";
    }

    this_pot = this.idata.meta[this_pot_type];

    let curr_pot = this_pot;
    let force_keep = false; //if tier up, then it is automatically selected

    //if upgrade, then set next pot tier
    //if black cube, then force it to be kept
    if (cube_results.tier_up.upgrade) {
        curr_pot = cube_results.tier_up.next_tier;
        force_keep = true;
    }

    /* force keep the record -- used for setting cubes directly for black cubes */
    if (o.force_keep) {
        force_keep = true;
    }

    //whether to keep the pot or not
    if (!["black", "white"].includes(type) || force_keep) {
        if (cube_results.tier_up.upgrade) {
            this.idata.meta[this_pot_type] = curr_pot;
        }

        if (type !== "uni") {
            this.idata.boosts.cubes[this.idata.meta.cube_log_item.type] = results;
        } else {
            /* unicube - store the results of its lines in a separate variable for recordkeeping */
            this.idata.meta.cube_log_item.results.result_uni = [...this.idata.meta.cube_log_item.results.result];
            /* store the current results for record keeping */
            this.idata.meta.cube_log_item.results.prev_results = prevResults;
            /* the results are the old results, but with the selected uni line appended with the new item */
            this.idata.meta.cube_log_item.results.result = [...prevResults];
        }
    } else {
        this.idata.meta.cube_log_item.keep = false;
    }

    if (hasDom) {
        const cubeResults = dom.find(".cube-result");
        const allResults = 'result-rare result-epic result-unique result-legendary';
        cubeResults.addClass("hidden");

        if (!["black", "white"].includes(type)) {
            //set potential
            /*
            let crp = dom.find(".cube-result-pot");
            
            if (crp.attr("data-pot") != curr_pot) {
                crp.attr("data-pot", curr_pot);
                crp.html(curr_pot.capitalize());
            }
            */

            let display_results = results;

            /* for unicodes, we display the current potentials */
            if (type === "uni") {
                display_results = this.idata.meta.cube_log_item.results.prev_results;
            }

            dom.find(".cube-result-background").removeClass(allResults).addClass(`result-${curr_pot}`);

            dom.find(".cube-result-stats").html(
                display_results.map(function(a) {
                    return `
                        <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                    `
                }).join("")
            );

            /* highlight line */
            if (type === "uni") {
                const these_lines = $("#cube_container .cube-result-line");
                $("#uniResultLine").remove();
                these_lines.eq(this.idata.meta.cube_log_item.unicube_this_line).prepend(`<div id="uniResultLine" class="uni-result-line-active"></div>`);
            }
        } else {
            //get last kept cube
            let prev_pot = this.idata.meta.cube_meta_data.find(function(a) {
                return a.keep && a.type === (type === "black" ? "main" : "bonus");
            });

            let prev_pot_check = prev_pot.tier !== undefined;

            //set before and after pot tier label
            /*
            let crpbl = dom.find(".cube-result-before-label");
            let crpal = dom.find(".cube-result-after-label");
            */
            let before_window = dom.find(".cube-black-window-before");
            let after_window = dom.find(".cube-black-window-after");
            const before_result = dom.find(".cube-before-result");
            const after_result = dom.find(".cube-after-result");

            if (prev_pot_check) {
                let prev_pot_label = this_pot;

                /*
                if (crpbl.attr("data-pot") != prev_pot_label) {
                    crpbl.attr("data-pot", prev_pot_label);
                    crpbl.html(prev_pot_label.capitalize());
                }
                */

                before_result.removeClass(allResults).addClass(`result-${prev_pot_label}`);
            }

            /*
            if (crpal.attr("data-pot") != curr_pot) {
                crpal.attr("data-pot", curr_pot);
                crpal.html(curr_pot.capitalize());
            }
            */
        
            after_result.removeClass(allResults).addClass(`result-${curr_pot}`);

            //set before and after pot
            let crpb = dom.find(".cube-result-before");
            let crpa = dom.find(".cube-result-after");

            if (prev_pot_check) {
                before_window.attr("data-id", prev_pot.results.name);

                const prev_pot_idx = prev_pot.selected_idx ?? [0,1,2];
                const prev_results = prev_pot_idx.map(a=>prev_pot.results.result[a]);

                crpb.html(
                    prev_results.map(function(a) {
                        return `
                            <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                        `
                    }).join("")
                );
            }

            after_window.attr("data-id", cube_results.name);

            crpa.html(
                results.map(function(a) {
                    return `
                        <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                    `
                }).join("")
            );
        }
        /* update cube owned text to display cubes used */
        let cubeUsed = dom.find(".cube-remaining-text");
        cubeUsed.html(`Owned: ${Item.idata.meta.cubes_used[type]}`);
        cubeResults.removeClass("hidden");
    }

    //log cube results
    if (o.write_log_record) { 
        this.idata.meta.cube_meta_data.unshift(
            this.idata.meta.cube_log_item
        );
    }

    //do other stuff before redrawing tooltip, otherwise just redraw
    if (typeof cb === 'function') {
        cb();
    } else {
        if (o.update_dom) {
            this.redraw_item_tooltip(["cube"]);
        }
    }
};

//stat percentage map for cube based on potential and item type
cube.stats = {
    /* chatgpt understands binomial probability. i don't */
    /*
        cube_type - red, black, etc
        pot_tier - rare, epic, etc
        choice - desired rolls = format ["Boss Monster Damage: +40%", "Boss Monster Damage: +40%", "Boss Monster Damage: +40%"]
    */
    async calculateProbability(cube_type, pot_tier, choices) {
        if (choices.length === 0) {
            return 1;
        }

        let this_item = Item.idata;
        //get item type, with sub class taking priority (copied from cube.js)
        let item_type = this_item.sub_class;

        if (this_item.class == "weapon") {
            item_type = this_item.class;
        } else if (item_type === "") {
            item_type = this_item.type;
        } 

        /* remove wildcard values */
        choices = choices.filter(a=>a !== "-1");
        
        if (choices.length === 0) {
            return 1;
        }

        item_type = item_type.replace(/\s/gi, "_");

        const probabilities = await cube.get_cube_type(this_item.level, item_type, cube_type, pot_tier);

        function calculate_probability(ratesArray, choices) {
            const indices = Array.from({ length: ratesArray.length }, (_, i) => i);
            const combinations = getCombinations(indices, choices.length);
            let totalProbability = 0;
            
            for (const combination of combinations) {
                let probability = 1;
                for (let i = 0; i < choices.length; i++) {
                    probability *= ratesArray[combination[i]][choices[i]] || 0;
                }
                totalProbability += probability;
            }
            
            return totalProbability;
        }
        
        function getCombinations(arr, size) {
            if (size > arr.length) return [];
            if (size === 1) return arr.map(el => [el]);
            
            let result = [];
            arr.forEach((current, index) => {
                const smallerCombinations = getCombinations(arr.slice(index + 1), size - 1);
                smallerCombinations.forEach(combination => {
                    result.push([current, ...combination]);
                });
            });
            
            return result;
        }
        
        return calculate_probability(probabilities, choices);
    },
    //get the rates based on black or red probabilities
    /*
        e = equipment type
        r = current potential tier
        c = cube type
        f = main or bonus pot type
        l = equipment level
        o = any additional options
    */
    main: async function(e, r, c, f = "main", l, o) {
        e = e.replace(/\s/gi, "_"); //turn spaces into _ to properly check against the relevant rates/stats

        //check to see if tier up. if it does, then set the r argument to the next tier
        let tier_up = cube.try_tier_up(c, r, o);

        if (tier_up.upgrade) {
            r = tier_up.next_tier;
        }

        let cube_lines = await cube.get_cube_type(l, e, c, r);

        let rates_probability = {}; //get the stat type and its probability based on its probability tier

        for (let i = 0; i < cube_lines.length; ++i) {
            let i_line = cube_lines[i];
            
            rates_probability["line_" + i] = i_line;
        }

        let cube_prob_map = []; //map of each line
        let cube_result = []; //result from comparing the randon number against the map

        let stat_class_count = {}; //check against stat restrictions for lines that cannot show up more than once or twice
        
        //loop through the probability map and choose a stat for the line. 
        //i is the line, bp is to bypass forced stats if needed to prevent infinite looping
        let loop_rates_prob = async function(i, bp = false) {
            let i_stat = rates_probability[i]; //the probability map associated with cube line
            let shuff_i_stat = Object.keys(i_stat);
            shuffle(shuff_i_stat);

            let i_map = []; //map for probability

            let i_start = 0;
            let i_current = 0;

            let this_rng = prng();

            let restriction_rerun = false; //if the line hits the stat class restriction (e.g., 3 boss lines), then rerun it
            let already_found = false; //for forced stats, if the prob is already found, then don't mark any more as selected (in cases of duplicate stat items)

            //loop through probability map and compare the prng value to the range
            for (let j = 0; j < shuff_i_stat.length; ++j) {
                //get the probability value associated with the stat type
                let j_stat = shuff_i_stat[j];
                let j_prob = i_stat[j_stat]; //cube type for the probability

                i_current += j_prob;

                if (j === i_stat.length - 1) {
                    i_current = 1;
                }

                //stat is selected
                let j_this_selected = false;
                
                //override the prng if option to override is passed, and set the stat to a specific one
                if (!bp && o.force_stats) {
                    if (o.stats[i] === j_stat && !already_found) {
                        j_this_selected = true;
                        already_found = true
                    }

                    //pseudo force the prng to within range for reporting purposes
                    this_rng = (i_current + i_start) / 2;
                } else {
                    //prng is within the probability range
                    j_this_selected = this_rng >= i_start && this_rng < i_current;
                }

                if (j_this_selected) {
                    stat_class = await cube.stat_restriction_map[j_stat]; /* get the common line type based on line */

                    //add the stat class to the counter. increment the counter if it already exists.
                    if (!(stat_class in stat_class_count)) {
                        stat_class_count[stat_class] = 1;
                    } else {
                        ++stat_class_count[stat_class];
                    }

                    //if the number of lines of that stat class is greater than the restriction, then reroll
                    if (cube.stat_restriction[stat_class] < stat_class_count[stat_class]) {
                        restriction_rerun = true;
                        break;
                    }
                }

                let j_result = {
                    chance: j_prob,
                    id: j_stat,
                    display: j_stat,
                    from: i_start,
                    to: i_current
                };

                i_map.push(j_result);

                //add the selected result to the main cube display
                if (j_this_selected) {
                    j_result.prng = this_rng;
                    cube_result.push(j_result);
                }

                i_start += j_prob;
            }

            //this line goes over the maximum lines allowed for that stat class. rerun.
            if (restriction_rerun) {
                return await loop_rates_prob(i, true);
            }

            //add the map to object for record keeping
            cube_prob_map[i] = i_map;
        };


        //using the shuffled stat arrays and the probability, construct a probability map
        //i is the cube line (ex: line_0)
        for (let i in rates_probability) {
            await loop_rates_prob(i);
        }

        return {
            result: cube_result,
            map: cube_prob_map,
            tier_up: tier_up,
            name: generateUUID()
        };
    }
};


cube.get_dropdown_option = function(cube) {
    let html = `
        <option value="">No Potential</option>
        <option value="rare">Rare</option>
        <option value="epic">Epic</option>
    `;

    if (cube === "occult" || cube === "bonus_occult") {
        return html;
    }

    html += `
        <option value="unique">Unique</option>
    `;

    if (cube === "master") {
        return html;
    }

    html += `
        <option value="legendary">Legendary</option>
    `;

    return html;
}

/* CUBE DOM */
$(function(){
    //CUBE STUFF

    //init cubing
    //cube containers
    let cc = $("#cube_container");
    let bcc = $("#black_cube_container");
    let cube_black_results = $(".cube-black-result");

    let cube_black_go = $(".cube-black");
    let cube_white_go = $(".cube-white");

    //while cube aniamtion plays, disallow cube actions
    let cube_loading = false;

    //cubes at the bottom left
    $("#cube_menu .cube").on("click", function(e, o) {
        if (cube_loading) return false;

        const def = {
            /*
                if process_as - "worker_violet" - we open up the violet cube window after getting the lines from the worker_cube.js autocube run
            */
            process_as: "standard"
        };

        o = {...def, ...o};

        let _this = $(this);

        if (_this.hasClass("disabled")) {
            return false;
        }

        let cube_type = _this.attr("data-id");
        const cube_main = $("#cube_container .cube-main");
        const btnProceed = $("#cube_container .btn-proceed");
        btnProceed.addClass("hidden");

        /* 
            violet cube lines must be used, so if the user navigates away from the cube, we select lines for them 
            they must select 3, so whatever they didn't select selects from the first line in order
        */
        /* leaving the violet cube window open and not selecting anything. select top 3 lines */
        if (cube_main.hasClass("cube-main-violet")) {
            /* if moved to final already, then ignore the processing and run cube like normal */
            if (!cube_main.hasClass("cube-main-violet-final")) {
                confirm_violet_cube_use({
                    force_use: true
                });
            }

            cube_main.removeClass(function (index, className) {
                return (className.match(/cube-main-(.*)/g) || []).join(' ');
            });    
        } 
        
        if (cube_type === "uni") {
            btnProceed.removeClass("hidden");
        }

        run_cube(cube_type, o);
    });

    /* run cube function */
    async function run_cube(cube_type, o) {
        if (!Item.idata.enhanceable) {
            return false;
        }

        cube_loading = true;
        let cr = false; //cube upgrade
        let cube_animation = "cube-use-normal";
        let main_con = cc.find(".cube-main");

        let con = "";

        if (cube_type === "black" || cube_type === "white") {
            cr = await Item.cube(cube_type, bcc, ()=>{});

            if (cr) {
                cube_animation = "cube-use-tier"; //tier up animation
            }

            bcc.removeClass("hidden");
            cc.addClass("hidden");
            con = bcc;

            let bcc_play = bcc.find(".cube-black-upgrade").removeClass("hidden").addClass(cube_animation);
            let bcc_button = bcc.find(".btn-one-more-try").addClass("disabled");

            setTimeout(function() {
                bcc_play.addClass("hidden").removeClass(cube_animation);
                bcc_button.removeClass("disabled");
                cube_loading = false;
                Item.redraw_item_tooltip(["cube"]);
                cube.update_cube_menu.call(Item, $("#cube_menu"));
            }, 1500 * system.animation_speed_actual);
        } else {
            let cube_options = {};

            /*
                if worker_cube is used for processing violet, we are taking
                lines already processed and displayin the results with the desired
                lines to the user to choose from
            */
            if (o.process_as === "worker_violet") {
              cube_options = {
                display_as: "current_lines",
                write_log_record: false
              };  
            } 

            cr = await Item.cube(cube_type, cc, ()=>{}, cube_options);

            if (cr) {
                cube_animation = "cube-use-tier";
            }

            con = cc;

            main_con.removeClass(function (index, className) {
                return (className.match(/cube-main-(.*)/g) || []).join(' ');
            }).addClass(`cube-main-${cube_type}`);

            main_con.find(".cube-header-reset").removeClass(function (index, className) {
                return (className.match(/reset-cube-(.*)/g) || []).join(' ');
            }).addClass(`reset-cube-${cube_type}`);

            bcc.addClass("hidden");
            cc.removeClass("hidden");

            let base_animation = 1500;

            /* violet cube - remove cancel button on first pass, set animation faster */
            if (cube_type === "violet") {
                base_animation = 500;
            } else if (cube_type === "uni") {
                base_animation = 1000;
            }

            let cc_play = cc.find(".cube-upgrade").removeClass("hidden").addClass(cube_animation);
            let cube_buttons = $(".btn-cube-action").addClass("disabled");

            setTimeout(function() {
                cc_play.addClass("hidden").removeClass(cube_animation);
                cube_buttons.removeClass("disabled");
                cube_loading = false;
                if (!["violet"].includes(cube_type)) {
                    Item.redraw_item_tooltip(["cube"]);
                }
                cube.update_cube_menu.call(Item, $("#cube_menu"));
            }, base_animation * system.animation_speed_actual);
        }

        con.attr("data-cube", cube_type);
    }

    //close cube window
    $(".btn-cube-ok,#btnCubeMainClose").on("click", function() {
        const cube_main = $("#cube_container .cube-main");
        let cube_type = cc.attr("data-cube");

        if (cube_type === "violet") {
            /* if moved to final already, then ignore the processing and run cube like normal */
            if (!cube_main.hasClass("cube-main-violet-final")) {
                confirm_violet_cube_use({
                    force_use: true
                });
            }
        }

        cube_main.removeClass(function (index, className) {
            return (className.match(/cube-main-(.*)/g) || []).join(' ');
        });

        cc.addClass("hidden");
    });

    $("#btnCubeBlackClose").on("click", function() {
        const cube_main = $("#black_cube_container .cube-main");
        let cube_type = bcc.attr("data-cube");
        cube_main.removeClass(function (index, className) {
            return (className.match(/cube-main-(.*)/g) || []).join(' ');
        });

        bcc.addClass("hidden");
    });

    //one more try
    $(".btn-one-more-try").on("click", function() {
        let _this = $(this);
        let current_cube = cc.attr("data-cube");
        let type = cc.attr("data-cube");

        if (_this.hasClass("btn-cube-black")) {
            let bccData = bcc.attr("data-cube");
            if (bccData === "black") {
                cube_black_go.trigger("click");
            } else {
                cube_white_go.trigger("click");
            }
        } else if (current_cube === "violet") {
            const cube_main = $("#cube_container .cube-main");
            if (cube_main.hasClass("cube-main-violet-final")) {
                /* if hit use button, rerun violet */
                cube_main.removeClass("cube-main-violet-final cube-main-violet");
                $(`#cube_${type}`).trigger("click");
            } else {
                /* selecting from 6 lines and confirm 3 of the lines to item */
                confirm_violet_cube_use();
            }
        } else {
            $(`#cube_${type}`).trigger("click");
        }
    });

    /* select 3 lines from violet cube and commit */
    function confirm_violet_cube_use(o) {
        const def = {
            force_use: false
        };

        o = {...def, ...o};

        /* get the selected violet lines */
        let results_selected = $("#cube_container .violet-result-line-active");
        if (results_selected.length != 3) {
            if (!o.force_use) {
                return false;
            }
        }

        /* prep violet cube to second screen */
        const cube_main = $("#cube_container .cube-main");
        cube_main.addClass("cube-main-violet-final");

        /* get unselected lines */
        let results_no = $("#cube_container .cube-result-line:not(.violet-result-line-active)");

        /* if forced to use, make sure at least 3 lines are selected */
        if (o.force_use) {
            let num_lines_left = 3 - results_selected.length;

            for (let i = 0; i < num_lines_left; ++i) {
                results_no.eq(i).addClass("violet-result-line-active");
            }

            /* regrab the unselected and selected lines */
            results_no = $("#cube_container .cube-result-line:not(.violet-result-line-active)");
            results_selected = $("#cube_container .violet-result-line-active");
        }

        results_no.addClass("hidden");

        results_selected.removeClass("violet-result-line-active").addClass("violet-result-line-final");

        process_violet_cube_use();
        return true;
    }

    /* commit violet cube lines to item */
    function process_violet_cube_use() {
        /*
            get the index of the selected violet cube lines
        */
        const cubes_lines = document.querySelectorAll('#cube_container .cube-result-line');
        const active_idx_lines = [...cubes_lines].map((cube, index) => 
           cube.classList.contains('violet-result-line-final') ? index : -1
       ).filter(index => index !== -1);

       /* write the active index selection to the cube log item */
       Item.idata.meta.cube_meta_data[0].selected_idx = active_idx_lines;
       /* from the 6 lines stored in the item pot, keep the ones selected */
       Item.idata.boosts.cubes.main = active_idx_lines.map(index => Item.idata.boosts.cubes.main[index]);

       /* redraw */
       Item.redraw_item_tooltip(["cube"]);
    }

    /* unicube has selected a line to reroll, so we prep the reroll */
    $(".btn-proceed").on("click", function() {
        let uniResultLine = $("#uniResultLine");

        if (uniResultLine.length === 0) return;
        let cube_buttons = $(".btn-cube-action").addClass("disabled");

        sfa.play("_BtMouseClick");
        sfa.play("_CubeEnchantSuccess");
        let cc_play = cc.find(".cube-upgrade").removeClass("hidden").addClass("cube-use-normal");
        let selected_line = uniResultLine.closest(".cube-result-line");

        /* get the changed line for unicube. mark the cube as proceeded by user */
        let uni_line_idx = Item.idata.meta.cube_meta_data[0].unicube_this_line;
        Item.idata.meta.cube_meta_data[0].unicube_proceed = true;

        /* get the line data associated with uni line and append it to the item cube pot */
        let this_line = Item.idata.meta.cube_meta_data[0].results.result_uni[uni_line_idx];
        Item.idata.boosts.cubes.main[uni_line_idx] = this_line;
        Item.idata.meta.cube_meta_data[0].results.result[uni_line_idx] = this_line;
        selected_line.html(`<div id="uniResultLine2" class="uni-result-line-active"></div>${this_line.display}`);

        setTimeout(()=>{
            $("#uniResultLine2").remove();
            cube_buttons.removeClass("disabled");
            cc_play.addClass("hidden").removeClass("cube-use-normal");
            Item.redraw_item_tooltip(["cube"]);
        }, 1000 * system.animation_speed_actual);
    });

    //apply before stats
    cube_black_results.on("click", function() {
        let _this = $(this);
        let this_id = _this.attr("data-id");
        let bcc_cube = bcc.attr("data-cube");

        let this_pot = Item.idata.meta.cube_meta_data.find(function(a) {
            return a.results.name === this_id;
        });

        let is_before = _this.hasClass("cube-black-window-before");

        //update keep flag when selected for logging
        //update pot tier too in case user is an idiot and wants to keep lower potential
        let curr_pot = Item.idata.meta.cube_meta_data[0];
        curr_pot.keep = !is_before;

        if (bcc_cube === "black") {
            Item.idata.boosts.cubes.main = this_pot.results.result;
            Item.idata.meta.cube_potential = this_pot.tier;
        } else {
            Item.idata.boosts.cubes.bonus = this_pot.results.result;
            Item.idata.meta.cube_potential_bonus = this_pot.tier;
        }
    
        Item.redraw_item_tooltip(["cube"]);

        bcc.addClass("hidden");
    });

    let mapToDisplayHtml = function(a, cb) {
        let html = '';

        let this_data = [];
        //get data from struct to array
        for (let i in a) {
            let _a = a[i];

            for (let j = 0; j < _a.length; ++j) {
                let j_a = _a[j];

                this_data.push({
                    name: i,
                    from: j_a[0],
                    to: j_a[1]
                });
            }
        }

        //sort by "from" range item
        this_data = this_data.sort((a,b)=>{
            if (a.from < b.from) {
                return -1;
            } else if (a.from > b.from) {
                return 1;
            }

            return 0;
        });

        //map to html
        for (let i = 0; i < this_data.length; ++i) {
            let _i = this_data[i];

            _i.from = _i.from.toFixed(5);
            _i.to = _i.to.toFixed(5);
            
            html += cb(_i);
        }

        return html;
    };

    function get_lucky(arr) {
        const countMap = {};
    
        // Iterate through the array of objects
        for (let obj of arr) {
            const id = obj.id;
            
            // If the id is "All Stats", treat it as STR, DEX, INT, or LUK
            if (id === "All Stats") {
                // Add counts for STR, DEX, INT, LUK
                ["STR", "DEX", "INT", "LUK"].forEach(validId => {
                    countMap[validId] = (countMap[validId] || 0) + 1;
                });
            } else {
                // Regular id, increment count
                countMap[id] = (countMap[id] || 0) + 1;
            }
    
            // Check if we have 3 same ids
            if (countMap[id] === 3) {
                return id;
            }
        }
        
        // If no ids with count 3 found
        return null;
    }

    //generate cube log rows.
    var generate_cube_log_table = function(cube_data) {
        let cdl = cube_data.length;

        //show 100 cube log
        let max_start = 100;

        if (cdl < max_start) {
            max_start = cdl;
        }

        let t_body = "";

        for (let i = 0; i < max_start; ++i) {
            let _i_cd = cube_data[i];
            let run = _i_cd.run;

            let i_results = {}; //main
            let i_results_b = {}; //bonus

            let i_cd = {};

            //other is opposite of the cube type used. if cube type is bonus, then other is main and vice-versa
            let i_cd_other = _i_cd.other || {
                type: ""
            };

            let selected_main_idx = [0,1,2];
            
            //check to see which is the main pot and bonus pot since the log logs the current main and bpot
            if (_i_cd.type === "main") {
                i_cd = _i_cd;
                i_cd_b = i_cd_other;
                i_results = _i_cd.results.result;

                //violet cube usage if exists
                if ("selected_idx" in _i_cd) {
                    selected_main_idx = _i_cd.selected_idx;

                    i_results = selected_main_idx.map((a)=>{
                        return _i_cd.results.result[a];
                    });
                }
                
                if (i_cd_other.type !== "") {
                    i_results_b = i_cd_other.results.result;
                }
            } else {
                i_cd = i_cd_other;
                i_cd_b = _i_cd;
                
                if (i_cd_other.type !== "") {
                    i_results = i_cd_other.results.result;
                }

                i_results_b = _i_cd.results.result;
            }

            let lucky3 = false;
            let luckyb3 = false;
            
            if (i_cd.type !== "") {
                let cube_line_ids = [];
                
                for (let i = 0; i < i_results.length; ++i) {
                    let cube_item_ident =  cube.cube_line_stats[i_results[i].id]?.ident;

                    if (cube_item_ident == undefined) break;

                    cube_line_ids.push({id: cube_item_ident});
                }

                if (cube_line_ids.length === 3) {
                    lucky3 = get_lucky(cube_line_ids);
                }
            }

            if (i_cd_b.type !== "") {
                //bpot
                let cube_line_ids = [];
                
                for (let i = 0; i < i_results_b.length; ++i) {
                    let cube_item_ident =  cube.cube_line_stats[i_results_b[i].id]?.ident;

                    if (cube_item_ident == undefined) break;

                    cube_line_ids.push({id: cube_item_ident});
                }

                if (cube_line_ids.length === 3) {
                    luckyb3 = get_lucky(cube_line_ids);
                }
            }

            let keep_status = "";

            if (_i_cd.cube === "black" || _i_cd.cube === "white") {
                if (_i_cd.keep) {
                    keep_status = `<span style="color:green">After</span>`;
                } else {
                    keep_status = `<span style="color:red">Before</span>`;
                }
            } else if (_i_cd.cube === "uni") {
                if (_i_cd.unicube_proceed) {
                    keep_status = `<span style="color:green">Proceeded, #${_i_cd.unicube_this_line+1}</span>`;
                } else {
                    keep_status = `<span style="color:red">Skipped, #${_i_cd.unicube_this_line+1}</span>`;
                }
            }

            t_body += `
                <tr data-run="${run}" data-pot="${_i_cd.tier}" data-pot-b="${i_cd_b.tier}" data-cube="${_i_cd.cube}" data-cube-b="${i_cd_b.cube}">
                    <td>
                        ${run}
                    </td>
                    <td>
                        <div class="cube cube-${_i_cd.cube} cube-tiny"></div>
                    </td>
                    <td>
                        <span class="pot-item">
                            <span class="tooltip-${i_cd.tier}"></span>
                            <span class="tooltip-${i_cd_b.tier}"></span>
                        </span>
                    </td>
                    <td>
                        ${keep_status}
                    </td>
                    ${
                        i_cd.type !== "" ? 
                        `
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[0].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[1].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                ${i_results[2].display}
                            </td>
                            <td data-id="${i_cd.results.name}" class="cube-rng-row row-main ${lucky3 ? "pot-triple" : ""}">
                                <span class="pot-item-container" style="text-align:left;width:100%;display:inline-block">
                                    <span class="pot-item pot-item-1" data-id="1">• ${i_results[0].display}</span> <br>
                                    <span class="pot-item pot-item-2" data-id="2">• ${i_results[1].display}</span> <br>
                                    <span class="pot-item pot-item-3" data-id="3">• ${i_results[2].display}</span>
                                </span>
                            </td>
                        `
                        :
                        `
                            <td colspan="4"></td>
                        `
                    }
                    ${
                        i_cd_b.type !== "" ? 
                        `
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[0].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[1].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                ${i_results_b[2].display}
                            </td>
                            <td data-id="${i_cd_b.results.name}" class="cube-rng-row row-bonus ${luckyb3 ? "pot-triple" : ""}">
                                <span class="pot-item-container" style="text-align:left;width:100%;display:inline-block">
                                    <span class="pot-item pot-item-1" data-id="1">• ${i_results_b[0].display}</span> <br>
                                    <span class="pot-item pot-item-2" data-id="2">• ${i_results_b[1].display}</span> <br>
                                    <span class="pot-item pot-item-3" data-id="3">• ${i_results_b[2].display}</span>
                                </span>
                            </td>
                        `
                        :
                        `
                            <td colspan="4"></td>
                        `
                    }
                </tr>
            `;
        }

        return t_body;
    };

    //cube log popup
    $("#cube_log").on("click", function() {
        //sim cubes
        /*
        for (let i = 0; i < 10; ++i) {
            Item.cube("red", $());
            Item.cube("black", $());
            Item.cube("bonus", $());
        }
        */

        let cube_data = Item.idata.meta.cube_meta_data;

        let cube_type_html = "";

        /* sort cube usage by cubes used descending */
        let cubeEntries = Object.entries(Item.idata.meta.cubes_used).sort((a, b) => b[1] - a[1]);

        cube_type_html += cubeEntries.reduce((a, [cube_type, cubes_used])=>{
            a += `
                <div class="cube-used">
                    <div class="cube cube-${cube_type} cube-small"></div> <span class="cube-used-count">${cubes_used}</span>
                </div>
            `;

            return a;
        }, "");

        let t_body = "";
        if (cube_data.length === 0) {
            t_body = `
                <tr>
                    <td colspan="100%" style="text-align:center">No Records Found</td>
                </tr>
            `;

        } else {
            t_body = generate_cube_log_table(cube_data);
        }

        let html = `
            ${cube_type_html}
            <div id="cube_log_information">
                <div id="cube_log_prng"></div>
                <table style="width:100%;font-size:11px;float:left;" id="cube_log_table">
                    <thead>
                        <tr>
                            <th colspan="12">
                                Click on the cells in the "Main" or "Bonus" columns to view the PRNG info for that cube result.
                            </th>
                        </tr>
                        <tr>
                            <th colspan="4"></th>
                            <th colspan="4">Main</th>
                            <th colspan="4">Bonus</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Run</th>
                            <th>Cube</th>
                            <th>Potential</th>
                            <th>Status</th>
                            <th>Line #1</th>
                            <th>Line #2</th>
                            <th>Line #3</th>
                            <th>Overall</th>
                            <th>Line #1</th>
                            <th>Line #2</th>
                            <th>Line #3</th>
                            <th>Overall</th>
                        </tr>
                    </thead>
                    <tbody id="cube_body">
                        ${t_body}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="20">
                                <span id="infinite_scroller_down">
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr>
        `;

        let option_box = $("#option_box");
        let option_box2 = $("#option_sub_box");

        option_box.html(html).dialog({
            position: {my: "center", at: "top center", of: window},
            title: "Cube Log",
            position: {
                my: "center top",
                at: "center top",
                of: window
            },
            width: "100%",
            height: 850,
            buttons: [{
                text: "Close",
                click: function() {
                    option_box.html("");
                    $(this).dialog("close");
                }
            }]
        }).dialog("open");

        let cube_log_table = $("#cube_log_table");
        let cube_log_prng = $("#cube_log_prng");
        let cube_body = $("#cube_body");

        //show x rows at a time. hitting the show more will load x more rows. we start with showing x rows, so that is offset from the total at the start
        let at_a_time = 100;
        let current_shown = at_a_time;
        let cdl = cube_data.length;
        let cube_log_show_more = function() {
            if (current_shown > cdl) return false;

            let start_index = current_shown;
            current_shown += at_a_time;

            if (current_shown > cdl) {
                current_shown = cdl;
            }

            let nextCubeData = cube_data.slice(start_index, current_shown);

            let new_t_body = generate_cube_log_table(nextCubeData);

            cube_body.append(new_t_body);
        };

        /* infinite scroller */
        let scroller = new IntersectionObserver((e)=>{
            if (e[0].intersectionRatio <= 0) return;

            cube_log_show_more(1);
        });
        let scroll_watcher = document.querySelector("#infinite_scroller_down");

        scroller.observe(scroll_watcher);

        let btn_cube_log_back2 = $("#btn_cube_log_back2");
        //click row to get the prng information
        cube_log_table.on("click", ".cube-rng-row", function() {
            let _this = $(this);
            let id = _this.attr("data-id");

            let is_bonus = _this.hasClass("row-bonus");

            let tr = _this.closest("tr");
            let run = tr.attr("data-run");
            let pot_tier = tr.attr(is_bonus ? "data-pot-b" : "data-pot");
            let cube = tr.attr(is_bonus ? "data-cube-b" : "data-cube");

            let cube_object = Item.idata.meta.cube_meta_data.find((a)=>{
                return a.results.name === id;
            });

            /* get number of lines */
            let cube_line = cube_object.results.result.reduce((a,b,c)=>{a.push(c); return a;},[]);

            /* violet cube - chosen lines. */
            let chosen_lines = cube_object.selected_idx ?? [];

            //get the cube maps for each line and add it to an array. also add the length to a different array
            let cube_lines_length = [];
            let cube_lines = cube_line.reduce(function(a,b) {
                let b_item = cube_object.results.map["line_" + b];
                a.push(b_item);

                cube_lines_length.push(b_item.length);

                return a;
            },[]);

            //get the rng map and prng for the tier up rate. if already legendary, then this should be undefined
            let cube_log_item = cube_object.results.tier_up.cube_log_item;
            
            let tier_rng = "";
            let html_tier = "";
            
            if (cube_log_item != undefined) {
                tier_rng = cube_object.results.tier_up.cube_log_item.tier_prng;
                let tier_map = cube_object.results.tier_up.cube_log_item.r_map;

                html_tier = mapToDisplayHtml(tier_map, (a)=>{
                    return `
                        <tr class="${tier_rng >= a.from && tier_rng < a.to ? 'highlight-row' : ''}">
                            <td>${a.name}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });
            }

            let line_selection_rng = "";
            let html_uniSelection = "";

            /*
                for unicube, show the prng info for choosing a line to reroll
            */
            if (cube === "uni") {
                line_selection_rng = cube_object.uni_prng.tier_prng;
                let line_selection_map = cube_object.uni_prng.r_map;

                html_uniSelection = mapToDisplayHtml(line_selection_map, (a)=>{
                    return `
                        <tr class="${line_selection_rng >= a.from && line_selection_rng < a.to ? 'highlight-row' : ''}">
                            <td>Cube Line #${+a.name + 1}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });

                chosen_lines = [cube_object.unicube_this_line];
            }

            //get the maximum size of the result maps
            let rng_rows_length = new Array(Math.max(...cube_lines_length)).fill();

            //get the rng value used to determine the stat for each line. used for highlighting the relevant stat row from the probability map
            let chosen_row = [];
            //create a table of prng range values for the lines
            //the lines with the most possible values will determine the table's length
            let dom2 = `
                <button id="btn_cube_log_back" style="width:150px;display:block;margin-bottom:10px;">Back</button> 
                <hr>
                <br>
                <b>Cube Run: #${run} | Cube: <div style="top: 12px;position: relative;" class="cube cube-${cube} cube-tiny" data-id="red"></div> | Pot: <span class="tooltip-${pot_tier}"></span></b>
                ${html_tier !== "" ? 
                `
                    <h2>Tier Up</h2>
                    <div class="tooltip-item" id="tooltip_tier" style="width:100%;display:block;">
                        <table style="width:100%;font-size:11px;">
                            <thead>
                                <tr>
                                    <th>Tier Up?</th>
                                    <th>Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        <b>${tier_rng}</b>
                                    </td>
                                </tr>
                                ${html_tier}
                            </tbody>
                        </table>
                    </div>
                ` : ''
                }
                ${
                    html_uniSelection !== "" ? `
                        <h2>Unicube Line Selection</h2>
                        <div class="tooltip-item" id="tooltip_uniSelection" style="width:100%;display:block;">
                            <table style="width:100%;font-size:11px;">
                                <thead>
                                    <tr>
                                        <th>Selected Line</th>
                                        <th>Range</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            <b>${line_selection_rng}</b>
                                        </td>
                                    </tr>
                                    ${html_uniSelection}
                                </tbody>
                            </table>
                        </div>
                    ` : ``
                }
                <h2>Stat Determination</h2>
                <div class="tooltip-item" id="tooltip_item" style="width:100%;height:90%;display:block;">
                    <table style="width:100%;height:100%;font-size:11px;">
                        <thead>
                            <tr>
                            ${
                                cube_line.reduce(function(a,b,c) {
                                    let chosen = chosen_lines.includes(c);

                                    a += `
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Line #${c+1}</th>
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Range</th>
                                        <th class="${chosen ? "violet-cube-chosen" : ""}">Chance</th>
                                    `;

                                    return a;
                                }, "")
                            }
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                cube_object.results.result.map(function(x) {
                                    chosen_row.push(x.prng);
                                    return `
                                        <td colspan="3" style="text-align:center" title="The pseudo-random number used to check against the probability map.">
                                            <b>${x.prng}</b>
                                        </td>
                                    `
                                }).join("")
                            }
                            ${
                                rng_rows_length.map(function(a,b,c) {
                                    return `<tr>${
                                        cube_lines.map(function(x,y) {
                                            let _a = x[b];

                                            if (_a === undefined) {
                                                return `
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                `;
                                            }


                                            let _chosen = chosen_row[y];
                                            let isChosen = _chosen >= _a.from && _chosen < _a.to;
                                            let probability = (_a.chance * 100).toFixed(4);

                                            return `
                                                <td ${isChosen ? `class="highlight-row"` : ""} title="${probability}% chance" data-id="${_a.id}">${_a.display}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${_a.from.toFixed(7)} - ${_a.to.toFixed(7)}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${probability}%</td>
                                            `;
                                        }).join("")
                                    }</tr>`
                                }).join("")
                            }
                        </tbody>
                    </table>
                </div>
            `;

            option_box2.html(dom2);
            option_box2.dialog({            
                position: {my: "center", at: "top center", of: window},
                title: "Cube Log - PRNG Info",
                position: {
                    my: "center top",
                    at: "center top",
                    of: window
                },
                width: "100%",
                height: 850,
                buttons: [{
                    text: "Close",
                    click: function() {
                        option_box2.html("");
                        option_box2.dialog("close");
                    }
                }]
            }).dialog("open");

            //return from viewing the prng info for a cube run
            $("#btn_cube_log_back").on("click", function() {
                option_box2.dialog("close");
            });

            option_box2.scrollTop(0);
        });

        return false;
    });

    /*
        occult cube - mystical cube 
        bonus occult cube - bonus mystical cube, 02439870
        hard cube - master craftman's cube, 02439658
        solid cube - meister cube, 02635223
        red cube - glowing cube, 02439877
        black cube - bright cube, 02439878
    */
    function change_cube_visual(type = "GMS") {
        /* moved to cube.css */
        return false;
    }

    change_cube_visual();

    /* change display. does not change rates */
    $("#system_cube_display").on("change", function() {
        system.cube = $(this).val();
        change_cube_visual(system.cube);

        cube.rates.tier_up = cube.rates.tier_up_region[system.cube];
    });

    /*
        violet cube lines to select
    */
   $("body").on("click", ".cube-main-violet .cube-result-line", function() {    
        /* on final screen. don't allow clicking of cube lines */
        if ($("#cube_container .cube-main").hasClass("cube-main-violet-final")) return false;

        sfa.play("_BtMouseClick");
        const _this = $(this);

        if (_this.hasClass("violet-result-line-active")) {
            _this.removeClass("violet-result-line-active");
        } else {
            const violet_active = $("#cube_container .violet-result-line-active");
            if (violet_active.length >= 3) return false;

            _this.addClass("violet-result-line-active");
        }
   });
});

/* cube menu stuff */
var cube_pot_dropdown_html = async function(this_item, type, pot_tier, o) {
    o = Object.assign({
        wildcard: false
    }, o);

    //get item type, with sub class taking priority (copied from cube.js)
    let item_type = this_item.sub_class;

    if (this_item.class == "weapon") {
        item_type = this_item.class;
    } else if (item_type === "") {
        item_type = this_item.type;
    } 

    item_type = item_type.replace(/\s/gi, "_");

    //get the stats available for the main/bonus pot by its tier and item type
    let stats = await cube.get_cube_type(this_item.level, item_type, type, pot_tier);
    let tier_html = "";

    //generate dropdowns for each line with the available stats
    let idx = 0;
    let uuid = generateUUID();
    for (let i in stats) {
        ++idx;

        //remove duplicates from the stat options
        let _s = stats[i];

        let stat_options = [];

        if (o.wildcard) {
            stat_options.push({
                type: "-----",
                html: `
                    <option value="-1">&lt;Any Line&gt;</option>
                `
            });
        }

        let s_key = Object.keys(_s);

        /* return cube options with select html and its type so that we can sort it*/
        stat_options = s_key.reduce(function(a,b) {
            a.push({
                type: b,
                html: `
                    <option value="${HtmlEncode(b)}">${b}</option>
                `}
            );

            return a;
        }, stat_options).sort((a,b)=>{return a.type > b.type ? 1 : -1;}).map((a)=>{return a.html}).join();

        tier_html += `
            <div class="pot-stat-con" style="padding:5px">
                <span class="pot-stat-line" style="display:block;font-weight:bold;"> 
                    <span class="tooltip-label-${pot_tier}" style="font-size:1.3em">•</span>
                    Line ${idx}:
                </span>
                <select id="cube_stat_line_${type}_${idx}" data-id="${uuid}" class="select-cube-line-${type} cube-selector-auto" data-id="${idx}" style="width:100%"pi>
                    ${stat_options}
                </select>
            </div>
        `;
    }

    return `
        <button id="btnCube_${uuid}_random" class="btn-cube-dropdown-random" data-for="${uuid}">Randomize</button> 
        <button id="btnCube_${uuid}_match" class="btn-cube-dropdown-match" data-for="${uuid}">Match Line #1</button> 
        ${tier_html}`;
};

$(function() {
    /*
        for the cube line selector, randomize the lines for #1,2,3
    */
    const body = $("body").on("click", ".btn-cube-dropdown-random", function() {
        let _this = $(this);
        let uuid = _this.attr("data-for");

        const cubeSelects = $(`select[data-id=${uuid}]`);

        for (let i = 0; i < cubeSelects.length; ++i) {
            let cubeSelect = cubeSelects.eq(i);
            let cubeOption = cubeSelect.find("option");
            var randomIndex = Math.floor(Math.random() * cubeOption.length); // Generate random index
            cubeOption.eq(randomIndex).prop("selected", true); // Select the random option
            cubeSelect.trigger("change");

            /* force any select2 select events */
            if (i === cubeSelects.length - 1) {
                cubeSelect.trigger({type: "select2:select"});
            }
        }
    });

    body.on("click", ".btn-cube-dropdown-match", function() {
        let _this = $(this);
        let uuid = _this.attr("data-for");

        const cubeSelects = $(`select[data-id=${uuid}]`);

        let line1 = cubeSelects.eq(0).val();

        for (let i = 1; i < cubeSelects.length; ++i) {
            const cs = cubeSelects.eq(i).val(line1).trigger("change");

            if (i === cubeSelects.length - 1) {
                cs.trigger({type: "select2:select"});
            }
        }
    });
});



