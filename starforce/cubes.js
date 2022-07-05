var cube = {
    rates: {},
    type: {}
};

//some stats cannot exceed a certain number of lines. if not listed here, then assumes max lines allowed
//the stat value doesn't matter. stats of the same type will count towards the limit
//if the stat is encountered when at the limit, it will reroll until it's not that stat
cube.stat_restriction = {
    invinc: 1,
    decent_skill: 1,
    ignore_dmg: 2,
    ied: 2,
    invinc2: 2,
    boss_dmg: 2,
    item_drop: 2
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

    targets.find(".cube").removeClass("disabled");

    if (tier > 2) {
        targets.find(".cube[data-id=occult]").addClass("disabled");
    }

    if (tier > 3) {
        targets.find(".cube[data-id=master]").addClass("disabled");
    }
}

/* map the line to a common type */
cube.stat_restriction_map = {"20% chance to ignore 7 damage when attacked":"ignore_dmg","20% chance to ignore 11 damage when attacked":"ignore_dmg","30% chance to ignore 15 damage when attacked":"ignore_dmg","Ignored Enemy DEF: +15%":"ied","10% chance to ignore 20% of damage when attacked":"ignore_dmg","10% chance to ignore 40% of damage when attacked":"ignore_dmg","Enables the &lt;Decent Combat Orders&gt; skill":"decent_skill","5% chance to ignore 20% of damage when attacked":"ignore_dmg","5% chance to ignore 40% of damage when attacked":"ignore_dmg","Enables the &lt;Decent Haste&gt; skill":"decent_skill","20% chance to ignore 17 damage when attacked":"ignore_dmg","20% chance to ignore 26 damage when attacked":"ignore_dmg","30% chance to ignore 35 damage when attacked":"ignore_dmg","Invincibility time after being hit: +2 seconds":"invinc2","2% chance to become invincible for 6 seconds when attacked.":"invinc","Invincibility time after being hit: +1 second":"invinc2","Ignored Enemy DEF: +35%":"ied","Ignored Enemy DEF: +40%":"ied","Boss Monster Damage: +35%":"boss_dmg","Boss Monster Damage: +40%":"boss_dmg","Ignored Enemy DEF: +30%":"ied","Boss Monster Damage: +30%":"boss_dmg","20% chance to ignore 5 damage when attacked":"ignore_dmg","20% chance to ignore 8 damage when attacked":"ignore_dmg","30% chance to ignore 11 damage when attacked":"ignore_dmg","Ignored Enemy DEF: +4%":"ied","Boss Monster Damage: +12%":"boss_dmg","Ignored Enemy DEF: +3%":"ied","20% chance to ignore 13 damage when attacked":"ignore_dmg","20% chance to ignore 20 damage when attacked":"ignore_dmg","30% chance to ignore 27 damage when attacked":"ignore_dmg","20% chance to ignore 19 damage when attacked":"ignore_dmg","20% chance to ignore 29 damage when attacked":"ignore_dmg","30% chance to ignore 39 damage when attacked":"ignore_dmg","Invincibility time after being hit: +3 seconds":"invinc2","4% chance to become invincible for 6 seconds when attacked.":"invinc","20% chance to ignore 3 damage when attacked":"ignore_dmg","30% chance to ignore 7 damage when attacked":"ignore_dmg","20% chance to ignore 23 damage when attacked":"ignore_dmg","20% chance to ignore 35 damage when attacked":"ignore_dmg","30% chance to ignore 47 damage when attacked":"ignore_dmg","Enables the &lt;Decent Mystic Door&gt; skill":"decent_skill","20% chance to ignore 21 damage when attacked":"ignore_dmg","20% chance to ignore 32 damage when attacked":"ignore_dmg","30% chance to ignore 43 damage when attacked":"ignore_dmg","Ignored Enemy DEF: +5%":"ied","Boss Monster Damage: +18%":"boss_dmg","20% chance to ignore 9 damage when attacked":"ignore_dmg","20% chance to ignore 14 damage when attacked":"ignore_dmg","30% chance to ignore 19 damage when attacked":"ignore_dmg","30% chance to ignore 23 damage when attacked":"ignore_dmg","Item Drop Rate: +2%":"item_drop","20% chance to ignore 15 damage when attacked":"ignore_dmg","30% chance to ignore 31 damage when attacked":"ignore_dmg","Enables the &lt;Decent Hyper Body&gt; skill":"decent_skill","Item Drop Rate: +4%":"item_drop","20% chance to ignore 25 damage when attacked":"ignore_dmg","20% chance to ignore 38 damage when attacked":"ignore_dmg","30% chance to ignore 51 damage when attacked":"ignore_dmg","Item Drop Rate: +3%":"item_drop","Enables the &lt;Decent Advanced Blessing&gt; skill":"decent_skill","Item Drop Rate: +5%":"item_drop","Enables the &lt;Decent Speed Infusion&gt; skill":"decent_skill","Enables the &lt;Decent Sharp Eyes&gt; skill":"decent_skill","Item Drop Rate: +20%":"item_drop","Item Drop Rate: +10%":"item_drop","Item Drop Rate: +15%":"item_drop"};

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
    },
    occult: {
        epic: 0.009901,
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
    }
}

