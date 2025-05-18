/*
    TODO - move global-type variables here
*/

//stat variables shared through all processes
const stats = {
    visible_stats: 0, //stats that come from non-bonus sources: base stats or scrolls
    job_stats: 0, //stats related to the item's job. "pstat" parameter
    rank: 0, //heart-related
    watt: 0,
    matt: 0,
    watt_p: 0, //percent increase in stat
    matt_p: 0,
    def: 0,
    def_p: 0,
    hp: 0,
    mp: 0,
    p_hp: 0, //hp stats that provide a percentage increase. starts with p_ rather than ends with _p as they should be static increases rather than cumulative increases
    p_mp: 0,
    speed: 0,
    jump: 0,
    star: 0,
    knockback: 0,
    //flame stuff
    boss_damage: 0,
    ied: 0,
    str: 0,
    dex: 0,
    int: 0,
    luk: 0,
    damage: 0,
    all_stat: 0,
    reqlvl: 0 //negative level requirements
};

const GLOBAL = {
    starforce: {
        max_stars: 25,
        safeguard_stars: {
            min: 15,
            max: 17
        },
        min_droppable_star: 15
    },
    cubes: {
        bonus: ["bonus", "bonus_occult", "white"]
    },
    starforce_enums: {
        SUCCESS: 0,
        CHANCE_TIME_SUCCESS: 1,
        FAIL: 2,
        SC_SUCCESS: 3, /* starcatch success */
        SC_FAIL: 4, /* starcatch fail */
        DESTROY: 5,
        FAIL_SAFEGUARD: 6,

        /*
            starforce results that can be grouped into general success or fails
        */
        __FAIL: [2, 4, 6],
        __SUCCESS: [0, 1, 3]
    },
    starforce_labels: {
        0: "success",
        2: "fail",
        3: "sc_success",
        5: "destroy"
    }
};

GLOBAL.starforce.safeguardable_stars = [];

for (let i = GLOBAL.starforce.safeguard_stars.min; i < GLOBAL.starforce.safeguard_stars.max; ++i) {
    GLOBAL.starforce.safeguardable_stars.push(i);
}

//item tooltip stats in order of how Maplestory shows it
GLOBAL.item_stat_order = [{
    name: "Rank",
    value: "rank",
    type: "raw" //no +
}, {
    name: "STR",
    value: "str"
},{
    name: "DEX",
    value: "dex"
},{
    name: "INT",
    value: "int"
},{
    name: "LUK",
    value: "luk"
},{
    name: "MaxHP",
    value: "hp"
},{
    name: "MaxHP",
    value: "p_hp",
    type: "%",
    symbol: "%"
},{
    name: "MaxMP",
    value: "mp"
},{
    name: "MaxMP",
    value: "p_mp",
    type: "%",
    symbol: "%"
},{
    name: "Attack Power",
    value: "watt"
},{
    name: "Magic Attack",
    value: "matt"
},{
    name: "Defense",
    value: "def"
},{
    name: "Speed",
    value: "speed"
},{
    name: "Jump",
    value: "jump"
},{
    name: "Knockback Chance",
    value: "knockback",
    type: "%",
    symbol: "%"
},{
    name: "Boss Damage",
    value: "boss_damage",
    type: "%",
    symbol: "%"
},{
    name: "Ignored Enemy DEF",
    value: "ied",
    type: "%",
    symbol: "%"
},{
    name: "Damage",
    value: "damage",
    type: "%",
    symbol: "%"
},{
    name: "All Stats",
    value: "all_stat",
    type: "%",
    symbol: "%"
}, {
    name: "Required Level",
    value: "reqlvl"
}];