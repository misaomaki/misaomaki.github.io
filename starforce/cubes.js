let cube = {};

//cube display value based on id type
//rates are not always in order and the order was created by when they were encountered
//default stats is tier 3 stats. stat_upgrade function will increase/decrease to the appropriate tier
cube.stat_type = {
    str6: "STR: +6",
    dex6: "DEX: +6",
    int6: "INT: +6",
    luk6: "LUK: +6",
    str10: "STR: +10",
    dex10: "DEX: +10",
    int10: "INT: +10",
    luk10: "LUK: +10",
    str12: "STR: +12",
    dex12: "DEX: +12",
    int12: "INT: +12",
    luk12: "LUK: +12",
    str14: "STR: +14",
    dex14: "DEX: +14",
    int14: "INT: +14",
    luk14: "LUK: +14",
    str16: "STR: +16",
    dex16: "DEX: +16",
    int16: "INT: +16",
    luk16: "LUK: +16",
    str18: "STR: +18",
    dex18: "DEX: +18",
    int18: "INT: +18",
    luk18: "LUK: +18",
    maxHp50: "Max HP: +50",
    maxMp50: "Max MP: +50",
    maxHp60: "Max HP: +60",
    maxMp60: "Max MP: +60",
    maxHp100: "Max HP: +100",
    maxMp100: "Max MP: +100",
    maxHp120: "Max HP: +120",
    maxMp120: "Max MP: +120",
    maxHp180: "Max HP: +180",
    maxMp180: "Max MP: +180",
    maxHp240: "Max HP: +240",
    maxMp240: "Max MP: +240",
    maxHp250: "Max HP: +250",
    maxMp250: "Max MP: +250",
    maxHp300: "Max HP: +300",
    maxMp300: "Max MP: +300",
    maxHp_p3: "Max HP: 3%",
    maxMp_p3: "Max MP: 3%",
    maxHp_p6: "Max HP: 6%",
    maxMp_p6: "Max MP: 6%",
    maxHp_p9: "Max HP: 9%",
    maxMp_p9: "Max MP: 9%",
    maxHp_p12: "Max HP: 12%",
    maxMp_p12: "Max MP: 12%",
    maxHp_p2: "Max HP: +2%",
    maxMp_p2: "Max MP: +2%",
    maxHp_p5: "Max HP: +5%",
    maxMp_p5: "Max MP: +5%",
    maxHp_p7: "Max HP: +7%",
    maxMp_p7: "Max MP: +7%",
    maxHp_p10: "Max HP: +10%",
    maxMp_p10: "Max MP: +10%",
    watt3: "ATT: +3",
    watt6: "ATT: +6",
    watt10: "ATT: +10",
    watt11: "ATT: +11",
    watt12: "ATT: +12",
    watt14: "ATT: +14",
    matt3: "Magic ATT: +3",
    matt6: "Magic ATT: +6",
    matt10: "Magic ATT: +10",
    matt11: "Magic ATT: +11",
    matt12: "Magic ATT: +12",
    matt14: "Magic ATT: +14",
    strp3: "STR: +3%",
    dexp3: "DEX: +3%",
    intp3: "INT: +3%",
    lukp3: "LUK: +3%",
    strp4: "STR: +4%",
    dexp4: "DEX: +4%",
    intp4: "INT: +4%",
    lukp4: "LUK: +4%",
    strp6: "STR: +6%",
    dexp6: "DEX: +6%",
    intp6: "INT: +6%",
    lukp6: "LUK: +6%",
    strp9: "STR: +9%",
    dexp9: "DEX: +9%",
    intp9: "INT: +9%",
    lukp9: "LUK: +9%",
    strp12: "STR: +12%",
    dexp12: "DEX: +12%",
    intp12: "INT: +12%",
    lukp12: "LUK: +12%",
    strp2: "STR: +2%",
    dexp2: "DEX: +2%",
    intp2: "INT: +2%",
    lukp2: "LUK: +2%",
    strp5: "STR: +5%",
    dexp5: "DEX: +5%",
    intp5: "INT: +5%",
    lukp5: "LUK: +5%",
    strp7: "STR: +7%",
    dexp7: "DEX: +7%",
    intp7: "INT: +7%",
    lukp7: "LUK: +7%",
    allp2: "All Stats: +2%",
    allp3: "All Stats: +3%",
    allp4: "All Stats: +4%",
    allp5: "All Stats: +5%",
    allp6: "All Stats: +6%",
    allp9: "All Stats: +9%",
    wattp3: "ATT: +3%",
    mattp3: "Magic ATT: +3%",
    wattp6: "ATT: +6%",
    mattp6: "Magic ATT: +6%",
    wattp9: "ATT: +9%",
    mattp9: "Magic ATT: +9%",
    wattp12: "ATT: +12%",
    mattp12: "Magic ATT: +12%",
    critp4: "Critical Chance: +4%",
    critp8: "Critical Chance: +8%",
    critp9: "Critical Chance: +9%",
    critp12: "Critical Chance: +12%",
    dmgp3: "Damage: +3%",
    dmgp6: "Damage: +6%",
    dmgp9: "Damage: +9%",
    dmgp12: "Damage: +12%",
    all3: "All Stats: +3",
    all5: "All Stats: +5",
    watt_per_lvl1: "ATT per 10 Character Levels: +1",
    matt_per_lvl1: "M. ATT per 10 Character Levels: +1",
    str_per_lvl1: "STR per 10 Character Levels: +1",
    dex_per_lvl1: "DEX per 10 Character Levels: +1",
    int_per_lvl1: "INT per 10 Character Levels: +1",
    luk_per_lvl1: "LUK per 10 Character Levels: +1",
    str_per_lvl2: "STR per 10 Character Levels: +2",
    dex_per_lvl2: "DEX per 10 Character Levels: +2",
    int_per_lvl2: "INT per 10 Character Levels: +2",
    luk_per_lvl2: "LUK per 10 Character Levels: +2",
    recover_hp1: "20% chance to recover 240 HP when attacking",
    recover_hp2: "20% chance to recover 360 HP when attacking",
    recover_hp3: "20% chance to recover 200 HP when attacking",
    recover_hp4: "20% chance to recover 300 HP when attacking",
    recover_hpb1: "3% chance to recover 53 HP when attacking",
    recover_hpb2: "15% chance to recover 95 HP when attacking",
    recover_hpb3: "3% chance to recover 47 HP when attacking",
    recover_hpb4: "15% chance to recover 85 HP when attacking",
    recover_mp1: "20% chance to recover 120 MP when attacking",
    recover_mp2: "20% chance to recover 180 MP when attacking",
    recover_mp3: "20% chance to recover 100 MP when attacking",
    recover_mp4: "20% chance to recover 165 MP when attacking",
    recover_mp5: "20% chance to recover 110 MP when attacking",
    recover_mpb1: "3% chance to recover 53 MP when attacking",
    recover_mpb2: "15% chance to recover 95 MP when attacking",
    recover_mpb3: "3% chance to recover 47 MP when attacking",
    recover_mpb4: "15% chance to recover 85 MP when attacking",
    attack_poison1: "20% chance to apply level 6 poisoning effect when attacking",
    attack_poison2: "20% chance to apply level 5 poisoning effect when attacking",
    attack_stun1: "10% chance to apply level 2 stun effect when attacking",
    attack_slow1: "20% chance to apply level 2 slow effect when attacking",
    attack_dark1: "20% chance to apply level 3 dark effect when attacking",
    attack_dark2: "20% chance to apply level 2 dark effect when attacking",
    attack_freeze1: "When attacking, there is a 10% chance to apply level 2 freezing effect",
    attack_seal1: "10% chance to apply level 2 sealing effect when attacking",
    ied15: "Ignore Enemy DEF: +15%",
    ied30: "Ignore Enemy DEF: +30%",
    ied35: "Ignore Enemy DEF: +35%",
    ied40: "Ignore Enemy DEF: +40%",
    ied3: "Ignore Enemy DEF: +3%",
    ied4: "Ignore Enemy DEF: +4%",
    ied5: "Ignore Enemy DEF: +5%",
    boss20: "Boss Monster Damage: +20%",
    boss30: "Boss Monster Damage: +30%",
    boss35: "Boss Monster Damage: +35%",
    boss40: "Boss Monster Damage: +40%",
    boss12: "Boss Monster Damage: +12%",
    boss18: "Boss Monster Damgae: +18%",
    crit_dmg1: "Critical Damage: +1%",
    crit_dmg3: "Critical Damage: +3%",
    crit_dmg8: "Critical Damage: +8%",
    ignore_dmg1: "5% chance to ignore 20% damage when attacked.",
    ignore_dmg2: "5% chance to ignore 40% damage when attacked.",
    ignore_dmg3: "10% chance to ignore 20% damage when attacked.",
    ignore_dmg4: "10% chance to ignore 40% damage when attacked.",
    all_skill1: "All skill levels +1 (except for 5th job and some skills)",
    all_skill2: "All skill levels +2 (except for 5th job and some skills)",
    all_skill3: "All skill levels +3 (except for 5th job and some skills)",
    recover_hp20: "HP Recovery Items and Skills: +20%",
    recover_hp30: "HP Recovery Items and Skills: +30%",
    recover_hp40: "HP Recovery Items and Skills: +40%",
    decent_door: "Enables the &lt;Decent Mystic Door&gt; skill",
    decent_bless: "Enables the &lt;Decent Advanced Blessing&gt; skill",
    decent_hyper: "Enables the &lt;Decent Hyper Body&gt; skill",
    decent_haste: "Enables the &lt;Decent Haste&gt; skill",
    decent_combat: "Enables the &lt;Decent Combat Orders&gt; skill",
    decent_sharp: "Enables the &lt;Decent Sharp Eyes&gt; skill",
    decent_speed: "Enables the &lt;Decent Speed Infusion&gt; skill",
    def60: "DEF: +60",
    def100: "DEF: +100",
    def120: "DEF: +120",
    def150: "DEF: +150",
    def200: "DEF: +200",
    defp2: "DEF: +2%",
    defp3: "DEF: +3%",
    defp4: "DEF: +4%",
    defp6: "DEF: +6%",
    defp7: "DEF: +7%",
    defp9: "DEF: +9%",
    defp10: "DEF: +10%",
    defp12: "DEF: +12%",
    cooldown1: "Skill Cooldown: -1 sec (-5% for under 10 sec, minimum cooldown of 10 sec)",
    cooldown2: "Skill Cooldown: -2 sec (-10% for under 10 sec, minimum cooldown of 5 sec)",
    invinc1: "Invincibility time after being hit: +1 second",
    invinc2: "Invincibility time after being hit: +2 seconds",
    invinc3: "Invincibility time after being hit: +3 seconds",
    reflect_dmg1: "30% chance to reflect 50% damage when taken",
    reflect_dmg2: "50% chance to reflect 70% damage when taken",
    hit_invinc1: "2% chance to become invincible for 7 seconds when attacked.",
    hit_invinc2: "4% chance to become invincible for 7 seconds when attacked.",
    hit_hp1: "15% chance to recover 95 HP when defeating a monster",
    hit_mp1: "15% chance to recover 95 MP when defeating a monster",
    resist4: "All Elemental Resistances: +4%",
    resist5: "All Elemental Resistances: +5%",
    resist10: "All Elemental Resistances: +10%",
    abn_resistp10: "Abnormal state resist: +10%",
    abn_resist5: "Abnormal state resist: +5",
    speed4: "Movement Speed: +4",
    speed6: "Movement Speed: +6",
    speed8: "Movement Speed: +8",
    jump4: "Jump: +4",
    jump6: "Jump: +6",
    jump8: "Jump: +8",
    mp_red10: "MP consumption of skills: -10%",
    mp_red15: "MP consumption of skills: -15%",
    mp_red30: "MP consumption of skills: -30%",
    item_drop5: "Item Drop Rate: +5%",
    item_drop15: "Item Drop Rate: +15%",
    item_drop30: "Item Drop Rate: +20%",
    meso_drop5: "Meso Obtained: +5%",
    meso_drop15: "Meso Obtained: +15%",
    meso_drop30: "Meso Obtained: +20%"
};

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


//KMS
//probability tiers for the stats for the pot stats
cube.rates = {};

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




