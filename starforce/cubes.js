cube.stat_upgrade_list = [
    "strp", "dexp", "intp", "lukp", "wattp", "mattp", "dmgp", "allp"
];

//tier up certain stats based on its level
//currently only does tier 3 and tier 4 stats
cube.stat_upgrade = function(level, id) {
    let display = cube.stat_type[id];

    if (level < 160) return display;

    //get the stat id without the tier number
    let this_line = id.replace(/\d+$/, "");

    //not part of the stat types that gain a bonus
    if (!cube.stat_upgrade_list.includes(this_line)) {
        return display;
    }

    //replace the number in the display cube line with the value incremented by 1
    return display.replace(/(\d+)/, (a) => {return +a + 1;});
};

//cube enums
cube.cube_type = {
    main: {
        red: 0,
        black: 1,
        occult: 2,
        mcc: 3,
        meister: 4,
        violet: 5,
        equality: 6
    },
    bonus: {
        bonus: 0,
        occult: 1,
        white: 2
    }
};

//some stats cannot exceed a certain number of lines. if not listed here, then assumes max lines allowed
//the stat value doesn't matter. stats of the same type will count towards the limit
//if the stat is encountered when at the limit, it will reroll until it's not that stat
cube.stat_restriction = {
    all_skill: 1,
    hit_invinc: 1,
    ied: 2,
    boss: 2,
    invinc: 2,
    ignore_dmg: 2,
    item_drop: 2
};


//tier up rate
cube.rates.tier_up = {
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
        legendary: 0.004975
    }
}

//DEBUG
/*
cube.rates.tier_up = {
    red: {
        epic: 1,
        unique: 1,
        legendary: 1
    },
    black: {
        epic: 1,
        unique: 0,
        legendary: 0
    },
    bonus: {
        epic: 1,
        unique: 1,
        legendary: 1
    }
}
*/

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

