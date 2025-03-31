/*
    it = item object from the item_db files with the meta data applied from item_meta
*/
class item {
    constructor(it, o = {}) {
        if (typeof structuredClone !== 'undefined') {
            this.idata = structuredClone(it);
        } else {
            this.idata = JSON.parse(JSON.stringify(it));
        }

        // set meta options related to the item class as a concept
        let meta_data = {
            virtual: false, // if true, then virtual items do not update the DOM in its prototype functions (used in worker-initialized items)
            ...o
        };

        for (let meta_item in meta_data) {
            this[meta_item] = meta_data[meta_item];
        }
    }
}


item.prototype.cache = {
    dom: {}, //ui
    eg: {}, //equipment stat boost, item
    sr: {}, //current star success, level + star
    sc: {}, //current star cost, level + star
    sf_meta_data: {  //object for meta_data for starforce logging
        id: 0,
        sf_cost: 0,
        sf_cost_discount: {},
        is_safeguard: false,
        prn: 0,
        prn_map: [],
        star: 0,
        result: "",
        sk_cost: 0
    }
};

item.prototype.clear_sf_history = function() {
    this.idata.meta.sf_meta_data = [];
    return this;
};

item.prototype.is_droppable = function(current_star) {
    if (this.idata.superior) {
        return current_star !== 0;
    };

    return !(current_star < GLOBAL.starforce.min_droppable_star || [10,15,20].includes(current_star));
};

item.prototype.set_item_level = function(star = 0) {
    let sf_data = [];
    this.idata.meta.stars = 0;
    this.idata.boosts.sf_data = [];

    let max_star = 0;

    if (this.idata.stars !== -1) {
        max_star = this.idata.stars;
    } else {
        max_star = star_max(this.idata.level, this.idata.superior);
    }

    if (max_star < star) {
        star = max_star;
    }

    for (let i = 0; i < star; ++i) {
        let sf = this.check_cache(()=>{
            return equip_gain(this.idata);
        }, "eg", "_" + this.idata.level + i + this.idata.superior);

        sf_data.push(sf);
        this.idata.meta.stars += 1;
    }

    this.idata.meta.chance_time = false;
    this.idata.meta.chance_count = 0;

    this.idata.boosts.sf_data = sf_data;

    return this;
};

//set various metadata values
item.prototype.set_meta_options = function(o) {
    for (let i in o) {
        this.idata.meta[i] = o[i];
    }
}

//base att + att from scrolls
//def works, too
item.prototype.starforce_att_percent = function(att = 0, bwatt = 0, p_arr = []) {
    if (att === 0) return 0;

    let curr_att = att;

    for (let i = 0; i < p_arr.length; ++i) {
        if (p_arr[i] === 0) continue;

        let att_gain = 1 + Math.floor(curr_att * p_arr[i]);
        curr_att += att_gain;
    }

    return curr_att - att;
};

/* get starforce result and update the item's stars */
item.prototype.starforce = function(starcatch = false) {
    let result = this.starforce_result(starcatch);

    if (result.includes("success")) {
        this.update_star(0);
        this.idata.meta.starcatch.count += 1;

        /* ??? */
        if (!this.virtual && this.idata.meta.stars >= 22) {
            congrats_from_maki();
        }
    } else if (result.includes("fail")) {
        this.update_star(1);
    } else {
        this.update_star(2);
    }

    if (!this.virtual) {
        this.redraw(["starforce"]);
    }

    return result;
}

// calculate the starforce outcome and apply any of the events
item.prototype.starforce_result = function(starcatch = false) {
    if (event_options.starcatch) {
        starcatch = true;
    }

    let pval = 0;
    let level = this.idata.level;
    let current_star = this.idata.meta.stars;

    let sr_catch = this.check_cache(()=>{
        return star_success_rate(current_star, this.idata.superior);
    }, "sr", `_${level}${current_star}_${this.idata.superior}`);

    let prn_map = {};
    let r_type = get_random_result(sr_catch, (a) => { prn_map = a; }, (a) => { pval = a; });

    // 5/10/15 100% success event
    if (!this.idata.superior && event_options._51015 && [5, 10, 15].includes(current_star)) {
        r_type = "success";
    }

    // Chance time logic
    if (this.idata.meta.chance_time) {
        r_type = "chance_time_success";
        this.idata.meta.chance_count = 0;
        this.idata.meta.chance_time = false;
    }

    if (r_type !== "chance_time_success") {
        let safeguard = user_settings.starforce.safeguard;

        if (r_type === "fail" || (r_type === "sc_success" && !starcatch)) {
            if (r_type === "sc_success" && !starcatch) {
                r_type = "sc_fail";
            }
            if (this.is_droppable(current_star)) {
                this.idata.meta.chance_count += 1;
                if (this.idata.meta.chance_count === 2) {
                    this.idata.meta.chance_time = true;
                }
            }
        } else if (r_type === "success" || r_type === "sc_success") {
            this.idata.meta.chance_count = 0;
            this.idata.meta.chance_time = false;
        } else if (r_type === "destroy" && safeguard) {
            r_type = "fail-safeguard";
        }
    }

    // Call the extracted logging function
    this.init_starforce_result_log(pval, prn_map, r_type);

    return r_type;
};