//DEBUG
/*
cube.rates.tier_up = {
    red: {
        epic: 0,
        unique: 1,
        legendary: 1
    },
    black: {
        epic: 0,
        unique: 0,
        legendary: 0
    },
    bonus: {
        epic: 0,
        unique: 1,
        legendary: 1
    },
    occult: {
        epic: 0,
        unique: 0,
        legendary: 0
    },
    craftsman: {
        epic: 1,
        unique: 0,
        legendary: 0
    },
    meister: {
        epic: 0,
        unique: 0,
        legendary: 0
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

/*
    get the cube probability rates based on current tier, item type, and level

    type is equipment type (gloves, top, etc.)
*/
cube_lines = {};
cube_rates = {};
cube.get_cube_type = async function(level, type, cube_type, cube_tier) {
    /* these types share the same cube potential rates and lines with the type it is set to */
    type = type.replace(/\s/gi, "_");
    if (["belt", "shoulder"].includes(type)) {
        type = "cape";
    } else if (["eye_accessory", "earrings", "ring", "pendant"].includes(type)) {
        type = "face_accessory";
    } else if (["badge"].includes(type)) {
        type = "mechanical heart";
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
    if (`${cube_type}_${type}` in cube_lines) {
        return cube_lines[`${cube_type}_${type}`];
    }
    
    let [crates, clines] = await Promise.all([
        cube.fetch_cube_rates(),
        cube.fetch_cube_lines(cube_type, type)
    ]);

    let r_cube_lines = {};

    for (let level in clines) {
        r_cube_lines[level] = {};

        for (let tier in clines[level]) {
            r_cube_lines[level][tier] = clines[level][tier].map((a)=>{
                return crates[a];
            });
        }
    }

    cube_lines[`${cube_type}_${type}`] = r_cube_lines;

    return cube_lines[`${cube_type}_${type}`];
}

/* get the cube line hash data that points to cube line data */
cube.fetch_cube_rates = async function() {
    if (!("hash" in cube_lines)) {
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

    if (type == "bonus") {
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
            await cube.cube.call(this, "red", [], ()=>{}, {
                no_tier_up: true
            });
        }

        cube_pot = "rare";

        this.idata.meta[pot_type] = cube_pot;
    }

    let cube_results = await cube.stats.main(item_type, cube_pot, type, cube_type, this.idata.level, o);

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

    /* force keep the record -- used for setting cubes directly for black cubes */
    if (o.force_keep) {
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
    get_probability: async function(a, c, d) {
        let type = Item.idata.class === "weapon" ? Item.idata.class : Item.idata.type;
        let rates = await cube.get_cube_type(Item.idata.level, type, c, d);
        
        let item_prob = 1;

        for (let i = 0; i < a.length; ++i) {
            let i_stat = a[i];

            if (i_stat == -1) continue;

            let this_prob = rates[i][i_stat];
            item_prob *= this_prob;
        }
  
        return item_prob;
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
        let loop_rates_prob = function(i, bp = false) {
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
                    stat_class = cube.stat_restriction_map[j_stat]; /* get the common line type based on line */

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


cube.get_dropdown_option = function(cube) {
    let html = `
        <option value="">No Potential</option>
        <option value="rare">Rare</option>
        <option value="epic">Epic</option>
    `;

    if (cube === "occult") {
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

    //while cube aniamtion plays, disallow cube actions
    let cube_loading = false;

    //cubes at the bottom left
    $("#cube_menu .cube").on("click", function() {
        if (cube_loading) return false;
        let _this = $(this);

        if (_this.hasClass("disabled")) {
            return false;
        }

        /* run cube function in async while keeping button event sync */
        let run_cube = async function(){
            if (!Item.idata.enhanceable) {
                return false;
            }

            let cube_type = _this.attr("data-id");

            cube_loading = true;
            let cr = false; //cube upgrade
            let cube_animation = "cube-use-normal";
            let main_con = cc.find(".cube-main");

            let con = "";

            if (cube_type === "black") {
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
                cr = await Item.cube(cube_type, cc, ()=>{});

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

                let cc_play = cc.find(".cube-upgrade").removeClass("hidden").addClass(cube_animation);
                let cc_button = cc.find(".btn-one-more-try").addClass("disabled");
                let cc_ok = cc.find(".btn-cube-ok").addClass("disabled");

                setTimeout(function() {
                    cc_play.addClass("hidden").removeClass(cube_animation);
                    cc_button.removeClass("disabled");
                    cc_ok.removeClass("disabled");
                    cube_loading = false;
                    Item.redraw_item_tooltip(["cube"]);
                    cube.update_cube_menu.call(Item, $("#cube_menu"));
                }, 1500 * system.animation_speed_actual);
            }

            con.attr("data-cube", cube_type);
        }

        run_cube();
    });

    //close cube window
    $(".btn-cube-ok").on("click", function() {
        cc.addClass("hidden");
    });

    //one more try
    $(".btn-one-more-try").on("click", function() {
        let _this = $(this);

        if (_this.hasClass("btn-cube-black")) {
            cube_black_go.trigger("click");
        } else {
            let type = cc.attr("data-cube");
            $(`#cube_${type}`).trigger("click");
        }
    });

    //apply before stats
    cube_black_results.on("click", function() {
        let _this = $(this);
        let this_id = _this.attr("data-id");

        let this_pot = Item.idata.meta.cube_meta_data.find(function(a) {
            return a.results.name === this_id;
        });

        let is_before = _this.hasClass("cube-black-window-before");

        //update keep flag when selected for logging
        //update pot tier too in case user is an idiot and wants to keep lower potential
        let curr_pot = Item.idata.meta.cube_meta_data[0];
        curr_pot.keep = !is_before;
        Item.idata.meta.cube_potential = this_pot.tier;

        Item.idata.boosts.cubes.main = this_pot.results.result;
    
        Item.redraw_item_tooltip();

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
            
            //check to see which is the main pot and bonus pot since the log logs the current main and bpot
            if (_i_cd.type === "main") {
                i_cd = _i_cd;
                i_cd_b = i_cd_other;
                i_results = _i_cd.results.result;
                
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
                //remove the identifier digit from the stat type id. this allows us to check to see if all 3 lines are the same. if it is, highlight it as noteworthy
                let i1 = i_results[0].id.replace(/\d+$/, "");
                let i2 = i_results[1].id.replace(/\d+$/, "");
                let i3 = i_results[2].id.replace(/\d+$/, "");

                lucky3 = i1 === i2 && i2 === i3; //three in a row
            }

            if (i_cd_b.type !== "") {
                //bpot
                let ib1 = i_results_b[0].id.replace(/\d+$/, "");
                let ib2 = i_results_b[1].id.replace(/\d+$/, "");
                let ib3 = i_results_b[2].id.replace(/\d+$/, "");

                luckyb3 = ib1 === ib2 && ib2 === ib3; 
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
                        ${_i_cd.cube === "black" ? (_i_cd.keep ? "Yes" : "No") : ""}
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

        for (let i in Item.idata.meta.cubes_used) {
            let cube_count = Item.idata.meta.cubes_used[i];
            cube_type_html += `
                <div class="cube-used">
                    <div class="cube cube-${i} cube-small"></div> <span class="cube-used-count">${cube_count}</span>
                </div>
            `;
        }

        let t_body = "";
        if (cube_data.length === 0) {
            t_body = `
                <tr>
                    <td colspan="20" style="text-align:center">No Records Found</td>
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
                            <th>Keep?</th>
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
                text: "Back",
                class: "hidden",
                id: "btn_cube_log_back2",
                click: function() {
                    $("#btn_cube_log_back").trigger("click");
                }
            },{
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

            let cube_line = [0,1,2];

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
            let tier_map = "";
            let html_tier = "";
            
            if (cube_log_item != undefined) {
                tier_rng = cube_object.results.tier_up.cube_log_item.tier_prng;
                tier_map = cube_object.results.tier_up.cube_log_item.r_map;

                html_tier = mapToDisplayHtml(tier_map, (a)=>{
                    return `
                        <tr class="${tier_rng >= a.from && tier_rng < a.to ? 'highlight-row' : ''}">
                            <td>${a.name}</td>
                            <td>${a.from} - ${a.to}</td>
                        </tr>
                    `
                });
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
                <h2>Stat Determination</h2>
                <div class="tooltip-item" id="tooltip_item" style="width:100%;height:90%;display:block;">
                    <table style="width:100%;height:100%;font-size:11px;">
                        <thead>
                            <tr>
                            ${
                                cube_line.map(function(a,b) {
                                    return `
                                        <th>Line #${b+1}</th>
                                        <th>Range</th>
                                    `;
                                }).join("")
                            }
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                cube_object.results.result.map(function(x) {
                                    chosen_row.push(x.prng);
                                    return `
                                        <td colspan="2" style="text-align:center" title="The pseudo-random number used to check against the probability map.">
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
                                                `;
                                            }


                                            let _chosen = chosen_row[y];
                                            let isChosen = _chosen >= _a.from && _chosen < _a.to;

                                            return `
                                                <td ${isChosen ? `class="highlight-row"` : ""} title="${(_a.chance * 100).toFixed(4)}% chance" data-id="${_a.id}">${_a.display}</td>
                                                <td ${isChosen ? `class="highlight-row"` : ""}>${_a.from.toFixed(7)} - ${_a.to.toFixed(7)}</td>
                                            `;
                                        }).join("")
                                    }</tr>`
                                }).join("")
                            }
                        </tbody>
                    </table>
                </div>
            `;

            cube_log_prng.removeClass("hidden");
            cube_log_prng.html(dom2);

            btn_cube_log_back2.removeClass("hidden");

            //return from viewing the prng info for a cube run
            $("#btn_cube_log_back").on("click", function() {
                cube_log_prng.addClass("hidden");
                cube_log_table.removeClass("hidden");
                btn_cube_log_back2.addClass("hidden");
            });

            cube_log_table.addClass("hidden");

            option_box.scrollTop(0);
        });

        return false;
    });
});