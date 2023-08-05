const item_meta = {
    enum: {
        attack_speed: {
            "1": "Very Slow",
            "2": "Slow",
            "3": "Slow",
            "4": "Average",
            "5": "Fast",
            "6": "Fast",
            "7": "Very Fast"
        }
    },
    class: {
        weapon: {
            "ancient bow": {
                class: "",
                speed: 4
            },
            "arm cannon": {
                class: "Blaster",
                speed: 5
            },
            "beast tamer scepter": {
                class: "Beast Tamer",
                speed: 4
            },
            bladecaster: {
                class: "Adele",
                speed: 6
            },
            bow: {
                class: "",
                speed: 4
            },
            cane: {
                class: "",
                speed: 5
            },
            "hand cannon": {
                class: "Cannoneer",
                speed: 2
            },
            chakram: {
                class: "Khali",
                speed: 6
            },
            claw: {
                class: "",
                speed: 6
            },
            crossbow: {
                class: "",
                speed: 4
            },
            dagger: {
                class: "",
                speed: 6
            },
            desperado: {
                class: "Demon Avenger",
                speed: 4
            },
            "dual bowguns": {
                class: "",
                speed: 4
            },
            fan: {
                class: "Kanna",
                speed: 2
            },
            gauntlet: {
                class: "Illium",
                speed: 5
            },
            gun: {
                class: "",
                speed: 5
            },
            "heavy sword": {
                class: "Zero",
                speed: 2
            },
            katana: {
                class: "Hayato",
                speed: 5
            },
            katara: {
                class: "Dual Blade",
                speed: 7
            },
            knuckle: {
                class: "",
                speed: 5
            },
            "long sword": {
                class: "Zero",
                speed: 4
            },
            "one-handed axe": {
                class: "",
                speed: 5
            },
            "one-handed blunt weapon": {
                class: "",
                speed: 5
            },
            "one-handed sword": {
                class: "",
                speed: 5
            },
            polearm: {
                class: "",
                speed: 5
            },
            "psy-limiter": {
                class: "Kinesis",
                speed: 4
            },
            "ritual fan": {
                class: "Hoyoung",
                speed: 6
            },
            "shining rod": {
                class: "Luminous",
                speed: 4
            },
            scepter: {
                class: "Beast Tamer",
                speed: 6
            },
            "soul shooter": {
                class: "Angelic Buster",
                speed: 5
            },
            spear: {
                class: "",
                speed: 4
            },
            staff: {
                class: "",
                speed: 2
            },
            "two-handed axe": {
                class: "",
                speed: 4
            },
            "two-handed blunt weapon": {
                class: "",
                speed: 4
            },
            "two-handed sword": {
                class: "",
                speed: 4
            },
            "wand": {
                class: "",
                speed: 4
            },
            "whip blade": {
                class: "Xenon",
                speed: 5
            },
            "whispershot": {
                class: "Kain",
                speed: 6
            }
        }
    }
}