// increase, decrease, or reset the star level of the item, depending on starforce outcome
// type enums: 0 - increase star, 1 - decrease star, 2 - destroy item (reset star to 12 for non-superior items, or 0 for superior items)
item.prototype.update_star = function(type = 0) {
    let level = this.idata.level;
    let current_star = this.idata.meta.stars;
    let is_droppable = this.is_droppable(current_star);
    
    //success
    if (type === 0) {
        let stat_add = this.check_cache(()=>{
            return equip_gain(this.idata);
        }, "eg", `_${level}${current_star}_${this.idata.superior}`);
        this.idata.boosts.sf_data.push(stat_add);
        this.idata.meta.stars += 1;

    //fail
    } else if (type === 1 && is_droppable) {
        this.idata.boosts.sf_data.pop();
        this.idata.meta.stars -= 1;

    //destroy
    } else if (type === 2) {
        let d_star = this.idata.superior ? 0 : 12;
        this.set_item_level(d_star);
        this.idata.meta.stars = d_star;
    }

    /* 2x before 10 stars  */
    let additional_stars = (type === 0 && this.idata.meta.stars <= 11 && event_options.pre10x2) ? 1 : 0;
    this.idata.meta.stars += additional_stars;

    this.complete_starforce_result_log(current_star, level);
};

// Init the starforcing logic dealing with the outcome of the starforce attempt (success, fail, destroy, etc.)
item.prototype.init_starforce_result_log = function(pval, prn_map, result) {
    this.idata.meta.sf_log_item = Object.assign({}, this.cache.sf_meta_data, {
        id: this.idata.meta.sf_meta_data.length + 1,
        prn_map: prn_map,
        prn: pval,
        result: result
    });
};

// complete the starforce log off with the details of the starforce attempt, including the star cost and any events that occurred during the process
item.prototype.complete_starforce_result_log = function(current_star, level) {
    if (this.idata.meta.sf_log_item.id != null) {
        /* get the starforce-related options related to safeguard */
        let is_safeguardable = !this.idata.superior && current_star >= GLOBAL.starforce.safeguard_stars.min && current_star < GLOBAL.starforce.safeguard_stars.max;
        let is_safeguard = user_settings.starforce.safeguard;
        let safeguard_multiplier = (is_safeguardable && is_safeguard && !this.idata.meta.chance_time) ? 2 : 1;
        
        /* get the cost information for the current star level */
        let cache_name_lvl_star = `_${level}${current_star}_${this.idata.superior}`;
        let sc_type = star_cost_type(this.idata.type);
        let this_star_cost_prev = this.check_cache(() => star_cost(level, current_star, this.idata.meta.starforce_type, this.idata.superior, sc_type), "sc", `${cache_name_lvl_star}_${this.idata.meta.starforce_type}_${sc_type}`);
        let this_star_cost_prev_effective = this_star_cost_prev * safeguard_multiplier;
        let cost_chart = this.log_starforce_cost(is_safeguardable && is_safeguard, this_star_cost_prev, this_star_cost_prev_effective, current_star);

        /* update the star cost info */
        let sf_log = this.idata.meta.sf_log_item;
        sf_log.star_cost_discount = cost_chart;
        sf_log.star_cost = this_star_cost_prev * safeguard_multiplier;
        sf_log.sk_coin_cost = this.idata.shadowknight ? shadowknight_coin_cost(current_star) : 0;

        /*
            If this is the first entry in the sf_meta_data, initialize it with the current values.
            Else if there are previous entries, calculate the new values based on the previous entry.   
        */
        if (this.idata.meta.sf_meta_data.length === 0) {
            sf_log.sf_cost = this_star_cost_prev * safeguard_multiplier;
            sf_log.sf_cost_discount = cost_chart;
            sf_log.sk_cost = sf_log.sk_coin_cost;
        } else {
            let prev_item = this.idata.meta.sf_meta_data[0];
            let prev_sf_cost_discount = { ...prev_item.sf_cost_discount };
            sf_log.sf_cost = prev_item.sf_cost + (this_star_cost_prev * safeguard_multiplier);
            sf_log.sk_cost = prev_item.sk_cost + sf_log.sk_coin_cost;

            for (let i in cost_chart) {
                prev_sf_cost_discount[i] += cost_chart[i];
            }
            sf_log.sf_cost_discount = prev_sf_cost_discount;
        }

        /* handle any events and relog the stars if the 2x was applied */
        sf_log.events = { ...event_options };
        sf_log.star = this.idata.meta.stars;

        /* Update the safeguard status in the log */
        this.idata.meta.sf_meta_data.unshift(sf_log);

        this.idata.meta.sf_log_item = {}; // reset the log item
    }
};