//cube item, type is cube type; dom is the active cubing window
//cb is callback passed to the cube_draw function
//o is any additional options
cube.cube = function(type, dom, cb, o) {
    o = Object.assign({
        no_tier_up: false,
        force_stats: false,
        stats: {},
        force_tier: false,
        tier: {},
        update_dom: true,
        write_log_record: true
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

    if (!["red", "black", "mcc", "meister"].includes(type)) {
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
        */
        if (type === "black") {
            cube.cube.call(this, "red", [], ()=>{}, {
                no_tier_up: true
            });
        }

        cube_pot = "rare";

        this.idata.meta[pot_type] = cube_pot;
    }

    let cube_results = cube.stats.main(item_type, cube_pot, type, cube_type, this.idata.level, o);

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

    //post-processing and update cube window
    cube.cube_draw.call(this, cube_results, dom, type, cb, {update_dom: o.update_dom, write_log_record: o.write_log_record});

    return cube_results.tier_up.upgrade;
}

if (typeof item != 'undefined') {
    //set the cube type directly. go through the cube function to force a flimsy record write
    /*
        f = main or bonus pot type
        r = pot tier
        s = struct of stat ids from cube.stat_type
    */
    item.prototype.set_cube = function(f, r, s, o) {
        o = Object.assign({
            write_log_record: true
        }, o);

        let cube_type = "red";

        if (f === "bonus") {
            cube_type = "bonus";
        }

        let _this = this;

        //go through the cube proc, but pass options that force the tier and stats
        _this.cube(cube_type, [], ()=>{}, {
            no_tier_up: true,
            force_stats: true,
            stats: s,
            force_tier: true,
            tier: r,
            write_log_record: o.write_log_record
        });
    }

    item.prototype.cube = function(type, dom, cb, o) {
        return cube.cube.call(this, type, dom, cb, o);
    };
}

//redraw the cube window, as well as update the item tooltip
//cb is callback if tooltip is to be drawn later or other things need to happen
//o for any other options
cube.cube_draw = function(cube_results, dom, type, cb, o) {
    o = Object.assign({
        update_dom: true,
        write_log_record: true
    }, o);

    let hasDom = dom.length !== 0;

    let results = cube_results.result;
    let this_pot = "";
    let this_pot_type = "cube_potential";

    if (this.idata.meta.cube_log_item.type === "bonus") {
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

    //whether to keep the pot or not
    if (type !== "black" || force_keep) {
        if (cube_results.tier_up.upgrade) {
            this.idata.meta[this_pot_type] = curr_pot;
        }

        this.idata.boosts.cubes[this.idata.meta.cube_log_item.type] = results;
    } else {
        this.idata.meta.cube_log_item.keep = false;
    }

    if (hasDom) {
        if (type !== "black") {
            //set potential
            let crp = dom.find(".cube-result-pot");
            
            if (crp.attr("data-pot") != curr_pot) {
                crp.attr("data-pot", curr_pot);
                crp.html(curr_pot.capitalize());
            }

            dom.find(".cube-result-stats").html(
                results.map(function(a) {
                    return `
                        <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                    `
                }).join("<br>")
            );
        } else {
            //get last kept cube
            let prev_pot = this.idata.meta.cube_meta_data.find(function(a) {
                return a.keep && a.type === "main";
            });

            let prev_pot_check = prev_pot.tier !== undefined;

            //set before and after pot tier label
            let crpbl = dom.find(".cube-result-before-label");
            let crpal = dom.find(".cube-result-after-label");
            let before_window = dom.find(".cube-black-window-before");
            let after_window = dom.find(".cube-black-window-after");

            if (prev_pot_check) {
                let prev_pot_label = this_pot;

                if (crpbl.attr("data-pot") != prev_pot_label) {
                    crpbl.attr("data-pot", prev_pot_label);
                    crpbl.html(prev_pot_label.capitalize());
                }
            }

            if (crpal.attr("data-pot") != curr_pot) {
                crpal.attr("data-pot", curr_pot);
                crpal.html(curr_pot.capitalize());
            }

            //set before and after pot
            let crpb = dom.find(".cube-result-before");
            let crpa = dom.find(".cube-result-after");

            if (prev_pot_check) {
                before_window.attr("data-id", prev_pot.results.name);

                crpb.html(
                    prev_pot.results.result.map(function(a) {
                        return `
                            <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                        `
                    }).join("<br>")
                );
            }

            after_window.attr("data-id", cube_results.name);

            crpa.html(
                results.map(function(a) {
                    return `
                        <span class="cube-result-line" title="${a.display}" data-id="${a.id}">${a.display}</span>
                    `
                }).join("<br>")
            );
        }
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
            this.redraw_item_tooltip();
        }
    }
};

//stat percentage map for cube based on potential and item type
cube.stats = {
    /*
        get the expected probabilities for warning purposes
        this = item
        a = ex: ["lukp12", "lukp12", "lukp12"]
        b = cube type "main" or "bonus"
        c = cube (red, black, bonus)
        d = cube tier (rare, epic...)
    */
    get_probability(a, b, c, d) {
        let cube_enum = cube.cube_type[b][c];

        //get item type, with sub class taking priority
        let item_type = this.idata.sub_class;

        if (this.idata.class == "weapon") {
            item_type = this.idata.class;
        } else if (item_type === "") {
            item_type = this.idata.type;
        } 

        let item_stats = cube.pot_stats[b][item_type][d];
        let item_prob_rates = cube.rates[b][item_type][d];
            
        /* get the probability tier from the item type */
        let item_prob_tier = a.map((x,y)=>{
            if (x == -1) {
                return ["t0", 1];
            }

            /* crit_dmg lines have two instances due to min and max crit damages combining */
            let multiplier = 1;
            if (x.startsWith("crit_dmg")) {
                multiplier = 2;
            }

            return [item_stats["o" + (++y)].find(([key, value])=>{return key == x})[1], multiplier];
        });
        
        /* 
            get the probabilities from the probability tier and multiple them together to get the probability 
            wildcard values is probabiltiy of 1
        */
        let item_prob = item_prob_tier.map(([prob, multi],y)=>{
            if (prob === "t0") {
                return 1;
            }

            let rate = item_prob_rates["o" + ++y][prob][cube_enum] * multi;

            return rate;
        }).reduce((a,b)=>{ return a * b;}, 1);

        return item_prob;
    },
    //get the rates based on black or red probabilities
    /*
        e = equipment type
        r = current potential tier
        c = cube type
        f = main or bonus pot type
        bs = bypass stats - pass the stats directly 
        l = equipment level
        o = any additional options
    */
    main: function(e, r, c, f = "main", l, o) {
        e = e.replace(/\s/gi, "_"); //turn spaces into _ to properly check against the relevant rates/stats

        //check to see if tier up. if it does, then set the r argument to the next tier
        let tier_up = cube.try_tier_up(c, r, o);

        if (tier_up.upgrade) {
            r = tier_up.next_tier;
        }

        let rates_map = cube.rates[f][e][r]; //probability map
        let stats_map = cube.pot_stats[f][e][r]; //stat map
        let cube_enum = cube.cube_type[f][c];

        let cube_lines = ["o1", "o2", "o3"];

        let rates_probability = {}; //get the stat type and its probability based on its probability tier

        for (let i = 0; i < cube_lines.length; ++i) {
            let i_line = cube_lines[i];

            let rate = rates_map[i_line]; //probability tiers and its value
            let stats = stats_map[i_line]; //stats associated with the cube, equipment, and potenital type

            //resolve the stat ids to their probability value, based on its tier
            //shuffle the array to produce a random probability map
            let this_stat_prob = stats.reduce((a,b)=>{
                let this_type = {};
                this_type[b[0]] = rate[b[1]];
                a.push(this_type);
                return a;
            }, []);

            shuffle(this_stat_prob);

            rates_probability["line_" + i] = this_stat_prob;
        }

        let cube_prob_map = []; //map of each line
        let cube_result = []; //result from comparing the randon number against the map

        let stat_class_count = {}; //check against stat restrictions for lines that cannot show up more than once or twice


        //loop through the probability map and choose a stat for the line. 
        //i is the line, bp is to bypass forced stats if needed to prevent infinite looping
        let loop_rates_prob = function(i, bp = false) {
            let i_stat = rates_probability[i]; //the probability map associated with cube line

            let i_map = []; //map for probability

            let i_start = 0;
            let i_current = 0;

            let this_rng = prng();

            let restriction_rerun = false; //if the line hits the stat class restriction (e.g., 3 boss lines), then rerun it
            let already_found = false; //for forced stats, if the prob is already found, then don't mark any more as selected (in cases of duplicate stat items)
            //loop through probability map and compare the prng value to the range
            for (let j = 0; j < i_stat.length; ++j) {
                //get the probability value associated with the stat type
                let j_item = i_stat[j]; //probability
                let j_stat = Object.keys(j_item)[0]; //stat id (ex: strp3)
                
                let j_prob = j_item[j_stat][cube_enum]; //cube type for the probability

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
                    stat_class = j_stat.replace(/\d+$/, ""); //get the stat id without the number

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
                    display: cube.stat_upgrade(l, j_stat),
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
                return loop_rates_prob(i, true);
            }

            //add the map to object for record keeping
            cube_prob_map[i] = i_map;
        };


        //using the shuffled stat arrays and the probability, construct a probability map
        //i is the cube line (ex: line_0)
        for (let i in rates_probability) {
            loop_rates_prob(i);
        }

        return {
            result: cube_result,
            map: cube_prob_map,
            tier_up: tier_up,
            name: generateUUID()
        };
    }
};