//percentage class shared for the stat
/*
    rates structure is broken down by 
        equipment type -> potential tier -> potential line -> stat probability tier -> array of probability by cube type (based on cube_type enum)
            for cube type, not all cubes have the same tiers, so if more tiers are encountered than the cube has, it will simply use the next tier's value

*/
cube.rates.main = {
    hat: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            }, 
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.011429]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.096774,0.096774],
                t2: [0.080645,0.080645],
                t3: [0.064516,0.064516],
                t4: [0.032258,0.032258]
            }, 
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.009677,0.019355],
                t5: [0.008065,0.016129],
                t6: [0.006452,0.012903],
                t7: [0.003226,0.006452]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.000968,0.004839],
                t5: [0.000806,0.004032],
                t6: [0.000645,0.003226],
                t7: [0.000323,0.0001613]
            }
        },
        legendary: {
            o1: {
                t1: [0.08,0.08],
                t2: [0.06,0.06],
                t3: [0.04,0.04]
            }, 
            o2: {
                t1: [0.087097,0.077419],
                t2: [0.072581,0.064516],
                t3: [0.058065,0.051613],
                t4: [0.029032,0.025806],
                t5: [0.008,0.016],
                t6: [0.006,0.012],
                t7: [0.004,0.008]
            },
            o3: {
                t1: [0.095806,0.091935],
                t2: [0.079839,0.076613],
                t3: [0.063871,0.06129],
                t4: [0.031935,0.030645],
                t5: [0.0008,0.004],
                t6: [0.0006,0.003],
                t7: [0.0004,0.002]
            }
        }
    },
    top: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.131579,0.131579],
                t2: [0.078947,0.078947],
                t3: [0.052632,0.052632]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.013158,0.026316],
                t4: [0.007895,0.015789],
                t5: [0.005263,0.010526]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001316,0.006579],
                t4: [0.000789,0.003947],
                t5: [0.000526,0.002632]
            }
        },
        unique: {
            o1: {
                t1: [0.090909,0.090909],
                t2: [0.075758,0.075758],
                t3: [0.060606,0.060606],
                t4: [0.030303,0.030303]
            },
            o2: {
                t1: [0.118421,0.105263],
                t2: [0.071053,0.063158],
                t3: [0.047368,0.042105],
                t4: [0.009091,0.018182],
                t5: [0.007576,0.015152],
                t6: [0.006061,0.012121],
                t7: [0.00303,0.06061]
            },
            o3: {
                t1: [0.130263,0.125],
                t2: [0.078158,0.075],
                t3: [0.052105,0.05],
                t4: [0.000909,0.004545],
                t5: [0.000758,0.003788],
                t6: [0.000606,0.003030],
                t7: [0.000303,0.001515]
            }
        },
        legendary: {
            o1: {
                t1: [0.088889,0.088889],
                t2: [0.066667,0.066667],
                t3: [0.044444,0.044444]
            },
            o2: {
                t1: [0.081818,0.072727],
                t2: [0.068182,0.060606],
                t3: [0.054545,0.048485],
                t4: [0.027273,0.024242],
                t5: [0.008889,0.017778],
                t6: [0.006667,0.013333],
                t7: [0.004444,0.008889]
            },
            o3: {
                t1: [0.09,0.086364],
                t2: [0.075,0.07197],
                t3: [0.06,0.057576],
                t4: [0.03,0.028788],
                t5: [0.000889,0.004444],
                t6: [0.000667,0.003333],
                t7: [0.000444,0.002222]
            }
        }
    },
    bottom: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.011429]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.107143,0.107143],
                t2: [0.089286,0.089286],
                t3: [0.071429,0.071429]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.010714,0.021429],
                t5: [0.008929,0.017857],
                t6: [0.007143,0.014286]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.001071,0.005357],
                t5: [0.000893,0.004464],
                t6: [0.000714,0.003571]
            }
        },
        legendary: {
            o1: {
                t1: [0.102564,0.102564],
                t2: [0.076923,0.076923],
                t3: [0.051282,0.051282]
            },
            o2: {
                t1: [0.096429,0.085714],
                t2: [0.080357,0.071429],
                t3: [0.064286,0.057143],
                t4: [0.010256,0.020513],
                t5: [0.007692,0.015385],
                t6: [0.005128,0.010256]
            },
            o3: {
                t1: [0.106071,0.101786],
                t2: [0.088393,0.084821],
                t3: [0.070714,0.067857],
                t4: [0.001026,0.005128],
                t5: [0.000769,0.003846],
                t6: [0.000513,0.002564],
            }
        }
    },
    overall: {}, //same as top
    shoes: {
        rare: {
            o1: {
                t1: [0.068182,0.068182],
                t2: [0.045455,0.045455]
            },
            o2: {
                t1: [0.108,0.096],
                t2: [0.072,0.064],
                t3: [0.006818,0.013636],
                t4: [0.004545,0.009091]
            },
            o3: {
                t1: [0.1188,0.114],
                t2: [0.0792,0.076],
                t3: [0.000682,0.003409],
                t4: [0.000455,0.002273]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.061364,0.054545],
                t2: [0.040909,0.036364],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.014429]
            },
            o3: {
                t1: [0.0675,0.064773],
                t2: [0.045,0.043182],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.107143,0.107143],
                t2: [0.089286,0.089286],
                t3: [0.071429,0.071429]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.010714,0.021429],
                t5: [0.008929,0.017857],
                t6: [0.007143,0.014286]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.001071,0.005357],
                t5: [0.000893,0.004464],
                t6: [0.000714,0.003571]
            }
        },
        legendary: {
            o1: {
                t1: [0.1,0.1],
                t2: [0.075,0.075]
            },
            o2: {
                t1: [0.096429,0.085714],
                t2: [0.080357,0.071429],
                t3: [0.064286,0.057143],
                t4: [0.01,0.02],
                t5: [0.0075,0.015]
            }, 
            o3: {
                t1: [0.106071,0.101786],
                t2: [0.088393,0.084821],
                t3: [0.070714,0.067857],
                t4: [0.001,0.005],
                t5: [0.00075,0.00375]
            }
        }
    },
    gloves: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.121951,0.121951],
                t2: [0.073171,0.073171],
                t3: [0.04878,0.04878]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.012195,0.024390],
                t4: [0.007317,0.014634],
                t5: [0.004878,0.009756]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.00122,0.006098],
                t4: [0.000732,0.003659],
                t5: [0.000488,0.002439]
            }
        },
        unique: {
            o1: {
                t1: [0.1,0.1],
                t2: [0.083333,0.083333],
                t3: [0.066667,0.066667],
                t4: [0.016667,0.016667]
            },
            o2: {
                t1: [0.109756,0.097561],
                t2: [0.065854,0.058537],
                t3: [0.043902,0.039024],
                t4: [0.01,0.02],
                t5: [0.008333,0.016667],
                t6: [0.006667,0.013333],
                t7: [0.001667,0.003333]
            },
            o3: {
                t1: [0.120732,0.115854],
                t2: [0.072493,0.069512],
                t3: [0.048293,0.046431],
                t4: [0.001,0.005],
                t5: [0.000833,0.004167],
                t6: [0.000667,0.003333],
                t7: [0.000167,0.000833]
            }
        },
        legendary: {
            o1: {
                t1: [0.090909,0.090909],
                t2: [0.068182,0.068182],
                t3: [0.045455,0.045455]
            },
            o2: {
                t1: [0.09,0.08],
                t2: [0.075,0.066667],
                t3: [0.06,0.053333],
                t4: [0.015,0.013333],
                t5: [0.009091,0.018182],
                t6: [0.006818,0.013636],
                t7: [0.004545,0.009091]
            },
            o3: {
                t1: [0.099,0.095],
                t2: [0.0825,0.079167],
                t3: [0.0606,0.063333],
                t4: [0.0165,0.015833],
                t5: [0.000909,0.004545],
                t6: [0.000682,0.003409],
                t7: [0.000455,0.002273]
            }
        }
    },
    cape: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.011429]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.115385,0.115385],
                t2: [0.096154,0.096154],
                t3: [0.076923,0.076923]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.011538,0.023077],
                t5: [0.009615,0.019231],
                t6: [0.007692,0.015385]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.001154,0.005769],
                t5: [0.000962,0.004808],
                t6: [0.000769,0.003846]
            }
        },
        legendary: {
            o1: {
                t1: [0.108108,0.108108],
                t2: [0.081081,0.081081]
            },
            o2: {
                t1: [0.103846,0.092308],
                t2: [0.086538,0.076923],
                t3: [0.069231,0.061538],
                t4: [0.010811,0.021622],
                t5: [0.008108,0.016216]
            },
            o3: {
                t1: [0.114231,0.109615],
                t2: [0.095192,0.091346],
                t3: [0.076154,0.073077],
                t4: [0.001081,0.005405],
                t5: [0.000811,0.004054]
            }
        }
    },
    belt: {}, //same as cape
    shoulder: {}, //same as cape
    accessory: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.011429]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.136364,0.136364],
                t2: [0.113636,0.113636],
                t3: [0.090909,0.090909]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.013636,0.027273],
                t5: [0.011364,0.022727],
                t6: [0.009091,0.018182]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.001364,0.006818],
                t5: [0.001136,0.005682],
                t6: [0.000909,0.004545]
            }
        },
        legendary: {
            o1: {
                t1: [0.093023,0.093023],
                t2: [0.069767,0.069767]
            },
            o2: {
                t1: [0.122727,0.109091],
                t2: [0.102273,0.090909],
                t3: [0.081818,0.072727],
                t4: [0.009302,0.018605],
                t5: [0.006977,0.013953]
            },
            o3: {
                t1: [0.135,0.129545],
                t2: [0.1125,0.107955],
                t3: [0.09,0.086364],
                t4: [0.00093,0.004651],
                t5: [0.000698,0.003488]
            }
        }
    },
    earrings: {}, //same as accessory
    ring: {}, //same as accessory
    pendant: {}, //same as accessory
    mechanical_heart: {
        rare: {
            o1: {
                t1: [0.075,0.075],
                t2: [0.05,0.05]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.0075,0.015],
                t3: [0.005,0.01]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.00075,0.00375],
                t3: [0.0005,0.0025]
            }
        },
        epic: {
            o1: {
                t1: [0.142857,0.142857],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.0675,0.06],
                t2: [0.045,0.04],
                t3: [0.014286,0.028571],
                t4: [0.008571,0.017143],
                t5: [0.005714,0.011429]
            },
            o3: {
                t1: [0.07425,0.07125],
                t2: [0.0495,0.0475],
                t3: [0.001429,0.007143],
                t4: [0.000857,0.004286],
                t5: [0.000571,0.002857]
            }
        },
        unique: {
            o1: {
                t1: [0.136364,0.136364],
                t2: [0.113636,0.113636],
                t3: [0.090909,0.090909]
            },
            o2: {
                t1: [0.128571,0.114286],
                t2: [0.077143,0.068571],
                t3: [0.051429,0.045714],
                t4: [0.013636,0.027273],
                t5: [0.011364,0.022727],
                t6: [0.009091,0.018182]
            },
            o3: {
                t1: [0.141429,0.135714],
                t2: [0.084857,0.081429],
                t3: [0.056571,0.054286],
                t4: [0.001364,0.006818],
                t5: [0.001136,0.005682],
                t6: [0.000909,0.004545]
            }
        },
        legendary: {
            o1: {
                t1: [0.129032,0.129032],
                t2: [0.096774,0.096774]
            },
            o2: {
                t1: [0.122727,0.109091],
                t2: [0.102273,0.090909],
                t3: [0.081818,0.072727],
                t4: [0.012903,0.025806],
                t5: [0.009677,0.019355]
            },
            o3: {
                t1: [0.135,0.129545],
                t2: [0.1125,0.107955],
                t3: [0.09,0.086364],
                t4: [0.00129,0.006452],
                t5: [0.000968,0.004839]
            }
        }
    }, 
    force_shield: {
        rare: {
            o1: {
                t1: [0.065217,0.065217],
                t2: [0.043478,0.043478],
                t3: [0.021739,0.021739]
            },
            o2: {
                t1: [0.142105,0.126316],
                t2: [0.094737,0.084211],
                t3: [0.006522,0.013043],
                t4: [0.004348,0.008696],
                t5: [0.002174,0.004348]
            },
            o3: {
                t1: [0.156316,0.15],
                t2: [0.104211,0.1],
                t3: [0.000652,0.0032861],
                t4: [0.000435,0.002174],
                t5: [0.000217,0.001087]
            }
        },
        epic: {
            o1: {
                t1: [0.121951,0.121951],
                t2: [0.04878,0.04878],
            },
            o2: {
                t1: [0.058696,0.052174],
                t2: [0.039130,0.034783],
                t3: [0.019565,0.017391],
                t4: [0.012195,0.024390],
                t5: [0.004878,0.009756]
            },
            o3: {
                t1: [0.064565,0.61957],
                t2: [0.043043,0.041304],
                t3: [0.021522,0.020652],
                t4: [0.00122,0.006098],
                t5: [0.000488,0.002439]
            }
        },
        unique: {
            o1: {
                t1: [0.09434,0.09434],
                t2: [0.075472,0.075472],
                t3: [0.056604,0.056604],
                t4: [0.037736,0.037736]
            },
            o2: {
                t1: [0.109756,0.097561],
                t2: [0.043902,0.039024],
                t3: [0.009434,0.018868],
                t4: [0.007547,0.015094],
                t5: [0.00566,0.011321],
                t6: [0.003774,0.007547]
            },
            o3: {
                t1: [0.120732,0.115854],
                t2: [0.048293,0.046341],
                t3: [0.000943,0.004717],
                t4: [0.000755,0.003774],
                t5: [0.000566,0.002830],
                t6: [0.000377,0.001887]
            }
        },
        legendary: {
            o1: {
                t1: [0.085106,0.085106],
                t2: [0.06383,0.06383],
                t3: [0.042553,0.042553]
            },
            o2: {
                t1: [0.084906,0.075472],
                t2: [0.067925,0.060377],
                t3: [0.050943,0.045283],
                t4: [0.033962,0.030189],
                t5: [0.008511,0.017021],
                t6: [0.006383,0.012766],
                t7: [0.004255,0.008511]
            },
            o3: {
                t1: [0.093396,0.089623],
                t2: [0.074717,0.071698],
                t3: [0.050638,0.053774],
                t4: [0.037358,0.035849],
                t5: [0.000851,0.004255],
                t6: [0.000638,0.003191],
                t7: [0.000426,0.002128]
            }
        }
    },
    shield: {
        rare: {
            o1: {
                t1: [0.061224,0.061224],
                t2: [0.040816,0.040816],
                t3: [0.020408,0.020408]
            },
            o2: {
                t1: [0.122727,0.109091],
                t2: [0.081818,0.072727],
                t3: [0.006122,0.012245],
                t4: [0.004082,0.008163],
                t5: [0.002041,0.004082]
            },
            o3: {
                t1: [0.135,0.129545],
                t2: [0.09,0.086364],
                t3: [0.000612,0.003061],
                t4: [0.000408,0.002041],
                t5: [0.000204,0.001020]
            }
        },
        epic: {
            o1: {
                t1: [0.108696,0.108696],
                t2: [0.043478,0.043478]
            },
            o2: {
                t1: [0.055102,0.048980],
                t2: [0.036735,0.032653],
                t3: [0.018367,0.021739],
                t4: [0.01087,0.016327],
                t5: [0.004348,0.008696]
            },
            o3: {
                t1: [0.060612,0.058163],
                t2: [0.040408,0.038776],
                t3: [0.020204,0.019388],
                t4: [0.00109,0.005435],
                t5: [0.000435,0.002174]
            }
        },
        unique: {
            o1: {
                t1: [0.09434,0.09434],
                t2: [0.075472,0.075472],
                t3: [0.056604,0.056604],
                t4: [0.037736,0.037736]
            },
            o2: {
                t1: [0.097826,0.086957],
                t2: [0.03913,0.034783],
                t3: [0.009434,0.018868],
                t4: [0.007547,0.015094],
                t5: [0.00566,0.011321],
                t6: [0.003774,0.007547]
            },
            o3: {
                t1: [0.107609,0.103261],
                t2: [0.043043,0.041304],
                t3: [0.000943,0.004717],
                t4: [0.000755,0.003774],
                t5: [0.000566,0.002830],
                t6: [0.000377,0.001887]
            }
        },
        legendary: {
            o1: {
                t1: [0.085106,0.085106],
                t2: [0.06383,0.06383],
                t3: [0.042553,0.042553]
            },
            o2: {
                t1: [0.084906,0.075472],
                t2: [0.067925,0.060377],
                t3: [0.050943,0.045283],
                t4: [0.033962,0.030189],
                t5: [0.008511,0.017021],
                t6: [0.006383,0.012766],
                t7: [0.004255,0.008511]
            },
            o3: {
                t1: [0.093396,0.089623],
                t2: [0.074717,0.071698],
                t3: [0.050638,0.053774],
                t4: [0.037358,0.035849],
                t5: [0.000851,0.004255],
                t6: [0.000638,0.003191],
                t7: [0.000426,0.002128]
            }
        }
    },
    secondary: {
        rare: {
            o1: {
                t1: [0.061224,0.061224],
                t2: [0.040816,0.040816],
                t3: [0.020408,0.020408]
            },
            o2: {
                t1: [0.122727,0.109091],
                t2: [0.081818,0.072727],
                t3: [0.006122,0.012245],
                t4: [0.004082,0.008613],
                t5: [0.002041,0.004082]
            },
            o3: {
                t1: [0.135,0.129545],
                t2: [0.09,0.086364],
                t3: [0.000612,0.003061],
                t4: [0.000408,0.002041],
                t5: [0.000204,0.00102]
            }
        },
        epic: {
            o1: {
                t1: [0.108696,0.108696],
                t2: [0.043478,0.043478]
            },
            o2: {
                t1: [0.055102,0.048980],
                t2: [0.036735,0.032653],
                t3: [0.018367,0.021739],
                t4: [0.01087,0.016327],
                t5: [0.004348,0.008696]
            },
            o3: {
                t1: [0.060612,0.058163],
                t2: [0.040408,0.038776],
                t3: [0.020204,0.019388],
                t4: [0.0001087,0.005435],
                t5: [0.000435,0.002174]
            }
        },
        unique: {
            o1: {
                t1: [0.09434,0.09434],
                t2: [0.075472,0.075472],
                t3: [0.056604,0.056604],
                t4: [0.037736,0.037736]
            },
            o2: {
                t1: [0.097826,0.086957],
                t2: [0.03913,0.034783],
                t3: [0.009434,0.018868],
                t4: [0.007547,0.015094],
                t5: [0.00566,0.011321],
                t6: [0.003774,0.007547]
            },
            o3: {
                t1: [0.107609,0.103261],
                t2: [0.043043,0.041304],
                t3: [0.000943,0.004717],
                t4: [0.000755,0.003774],
                t5: [0.000566,0.002830],
                t6: [0.000377,0.001887]
            }
        },
        legendary: {
            o1: {
                t1: [0.085106,0.085106],
                t2: [0.06383,0.06383],
                t3: [0.042553,0.042553]
            },
            o2: {
                t1: [0.084906,0.075472],
                t2: [0.067925,0.060377],
                t3: [0.050943,0.045283],
                t4: [0.033962,0.030189],
                t5: [0.008511,0.017021],
                t6: [0.006383,0.012766],
                t7: [0.004255,0.008511]
            },
            o3: {
                t1: [0.093396,0.089623],
                t2: [0.074717,0.071698],
                t3: [0.050638,0.053774],
                t4: [0.037358,0.035849],
                t5: [0.000851,0.004255],
                t6: [0.000638,0.003191],
                t7: [0.000426,0.002128]
            }
        }
    },
    emblem: {
        rare: {
            o1: {
                t1: [0.061224,0.061224],
                t2: [0.040816,0.040816],
                t3: [0.020408,0.020408]
            },
            o2: {
                t1: [0.122727,0.109091],
                t2: [0.081818,0.072727],
                t3: [0.006122, 0.012245],
                t4: [0.004082, 0.008163],
                t5: [0.002041, 0.004082]
            },
            o3: {
                t1: [0.135, 0.129545],
                t2: [0.09, 0.086364],
                t3: [0.00612, 0.003061],
                t4: [0.00408, 0.002041],
                t5: [0.00204, 0.00102]
            }
        },
        epic: {
            o1: {
                t1: [0.108696,0.108696],
                t2: [0.043478,0.043478]
            },
            o2: {
                t1: [0.055102,0.048980],
                t2: [0.036735, 0.032653],
                t3: [0.018367, 0.021739],
                t4: [0.01087, 0.016327],
                t5: [0.004348, 0.008696]
            },
            o3: {
                t1: [0.060612,0.058163],
                t2: [0.040408,0.038776],
                t3: [0.020204,0.019388],
                t4: [0.01087,0.005435],
                t5: [0.00435,0.002174]
            }
        },
        unique: {
            o1: {
                t1: [0.125,0.125],
                t2: [0.1,0.1],
                t3: [0.075,0.075]
            },
            o2: {
                t1: [0.097826,0.086957],
                t2: [0.039130,0.034873],
                t3: [0.0125,0.025],
                t4: [0.01,0.02],
                t5: [0.0075,0.015]
            },
            o3: {
                t1: [0.107609,0.103261],
                t2: [0.043043,0.041304],
                t3: [0.00125,0.006250],
                t4: [0.001,0.005],
                t5: [0.00075,0.00375]
            }
        },
        legendary: {
            o1: {
                t1: [0.114286,0.114286],
                t2: [0.085714,0.085714],
                t3: [0.057143,0.057143]
            },
            o2: {
                t1: [0.1125,0.1],
                t2: [0.09,0.08],
                t3: [0.0675,0.06],
                t4: [0.011429,0.022857],
                t5: [0.008571,0.017143],
                t6: [0.005741,0.011429]
            },
            o3: {
                t1: [0.12375,0.11875],
                t2: [0.099,0.095],
                t3: [0.07425,0.07125],
                t4: [0.001143,0.005714],
                t5: [0.000857,0.004286],
                t6: [0.000571,0.002857]
            }
        }
    },
    weapon: {
        rare: {
            o1: {
                t1: [0.061224, 0.061224],
                t2: [0.040816, 0.040816],
                t3: [0.020408, 0.020408]
            },
            o2: {
                t1: [0.122727, 0.0109091],
                t2: [0.081818, 0.072727],
                t3: [0.006122, 0.012245],
                t4: [0.004082, 0.008163],
                t5: [0.002041, 0.004082]
            },
            o3: {
                t1: [0.135, 0.129545],
                t2: [0.09, 0.086364],
                t3: [0.000612, 0.003061],
                t4: [0.000408, 0.002041],
                t5: [0.000204, 0.00102]
            }
        },
        epic: {
            o1: {
                t1: [0.108696, 0.108696],
                t2: [0.043478, 0.043478]
            },
            o2: {
                t1: [0.055102, 0.04898],
                t2: [0.036735, 0.032653],
                t3: [0.018367, 0.016327],
                t4: [0.01087, 0.021739],
                t5: [0.004348, 0.008696]
            },
            o3: {
                t1: [0.060612, 0.058163],
                t2: [0.040408, 0.038776],
                t3: [0.020204, 0.019388],
                t4: [0.001087, 0.005435],
                t5: [0.000435, 0.002174]
            }
        },
        unique: {
            o1: {
                t1: [0.111111, 0.111111],
                t2: [0.088889, 0.088889],
                t3: [0.066667, 0.066667],
                t4: [0.044444, 0.044444]
            },
            o2: {
                t1: [0.097826, 0.086957],
                t2: [0.039130, 0.034783],
                t3: [0.011111, 0.022222],
                t4: [0.008889, 0.017778],
                t5: [0.006667, 0.01333],
                t6: [0.004444, 0.008889]
            },
            o3: {
                t1: [0.107609, 0.103261],
                t2: [0.043043, 0.041304],
                t3: [0.0011111, 0.005556],
                t4: [0.000889, 0.004444],
                t5: [0.000667, 0.003333],
                t6: [0.000444, 0.002222]
            }
        },
        legendary: {
            o1: {
                t1: [0.097561, 0.097561],
                t2: [0.073171, 0.073171],
                t3: [0.04878, 0.04878]
            },
            o2: {
                t1: [0.1, 0.088889],
                t2: [0.08, 0.071111],
                t3: [0.06, 0.053333],
                t4: [0.04, 0.035556],
                t5: [0.009756, 0.019512],
                t6: [0.007317, 0.014634],
                t7: [0.004878, 0.009756]
            },
            o3: {
                t1: [0.11, 0.105556],
                t2: [0.088, 0.084444],
                t3: [0.066, 0.063333],
                t4: [0.044, 0.042222],
                t5: [0.000976, 0.004868],
                t6: [0.000732, 0.003659],
                t7: [0.000488, 0.002439]
            }
        }
    }
};