/*
    calculate the stats of the item from the various sources (flames, starforce, scrolls, etc)
    return the values, as well as the breakdown from each source
*/
item.prototype.get_final_stats = function() {
    //total stats from all sources: flames, stars, and scrolls
    let e_stats = Object.assign({}, stats);

    let base_stats = Object.assign({},this.idata.bstat);
    let flame_stats = Object.assign({},this.idata.boosts.flames);

    let sf_total_gain = equip_gain_total(this.idata.boosts.sf_data);
    let scr_total_gain = equip_gain_total(this.idata.boosts.scroll_data);
    let other_stats = $.extend(true, {}, this.idata.boosts.other_stats);

    let att_p = [];
    let def_p = [];

    for (let i in e_stats) {
        if (["primary", "star"].includes(i)) continue;

        if (!i.endsWith("_p")) {
            e_stats[i] += base_stats[i];
            //for items that don't have matt, if it has absolutely no base matt, then dont display 
            //and dont apply star force on top of it
            if (i === "matt") {
                if (this.idata.class !== "weapon" || (base_stats.matt + scr_total_gain.matt) > 0) {
                    e_stats[i] += sf_total_gain[i];
                    e_stats[i] += scr_total_gain[i];
                } else {
                    sf_total_gain[i] = 0;
                }
            } else {
                e_stats[i] += sf_total_gain[i];
                e_stats[i] += scr_total_gain[i];
            }
            e_stats[i] += flame_stats[i];
            e_stats[i] += other_stats[i];
        }

        //blue stats in the parenthesis
        let curr_i = i.replace("_p", "") + "_upgrade";
        if (e_stats[curr_i] == null || !e_stats[curr_i]) {
            e_stats[curr_i] = sf_total_gain[i] !== 0 || scr_total_gain[i] !== 0 || flame_stats[i] !== 0;
        }
    }

    for (let i = 0; i < this.idata.boosts.sf_data.length; ++i) {
        let _sf = this.idata.boosts.sf_data[i];

        //att = both
        if (this.idata.att_type === "att") {
            att_p.push(_sf.watt_p);
            att_p.push(_sf.matt_p);
        } else {
            att_p.push(_sf[this.idata.att_type + "_p"]);
        }
        def_p.push(_sf.def_p);
    }

    //job stats
    if (sf_total_gain.job_stats > 0) {
        if (this.idata.pstat.includes("str")) {
            e_stats.str += sf_total_gain.job_stats;
            sf_total_gain.str += sf_total_gain.job_stats;
            e_stats.str_upgrade = true;
        }
        if (this.idata.pstat.includes("dex")) {
            e_stats.dex += sf_total_gain.job_stats;
            sf_total_gain.dex += sf_total_gain.job_stats;
            e_stats.dex_upgrade = true;
        }
        if (this.idata.pstat.includes("int")) {
            e_stats.int += sf_total_gain.job_stats;
            sf_total_gain.int += sf_total_gain.job_stats;
            e_stats.int_upgrade = true;
        }
        if (this.idata.pstat.includes("luk")) {
            e_stats.luk += sf_total_gain.job_stats;
            sf_total_gain.luk += sf_total_gain.job_stats;
            e_stats.luk_upgrade = true;
        }
    }

    //visible stats
    if (sf_total_gain.visible_stats > 0) {
        if (base_stats.str + scr_total_gain.str > 0) {
            e_stats.str += sf_total_gain.visible_stats;
            sf_total_gain.str += sf_total_gain.visible_stats;
            e_stats.str_upgrade = true;
        }
        if (base_stats.dex + scr_total_gain.dex > 0) {
            e_stats.dex += sf_total_gain.visible_stats;
            sf_total_gain.dex += sf_total_gain.visible_stats;
            e_stats.dex_upgrade = true;
        }
        if (base_stats.int + scr_total_gain.int > 0) {
            e_stats.int += sf_total_gain.visible_stats;
            sf_total_gain.int += sf_total_gain.visible_stats;
            e_stats.int_upgrade = true;
        }
        if (base_stats.luk + scr_total_gain.luk > 0) {
            e_stats.luk += sf_total_gain.visible_stats;
            sf_total_gain.luk += sf_total_gain.visible_stats;
            e_stats.luk_upgrade = true;
        }
    }

    if (base_stats.def !== 0 && sf_total_gain.def_p > 0) {
        e_stats.def_upgrade = true;
    }

    let b_watt = base_stats.watt + scr_total_gain.watt;

    let percent_stats = {
        watt: 0,
        matt: 0,
        def: 0
    };

    if (att_p.length > 0) {
        percent_stats = {
            watt: this.starforce_att_percent(b_watt, b_watt, att_p),
            matt: this.starforce_att_percent(base_stats.matt + scr_total_gain.matt, b_watt, att_p),
        };

        e_stats.watt += percent_stats.watt;
        e_stats.matt += percent_stats.matt;
    }

    //neb compensation assumes 25% boss dmg neb was applied
    //does it use weapon att for magic-att item?
    if (this.idata.meta.nebulite_compensation && this.idata.class === "weapon") {
        let neb_stats = 1 + Math.floor(b_watt * 0.04);

        other_stats[this.idata.att_type] += neb_stats;
        e_stats[this.idata.att_type] += neb_stats;
        e_stats[this.idata.att_type + "_upgrade"] = true; //display the neb bonus in blue
    }

    if (def_p.length > 0) {
        percent_stats.def = this.starforce_att_percent(base_stats.def + scr_total_gain.def, 0, def_p);
        e_stats.def += percent_stats.def;
    }

    /* keep track of the total calculated stats. used for chaos scrolls */ 
    for (let e_stat in e_stats) {
        this.idata.meta.final_stats[e_stat] = e_stats[e_stat];
    }
    
    return {
        final: e_stats,
        base: base_stats, /* base item stats */
        flame: flame_stats, /* stats from flames */
        other: other_stats, /* states from any other source */
        percent: percent_stats, /* percent stats from starforce */
        starforce: sf_total_gain, /* flat stats from starforce */
        scroll: scr_total_gain /* scroll stats */
    };
}

//update item stats on tooltip screen
//pass parts to update specific parts of the tooltip
item.prototype.redraw_update_list = [
    "name",
    "stats",
    "flames",
    "job_req",
    "stars",
    "level",
    "cube",
    "exceptional",
    "flavor_skill"
];