//metadata that is tacked onto every item in items_store
/* TODO: only tack on when item is created. no need to put this object on EVERY object */
let items_other_data = {
    hidden: false, /* don't show item */
    stars: -1, //some items are hardcapped at a certain max star despite their item tier
    sub_class: "", //differentiate between armor classes for scrolling purposes
    max_hammers: 2, //number of hammers appliable,
    superior: false, //tyrant-related stuff
    starforce: true, //whether the item can be starforced or not
    enhanceable: true, //whether the item can be cubed
    scrollable: true, //whether the item can be scrolled
    flame_type: 2, //0 - not flammable, 1 - non-boss flames, 2 - boss flames
    flame_always_max_lines: false, /* whether using flames guarantees 4 lines. automatically set as true for flame_type = 2, but can be overriden */
    skill: "", //orange text at the bottom denoting a skill
    flavor: "", //flavor text in white at the bottom
    shadowknight: false, //use shadowknight coins
    meta: {
            final_stats: {}, /* keep track of the final calculated stats from the drawn tooltip. mostly used for chaos scrolls */
            fsstat: "", /* flame score MAIN stat. defaults to mstat parameter, but can be overridden */
            fsstat2: "", /* flame score SECONDARY stat. defaults to pstat parameter, but can be overriden */
            img_name: "", /* img asset */
            cube_potential: "", //potential type: rare, epic, unique, legendary
            cube_potential_bonus: "", //bonus pot
            starforce_type: "GMS", //GMS or KMS. costs are different
            starforce_gains_att: true, /* 15+ stars gains att for starforce (badge-related mostly) */
            nebulite_compensation: false, //if the weapon had a 25% boss nebulite on it before and is compensated with 4% more base damage. bonuses from other nebulite types are not supported.
            stars: 0, //current star of the item
            max_stars: 0, //depending on the item level. tells the starforce window to stop allowing starforcing
            chance_time: false, //whether the item will 100% upgrade in starforce
            chance_count: 0, //2 will trigger chance time and reset the count
            starcatch: {
                speed: 1,
                count: 0 //total success starforce
            },
            sf_log_item: {}, //current data to be worked on for star force stats. it will be pushed to the sf_meta_data array
            sf_meta_data: [], //starforce cost and other related data
            cube_log_item: {}, //current data to be worked on for cube stats. it will be pushed to the cube_meta_data
            cube_meta_data: [], //cube data
            cubes_used: {
                red: 0,
                black: 0,
                bonus: 0,
                master: 0,
                meister: 0,
                occult: 0
            }, //number of cubes used. keep track of type
            cubes_total: 0,
            flames_meta_data: [], //flames tier log
            flames_total: {
                "1": 0,
                "2": 0
            } //count flames 1 - powerful 2 -rebirth
        },
        boosts: {
            sf_data: [], //starforce data
            scroll_data: [],
            other_stats: Object.assign({}, stats), //for random stats like +1 from 4 or more spell traces
            flames: Object.assign({}, stats),
            cubes: {
                main: {},
                bonus: {}
            }
        }
};

$(function() { 
    //merge base item data with meta item data
    let style_items = "";
    //item that share a common image
    let shared_img = [];
    for (let i in items_store) {
        for (let j in items_store[i]) {
            let istore_override = {};
            let istore = items_store[i][j];
            
            //if the item uses an override stat, append the stat from a different specified item's stat.
            //used when an item type shares base stats but are for different jobs or whatever
            if (istore.override_stat != null) {
                let os_s = istore.override_stat.split("|");
                istore_override = items_store[os_s[0]][os_s[1]];
            }
            
            let iod = $.extend(true, {}, items_other_data); /* copy of the default data */

            iod.meta.max_stars = iod.stars !== -1 ? iod.stars : star_max(istore.level, istore.superior);

            /* set the always_max flag for boss flames for default. can be overriden by actual item */
            if ("flame_always_max_lines" in istore) {
                iod.meta.flame_always_max_lines = istore.flame_always_max_lines;
            } else {
                iod.meta.flame_always_max_lines = istore.flame_type == 2;
            }

            /* override any meta values if present */
            if ("override_meta" in istore) {
                iod.meta = {...iod.meta, ...istore.override_meta};
            }

            items_store[i][j] = {...iod, ...istore_override, ...istore};
            
            istore = items_store[i][j];

            /* get job info and speed */
            if (istore.class === "weapon") {
                istore.weapon_data = {...{}, ...item_meta.class.weapon[istore.type], ...(istore.weapon_data ?? {})};
            }

            istore.meta.fsstat = istore.mstat; /* set flame score stat to main stat */
            istore.meta.fsstat2 = istore.pstat.length == 2 ? istore.pstat.filter(a=>a!=istore.mstat)[0] : ""; /* set flame score stat to main stat */

            istore.bstat = Object.assign({}, stats, istore.bstat); /* append the rest of the stats to the bstat item */

            let img_name = "";
            let img_ext = "png";
            let append_style = true;

            //if item uses an override image, then append that image instead.
            //override images should share a common istore.img name
            if (istore.override_image != null) {
                img_name = istore.override_image;
                if (shared_img.includes(istore.img)) {
                    append_style = false;
                } else {
                    shared_img.push(istore.img);
                }
            } else {
                img_name = istore.name;
            }   

            if (istore.img_type !== undefined) {
                img_ext = istore.img_type;
            }

            //github is case sensitive for url
            img_name = img_name.replace("AbsoLab","Absolab").replace(/[\s-:\(\)'<>]/gi,"");

            istore.meta.img_name = `./assets/maple_items/${img_name}.${img_ext}`;

            if (append_style) {
                style_items += `
                    .${istore.img} {
                        background: url(${istore.meta.img_name});
                        background-repeat: no-repeat;
                        background-size: contain;
                    }
                `;   
            }
        }
    }
    
    //css <style> tag gets appended with the dynamically-generated image code
    $("#maple_items").append(style_items);
});