/*





        BONUS POT RATES


        o2 and o3 are the same %



    
*/

cube.rates.bonus = {
    hat: {
        rare: {
            o1: {
                t1: [0.06383],
                t2: [0.042553],
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001252],
                t4: [0.000834]
            }
        },
        epic: {
            o1: {
                t1: [0.06],
                t2: [0.04]
            }, 
            o2: {
                t1: [0.06079],
                t2: [0.040527],
                t3: [0.002857],
                t4: [0.001905]
            }
        },
        unique: {
            o1: {
                t1: [0.053571],
                t2: [0.035714],
                t3: [0.017857]
            }, 
            o2: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.00105],
                t4: [0.0007],
                t5: [0.00035]
            }
        },
        legendary: {
            o1: {
                t1: [0.044118],
                t2: [0.029412],
                t3: [0.014706]
            }, 
            o2: {
                t1: [0.053305],
                t2: [0.035537],
                t3: [0.017768],
                t4: [0.000233],
                t5: [0.000155],
                t6: [0.000078]
            }
        }
    },
    top: {
        rare: {
            o1: {
                t1: [0.06383],
                t2: [0.042553],
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001252],
                t4: [0.000834]
            }
        },
        epic: {
            o1: {
                t1: [0.06],
                t2: [0.04]
            }, 
            o2: {
                t1: [0.06079],
                t2: [0.040527],
                t3: [0.002857],
                t4: [0.001905]
            }
        },
        unique: {
            o1: {
                t1: [0.053571],
                t2: [0.035714],
                t3: [0.017857]
            }, 
            o2: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.00105],
                t4: [0.0007],
                t5: [0.00035]
            }
        },
        legendary: {
            o1: {
                t1: [0.046875],
                t2: [0.031250],
                t3: [0.015625]
            }, 
            o2: {
                t1: [0.053305],
                t2: [0.035537],
                t3: [0.017768],
                t4: [0.000233],
                t5: [0.000155],
                t6: [0.000078]
            }
        }
    },
    bottom: {}, //same as top
    overall: {}, //same as top
    shoes: {}, //same as top
    gloves: {
        rare: {
            o1: {
                t1: [0.06383],
                t2: [0.042553],
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001252],
                t4: [0.000834]
            }
        },
        epic: {
            o1: {
                t1: [0.06],
                t2: [0.04]
            }, 
            o2: {
                t1: [0.06079],
                t2: [0.040527],
                t3: [0.002857],
                t4: [0.001905]
            }
        },
        unique: {
            o1: {
                t1: [0.053571],
                t2: [0.035714],
                t3: [0.017857]
            }, 
            o2: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.00105],
                t4: [0.0007],
                t5: [0.00035]
            }
        },
        legendary: {
            o1: {
                t1: [0.045455],
                t2: [0.030303],
                t3: [0.015152]
            }, 
            o2: {
                t1: [0.053305],
                t2: [0.035537],
                t3: [0.017768],
                t4: [0.000226],
                t5: [0.000151],
                t6: [0.000075]
            }
        }
    },
    cape: {}, //same as top
    belt: {}, //same as top
    shoulder: {}, //same as top
    accessory: {
        rare: {
            o1: {
                t1: [0.06383],
                t2: [0.042553],
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001252],
                t4: [0.000834]
            }
        },
        epic: {
            o1: {
                t1: [0.06],
                t2: [0.04]
            }, 
            o2: {
                t1: [0.06079],
                t2: [0.040527],
                t3: [0.002857],
                t4: [0.001905]
            }
        },
        unique: {
            o1: {
                t1: [0.053571],
                t2: [0.035714],
                t3: [0.017857]
            }, 
            o2: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.00105],
                t4: [0.0007],
                t5: [0.00035]
            }
        },
        legendary: {
            o1: {
                t1: [0.046154],
                t2: [0.030769],
                t3: [0.015385]
            }, 
            o2: {
                t1: [0.053305],
                t2: [0.035537],
                t3: [0.017768],
                t4: [0.00023],
                t5: [0.000153],
                t6: [0.000077]
            }
        }
    },
    earrings: {}, //same as accessory
    ring: {}, //same as accessory
    pendant: {}, //same as accessory
    mechanical_heart: {
        rare: {
            o1: {
                t1: [0.06383],
                t2: [0.042553],
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001252],
                t4: [0.000834]
            }
        },
        epic: {
            o1: {
                t1: [0.06],
                t2: [0.04]
            }, 
            o2: {
                t1: [0.06079],
                t2: [0.040527],
                t3: [0.002857],
                t4: [0.001905]
            }
        },
        unique: {
            o1: {
                t1: [0.053571],
                t2: [0.035714],
                t3: [0.017857]
            }, 
            o2: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.00105],
                t4: [0.0007],
                t5: [0.00035]
            }
        },
        legendary: {
            o1: {
                t1: [0.048387],
                t2: [0.032258],
                t3: [0.016129]
            }, 
            o2: {
                t1: [0.053305],
                t2: [0.035537],
                t3: [0.017768],
                t4: [0.000241],
                t5: [0.00016],
                t6: [0.00008]
            }
        }
    }, 
    force_shield: {
        rare: {
            o1: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.019608]
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001153],
                t4: [0.000769],
                t5: [0.000384]
            }
        },
        epic: {
            o1: {
                t1: [0.088235],
                t2: [0.058824],
                t3: [0.029412]
            },
            o2: {
                t1: [0.056022],
                t2: [0.037348],
                t3: [0.018674],
                t4: [0.004202],
                t5: [0.002801],
                t6: [0.001401]
            }
        },
        unique: {
            o1: {
                t1: [0.069767],
                t2: [0.046512],
                t3: [0.023256]
            },
            o2: {
                t1: [0.086505],
                t2: [0.05767],
                t3: [0.028835],
                t4: [0.001368],
                t5: [0.000912],
                t6: [0.000456]
            }
        },
        legendary: {
            o1: {
                t1: [0.071429],
                t2: [0.047619],
                t3: [0.02381]
            },
            o2: {
                t1: [0.06942],
                t2: [0.04628],
                t3: [0.02314],
                t4: [0.000355],
                t5: [0.000237],
                t6: [0.000118]
            }
        }
    },
    shield: {}, //same as force shield
    secondary: {
        rare: {
            o1: {
                t1: [0.061224],
                t2: [0.040816],
                t3: [0.020408]
            },
            o2: {
                t1: [0.122727],
                t2: [0.081818],
                t3: [0.006122],
                t4: [0.004082],
                t5: [0.002041]
            },
            o3: {
                t1: [0.135],
                t2: [0.09],
                t3: [0.000612],
                t4: [0.000408],
                t5: [0.000204]
            }
        },
        epic: {
            o1: {
                t1: [0.108696],
                t2: [0.043478]
            },
            o2: {
                t1: [0.055102],
                t2: [0.036735],
                t3: [0.018367],
                t4: [0.01087],
                t5: [0.004348]
            },
            o3: {
                t1: [0.060612],
                t2: [0.040408],
                t3: [0.020204],
                t4: [0.0001087],
                t5: [0.000435]
            }
        },
        unique: {
            o1: {
                t1: [0.09434],
                t2: [0.075472],
                t3: [0.056604],
                t4: [0.037736]
            },
            o2: {
                t1: [0.097826],
                t2: [0.03913],
                t3: [0.009434],
                t4: [0.007547],
                t5: [0.00566],
                t6: [0.003774]
            },
            o3: {
                t1: [0.107609],
                t2: [0.043043],
                t3: [0.000943],
                t4: [0.000755],
                t5: [0.000566],
                t6: [0.000377]
            }
        },
        legendary: {
            o1: {
                t1: [0.085106],
                t2: [0.06383],
                t3: [0.042553]
            },
            o2: {
                t1: [0.084906],
                t2: [0.067925],
                t3: [0.050943],
                t4: [0.033962],
                t5: [0.008511],
                t6: [0.006383],
                t7: [0.004255]
            },
            o3: {
                t1: [0.093396],
                t2: [0.074717],
                t3: [0.050638],
                t4: [0.037358],
                t5: [0.000851],
                t6: [0.000638],
                t7: [0.000426]
            }
        }
    },
    emblem: {
        rare: {
            o1: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.019608]
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001153],
                t4: [0.000769],
                t5: [0.000384]
            }
        },
        epic: {
            o1: {
                t1: [0.088235],
                t2: [0.058824],
                t3: [0.029412]
            },
            o2: {
                t1: [0.056022],
                t2: [0.037348],
                t3: [0.018674],
                t4: [0.004202],
                t5: [0.002801],
                t6: [0.001401]
            }
        },
        unique: {
            o1: {
                t1: [0.071429],
                t2: [0.047619],
                t3: [0.02381]
            },
            o2: {
                t1: [0.086505],
                t2: [0.05767],
                t3: [0.028835],
                t4: [0.001401],
                t5: [0.000934],
                t6: [0.000457]
            }
        },
        legendary: {
            o1: {
                t1: [0.076923],
                t2: [0.051282],
                t3: [0.025641]
            },
            o2: {
                t1: [0.071073],
                t2: [0.047382],
                t3: [0.023691],
                t4: [0.000383],
                t5: [0.000255],
                t6: [0.000128]
            }
        }
    },
    weapon: {
        rare: {
            o1: {
                t1: [0.058824],
                t2: [0.039216],
                t3: [0.019608]
            },
            o2: {
                t1: [0.108932],
                t2: [0.072622],
                t3: [0.001153],
                t4: [0.000769],
                t5: [0.000384]
            }
        },
        epic: {
            o1: {
                t1: [0.088235],
                t2: [0.058824],
                t3: [0.029412]
            },
            o2: {
                t1: [0.056022],
                t2: [0.037348],
                t3: [0.018674],
                t4: [0.004202],
                t5: [0.002801],
                t6: [0.001401]
            }
        },
        unique: {
            o1: {
                t1: [0.069767],
                t2: [0.046512],
                t3: [0.023256]
            },
            o2: {
                t1: [0.086505],
                t2: [0.05767],
                t3: [0.028835],
                t4: [0.001368],
                t5: [0.000912],
                t6: [0.000456]
            }
        },
        legendary: {
            o1: {
                t1: [0.075],
                t2: [0.05],
                t3: [0.025]
            },
            o2: {
                t1: [0.06942],
                t2: [0.04628],
                t3: [0.02314],
                t4: [0.000373],
                t5: [0.000249],
                t6: [0.000124]
            }
        }
    }
};