item.prototype.redraw_item_tooltip = function(
    update = []
) {
    if (this.virtual) return;

    /* if nothing is passed, then assume update everything */
    if (update.length === 0) {
        update = this.redraw_update_list;
    }

    /* special types */
    if (update.includes("flames")) {
        update.push(...["stats", "level"]);
    } else if (update.includes("starforce")) {
        update.push(...["stats", "stars"]);
    }

    //dom cache
    let i_con = this.check_cache(() => {
        return $(".item-main-border");
    }, "dom", "i_con");   

    if (update.includes("name")) {
        this.update_item_tooltip_name(i_con);
    }
    if (update.includes("stats")) {
        this.update_item_tooltip_stats(i_con);
    }
    if (update.includes("job_req")) {
        this.update_item_tooltip_job_req(i_con);
    }
    if (update.includes("stars")) {
        this.update_item_tooltip_stars(i_con);
    }
    if (update.includes("level")) {
        this.update_item_tooltip_level(i_con);
    }
    if (update.includes("cube")) {
        this.update_item_tooltip_cube(i_con);
    }
    if (update.includes("exceptional")) {
        this.update_item_tooltip_exceptional(i_con);
    }
    if (update.includes("flavor_skill")) {
        this.update_item_tooltip_flavor_skill(i_con);
    }

    return true;
};

/* update item name */
item.prototype.update_item_tooltip_name = function(i_con) {
    let iname = this.check_cache(()=>{
        return i_con.find(".item-current-name");
    }, "dom", "iname");   

    let item_name = this.idata.name;
    let scroll_count = this.idata.boosts.scroll_data.length;

    iname.html(`
        ${item_name} 
        ${
            scroll_count > 0 ? `(+${scroll_count})` : ""
        }
    `);
}

/* update stat portion */
item.prototype.update_item_tooltip_stats = function(i_con) {
    let istats = this.check_cache(()=>{
        return i_con.find(".item-stats");
    }, "dom", "istats");   

    let item_stats = this.get_final_stats();

    let html = `
        Type: ${this.idata.type.capitalize()} <br>
        ${this.idata.class === "weapon" && this.idata.sub_class !== "secondary" ? `
            Attack Speed: ${item_meta.enum.attack_speed[this.idata.weapon_data.speed]} (Stage ${this.idata.weapon_data.speed}) <br>
        ` : ''}
        ${
            GLOBAL.item_stat_order.reduce((b, a)=>{
                let a_type = a.type || "";
                let a_symbol = a.symbol || "";

                let bval = item_stats.base[a.value];
                let fval = item_stats.final[a.value];
                let flval = item_stats.flame[a.value];
                let oval = item_stats.other[a.value];

                /* if a percentage value, convert the decimal to percentage */
                if (a_type === "%") {
                    bval = Math.round(bval * 100);
                    fval = Math.round(fval * 100);
                    flval = Math.round(flval * 100);
                    oval = Math.round(oval * 100);
                }

                /* get gain from all sources */
                let tot_gain = item_stats.starforce[a.value] + item_stats.scroll[a.value] + oval;

                /* get gain from sf only - to show as separate value */
                let sf_gain = item_stats.starforce[a.value];
                /* get gain from scrolls and other sources - to show as separate value */
                let other_gain = item_stats.scroll[a.value] + oval;

                /* if percentage-based value, then get the values as separate to show separately */
                if (["watt", "matt", "def"].includes(a.value)) {
                    tot_gain += item_stats.percent[a.value];
                    sf_gain += item_stats.percent[a.value];
                }

                //for matt, if all sources have no matt, then don't display matt on the tooltip
                if (a.value === "matt") {
                    if (this.idata.class === "weapon" && item_stats.percent.matt + item_stats.flame.matt + item_stats.base.matt + oval === 0) {
                        return b;
                    } 
                }

                b += `
                    ${a.value === "reqlvl" ? `
                        ${
                            fval !== 0 ?
                            `${a.name} : ${fval}${a_symbol} <br>`
                            :
                            ``
                        }
                    ` : `
                        ${ fval > 0 ?
                            `<span class="${item_stats.final[a.value + "_upgrade"] ? "item-color-stat-upgrade" : ""}">
                                ${a.name}: ${a_type !== "raw" ? "+" : ""}${fval}${a_symbol}
                                ${item_stats.final[a.value + "_upgrade"] ?
                                    `<span class="item-color-base">(${bval}${a_symbol}</span>
                                        ${
                                            flval > 0 ?
                                            `<span class="item-color-flame">+${flval}${a_symbol}</span></span>` : '' 
                                        }
                                        ${
                                            tot_gain != 0 && !system.itt_kms_new ?
                                            `<span class="${tot_gain < 0 ? 'item-color-negative' : 'item-color-stat-upgrade'}">${tot_gain < 0 ? '' : '+'}${tot_gain}${a_symbol}</span>`
                                            :
                                            ''
                                        }
                                        ${
                                            other_gain != 0 && system.itt_kms_new ? `
                                            <span class="${other_gain < 0 ? 'item-color-negative' : 'item-color-scrolls'}">${other_gain < 0 ? '' : '+'}${other_gain}</span>
                                            ` : ""
                                        }
                                        ${
                                            sf_gain != 0 && system.itt_kms_new ? `
                                            <span class="${sf_gain < 0 ? 'item-color-negative' : 'item-color-starforce'}">${sf_gain < 0 ? '' : '+'}${sf_gain}</span>
                                            ` : ""
                                        }
                                        [[remove]]<span class="item-color-base">)</span>` 
                                    : ''
                                }
                            </span> <br>
                            ` : ''
                        }
                    `}
                `;

                return b;
            }, "").replace(/\s\s+\[\[remove\]\]/gi, "")
        }
        ${this.idata.scrollable ? `
        Remaining Enhancements: ${this.idata.hammers_added + this.idata.upgrades - this.idata.boosts.scroll_data.length} <br>
        <span class="item-color-recovery">(Available Recoveries: 0)</span> <br>
        Hammers Applied: ${this.idata.hammers_added} ${this.idata.hammers_added == 2 ? "(MAX)" : ""}
        `: ""}
    `;

    istats.html(html);
}

