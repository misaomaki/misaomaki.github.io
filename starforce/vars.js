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
        safeguard_stars: {
            min: 15,
            max: 17
        },
        min_droppable_star: 15
    }
};