//get the stats associated with the potential tier, as well as its probability tier
cube.pot_stats = {};

cube.pot_stats.main = {
    hat: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t1"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["defp6", "t3"],
                ["all5", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p3", "t3"],
                ["maxMp_p3", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"] 
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp6", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"],
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["all_skill1", "t3"],
                ["all_skill2", "t4"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_door", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t4"],
                ["allp6", "t4"],
                ["all_skill1", "t4"],
                ["all_skill2", "t7"],
                ["ignore_dmg1", "t4"],
                ["ignore_dmg2", "t4"],
                ["recover_hp30", "t4"],
                ["decent_door", "t4"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp4", "t2"],
                ["all_skill2", "t2"],
                ["all_skill3", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["cooldown1", "t2"],
                ["cooldown2", "t3"],
                ["decent_door", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["all_skill1", "t3"],
                ["all_skill2", "t4"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_door", "t3"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["maxHp_p12", "t5"],
                ["maxMp_p12", "t5"],
                ["defp12", "t5"],
                ["allp4", "t6"],
                ["all_skill2", "t6"],
                ["all_skill3", "t7"],
                ["ignore_dmg3", "t6"],
                ["ignore_dmg4", "t6"],
                ["cooldown1", "t6"],
                ["cooldown2", "t7"],
                ["decent_bless", "t6"]
            ]
        }
    },
    top: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["invinc1", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"],
                ["invinc1", "t4"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t2"],
                ["allp6", "t2"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["invinc1", "t2"],
                ["hit_invinc1", "t2"],
                ["reflect_dmg1", "t2"],
                ["reflect_dmg2", "t3"],
                ["recover_hp30", "t2"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["invinc1", "t2"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["ignore_dmg1", "t6"],
                ["ignore_dmg2", "t6"],
                ["invinc1", "t6"],
                ["hit_invinc1", "t6"],
                ["reflect_dmg1", "t6"],
                ["reflect_dmg2", "t7"],
                ["recover_hp30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"],
                ["resist10", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["invinc3", "t2"],
                ["hit_invinc2", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["invinc2", "t3"],
                ["hit_invinc1", "t3"],
                ["reflect_dmg1", "t3"],
                ["reflect_dmg2", "t4"],
                ["recover_hp30", "t3"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["maxHp_p12", "t5"],
                ["maxMp_p12", "t5"],
                ["defp12", "t5"],
                ["allp9", "t6"],
                ["resist10", "t7"],
                ["ignore_dmg3", "t5"],
                ["ignore_dmg4", "t5"],
                ["invinc3", "t5"],
                ["hit_invinc2", "t5"]
            ]
        }
    },
    bottom: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_hyper", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["ignore_dmg1", "t6"],
                ["ignore_dmg2", "t6"],
                ["recover_hp30", "t6"],
                ["decent_hyper", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"],
                ["abn_resistp10", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_hyper", "t3"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["maxHp_p12", "t4"],
                ["maxMp_p12", "t4"],
                ["defp12", "t4"],
                ["allp9", "t5"],
                ["abn_resistp10", "t6"],
                ["ignore_dmg3", "t5"],
                ["ignore_dmg4", "t5"]
            ]
        }
    },
    overall: {}, //same as top
    shoes: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["speed8", "t2"],
                ["jump8", "t2"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["speed4", "t2"],
                ["jump4", "t2"],
                ["def60", "t1"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp120", "t3"],
                ["maxMp120", "t3"],
                ["def120", "t3"],
                ["speed8", "t4"],
                ["jump8", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["maxHp_p6", "t4"],
                ["maxMp_p6", "t4"],
                ["defp3", "t4"],
                ["all5", "t4"]
            ]
        },        
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["speed8", "t2"],
                ["jump8", "t2"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_haste", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["ignore_dmg1", "t6"],
                ["ignore_dmg2", "t6"],
                ["recover_hp30", "t6"],
                ["decent_haste", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["decent_combat", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_haste", "t3"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["maxHp_p12", "t4"],
                ["maxMp_p12", "t4"],
                ["defp12", "t4"],
                ["allp9", "t5"],
                ["ignore_dmg3", "t5"],
                ["ignore_dmg4", "t5"],
                ["decent_combat", "t5"],
            ]
        }
    },
    gloves: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t3"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },        
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["hit_hp1", "t2"],
                ["hit_mp1", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"],
                ["hit_hp1", "t4"],
                ["hit_mp1", "t4"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["str_per_lvl1", "t4"],
                ["dex_per_lvl1", "t4"],
                ["int_per_lvl1", "t4"],
                ["luk_per_lvl1", "t4"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_sharp", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["hit_hp1", "t2"],
                ["hit_mp1", "t2"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["str_per_lvl1", "t7"],
                ["dex_per_lvl1", "t7"],
                ["int_per_lvl1", "t7"],
                ["luk_per_lvl1", "t7"],
                ["ignore_dmg1", "t6"],
                ["ignore_dmg2", "t6"],
                ["recover_hp30", "t6"],
                ["decent_sharp", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["crit_dmg8", "t3"],
                ["crit_dmg8", "t3"],
                ["allp9", "t2"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["decent_sharp", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["str_per_lvl1", "t4"],
                ["dex_per_lvl1", "t4"],
                ["int_per_lvl1", "t4"],
                ["luk_per_lvl1", "t4"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["decent_haste", "t3"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["maxHp_p12", "t5"],
                ["maxMp_p12", "t5"],
                ["defp12", "t5"],
                ["crit_dmg8", "t7"],
                ["crit_dmg8", "t7"],
                ["allp9", "t6"],
                ["ignore_dmg3", "t6"],
                ["ignore_dmg4", "t6"],
                ["decent_sharp", "t6"],
            ]
        }
    },
    cape: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t3"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },        
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["ignore_dmg1", "t6"],
                ["ignore_dmg2", "t6"],
                ["recover_hp30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["ignore_dmg1", "t3"],
                ["ignore_dmg2", "t3"],
                ["recover_hp30", "t3"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["maxHp_p12", "t4"],
                ["maxMp_p12", "t4"],
                ["defp12", "t4"],
                ["allp9", "t5"],
                ["ignore_dmg3", "t5"],
                ["ignore_dmg4", "t5"]
            ]
        }
    },
    belt: {}, //same as cape
    shoulder: {}, //same as cape
    accessory: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t3"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },        
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["recover_hp30", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["recover_hp30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"],
                ["mp_red15", "t2"],
                ["mp_red30", "t2"],
                ["item_drop30", "t2"],
                ["meso_drop30", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["recover_hp30", "t3"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["maxHp_p12", "t4"],
                ["maxMp_p12", "t4"],
                ["defp12", "t4"],
                ["allp9", "t5"],
                ["mp_red15", "t5"],
                ["mp_red30", "t5"],
                ["item_drop30", "t5"],
                ["meso_drop30", "t5"]
            ]
        }
    },
    earrings: {}, //same as accessory
    ring: {}, //same as accessory
    pendant: {}, //same as accessory
    mechanical_heart: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p6", "t2"],
                ["maxMp_p6", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["def60", "t1"],
                ["str12", "t2"],
                ["dex12", "t2"],
                ["int12", "t2"],
                ["luk12", "t2"],
                ["maxHp120", "t2"],
                ["maxMp120", "t2"],
                ["def120", "t3"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp3", "t3"],
                ["all5", "t3"]
            ]
        },        
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["def120", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["maxHp_p3", "t2"],
                ["maxMp_p3", "t2"],
                ["defp3", "t2"],
                ["all5", "t2"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p6", "t3"],
                ["maxMp_p6", "t3"],
                ["defp6", "t4"],
                ["allp3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp6", "t3"],
                ["recover_hp30", "t3"]
            ],
            o2: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p6", "t1"],
                ["maxMp_p6", "t1"],
                ["defp6", "t2"],
                ["allp3", "t3"],
                ["strp9", "t5"],
                ["dexp9", "t5"],
                ["intp9", "t5"],
                ["lukp9", "t5"],
                ["maxHp_p9", "t4"],
                ["maxMp_p9", "t4"],
                ["defp9", "t6"],
                ["allp6", "t6"],
                ["recover_hp30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["maxHp_p12", "t1"],
                ["maxMp_p12", "t1"],
                ["defp12", "t1"],
                ["allp9", "t2"]
            ],
            o2: [
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["maxHp_p9", "t1"],
                ["maxMp_p9", "t1"],
                ["defp9", "t3"],
                ["allp9", "t3"],
                ["recover_hp30", "t3"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["maxHp_p12", "t4"],
                ["maxMp_p12", "t4"],
                ["defp12", "t4"],
                ["allp9", "t5"],
            ]
        }
    },
    secondary: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp50", "t1"],
                ["maxMp50", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t5"],
                ["dmgp3", "t5"],
                ["all5", "t4"],
                ["recover_hp3", "t5"],
                ["recover_mp5", "t5"],
                ["attack_poison2", "t5"],
                ["attack_stun1", "t5"],
                ["attack_slow1", "t5"],
                ["attack_dark2", "t5"],
                ["attack_freeze1", "t5"],
                ["attack_seal1", "t5"],
                ["ied15", "t5"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p3", "t1"],
                ["maxMp_p6", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t2"],
                ["dmgp6", "t2"],
                ["allp3", "t2"],
                ["recover_hp4", "t2"],
                ["recover_mp4", "t2"],
                ["ied15", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t4"],
                ["mattp3", "t4"],
                ["critp4", "t4"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["maxHp_p3", "t4"],
                ["maxMp_p3", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp4", "t5"],
                ["recover_mp4", "t5"],
                ["ied15", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"]
            ],
            o2: [
               ["strp6", "t1"],
               ["dexp6", "t1"],
               ["intp6", "t1"],
               ["lukp6", "t1"],
               ["maxHp_p6", "t1"],
               ["maxMp_p6", "t1"],
               ["wattp6", "t2"],
               ["mattp6", "t2"],
               ["critp8", "t2"],
               ["dmgp6", "t2"],
               ["allp3", "t2"],
               ["recover_hp4", "t2"],
               ["recover_mp4", "t2"],
               ["ied15", "t2"],
               ["strp9", "t3"],
               ["dexp9", "t3"],
               ["intp9", "t3"],
               ["lukp9", "t3"],
               ["wattp9", "t5"],
               ["mattp9", "t5"],
               ["critp9", "t4"],
               ["dmgp9", "t5"],
               ["allp6", "t4"],
               ["ied30", "t5"],
               ["ignore_dmg1", "t2"],
               ["ignore_dmg2", "t2"],
               ["boss20", "t4"],
               ["boss30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["wattp12", "t3"],
                ["mattp12", "t3"],
                ["critp12", "t3"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["ied35", "t3"],
                ["ied40", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["boss30", "t3"],
                ["boss35", "t3"],
                ["boss40", "t3"]
            ],
            o2: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied35", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["wattp12", "t7"],
                ["mattp12", "t7"],
                ["critp12", "t7"],
                ["dmgp12", "t7"],
                ["allp9", "t6"],
                ["watt_per_lvl1", "t7"],
                ["matt_per_lvl1", "t7"],
                ["ied35", "t7"],
                ["ied40", "t7"],
                ["ignore_dmg3", "t6"],
                ["ignore_dmg4", "t6"],
                ["boss30", "t7"],
                ["boss35", "t7"],
                ["boss40", "t7"]
            ]
        }
    },
    force_shield: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp50", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp100", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t5"],
                ["dmgp3", "t5"],
                ["all5", "t4"],
                ["recover_hp3", "t5"],
                ["recover_mp5", "t5"],
                ["attack_poison2", "t5"],
                ["attack_stun1", "t5"],
                ["attack_slow1", "t5"],
                ["attack_dark2", "t5"],
                ["attack_freeze1", "t5"],
                ["attack_seal1", "t5"],
                ["ied15", "t5"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p3", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t2"],
                ["dmgp6", "t2"],
                ["allp3", "t2"],
                ["recover_hp4", "t2"],
                ["recover_mp4", "t2"],
                ["ied15", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t4"],
                ["mattp3", "t4"],
                ["critp4", "t4"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["maxHp_p3", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp4", "t5"],
                ["recover_mp4", "t5"],
                ["ied15", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"]
            ],
            o2: [
               ["strp6", "t1"],
               ["dexp6", "t1"],
               ["intp6", "t1"],
               ["lukp6", "t1"],
               ["wattp6", "t2"],
               ["mattp6", "t2"],
               ["critp8", "t2"],
               ["dmgp6", "t2"],
               ["allp3", "t2"],
               ["recover_hp4", "t2"],
               ["recover_mp4", "t2"],
               ["ied15", "t2"],
               ["strp9", "t3"],
               ["dexp9", "t3"],
               ["intp9", "t3"],
               ["lukp9", "t3"],
               ["wattp9", "t5"],
               ["mattp9", "t5"],
               ["critp9", "t4"],
               ["dmgp9", "t5"],
               ["allp6", "t4"],
               ["ied30", "t5"],
               ["ignore_dmg1", "t2"],
               ["ignore_dmg2", "t2"],
               ["boss20", "t4"],
               ["boss30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["wattp12", "t3"],
                ["mattp12", "t3"],
                ["critp12", "t3"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["ied35", "t3"],
                ["ied40", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["boss30", "t3"],
                ["boss35", "t3"],
                ["boss40", "t3"]
            ],
            o2: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied35", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["wattp12", "t7"],
                ["mattp12", "t7"],
                ["critp12", "t7"],
                ["dmgp12", "t7"],
                ["allp9", "t6"],
                ["watt_per_lvl1", "t7"],
                ["matt_per_lvl1", "t7"],
                ["ied35", "t7"],
                ["ied40", "t7"],
                ["ignore_dmg3", "t6"],
                ["ignore_dmg4", "t6"],
                ["boss30", "t7"],
                ["boss35", "t7"],
                ["boss40", "t7"]
            ]
        }
    },
    shield: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp50", "t1"],
                ["maxMp50", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t5"],
                ["dmgp3", "t5"],
                ["all5", "t4"],
                ["recover_hp3", "t5"],
                ["recover_mp5", "t5"],
                ["attack_poison2", "t5"],
                ["attack_stun1", "t5"],
                ["attack_slow1", "t5"],
                ["attack_dark2", "t5"],
                ["attack_freeze1", "t5"],
                ["attack_seal1", "t5"],
                ["ied15", "t5"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p3", "t1"],
                ["maxMp_p3", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t2"],
                ["dmgp9", "t2"],
                ["allp3", "t2"],
                ["recover_hp4", "t2"],
                ["recover_mp4", "t2"],
                ["ied15", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t4"],
                ["mattp3", "t4"],
                ["critp4", "t4"],
                ["dmgp3", "t4"],
                ["all5", "t2"],
                ["recover_hp3", "t4"],
                ["recover_mp5", "t4"],
                ["attack_poison2", "t4"],
                ["attack_stun1", "t4"],
                ["attack_slow1", "t4"],
                ["attack_dark2", "t4"],
                ["attack_freeze1", "t4"],
                ["attack_seal1", "t4"],
                ["ied15", "t4"],
                ["strp6", "t3"],
                ["dexp6", "t3"],
                ["intp6", "t3"],
                ["lukp6", "t3"],
                ["maxHp_p3", "t3"],
                ["maxMp_p3", "t3"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp4", "t5"],
                ["recover_mp4", "t5"],
                ["ied15", "t5"]
            ],
            o3: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp5", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["maxHp_p3", "t4"],
                ["maxMp_p3", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp4", "t5"],
                ["recover_mp4", "t5"],
                ["ied15", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"]
            ],
            o2: [
               ["strp6", "t1"],
               ["dexp6", "t1"],
               ["intp6", "t1"],
               ["lukp6", "t1"],
               ["maxHp_p6", "t1"],
               ["maxMp_p6", "t1"],
               ["wattp6", "t2"],
               ["mattp6", "t2"],
               ["critp8", "t2"],
               ["dmgp6", "t2"],
               ["allp3", "t2"],
               ["recover_hp4", "t2"],
               ["recover_mp4", "t2"],
               ["ied15", "t2"],
               ["strp9", "t3"],
               ["dexp9", "t3"],
               ["intp9", "t3"],
               ["lukp9", "t3"],
               ["wattp9", "t5"],
               ["mattp9", "t5"],
               ["critp9", "t4"],
               ["dmgp9", "t5"],
               ["allp6", "t4"],
               ["ied30", "t5"],
               ["ignore_dmg1", "t4"],
               ["ignore_dmg2", "t4"],
               ["boss20", "t5"],
               ["boss30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["wattp12", "t3"],
                ["mattp12", "t3"],
                ["critp12", "t3"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["ied35", "t3"],
                ["ied40", "t3"],
                ["ignore_dmg3", "t2"],
                ["ignore_dmg4", "t2"],
                ["boss30", "t3"],
                ["boss35", "t3"],
                ["boss40", "t3"]
            ],
            o2: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied35", "t3"],
                ["ignore_dmg1", "t2"],
                ["ignore_dmg2", "t2"],
                ["boss20", "t3"],
                ["boss30", "t4"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["wattp12", "t7"],
                ["mattp12", "t7"],
                ["critp12", "t7"],
                ["dmgp12", "t7"],
                ["allp9", "t6"],
                ["watt_per_lvl1", "t7"],
                ["matt_per_lvl1", "t7"],
                ["ied35", "t7"],
                ["ied40", "t7"],
                ["ignore_dmg3", "t6"],
                ["ignore_dmg4", "t6"],
                ["boss30", "t7"],
                ["boss35", "t7"],
                ["boss40", "t7"]
            ]
        }
    },
    emblem: {
        rare: {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp3", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp50", "t1"],
                ["maxMp50", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t5"],
                ["dmgp3", "t5"],
                ["all5", "t4"],
                ["recover_hp3", "t5"],
                ["recover_mp3", "t5"],
                ["attack_poison2", "t5"],
                ["attack_stun1", "t5"],
                ["attack_slow1", "t5"],
                ["attack_dark2", "t5"],
                ["attack_freeze1", "t5"],
                ["attack_seal1", "t5"],
                ["ied15", "t5"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p3", "t1"],
                ["maxMp_p6", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t2"],
                ["dmgp6", "t2"],
                ["allp3", "t2"],
                ["recover_hp4", "t2"],
                ["recover_mp4", "t2"],
                ["ied15", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t4"],
                ["mattp3", "t4"],
                ["critp4", "t4"],
                ["dmgp3", "t4"],
                ["all5", "t2"],
                ["recover_hp3", "t3"],
                ["recover_mp3", "t3"],
                ["attack_poison2", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark2", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["maxHp_p3", "t4"],
                ["maxMp_p3", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp4", "t5"],
                ["recover_mp4", "t5"],
                ["ied15", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"]
            ],
            o2: [
               ["strp6", "t1"],
               ["dexp6", "t1"],
               ["intp6", "t1"],
               ["lukp6", "t1"],
               ["maxHp_p6", "t1"],
               ["maxMp_p6", "t1"],
               ["wattp6", "t2"],
               ["mattp6", "t2"],
               ["critp8", "t2"],
               ["dmgp6", "t2"],
               ["recover_hp2", "t2"],
               ["recover_mp2", "t2"],
               ["ied15", "t2"],
               ["strp9", "t3"],
               ["dexp9", "t3"],
               ["intp9", "t3"],
               ["lukp9", "t3"],
               ["wattp9", "t5"],
               ["mattp9", "t5"],
               ["critp9", "t4"],
               ["dmgp9", "t5"],
               ["allp6", "t4"],
               ["ied30", "t5"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["wattp12", "t3"],
                ["mattp12", "t3"],
                ["critp12", "t3"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["ied35", "t3"],
                ["ied40", "t3"]
            ],
            o2: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["wattp12", "t7"],
                ["mattp12", "t7"],
                ["critp12", "t7"],
                ["dmgp12", "t7"],
                ["allp9", "t6"],
                ["watt_per_lvl1", "t7"],
                ["matt_per_lvl1", "t7"],
                ["ied35", "t7"],
                ["ied40", "t7"]
            ]
        }
    },
    weapon: {
        rare:  {
            o1: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp1", "t3"],
                ["recover_mp1", "t3"],
                ["attack_poison1", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark1", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"]
            ],
            o2: [
                ["str6", "t1"],
                ["dex6", "t1"],
                ["int6", "t1"],
                ["luk6", "t1"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["maxHp120", "t3"],
                ["maxMp120", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["strp3", "t3"],
                ["dexp3", "t3"],
                ["intp3", "t3"],
                ["lukp3", "t3"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t5"],
                ["dmgp3", "t5"],
                ["all5", "t4"],
                ["recover_hp1", "t5"],
                ["recover_mp1", "t5"],
                ["attack_poison1", "t5"],
                ["attack_stun1", "t5"],
                ["attack_slow1", "t5"],
                ["attack_dark1", "t5"],
                ["attack_freeze1", "t5"],
                ["attack_seal1", "t5"],
                ["ied15", "t5"]
            ]
        },
        epic: {
            o1: [
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["maxHp_p3", "t1"],
                ["maxMp_p6", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t2"],
                ["dmgp6", "t2"],
                ["allp3", "t2"],
                ["recover_hp2", "t2"],
                ["recover_mp2", "t2"],
                ["ied15", "t2"]
            ],
            o2: [
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["maxHp120", "t1"],
                ["maxMp120", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["strp3", "t1"],
                ["dexp3", "t1"],
                ["intp3", "t1"],
                ["lukp3", "t1"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t3"],
                ["dmgp3", "t3"],
                ["all5", "t2"],
                ["recover_hp1", "t3"],
                ["recover_mp1", "t3"],
                ["attack_poison1", "t3"],
                ["attack_stun1", "t3"],
                ["attack_slow1", "t3"],
                ["attack_dark1", "t3"],
                ["attack_freeze1", "t3"],
                ["attack_seal1", "t3"],
                ["ied15", "t3"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["maxHp_p3", "t4"],
                ["maxMp_p3", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t5"],
                ["dmgp6", "t5"],
                ["allp3", "t5"],
                ["recover_hp2", "t5"],
                ["recover_mp2", "t5"],
                ["ied15", "t5"]
            ]
        },
        unique: {
            o1: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp9", "t2"],
                ["ied30", "t3"],
                ["boss20", "t3"],
                ["boss30", "t4"]
            ],
            o2: [
               ["strp6", "t1"],
               ["dexp6", "t1"],
               ["intp6", "t1"],
               ["lukp6", "t1"],
               ["maxHp_p6", "t1"],
               ["maxMp_p6", "t1"],
               ["wattp6", "t2"],
               ["mattp6", "t2"],
               ["critp8", "t2"],
               ["dmgp6", "t2"],
               ["allp3", "t2"],
               ["recover_hp2", "t2"],
               ["recover_mp2", "t2"],
               ["ied15", "t2"],
               ["strp9", "t3"],
               ["dexp9", "t3"],
               ["intp9", "t3"],
               ["lukp9", "t3"],
               ["wattp9", "t5"],
               ["mattp9", "t5"],
               ["critp9", "t4"],
               ["dmgp9", "t5"],
               ["allp6", "t4"],
               ["ied30", "t5"],
               ["boss20", "t5"],
               ["boss30", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["wattp12", "t3"],
                ["mattp12", "t3"],
                ["critp12", "t3"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["ied35", "t3"],
                ["ied40", "t3"],
                ["boss30", "t3"],
                ["boss35", "t3"],
                ["boss40", "t3"]
            ],
            o2: [
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["wattp9", "t3"],
                ["mattp9", "t3"],
                ["critp9", "t2"],
                ["dmgp9", "t3"],
                ["allp6", "t2"],
                ["ied30", "t3"],
                ["boss20", "t3"],
                ["boss30", "t4"],
                ["strp12", "t5"],
                ["dexp12", "t5"],
                ["intp12", "t5"],
                ["lukp12", "t5"],
                ["wattp12", "t7"],
                ["mattp12", "t7"],
                ["critp12", "t7"],
                ["dmgp12", "t7"],
                ["allp9", "t6"],
                ["watt_per_lvl1", "t7"],
                ["matt_per_lvl1", "t7"],
                ["ied35", "t7"],
                ["ied40", "t7"],
                ["boss30", "t7"],
                ["boss35", "t7"],
                ["boss40", "t7"]
            ]
        }
    }
};

/*



























































    bonus pot


























































*/
cube.pot_stats.bonus = {
    hat: {
        rare: {
            o1: [
                ["str10", "t1"],
                ["dex10", "t1"],
                ["int10", "t1"],
                ["luk10", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t1"],
                ["jump6", "t1"],
                ["watt10", "t2"],
                ["matt10", "t2"],
                ["def100", "t1"],
                ["strp2", "t2"],
                ["dexp2", "t2"],
                ["intp2", "t2"],
                ["lukp2", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["defp2", "t2"],
                ["all3", "t2"]
            ],
            o2: [
                ["str6", "t2"],
                ["dex6", "t2"],
                ["int6", "t2"],
                ["luk6", "t2"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["speed4", "t1"],
                ["jump4", "t1"],
                ["watt3", "t2"],
                ["matt3", "t2"],
                ["def60", "t1"],
                ["str10", "t3"],
                ["dex10", "t3"],
                ["int10", "t3"],
                ["luk10", "t3"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["speed6", "t3"],
                ["jump6", "t3"],
                ["watt10", "t4"],
                ["matt10", "t4"],
                ["def100", "t3"],
                ["strp2", "t4"],
                ["dexp2", "t4"],
                ["intp2", "t4"],
                ["lukp2", "t4"],
                ["maxHp_p2", "t4"],
                ["maxMp_p2", "t4"],
                ["defp2", "t4"],
                ["all3", "t4"]
            ]
        },
        epic: {
            o1: [
                ["str14", "t1"],
                ["dex14", "t1"],
                ["int14", "t1"],
                ["luk14", "t1"],
                ["maxHp180", "t1"],
                ["maxMp180", "t1"],
                ["speed8", "t1"],
                ["jump8", "t1"],
                ["watt11", "t2"],
                ["matt11", "t2"],
                ["def120", "t1"],
                ["strp4", "t2"],
                ["dexp4", "t2"],
                ["intp4", "t2"],
                ["lukp4", "t2"],
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["defp4", "t1"],
                ["allp2", "t2"]
            ],
            o2: [
                ["str10", "t1"],
                ["dex10", "t1"],
                ["int10", "t1"],
                ["luk10", "t1"],
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t1"],
                ["jump6", "t1"],
                ["watt10", "t2"],
                ["matt10", "t2"],
                ["def100", "t1"],
                ["strp2", "t2"],
                ["dexp2", "t2"],
                ["intp2", "t2"],
                ["lukp2", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["defp2", "t2"],
                ["all3", "t2"],
                ["str14", "t3"],
                ["dex14", "t3"],
                ["int14", "t3"],
                ["luk14", "t3"],
                ["maxHp180", "t3"],
                ["maxMp180", "t3"],
                ["speed8", "t3"],
                ["jump8", "t3"],
                ["watt11", "t4"],
                ["matt11", "t4"],
                ["def120", "t3"],
                ["strp4", "t4"],
                ["dexp4", "t4"],
                ["intp4", "t4"],
                ["lukp4", "t4"],
                ["maxHp_p5", "t3"],
                ["maxMp_p5", "t3"],
                ["defp4", "t3"],
                ["allp2", "t4"]
            ]
        },
        unique: {
            o1: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp240", "t1"],
                ["maxMp240", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t1"]
            ],
            o2: [
                ["str14", "t1"],
                ["dex14", "t1"],
                ["int14", "t1"],
                ["luk14", "t1"],
                ["maxHp180", "t1"],
                ["maxMp180", "t1"],
                ["speed8", "t1"],
                ["jump8", "t1"],
                ["watt11", "t2"],
                ["matt11", "t2"],
                ["def120", "t1"],
                ["strp4", "t2"],
                ["dexp4", "t2"],
                ["intp4", "t2"],
                ["lukp4", "t2"],
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["defp4", "t1"],
                ["allp2", "t2"],
                ["str16", "t3"],
                ["dex16", "t3"],
                ["int16", "t3"],
                ["luk16", "t3"],
                ["maxHp240", "t3"],
                ["maxMp240", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["def150", "t3"],
                ["strp5", "t4"],
                ["dexp5", "t4"],
                ["intp5", "t4"],
                ["lukp5", "t4"],
                ["maxHp_p7", "t3"],
                ["maxMp_p7", "t3"],
                ["defp7", "t3"],
                ["allp4", "t4"],
                ["str_per_lvl1", "t4"],
                ["dex_per_lvl1", "t4"],
                ["int_per_lvl1", "t4"],
                ["luk_per_lvl1", "t4"],
                ["resist4", "t5"],
                ["recover_hp20", "t3"]
            ]
        },
        legendary: {
            o1: [
                ["str18", "t1"],
                ["dex18", "t1"],
                ["int18", "t1"],
                ["luk18", "t1"],
                ["maxHp300", "t1"],
                ["maxMp300", "t1"],
                ["watt14", "t2"],
                ["matt14", "t2"],
                ["def200", "t1"],
                ["strp7", "t2"],
                ["dexp7", "t2"],
                ["intp7", "t2"],
                ["lukp7", "t2"],
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["defp10", "t1"],
                ["crit_dmg1", "t3"],
                ["crit_dmg1", "t3"],
                ["allp5", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["all_skill2", "t3"],
                ["resist5", "t3"],
                ["recover_hp30", "t1"],
                ["cooldown1", "t1"],
                ["meso_drop5", "t1"],
                ["item_drop5", "t1"]
            ],
            o2: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp240", "t1"],
                ["maxMp240", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t2"],
                ["str18", "t4"],
                ["dex18", "t4"],
                ["int18", "t4"],
                ["luk18", "t4"],
                ["maxHp300", "t4"],
                ["maxMp300", "t4"],
                ["watt14", "t5"],
                ["matt14", "t5"],
                ["def200", "t4"],
                ["strp7", "t5"],
                ["dexp7", "t5"],
                ["intp7", "t5"],
                ["lukp7", "t5"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["defp10", "t4"],
                ["crit_dmg1", "t6"],
                ["crit_dmg1", "t6"],
                ["allp5", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["all_skill2", "t6"],
                ["resist5", "t6"],
                ["recover_hp30", "t5"],
                ["cooldown1", "t5"],
                ["meso_drop5", "t5"],
                ["item_drop5", "t5"]
            ]
        }
    },
    top: { //before legendary same as hat
        legendary: {
            o1: [
                ["str18", "t1"],
                ["dex18", "t1"],
                ["int18", "t1"],
                ["luk18", "t1"],
                ["maxHp300", "t1"],
                ["maxMp300", "t1"],
                ["watt14", "t2"],
                ["matt14", "t2"],
                ["def200", "t1"],
                ["strp7", "t2"],
                ["dexp7", "t2"],
                ["intp7", "t2"],
                ["lukp7", "t2"],
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["defp10", "t1"],
                ["crit_dmg1", "t3"],
                ["crit_dmg1", "t3"],
                ["allp5", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["resist5", "t3"],
                ["recover_hp30", "t1"],
                ["meso_drop5", "t1"],
                ["item_drop5", "t1"]
            ],
            o2: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp240", "t1"],
                ["maxMp240", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t1"],
                ["str18", "t4"],
                ["dex18", "t4"],
                ["int18", "t4"],
                ["luk18", "t4"],
                ["maxHp300", "t4"],
                ["maxMp300", "t4"],
                ["watt14", "t5"],
                ["matt14", "t5"],
                ["def200", "t4"],
                ["strp7", "t5"],
                ["dexp7", "t5"],
                ["intp7", "t5"],
                ["lukp7", "t5"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["defp10", "t4"],
                ["crit_dmg1", "t6"],
                ["crit_dmg1", "t6"],
                ["allp5", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["resist5", "t6"],
                ["recover_hp30", "t4"],
                ["meso_drop5", "t4"],
                ["item_drop5", "t4"]
            ]
        }
    },
    bottom: {}, //same as top
    shoes: {}, //same as top
    overall: {}, //same as top
    gloves: { //before legendary same as top
        legendary: {
            o1: [
                ["str18", "t1"],
                ["dex18", "t1"],
                ["int18", "t1"],
                ["luk18", "t1"],
                ["maxHp300", "t1"],
                ["maxMp300", "t1"],
                ["watt14", "t2"],
                ["matt14", "t2"],
                ["def200", "t1"],
                ["strp7", "t2"],
                ["dexp7", "t2"],
                ["intp7", "t2"],
                ["lukp7", "t2"],
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["defp10", "t1"],
                ["crit_dmg3", "t3"],
                ["crit_dmg1", "t3"],
                ["crit_dmg3", "t3"],
                ["crit_dmg1", "t3"],
                ["allp5", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["resist5", "t3"],
                ["recover_hp30", "t2"],
                ["meso_drop5", "t2"],
                ["item_drop5", "t2"]
            ],
            o2: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp240", "t1"],
                ["maxMp240", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t2"],
                ["str18", "t4"],
                ["dex18", "t4"],
                ["int18", "t4"],
                ["luk18", "t4"],
                ["maxHp300", "t4"],
                ["maxMp300", "t4"],
                ["watt14", "t5"],
                ["matt14", "t5"],
                ["def200", "t4"],
                ["strp7", "t5"],
                ["dexp7", "t5"],
                ["intp7", "t5"],
                ["lukp7", "t5"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["defp10", "t4"],
                ["crit_dmg3", "t6"],
                ["crit_dmg1", "t6"],
                ["crit_dmg3", "t6"],
                ["crit_dmg1", "t6"],
                ["allp5", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["resist5", "t6"],
                ["recover_hp30", "t4"],
                ["meso_drop5", "t4"],
                ["item_drop5", "t4"]
            ]
        }
    },
    cape: {}, //same as top
    belt: {}, //same as top
    shoulder: {}, //same as top
    accessory: { //before legendary same as top
        legendary: {
            o1: [
                ["str18", "t1"],
                ["dex18", "t1"],
                ["int18", "t1"],
                ["luk18", "t1"],
                ["maxHp300", "t1"],
                ["maxMp300", "t1"],
                ["watt14", "t2"],
                ["matt14", "t2"],
                ["def200", "t1"],
                ["strp7", "t2"],
                ["dexp7", "t2"],
                ["intp7", "t2"],
                ["lukp7", "t2"],
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["defp10", "t1"],
                ["allp5", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["resist5", "t3"],
                ["mp_red10", "t1"],
                ["recover_hp30", "t1"],
                ["meso_drop5", "t1"],
                ["item_drop5", "t1"]
            ],
            o2: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp240", "t1"],
                ["maxMp240", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t1"],
                ["str18", "t4"],
                ["dex18", "t4"],
                ["int18", "t4"],
                ["luk18", "t4"],
                ["maxHp300", "t4"],
                ["maxMp300", "t4"],
                ["watt14", "t5"],
                ["matt14", "t5"],
                ["def200", "t4"],
                ["strp7", "t5"],
                ["dexp7", "t5"],
                ["intp7", "t5"],
                ["lukp7", "t5"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["defp10", "t4"],
                ["allp5", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["resist5", "t6"],
                ["mp_red10", "t5"],
                ["recover_hp30", "t5"],
                ["meso_drop5", "t5"],
                ["item_drop5", "t5"]
            ]
        }
    },
    earrings: {}, //same as accessory
    ring: {}, //same as accessory
    pendant: {}, //same as accessory
    mechanical_heart: { //before legendary same as hat
        legendary: {
            o1: [
                ["str18", "t1"],
                ["dex18", "t1"],
                ["int18", "t1"],
                ["luk18", "t1"],
                ["maxHp250", "t1"],
                ["maxMp250", "t1"],
                ["watt14", "t2"],
                ["matt14", "t2"],
                ["def200", "t1"],
                ["strp7", "t2"],
                ["dexp7", "t2"],
                ["intp7", "t2"],
                ["lukp7", "t2"],
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["defp10", "t1"],
                ["allp5", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["resist5", "t3"],
                ["recover_hp30", "t1"],
                ["meso_drop5", "t1"],
                ["item_drop5", "t1"]
            ],
            o2: [
                ["str16", "t1"],
                ["dex16", "t1"],
                ["int16", "t1"],
                ["luk16", "t1"],
                ["maxHp200", "t1"],
                ["maxMp200", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["def150", "t1"],
                ["strp5", "t2"],
                ["dexp5", "t2"],
                ["intp5", "t2"],
                ["lukp5", "t2"],
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["defp7", "t1"],
                ["allp4", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["resist4", "t3"],
                ["recover_hp20", "t1"],
                ["str18", "t4"],
                ["dex18", "t4"],
                ["int18", "t4"],
                ["luk18", "t4"],
                ["maxHp250", "t4"],
                ["maxMp250", "t4"],
                ["watt14", "t5"],
                ["matt14", "t5"],
                ["def200", "t4"],
                ["strp7", "t5"],
                ["dexp7", "t5"],
                ["intp7", "t5"],
                ["lukp7", "t5"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["defp10", "t4"],
                ["allp5", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["resist5", "t6"],
                ["recover_hp30", "t4"],
                ["meso_drop5", "t4"],
                ["item_drop5", "t4"]
            ]
        }
    },
    secondary: {}, //same as emblem
    force_shield: {}, //same as emblem
    shield: {}, //same as weapon
    emblem: {
        rare:  {
            o1: [
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t1"],
                ["jump6", "t1"],
                ["def100", "t1"],
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t2"],
                ["dmgp3", "t3"],
                ["all5", "t1"]
            ],
            o2: [
                ["str6", "t2"],
                ["dex6", "t2"],
                ["int6", "t2"],
                ["luk6", "t2"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["speed4", "t1"],
                ["jump4", "t1"],
                ["def60", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["speed6", "t3"],
                ["jump6", "t3"],
                ["def100", "t3"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["maxHp_p2", "t4"],
                ["maxMp_p2", "t4"],
                ["lukp3", "t4"],
                ["strp3", "t4"],
                ["dexp3", "t4"],
                ["intp3", "t4"],
                ["lukp3", "t4"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t4"],
                ["dmgp3", "t5"],
                ["all5", "t4"]
            ]
        },
        epic: {
            o1: [
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t3"],
                ["strp6", "t2"],
                ["dexp6", "t2"],
                ["intp6", "t2"],
                ["lukp6", "t2"],
                ["dmgp6", "t3"],
                ["allp3", "t2"],
                ["recover_hpb3", "t1"],
                ["recover_mpb3", "t1"],
                ["ied3", "t2"]
            ],
            o2: [
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t2"],
                ["jump6", "t1"],
                ["def100", "t1"],
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t2"],
                ["dmgp3", "t3"],
                ["maxHp_p5", "t4"],
                ["maxMp_p5", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t6"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["dmgp6", "t6"],
                ["allp3", "t5"],
                ["recover_hpb3", "t4"],
                ["recover_mpb3", "t4"],
                ["ied3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["wattp3", "t2"],
                ["mattp3", "t2"],
                ["critp9", "t3"],
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["dmgp9", "t3"],
                ["allp6", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["recover_hpb4", "t1"],
                ["recover_mpb4", "t1"],
                ["ied4", "t2"],
                ["boss12", "t2"]
            ],
            o2: [
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t3"],
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["dmgp6", "t3"],
                ["allp3", "t2"],
                ["recover_hpb3", "t1"],
                ["recover_mpb3", "t1"],
                ["ied3", "t2"],
                ["maxHp_p7", "t4"],
                ["maxMp_p7", "t4"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp9", "t5"],
                ["strp9", "t4"],
                ["dexp9", "t4"],
                ["intp9", "t4"],
                ["lukp9", "t4"],
                ["dmgp9", "t6"],
                ["allp6", "t4"],
                ["str_per_lvl1", "t5"],
                ["dex_per_lvl1", "t5"],
                ["int_per_lvl1", "t5"],
                ["luk_per_lvl1", "t5"],
                ["recover_hpb4", "t4"],
                ["recover_mpb4", "t4"],
                ["ied4", "t6"],
                ["boss12", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["wattp4", "t2"],
                ["mattp4", "t2"],
                ["critp12", "t2"],
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["abn_resist5", "t3"],
                ["ied5", "t3"],
                ["boss18", "t3"]
            ],
            o2: [
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["wattp3", "t2"],
                ["mattp3", "t2"],
                ["critp9", "t2"],
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["dmgp9", "t3"],
                ["allp6", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["recover_hpb4", "t1"],
                ["recover_mpb4", "t1"],
                ["ied4", "t3"],
                ["boss12", "t3"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["wattp4", "t5"],
                ["mattp4", "t5"],
                ["critp12", "t5"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["dmgp12", "t6"],
                ["allp9", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["watt_per_lvl1", "t6"],
                ["matt_per_lvl1", "t6"],
                ["abn_resist5", "t6"],
                ["ied5", "t6"],
                ["boss18", "t6"]
            ]
        }
    },
    weapon: {
        rare:  {
            o1: [
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t1"],
                ["jump6", "t1"],
                ["def100", "t1"],
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t2"],
                ["dmgp3", "t3"],
                ["all5", "t1"]
            ],
            o2: [
                ["str6", "t2"],
                ["dex6", "t2"],
                ["int6", "t2"],
                ["luk6", "t2"],
                ["maxHp60", "t1"],
                ["maxMp60", "t1"],
                ["speed4", "t1"],
                ["jump4", "t1"],
                ["def60", "t1"],
                ["watt6", "t2"],
                ["matt6", "t2"],
                ["maxHp100", "t3"],
                ["maxMp100", "t3"],
                ["speed6", "t3"],
                ["jump6", "t3"],
                ["def100", "t3"],
                ["str12", "t3"],
                ["dex12", "t3"],
                ["int12", "t3"],
                ["luk12", "t3"],
                ["watt12", "t4"],
                ["matt12", "t4"],
                ["maxHp_p2", "t4"],
                ["maxMp_p2", "t4"],
                ["lukp3", "t4"],
                ["strp3", "t4"],
                ["dexp3", "t4"],
                ["intp3", "t4"],
                ["wattp3", "t5"],
                ["mattp3", "t5"],
                ["critp4", "t4"],
                ["dmgp3", "t5"],
                ["all5", "t3"]
            ]
        },
        epic: {
            o1: [
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t3"],
                ["strp6", "t2"],
                ["dexp6", "t2"],
                ["intp6", "t2"],
                ["lukp6", "t2"],
                ["dmgp6", "t3"],
                ["allp3", "t2"],
                ["recover_hpb1", "t1"],
                ["recover_mpb1", "t1"],
                ["ied3", "t2"]
            ],
            o2: [
                ["maxHp100", "t1"],
                ["maxMp100", "t1"],
                ["speed6", "t1"],
                ["jump6", "t1"],
                ["def100", "t1"],
                ["str12", "t1"],
                ["dex12", "t1"],
                ["int12", "t1"],
                ["luk12", "t1"],
                ["watt12", "t2"],
                ["matt12", "t2"],
                ["maxHp_p2", "t2"],
                ["maxMp_p2", "t2"],
                ["strp3", "t2"],
                ["dexp3", "t2"],
                ["intp3", "t2"],
                ["lukp3", "t2"],
                ["wattp3", "t3"],
                ["mattp3", "t3"],
                ["critp4", "t2"],
                ["dmgp3", "t3"],
                ["all5", "t1"],
                ["maxHp_p5", "t4"],
                ["maxMp_p5", "t4"],
                ["wattp6", "t5"],
                ["mattp6", "t5"],
                ["critp8", "t6"],
                ["strp6", "t4"],
                ["dexp6", "t4"],
                ["intp6", "t4"],
                ["lukp6", "t4"],
                ["dmgp6", "t6"],
                ["allp3", "t5"],
                ["recover_hpb1", "t4"],
                ["recover_mpb1", "t4"],
                ["ied3", "t5"]
            ]
        },
        unique: {
            o1: [
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["wattp9", "t2"],
                ["mattp9", "t2"],
                ["critp9", "t3"],
                ["strp9", "t2"],
                ["dexp9", "t2"],
                ["intp9", "t2"],
                ["lukp9", "t2"],
                ["dmgp9", "t3"],
                ["allp6", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["recover_hpb2", "t1"],
                ["recover_mpb2", "t1"],
                ["ied4", "t2"],
                ["boss12", "t2"]
            ],
            o2: [
                ["maxHp_p5", "t1"],
                ["maxMp_p5", "t1"],
                ["wattp6", "t2"],
                ["mattp6", "t2"],
                ["critp8", "t3"],
                ["strp6", "t1"],
                ["dexp6", "t1"],
                ["intp6", "t1"],
                ["lukp6", "t1"],
                ["dmgp6", "t3"],
                ["allp3", "t2"],
                ["recover_hpb1", "t1"],
                ["recover_mpb1", "t1"],
                ["ied3", "t2"],                
                ["maxHp_p7", "t4"],
                ["maxMp_p7", "t4"],
                ["wattp9", "t5"],
                ["mattp9", "t5"],
                ["critp9", "t5"],
                ["strp9", "t4"],
                ["dexp9", "t4"],
                ["intp9", "t4"],
                ["lukp9", "t4"],
                ["dmgp9", "t6"],
                ["allp6", "t5"],
                ["str_per_lvl1", "t5"],
                ["dex_per_lvl1", "t5"],
                ["int_per_lvl1", "t5"],
                ["luk_per_lvl1", "t5"],
                ["recover_hpb2", "t4"],
                ["recover_mpb2", "t4"],
                ["ied4", "t6"],
                ["boss12", "t6"]
            ]
        },
        legendary: {
            o1: [
                ["maxHp_p10", "t1"],
                ["maxMp_p10", "t1"],
                ["wattp12", "t2"],
                ["mattp12", "t2"],
                ["critp12", "t2"],
                ["strp12", "t1"],
                ["dexp12", "t1"],
                ["intp12", "t1"],
                ["lukp12", "t1"],
                ["dmgp12", "t3"],
                ["allp9", "t2"],
                ["str_per_lvl2", "t2"],
                ["dex_per_lvl2", "t2"],
                ["int_per_lvl2", "t2"],
                ["luk_per_lvl2", "t2"],
                ["watt_per_lvl1", "t3"],
                ["matt_per_lvl1", "t3"],
                ["abn_resist5", "t3"],
                ["ied5", "t3"],
                ["boss18", "t3"]
            ],
            o2: [
                ["maxHp_p7", "t1"],
                ["maxMp_p7", "t1"],
                ["wattp9", "t2"],
                ["mattp9", "t2"],
                ["critp9", "t2"],
                ["strp9", "t1"],
                ["dexp9", "t1"],
                ["intp9", "t1"],
                ["lukp9", "t1"],
                ["dmgp9", "t3"],
                ["allp6", "t2"],
                ["str_per_lvl1", "t2"],
                ["dex_per_lvl1", "t2"],
                ["int_per_lvl1", "t2"],
                ["luk_per_lvl1", "t2"],
                ["recover_hpb2", "t1"],
                ["recover_mpb2", "t1"],
                ["ied4", "t3"],
                ["boss12", "t3"],
                ["maxHp_p10", "t4"],
                ["maxMp_p10", "t4"],
                ["wattp12", "t5"],
                ["mattp12", "t5"],
                ["critp12", "t5"],
                ["strp12", "t4"],
                ["dexp12", "t4"],
                ["intp12", "t4"],
                ["lukp12", "t4"],
                ["dmgp12", "t6"],
                ["allp9", "t5"],
                ["str_per_lvl2", "t5"],
                ["dex_per_lvl2", "t5"],
                ["int_per_lvl2", "t5"],
                ["luk_per_lvl2", "t5"],
                ["watt_per_lvl1", "t6"],
                ["matt_per_lvl1", "t6"],
                ["abn_resist5", "t6"],
                ["ied5", "t6"],
                ["boss18", "t6"]
            ]
        }
    }
};

//add o3, which is the same as o2 (except for some equipment)
//for both main and bpot
for (let i in cube.pot_stats.main) {
    let _i = cube.pot_stats.main[i];

    for (let j in _i) {
        let _j = _i[j];

        if (_j.o3 === undefined) {
            _j.o3 = _j.o2;
        }
    }
}

for (let i in cube.pot_stats.bonus) {
    let _i = cube.pot_stats.bonus[i];

    for (let j in _i) {
        let _j = _i[j];

        if (_j.o3 === undefined) {
            _j.o3 = _j.o2;
        }
    }
}

//rates for bonus pot is same for o2 and o3
for (let i in cube.rates.bonus) {
    let _i = cube.rates.bonus[i];

    for (let j in _i) {
        let _j = _i[j];

        if (_j.o3 === undefined) {
            _j.o3 = _j.o2;
        }
    }
}

//below equipment type share same rates or stats as a different equipment type
//main stats
let stats_cape = cube.pot_stats.main.cape;
let rates_cape = cube.rates.main.cape;

cube.pot_stats.main.belt = stats_cape;
cube.rates.main.belt = rates_cape;

cube.pot_stats.main.shoulder = stats_cape;
cube.rates.main.shoulder = rates_cape;

let stats_top = cube.pot_stats.main.cape;
let rates_top = cube.rates.main.cape;

cube.pot_stats.main.overall = stats_top;
cube.rates.main.overall = rates_top;

let stats_accessory = cube.pot_stats.main.accessory;
let rates_accessory = cube.rates.main.accessory;

cube.pot_stats.main.earrings = stats_accessory;
cube.rates.main.earrings = rates_accessory;

cube.pot_stats.main.ring = stats_accessory;
cube.rates.main.ring = rates_accessory;

cube.pot_stats.main.pendant = stats_accessory;
cube.rates.main.pendant = rates_accessory;

//bonus stats
cube.pot_stats.bonus.top.rare = cube.pot_stats.bonus.hat.rare;
cube.pot_stats.bonus.top.epic = cube.pot_stats.bonus.hat.epic;
cube.pot_stats.bonus.top.unique = cube.pot_stats.bonus.hat.unique;

cube.pot_stats.bonus.accessory.rare = cube.pot_stats.bonus.hat.rare;
cube.pot_stats.bonus.accessory.epic = cube.pot_stats.bonus.hat.epic;
cube.pot_stats.bonus.accessory.unique = cube.pot_stats.bonus.hat.unique;

cube.pot_stats.bonus.gloves.rare = cube.pot_stats.bonus.hat.rare;
cube.pot_stats.bonus.gloves.epic = cube.pot_stats.bonus.hat.epic;
cube.pot_stats.bonus.gloves.unique = cube.pot_stats.bonus.hat.unique;

cube.pot_stats.bonus.mechanical_heart.rare = cube.pot_stats.bonus.hat.rare;
cube.pot_stats.bonus.mechanical_heart.epic = cube.pot_stats.bonus.hat.epic;
cube.pot_stats.bonus.mechanical_heart.unique = cube.pot_stats.bonus.hat.unique;

let b_stats_top = cube.pot_stats.bonus.top;
let b_stats_accessory = cube.pot_stats.bonus.accessory;

let b_rates_top = cube.rates.bonus.top;

cube.pot_stats.bonus.top = b_stats_top;

cube.pot_stats.bonus.shoes = b_stats_top;
cube.rates.bonus.shoes = b_rates_top;

cube.pot_stats.bonus.cape = b_stats_top;
cube.rates.bonus.cape = b_rates_top;

cube.pot_stats.bonus.belt = b_stats_top;
cube.rates.bonus.belt = b_rates_top;

cube.pot_stats.bonus.shoulder = b_stats_top;
cube.rates.bonus.shoulder = b_rates_top;

cube.pot_stats.bonus.overall = b_stats_top;
cube.rates.bonus.overall = b_rates_top;

cube.pot_stats.bonus.bottom = b_stats_top;
cube.rates.bonus.bottom = b_rates_top;

let b_rates_accessory = cube.rates.bonus.accessory;

cube.pot_stats.bonus.earrings = b_stats_accessory;
cube.rates.bonus.earrings = b_rates_accessory;

cube.pot_stats.bonus.ring = b_stats_accessory;
cube.rates.bonus.ring = b_rates_accessory;

cube.pot_stats.bonus.pendant = b_stats_accessory;
cube.rates.bonus.pendant = b_rates_accessory;

let b_stats_emblem = cube.pot_stats.bonus.emblem;
let b_rates_fshield = cube.rates.bonus.force_shield;

cube.pot_stats.bonus.force_shield = b_stats_emblem;

cube.pot_stats.bonus.shield = b_stats_emblem;
cube.rates.bonus.shield = b_rates_fshield;

cube.pot_stats.bonus.secondary = b_stats_emblem;

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
let cubes_used = 0; //keep track of cube amount
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
            cube.cube.bind(this)("red", [], ()=>{}, {
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

    ++cubes_used;

    //log cube results
    this.idata.meta.cube_log_item = {
        cube: type,
        type: cube_type,
        tier: cube_results.tier_up.upgrade ? cube_results.tier_up.next_tier : cube_pot,
        results: cube_results,
        keep: true,
        other: opposite_current_pot, //current bonus/main depending on if current type is main/bonus
        run: cubes_used
    };

    //post-processing and update cube window
    cube.cube_draw.bind(this)(cube_results, dom, type, cb, {update_dom: o.update_dom, write_log_record: o.write_log_record});

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
        return cube.cube.bind(this)(type, dom, cb, o);
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