/* update cube portion of tooltip */
item.prototype.update_item_tooltip_cube = function(i_con) {
    let iflag = this.check_cache(()=>{
        return i_con.find(".item-container-flag");
    }, "dom", "iflag");    
    let icube = this.check_cache(()=>{
        return i_con.find(".item-cube");
    }, "dom", "icube");   
    let isub = this.check_cache(()=>{
        return i_con.find(".item-sub-description");
    }, "dom", "isub");

    iflag.attr("class", "item-container-flag"); /* reset flag status to nothing */

    let this_pot = this.idata.meta.cube_potential;
    let this_b_pot = this.idata.meta.cube_potential_bonus;
    let cube_html = "";

    isub.html('');
    
    //main and bonus potential stuff
    if (this_pot !== "") {
        isub.html(`(${this_pot.capitalize()} Item)`);
        
        let main_pot = this.idata.boosts.cubes.main;
        let main_pot_keys = Object.keys(this.idata.boosts.cubes.main);

        /* replace the border flag of the item based on the potential of the main pot */
        if (this_pot !== "") {
            iflag.addClass(`item-flag-${this_pot}`);
        }

        //has main pot
        if (main_pot_keys.length > 0) {
            cube_html += `
            <div class="item-dash-border" style="margin-bottom:0px"></div>
            <div class="item-potential item-main-potential">
                <div class="tooltip-${this_pot}"></div> <div class="tooltip-label tooltip-label-${this_pot}">Potential</div>
                ${
                    main_pot_keys.map(function(a) {
                        let b = main_pot[a];
                        return `
                            <span class="potential-line potential-line-main">
                                ${b.display}
                            </span>
                        `;
                    }).join("")
                }
            </div>
            `;
        }
    }

    if (this_b_pot !== "") {
        let b_pot = this.idata.boosts.cubes.bonus;
        let b_pot_keys = Object.keys(this.idata.boosts.cubes.bonus);

        //has bpot
        if (b_pot_keys.length > 0) {
            cube_html += `
            <div class="item-dash-border" style="margin: 1px 0 5px 0;"></div>
            <div class="item-potential item-bonus-potential">
                <div class="tooltip-${this_b_pot}"></div> <div class="tooltip-label tooltip-label-${this_b_pot}">Bonus Potential</div>
                ${
                    b_pot_keys.map(function(a) {
                        let b = b_pot[a];
                        return `
                            <span class="potential-line potential-line-main">
                                + ${b.display}
                            </span>
                        `;
                    }).join("")
                }
            </div>
            `;
        }
    }

    icube.html(cube_html);
}

/* update exceptional part */
item.prototype.update_item_tooltip_exceptional = function(i_con) {
    let iexceptional = this.check_cache(()=>{
        return i_con.find(".item-exceptional");
    }, "dom", "iexceptional");   

    /* exceptional part */
    if (this.idata.meta.exceptional_applied){
        const exceptional_order = [{
            id: "all_stats",
            name: "All Stats"
        }, {
            id: "hp_mp",
            name: "MaxHP / MaxMP"
        }, {
            id: "all_att",
            name: "Attack Power & Magic ATT"
        }];

        const _this = this;

        iexceptional.html(`
            <div class="item-dash-border" style="margin-bottom:0px"></div>
            <div class="item-potential item-main-potential">
                <span style="margin-top:5px;margin-botton:5px;">
                    <div class="tooltip-exceptional"></div> <div class="tooltip-label tooltip-label-exceptional">Exceptional</div>
                </span>
                ${
                    exceptional_order.reduce((a,b)=>{
                        const i_exc_stat = _this.idata.exceptional.stat[b.id];

                        if (i_exc_stat == undefined) return a;

                        a += `
                            <span class="potential-line potential-line-main">
                                ${b.name} : <span style="margin-left:6px">+${i_exc_stat}</span>
                            </span>
                        `;

                        return a;
                    }, '')
                }
                <span class="potential-line potential-line-main">
                    Apply Exceptional Enhancement 1 times
                </span>                
                <span class="potential-line potential-line-main">
                    <span style="margin:5px"></span>(Can be enhanced up to 1 times.)
                </span>
                 
            </div>
        `);
    } else {
        iexceptional.html("");
    }
}

/* update flavor and skill */
item.prototype.update_item_tooltip_flavor_skill = function(i_con) {
    let imisc = this.check_cache(()=>{
        return i_con.find(".item-misc");
    }, "dom", "imisc");   

    if (this.idata.flavor !== "" || this.idata.skill !== ""){
        imisc.html(`
            <div class="item-dash-border" style="margin-bottom:0px"></div>
            <div class="item-extra">
                <div class="item-skill">
                    <span class="item-color-skill" style="margin:right:10px">
                        ${this.idata.skill}
                    </span>
                    <span class="item-color-flavor">
                        ${this.idata.flavor}
                    </span>
                </div>
            </div>
        `);
    } else {
        imisc.html("");
    }
}

/* update stars */
item.prototype.update_item_tooltip_stars = function(i_con) {
    let istar = this.check_cache(()=>{
        return i_con.find(".item-star");
    }, "dom", "istar");   
    let istar_con = this.check_cache(()=>{
        return i_con.find(".item-star-container");
    }, "dom", "istar_con");

    istar.addClass("disabled");
    istar.slice(0, this.idata.meta.stars).removeClass("disabled");

    istar.removeClass("hidden");
    /* don't show stars at top of tooltip if not starforceable */
    if (!this.idata.starforce) {
        istar_con.addClass("hidden");
    } else {
        istar_con.removeClass("hidden");
        //remove stars based on max stars allowed
        for (let i = 25; i > this.idata.meta.max_stars; --i) {
            istar.filter(".item-star-" + i).addClass("hidden");
        } 
    }
}

/* update level include flame reduction level */
item.prototype.update_item_tooltip_level = function(i_con) {
    let item_stats = {final: this.idata.meta.final_stats};

    //required level for item
    //if flame has reduced level requirements, change the required level to display
    let effective_level = this.idata.level + item_stats.final.reqlvl;

    if (effective_level < 0) {
        effective_level = 0;
    } else if (effective_level > 1000) {
        effective_level = 999;
    }

    effective_level += "";

    if (effective_level.length === 2) {
        effective_level = "0" + effective_level;
    }

    let i_levelreq = this.check_cache(()=>{
        return i_con.find(".item-lev-num");
    }, "dom", "i_levelreq");   

    i_levelreq.removeClass((i,c) =>{
        return (c.match(/(^|\s)req-num-\S+/g) || []).join(' ');
    });

    let lvl_split = effective_level.split("");

    for (let i = 0; i < 3; ++i) {
        i_levelreq.eq(i).addClass("req-num-" + lvl_split[i]);
    }


    //shows the (200-25) portion in the item tooltip
    if (item_stats.final.reqlvl !== 0) {
        let i_level = this.idata.level + "";
        let this_e_reqlvl = item_stats.final.reqlvl;

        if (Math.abs(this_e_reqlvl) > 999) {
            this_e_reqlvl = 999;
        }

        let r_level = (this_e_reqlvl + "").replace("-","");

        let olvl_split = i_level.split("");
        let rlvl_split = r_level.split("");

        i_levelreq.eq(3).addClass("req-num-op white");

        let idx = 0;
        for (let i = 4; i < 7; ++i) {
            i_levelreq.eq(i).addClass("white req-num-" + olvl_split[idx]);
            idx += 1;
        }

        i_levelreq.eq(7).addClass("req-num-minus");

        idx = 0;
        for (let i = 8; i < 11; ++i) {
            if (r_level.length === 2) {
                if (i === 10) {
                    i_levelreq.eq(i).addClass("req-num-0 hidden");
                    continue;
                }
            } else {
                if (i === 10) {
                    i_levelreq.eq(i).removeClass("hidden");
                }
            }

            i_levelreq.eq(i).addClass("req-num-" + rlvl_split[idx]);
            idx += 1;
        }

        i_levelreq.eq(11).addClass("req-num-cp white");
    }
}

/* update job and stat requirements and pic */
item.prototype.update_item_tooltip_job_req = function(i_con) {
    let ipic = this.check_cache(()=>{
        return i_con.find(".item-container-item");
    }, "dom", "ipic");   

    let item_attr = this.idata.req;
    
    let i_levelreq_con = this.check_cache(()=>{
        return i_con.find(".item-requirements-str, .item-requirements-dex, .item-requirements-int, .item-requirements-luk");
    }, "dom", "i_levelreq_con");  
    
    i_levelreq_con.removeClass("required");
    
    //required stats for item
    for (let i in item_attr) {
        let ia = item_attr[i];

        let is_required = false;
        if (ia !== 0) {
            is_required = true;
        } else {
            ia = "000";
        };

        let i_attr = this.check_cache(()=>{
            return i_con.find(".item-requirements.item-requirements-" + i);
        }, "dom", "i_attr_" + i);  

        if (is_required) {
            i_attr.addClass("required");
        }

        let i_attr_num = this.check_cache(()=>{
            return i_con.find(".item-" + i + "-num");
        }, "dom", "i_attr_num_" + i); 

        let attr_split = (ia + "").split(""); 

        i_attr_num.removeClass((i,c) =>{
            return (c.match(/(^|\s)req-num-\S+/g) || []).join(' ');
        });

        for (let j = 0; j < attr_split.length; ++j) {
            i_attr_num.eq(j).addClass("req-num-" + attr_split[j]);
        }
    }

    let for_job = this.idata.job;
    let i_job = this.check_cache(()=>{
        return i_con.find(".item-job-items");
    }, "dom", "i_job");   

    i_job.addClass("hide");

    for (let i = 0; i < for_job.length; ++i) {
        i_job.filter(".item-jobs-" + for_job[i]).removeClass("hide");
    }

    //replace pic
    if (!ipic.hasClass(this.idata.img)) {
        ipic.attr("class", "item-container-item sf-item");
        ipic.addClass(this.idata.img);
    }
}

//cache function
item.prototype.check_cache = function(data_call = ()=>{return null;}, cache_name, identifier) {
    let item = {};
    let c_item = this.cache[cache_name][identifier];
    if (typeof c_item == 'undefined') {
        item = data_call();
        if (["string","number"].includes(typeof item) || item instanceof $) {
            this.cache[cache_name][identifier] = item;
        } else {
            this.cache[cache_name][identifier] = Object.assign({}, item);
        }
    } else {
       
        if (["string","number"].includes(typeof c_item) || c_item instanceof $) {
            item = c_item;
        } else {
            item = Object.assign({}, c_item);
        }
    }

    return item;
};

//redraw item tooltip and starforce screen
item.prototype.redraw = function(update = []) {
    if (this.virtual) return;
    this.redraw_sf();
    this.redraw_item_tooltip(update);
};

//log the cost, including discounts
item.prototype.log_starforce_cost = function(sg, base_cost, cost, level) {
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

//update starforce screen
item.prototype.redraw_sf = function() {
    if (this.virtual) return;
    //dom cache
    let mcon = this.check_cache(()=>{
        return $(".sf-main-container");
    }, "dom", "mcon");
    let sfcon = this.check_cache(()=>{
        return $("#sfcon");
    }, "dom", "sfcon");        
    let sficon = this.check_cache(()=>{
        return $(".sfi-main-border");
    }, "dom", "sficon");    
    let dcon = this.check_cache(()=>{
        return mcon.find(".sf-starforce-data-description:first");
    }, "dom", "dcon");        
    let lvl_flag = this.check_cache(()=>{
        return mcon.find(".sf-star-item");
    }, "dom", "lvl_flag");        
    let safeguard = this.check_cache(()=>{
        return mcon.find(".sf-safeguard");
    }, "dom", "sf_safeguard");        
    let current_meso = this.check_cache(()=>{
        return sfcon.find(".sf-data-meso");
    }, "dom", "current_meso");
    let current_shadowknight = this.check_cache(()=>{
        return sfcon.find(".sf-data-shadowknight");
    }, "dom", "current_shadowknight");
    let sf_text = this.check_cache(()=>{
        return sfcon.find(".sf-text");
    }, "dom", "sf_text");
    let sf_img = this.check_cache(()=>{
        return $.merge(mcon.find(".sf-item"), sficon.find(".sf-item"));
    }, "dom", "sf_img");
    let sf_header_text = this.check_cache(()=>{
        return $(".sf-header-text");
    }, "dom", "sf_header_text");
    let sf_chance_time_text = this.check_cache(()=>{
        return $(".sf-star-chance");
    }, "dom", "sf_chance_time_text");

    //starcatch ui is reset using an initialized clone
    sf_img = $.merge(sf_img, $(".sfsc-main-border .sf-item"));
    let sf_description = this.check_cache(()=>{
        return $(".sfp-data-description");
    }, "dom", "sf_description");

    //replace pic
    sf_img.removeClass((i,c)=>{
        let carr = c.split(" ");

        let newc = [];
        for (let j = 0; j < carr.length; ++j) {
            let _c = carr[j];
            if (_c.startsWith("item-")) {
                newc.push(_c);
                break;
            }
        }

        return newc.join(" ");
    });

    sf_img.addClass(this.idata.img);


    lvl_flag.removeClass("sf-star10 sf-star15 sf-star20");

    let level = this.idata.level;

    let this_star = this.idata.meta.stars;

    if (this_star === this.idata.meta.max_stars) {
        this_star = 1;
    }

    let next_star = this_star + 1;
    let cache_name_lvl_star = "_" + level + this_star + "_" + this.idata.superior;
    
    //total stats from all sources: flames, scrolls, and stars
    let nstats = this.check_cache(()=>{
        return equip_gain(this.idata);
    }, "eg", cache_name_lvl_star);

    let srate = this.check_cache(()=>{
        return star_success_rate(this_star, this.idata.superior);
    }, "sr", cache_name_lvl_star);

    let sc_type = star_cost_type(this.idata.type);

    let this_star_cost = this.check_cache(()=>{
        return star_cost(level, this_star, this.idata.meta.starforce_type, this.idata.superior, sc_type);
    }, "sc", cache_name_lvl_star + "_" + this.idata.meta.starforce_type + "_" + sc_type);

    if (nstats.watt_p !== 0 || nstats.matt_p !== 0 || nstats !== 0) {
        let flame_gain = this.idata.boosts.flames;
        let total_gain = equip_gain_total(this.idata.sf_data);
        total_watt = this.idata.bstat.watt + total_gain.watt + flame_gain.watt;
        total_matt = this.idata.bstat.matt + total_gain.matt + flame_gain.matt;
        total_def = this.idata.bstat.def + total_gain.def + flame_gain.def;
    
        nstats.watt += Math.ceil(total_watt * nstats.watt_p);
        nstats.matt += Math.ceil(total_matt * nstats.matt_p);
        nstats.def += Math.ceil(total_def * nstats.def_p);
    }

    let use_job_stats = this_star < 15;

    let _str = use_job_stats ? (this.idata.pstat.includes("str") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _dex = use_job_stats ? (this.idata.pstat.includes("dex") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _int = use_job_stats ? (this.idata.pstat.includes("int") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;
    let _luk = use_job_stats ? (this.idata.pstat.includes("luk") ? nstats.job_stats || 0 : 0) : nstats.visible_stats || 0;

    if ("str" in nstats) {
        _str += nstats.str;
    }
    if ("dex" in nstats) {
        _dex += nstats.dex;
    }
    if ("int" in nstats) {
        _int += nstats.int;
    }
    if ("luk" in nstats) {
        _luk += nstats.luk;
    }

    let is_droppable = this.is_droppable(this_star);

    let is_event_droppable = false;
    
    let is_2x = false;

    if (!this.idata.superior && event_options.pre10x2 && this_star <= 10) {
        is_2x = true;
    }

    let html = `
        <span class="sf-item-desc-current-stars">
            <span style="display: inline-block;width: 48px;">${this_star} Star</span>
            <span class="sf-arrow-description sf-item-arrow"></span> 
            <span style="margin-left:20px;" ${is_2x ? `class="sf-crossed-out` : ``}">${next_star} Star</span>
            ${is_2x ? `
            <span style="margin-left:5px;">${next_star + 1} Star</span>` : ``}
            <br>
            ${this.idata.meta.chance_time ? `
                Success Chance: 100% <br>
            ` 
            : 
            `
                ${!this.idata.superior && event_options._51015 && [5,10,15].includes(this_star) ?
                `
                Success Chance: <span class="sf-crossed-out">
                    ${(srate.success * 100).toFixed(1)}%
                </span> 100% <br>
                `
                :

                `
                    Success Chance: ${(srate.success * 100).toFixed(1)}% <br>
                    <span style="transform: scale(0.95,1);display: inline-block;margin-left: -3px;">Failure (${is_droppable ? "Drop" : "Keep"}) Chance:</span> 
                    <span style="display:inline-block;margin-left: -5px;">
                        ${((srate.fail + srate.sc_success + (is_event_droppable ? srate.destroy : 0)) * 100).toFixed(1)}%
                    </span> <br>
                    ${
                        !is_event_droppable && srate.destroy !== 0 ?
                        `
                            Chance of item destruction: 
                            ${
                                srate.destroy > 0.1 ? "<br>" + (srate.destroy * 100).toFixed(1) 
                                : 
                                ((srate.destroy * 100).toFixed(1) + '').replace(".", ".<br>")
                            }%
                        ` : ''
                    }
                `
                }
            `}
            <span style="display:block;padding-top:38px;"></span>
            ${ _str !== 0 ?
                `<span class="sf-item-desc-attr">STR</span>: +${_str}<br>` : ''
            }
            ${ _dex !== 0 ?
                `<span class="sf-item-desc-attr">DEX</span>: +${_dex}<br>` : ''
            }
            ${ _int !== 0 ?
                `<span class="sf-item-desc-attr">INT</span>: +${_int}<br>` : ''
            }
            ${ _luk !== 0 ?
                `<span class="sf-item-desc-attr">LUK</span>: +${_luk}<br>` : ''
            }
            ${nstats.hp !== 0 ?
                `MaxHP : +${nstats.hp} <br>` : ''
            }
            ${nstats.mp !== 0 ?
                `MaxMP : +${nstats.mp} <br>` : ''
            }
            ${nstats.speed !== 0 ?
                `Speed: +${nstats.speed} <br>` : ''
            }
            ${nstats.jump !== 0 ?
                `Jump: +${nstats.jump} <br>` : ''
            }
            ${nstats.watt !== 0 ?
                `Attack Power: +${nstats.watt} <br>` : ''
            }
            ${nstats.matt !== 0 ?
                `Magic Attack: +${nstats.matt} <br>` : ''
            }
            ${nstats.def !== 0 ?
                `Defense : +${nstats.def} <br>` : ''
            }
            &nbsp;
        </span>
    `;

    dcon.html(html);

    //reset chance time
    if (!sf_chance_time_text.hasClass("hidden") && this.idata.meta.chance_count < 2) {
        sf_header_text.removeClass("hidden");
        sf_chance_time_text.addClass("hidden");
        sfa.stop("EnchantChanceTime");
    }

    if (next_star <= 10) {
        //nothing
    } else if (next_star <= 15) {
        lvl_flag.addClass("sf-star10");
    } else if (next_star <= 20) {
        lvl_flag.addClass("sf-star15");
    } else if (next_star <= 26) {
        lvl_flag.addClass("sf-star20");
    }

    let safeguard_multiplier = 1;
    let is_safeguardable = !this.idata.superior && this_star >= GLOBAL.starforce.safeguard_stars.min && this_star < GLOBAL.starforce.safeguard_stars.max;
    if (is_safeguardable) {
        safeguard.removeClass("disabled");
        safeguard.trigger("click", true);
    } else {
        safeguard.addClass("disabled");
        safeguard.trigger("click", true);
    }

    let is_safeguard = !safeguard.hasClass("disabled") && safeguard.hasClass("checked");

    //text description in starforce screen
    //this part is wonky. fix later
    sf_text.attr("class", "sf-text");
    sf_description.addClass("hidden");

    let is_destroyable = srate.destroy > 0;
    
    if (is_droppable) {
        if (is_destroyable) {
            sf_text.addClass("sf-text-bothways");
        } else {
            sf_text.addClass("sf-text-downgradeable");
        }
    } else if (is_destroyable) {
        sf_text.addClass("sf-text-destroyable");
    } else {
        sf_text.addClass("sf-text-start");
    }

    if (is_safeguard && is_destroyable) {
        sf_text.attr("class", "sf-text");
        if (is_droppable) {
            sf_text.addClass("sf-text-downgradeable");
            sf_description.filter(".sfp-data-downgradeable").removeClass("hidden");
        } else {
            sf_text.addClass("sf-text-start");
        }
    } else if (is_destroyable && is_droppable) {
        sf_description.filter(".sfp-data-bothways").removeClass("hidden");   
    } else if (is_destroyable) {
        sf_description.filter(".sfp-data-destroyable").removeClass("hidden");   
    } else if (is_droppable) {
        sf_description.filter(".sfp-data-downgradeable").removeClass("hidden");
    }

    if (is_safeguardable && is_safeguard && !this.idata.meta.chance_time) {
        this.idata.meta.sf_log_item.is_safeguard = true;
        safeguard_multiplier = 2;
    }

    //displayed starforce cost
    for (let i = 0; i < current_meso.length; ++i) {
        let cm = current_meso.eq(i);
        let this_cost = this_star_cost * safeguard_multiplier;
        if (cm.hasClass("number-locale")) {
            cm.html(this_cost.toNumber());
        } else {
            cm.html(this_cost);
        }
    }

    //display shadowknight cost if relevant
    if (this.idata.shadowknight) {
        let sk = shadowknight_coin_cost(this_star);
        current_shadowknight.html(sk);
    }
   
    this.idata.meta.sf_log_item = {};
    return true;
};

item.prototype.set_exceptional_part = function(enable_exceptional = false) {
    this.idata.meta.exceptional_applied = enable_exceptional;
};