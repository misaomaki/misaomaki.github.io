//stat variables shared through all processes
var stats = {
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

//maplestory items
var items_store = {
    absolab: {
        thief_boots: {
            name: "AbsoLab Bandit Shoes",
            override_image: "AbsolabShoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                luk: 20,
                dex: 20,
                def: 150,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabshoes",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_boots: {
            name: "AbsoLab Knight Shoes",
            override_image: "AbsolabShoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                str: 20,
                dex: 20,
                def: 150,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoes",
            upgrades: 7,
            hammers_added: 2
        },
        mage_boots: {
            name: "AbsoLab Mage Shoes",
            override_image: "AbsolabShoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                matt: 5,
                luk: 20,
                int: 20,
                def: 150,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabshoes",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_boots: {
            name: "AbsoLab Archer Shoes",
            override_image: "AbsolabShoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                dex: 20,
                str: 20,
                def: 150,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoes",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_boots: {
            name: "AbsoLab Pirate Shoes",
            override_image: "AbsolabShoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                dex: 20,
                str: 20,
                def: 150,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoes",
            upgrades: 7,
            hammers_added: 2
        },
        thief_gloves: {
            name: "AbsoLab Bandit Gloves",
            override_image: "AbsolabGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                luk: 20,
                dex: 20,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabgloves",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_gloves: {
            name: "AbsoLab Knight Gloves",
            override_image: "AbsolabGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                str: 20,
                dex: 20,
                def: 150
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabgloves",
            upgrades: 7,
            hammers_added: 2
        },
        mage_gloves: {
            name: "AbsoLab Mage Gloves",
            override_image: "AbsolabGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                matt: 5,
                luk: 20,
                int: 20,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabgloves",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_gloves: {
            name: "AbsoLab Archer Gloves",
            override_image: "AbsolabGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                dex: 20,
                str: 20,
                def: 150
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabgloves",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_gloves: {
            name: "AbsoLab Pirate Gloves",
            override_image: "AbsolabGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                dex: 20,
                str: 20,
                def: 150
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabgloves",
            upgrades: 7,
            hammers_added: 2
        },
        thief_shoulder: {
            name: "AbsoLab Bandit Shoulder",
            override_image: "AbsolabShoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 14,
                dex: 14,
                int: 14,
                luk: 14,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        warrior_shoulder: {
            name: "AbsoLab Knight Shoulder",
            override_image: "AbsolabShoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 0,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 14,
                dex: 14,
                int: 14,
                luk: 14,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        mage_shoulder: {
            name: "AbsoLab Mage Shoulder",
            override_image: "AbsolabShoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 0,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 14,
                dex: 14,
                int: 14,
                luk: 14,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        bowman_shoulder: {
            name: "AbsoLab Archer Shoulder",
            override_image: "AbsolabShoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 0,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 14,
                dex: 14,
                int: 14,
                luk: 14,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        pirate_shoulder: {
            name: "AbsoLab Pirate Shoulder",
            override_image: "AbsolabShoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 0,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 14,
                dex: 14,
                int: 14,
                luk: 14,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        thief_cape: {
            name: "AbsoLab Bandit Cape",
            override_image: "AbsolabCape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcape",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_cape: {
            name: "AbsoLab Knight Cape",
            override_image: "AbsolabCape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcape",
            upgrades: 7,
            hammers_added: 2
        },
        mage_cape: {
            name: "AbsoLab Mage Cape",
            override_image: "AbsolabCape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcape",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_cape: {
            name: "AbsoLab Archer Cape",
            override_image: "AbsolabCape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcape",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_cape: {
            name: "AbsoLab Pirate Cape",
            override_image: "AbsolabCape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcape",
            upgrades: 7,
            hammers_added: 2
        },
        thief_hat: {
            name: "AbsoLab Bandit Cap",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 3,
                dex: 45,
                luk: 45,
                def: 400,
                ied: 0.1
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabbanditcap",
            upgrades: 11,
            hammers_added: 2
        },
        warrior_hat: {
            name: "AbsoLab Knight Helm",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 3,
                dex: 45,
                str: 45,
                def: 400,
                ied: 0.1
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabhat",
            upgrades: 11,
            hammers_added: 2
        },
        mage_hat: {
            name: "AbsoLab Mage Crown",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 3,
                luk: 45,
                int: 45,
                def: 400,
                ied: 0.1
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabmagecrown",
            upgrades: 11,
            hammers_added: 2
        },
        bowman_hat: {
            name: "AbsoLab Archer Hood",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 3,
                dex: 45,
                str: 45,
                def: 400,
                ied: 0.1
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabarcherhood",
            upgrades: 11,
            hammers_added: 2
        },
        pirate_hat: {
            name: "AbsoLab Pirate Fedora",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 3,
                dex: 45,
                str: 45,
                def: 400,
                ied: 0.1
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabpiratefedora",
            upgrades: 11,
            hammers_added: 2
        },
        thief_overall: {
            name: "AbsoLab Bandit Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                dex: 65,
                luk: 65,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabbanditsuit",
            upgrades: 12,
            hammers_added: 2
        },
        warrior_overall: {
            name: "AbsoLab Knight Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                str: 65,
                dex: 65,
                def: 300
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolaboverall",
            upgrades: 12,
            hammers_added: 2
        },
        mage_overall: {
            name: "AbsoLab Mage Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                matt: 5,
                int: 65,
                luk: 65,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabmagesuit",
            upgrades: 12,
            hammers_added: 2
        },
        bowman_overall: {
            name: "AbsoLab Archer Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                str: 65,
                dex: 65,
                def: 300
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabarchersuit",
            upgrades: 12,
            hammers_added: 2
        },
        pirate_overall: {
            name: "AbsoLab Pirate Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            superior: false,
            bstat: Object.assign({}, stats, {
                watt: 5,
                str: 65,
                dex: 65,
                def: 300
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabpiratesuit",
            upgrades: 12,
            hammers_added: 2
        },
        lazuli8: {
            name: "Lazuli Type 8",
            level: 180,
            class: "weapon",
            type: "Long Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 203,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lazuli8",
            upgrades: 8,
            hammers_added: 2 
        },
        lapis8: {
            name: "Lapis Type 8",
            level: 180,
            class: "weapon",
            type: "Heavy Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 207,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                def: 160
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lapis8",
            upgrades: 8,
            hammers_added: 2 
        },
        energy_chain_str: {
            name: "AbsoLab Whip Blade",
            alt_name: "AbsoLab Whip Blade (STR)",
            override_image: "AbsoLabWhipBlade",
            level: 160,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 154,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabwhipblade",
            upgrades: 8,
            hammers_added: 2
        },
        energy_chain_luk: {
            name: "AbsoLab Whip Blade",
            alt_name: "AbsoLab Whip Blade (LUK)",
            override_image: "AbsoLabWhipBlade",
            level: 160,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 154,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabwhipblade",
            upgrades: 8,
            hammers_added: 2
        },
        soul_shooter: {
            name: "AbsoLab Soul Shooter",
            level: 160,
            class: "weapon",
            type: "soul shooter",
            speed: "fast",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 154,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabsoulshooter",
            upgrades: 8,
            hammers_added: 2
        },
        gun: {
            name: "AbsoLab Point Gun",
            level: 160,
            class: "weapon",
            type: "gun",
            speed: "fast",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 150,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabgun",
            upgrades: 8,
            hammers_added: 2
        },
        knuckle: {
            name: "AbsoLab Blast Knuckle",
            level: 160,
            class: "weapon",
            type: "knuckle",
            speed: "normal",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 154,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabknuckle",
            upgrades: 8,
            hammers_added: 2
        },
        hand_cannon: {
            name: "AbsoLab Blast Cannon",
            level: 160,
            class: "weapon",
            type: "hand cannon",
            speed: "slow",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 210,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                def: 160
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabcannon",
            upgrades: 8,
            hammers_added: 2
        },
        bow: {
            name: "AbsoLab Sureshot Bow",
            level: 160,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabbow",
            upgrades: 8,
            hammers_added: 2
        },
        crossbow: {
            name: "AbsoLab Crossbow",
            level: 160,
            class: "weapon",
            type: "crossbow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                knockback: 0.68
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabcrossbow",
            upgrades: 8,
            hammers_added: 2
        },
        dual_bowguns: {
            name: "AbsoLab Dual Bowguns",
            level: 160,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabdualbowguns",
            upgrades: 8,
            hammers_added: 2
        },
        ancient_bow: {
            name: "AbsoLab Ancient Bow",
            level: 160,
            class: "weapon",
            type: "ancient bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabancientbow",
            upgrades: 8,
            hammers_added: 2
        },
        whispershot: {
            name: "AbsoLab Whispershot",
            level: 160,
            class: "weapon",
            type: "whispershot",
            speed: "fast",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60,
                speed: 12
            }),
            req: {
                str: 0,
                dex: 480,
                int: 0,
                luk: 0
            },
            img: "item-absolabwhispershot",
            upgrades: 8,
            hammers_added: 2
        },
        chain: {
            name: "AbsoLab Chain",
            level: 160,
            class: "weapon",
            type: "chain",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabchain",
            upgrades: 8,
            hammers_added: 2
        },
        ritual_fan: {
            name: "AbsoLab Monster Ritual Fan",
            level: 160,
            class: "weapon",
            type: "ritual fan",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabritualfan",
            upgrades: 8,
            hammers_added: 2
        },
        dagger: {
            name: "AbsoLab Blade Lord",
            level: 160,
            class: "weapon",
            type: "dagger",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 192,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabdagger",
            upgrades: 8,
            hammers_added: 2
        },
        katara: {
            name: "AbsoLab Katara",
            level: 160,
            class: "weapon",
            type: "katara",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, { 
                watt: 97,
                luk: 40            
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabkatara",
            upgrades: 7,
            hammers_added: 2 
        },
        cane: {
            name: "AbsoLab Forked Cane",
            level: 160,
            class: "weapon",
            type: "cane",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabcane",
            upgrades: 8,
            hammers_added: 2
        },
        claw: {
            name: "AbsoLab Revenge Guard",
            level: 160,
            class: "weapon",
            type: "claw",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 103,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 60,
                dex: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-absolabclaw",
            upgrades: 8,
            hammers_added: 2
        },
        shining_rod: {
            name: "AbsoLab Shining Rod",
            level: 160,
            class: "weapon",
            type: "shining rod",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabshiningrod",
            upgrades: 8,
            hammers_added: 2
        },
        scepter: {
            name: "AbsoLab Scepter",
            level: 160,
            class: "weapon",
            type: "scepter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabscepter",
            upgrades: 8,
            hammers_added: 2
        },
        psy_limiter: {
            name: "AbsoLab Psy-limiter",
            level: 160,
            class: "weapon",
            type: "psy-limiter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabpsylimiter",
            upgrades: 8,
            hammers_added: 2
        },
        lucent_gauntlet: {
            name: "AbsoLab Lucent Gauntlet",
            level: 160,
            class: "weapon",
            type: "lucent gauntlet",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolablucentgauntlet",
            upgrades: 8,
            hammers_added: 2
        },
        wand: {
            name: "AbsoLab Spellsong Wand",
            level: 160,
            class: "weapon",
            type: "wand",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabwand",
            upgrades: 8,
            hammers_added: 2
        },
        staff: {
            name: "AbsoLab Spellsong Staff",
            level: 160,
            class: "weapon",
            type: "staff",
            speed: "slow",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 151,
                matt: 245,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabstaff",
            upgrades: 8,
            hammers_added: 2
        },
        fan: {
            name: "AbsoLab Summoner",
            level: 160,
            class: "weapon",
            type: "fan",
            speed: "slow",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 143,
                matt: 241,
                boss_damage: 0.3,
                ied: 0.1,
                int: 60,
                luk: 60
            }),
            req: {
                str: 0,
                dex: 0,
                int: 480,
                luk: 0
            },
            img: "item-absolabfan",
            upgrades: 8,
            hammers_added: 2
        },
        bladecaster: {
            name: "AbsoLab Bladecaster",
            level: 160,
            class: "weapon",
            type: "bladecaster",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 205,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabbladecaster",
            upgrades: 8,
            hammers_added: 2
        },
        desperado: {
            name: "AbsoLab Desperado",
            level: 160,
            class: "weapon",
            type: "desperado",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                hp: 2250
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabdesperado",
            upgrades: 8,
            hammers_added: 2
        },
        sword: {
            name: "AbsoLab Saber",
            level: 160,
            class: "weapon",
            type: "one-handed sword",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabsword",
            upgrades: 8,
            hammers_added: 2
        },
        axe: {
            name: "AbsoLab Axe",
            level: 160,
            class: "weapon",
            type: "one-handed axe",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabaxe",
            upgrades: 8,
            hammers_added: 2
        },
        mace: {
            name: "AbsoLab Bit Hammer",
            level: 160,
            class: "weapon",
            type: "one-handed blunt weapon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabmace",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_sword: {
            name: "AbsoLab Broad Saber",
            level: 160,
            class: "weapon",
            type: "two-handed sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 205,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabtwosword",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_axe: {
            name: "AbsoLab Broad Axe",
            level: 160,
            class: "weapon",
            type: "two-handed axe",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 205,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabtwoaxe",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_mace: {
            name: "AbsoLab Broad Hammer",
            level: 160,
            class: "weapon",
            type: "two-handed blunt weapon",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 205,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabtwomace",
            upgrades: 8,
            hammers_added: 2
        },
        spear: {
            name: "AbsoLab Piercing Spear",
            level: 160,
            class: "weapon",
            type: "spear",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 205,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabspear",
            upgrades: 8,
            hammers_added: 2
        },
        polearm: {
            name: "AbsoLab Hellslayer",
            level: 160,
            class: "weapon",
            type: "polearm",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 184,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabpolearm",
            upgrades: 8,
            hammers_added: 2
        },
        katana: {
            name: "AbsoLab Katana",
            level: 160,
            class: "weapon",
            type: "katana",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 197,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabkatana",
            upgrades: 8,
            hammers_added: 2
        },
        arm_cannon: {
            name: "AbsoLab Pile God",
            level: 160,
            class: "weapon",
            type: "arm cannon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 154,
                boss_damage: 0.3,
                ied: 0.1,
                str: 60,
                dex: 60
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-absolabarmcannon",
            upgrades: 8,
            hammers_added: 2
        }
    },
    sweetwater: {
        dagger: {
            name: "Sweetwater Knife",
            level: 160,
            class: "weapon",
            type: "dagger",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, { 
                watt: 172,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: { //item requirements
                str: 0,
                dex: 0,
                int: 0,
                luk: 370
            },
            img: "item-sweetwaterdagger",
            upgrades: 8, //max upgrades no hammers
            hammers_added: 2 //current hammers added to the weapon
        },
        katara: {
            name: "Sweetwater Katara",
            level: 160,
            class: "weapon",
            type: "katara",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, { 
                watt: 86,
                boss_damage: 0.3,
                ied: 0.1,
                hp: 500
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 370
            },
            img: "item-sweetwaterkatara",
            upgrades: 7,
            hammers_added: 2 
        },
        energy_chain_luk: {
            name: "Sweetwater Chain Sword",
            alt_name: "Sweetwater Chain Sword (LUK)",
            override_image: "SweetwaterChainSword",
            level: 160,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterenergychain",
            upgrades: 8,
            hammers_added: 2
        },
        energy_chain_str: {
            name: "Sweetwater Chain Sword",
            alt_name: "Sweetwater Chain Sword (STR)",
            override_image: "SweetwaterChainSword",
            level: 160,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterenergychain",
            upgrades: 8,
            hammers_added: 2
        },
        chain: {
            name: "Sweetwater Chain",
            level: 160,
            class: "weapon",
            type: "chain",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-sweetwaterchain",
            upgrades: 8,
            hammers_added: 2
        },
        cane: {
            name: "Sweetwater Cane",
            level: 160,
            class: "weapon",
            type: "cane",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 178,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 480
            },
            img: "item-sweetwatercane",
            upgrades: 8,
            hammers_added: 2
        },
        guards: {
            name: "Sweetwater Steer",
            level: 160,
            class: "weapon",
            type: "claw",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 94,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 470
            },
            img: "item-sweetwaterguards",
            upgrades: 8,
            hammers_added: 2
        },
        ritual_fan: {
            name: "Sweetwater Ritual Fan",
            level: 160,
            class: "weapon",
            type: "ritual fan",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 172,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 370
            },
            img: "item-sweetwaterritualfan",
            upgrades: 8,
            hammers_added: 2
        },
        shining_rod: {
            name: "Sweetwater Shining Rod",
            level: 160,
            class: "weapon",
            type: "shining rod",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 208,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 475,
                luk: 0
            },
            img: "item-sweetwatershiningrod",
            upgrades: 8,
            hammers_added: 2
        },
        scepter: {
            name: "Sweetwater Tigress Scepter",
            level: 160,
            class: "weapon",
            type: "scepter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 208,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 475,
                luk: 0
            },
            img: "item-sweetwaterscepter",
            upgrades: 8,
            hammers_added: 2
        },
        psy_limiter: {
            name: "Sweetwater Psy-limiter",
            level: 160,
            class: "weapon",
            type: "psy-limiter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 208,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 475,
                luk: 0
            },
            img: "item-sweetwaterpsylimiter",
            upgrades: 8,
            hammers_added: 2
        },
        lucent_gauntlet: {
            name: "Sweetwater Lucent Gauntlet",
            level: 160,
            class: "weapon",
            type: "lucent gauntlet",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 208,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 475,
                luk: 0
            },
            img: "item-sweetwaterlucentgauntlet",
            upgrades: 8,
            hammers_added: 2
        },
        wand: {
            name: "Sweetwater Wand",
            level: 160,
            class: "weapon",
            type: "wand",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 208,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 475,
                luk: 0
            },
            img: "item-sweetwaterwand",
            upgrades: 8,
            hammers_added: 2
        },
        staff: {
            name: "Sweetwater Staff",
            level: 160,
            class: "weapon",
            type: "staff",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 132,
                matt: 210,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 483,
                luk: 0
            },
            img: "item-sweetwaterstaff",
            upgrades: 8,
            hammers_added: 2
        },
        fan: {
            name: "Sweetwater Wind",
            level: 160,
            class: "weapon",
            type: "fan",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 132,
                matt: 210,
                boss_damage: 0.3,
                ied: 0.1,
                int: 45,
                luk: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 483,
                luk: 0
            },
            img: "item-sweetwaterfan",
            upgrades: 8,
            hammers_added: 2
        },
        hand_cannon: {
            name: "Sweetwater Hand Cannon",
            level: 160,
            class: "weapon",
            type: "hand cannon",
            speed: "slow",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 182,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45,
                def: 160
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatersiegegun",
            upgrades: 8,
            hammers_added: 2
        },
        gun: {
            name: "Sweetwater Shooter",
            level: 160,
            class: "weapon",
            type: "gun",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterpistol",
            upgrades: 8,
            hammers_added: 2
        },
        knuckle: {
            name: "Sweetwater Grip",
            level: 160,
            class: "weapon",
            type: "knuckle",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterknuckle",
            upgrades: 8,
            hammers_added: 2
        },
        soul_shooter: {
            name: "Sweetwater Soul Shooter",
            level: 160,
            class: "weapon",
            type: "soul shooter",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterknuckle",
            upgrades: 8,
            hammers_added: 2
        },
        bow: {
            name: "Sweetwater Bow",
            level: 160,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                speed: 12,
                ied: 0.1,
                dex: 45,
                str: 45,
                knockback: 0.77
            }),
            req: {
                str: 0,
                dex: 490,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterbow",
            upgrades: 8,
            hammers_added: 2
        },
        crossbow: {
            name: "Sweetwater Crossbow",
            level: 160,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 168,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.1,
                dex: 45,
                str: 45,
                knockback: 0.77
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatercrossbow",
            upgrades: 8,
            hammers_added: 2
        },
        dual_bowguns: {
            name: "Sweetwater Twin Angels",
            level: 160,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45
            }),
            req: {
                str: 0,
                dex: 385,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterdualbowguns",
            upgrades: 8,
            hammers_added: 2
        },
        whispershot: {
            name: "Sweetwater Whispershot",
            level: 160,
            class: "weapon",
            type: "whispershot",
            speed: "fast",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                dex: 45,
                str: 45
            }),
            req: {
                str: 0,
                dex: 385,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterwhispershot",
            upgrades: 8,
            hammers_added: 2
        },
        ancient_bow: {
            name: "Sweetwater Ancient Bow",
            level: 160,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                speed: 12,
                ied: 0.1,
                dex: 45,
                str: 45,
                knockback: 0.77
            }),
            req: {
                str: 0,
                dex: 385,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterancientbow",
            upgrades: 8,
            hammers_added: 2
        },
        bladecaster: {
            name: "Sweetwater Bladecaster",
            level: 160,
            class: "weapon",
            type: "bladecaster",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 180,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 460,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterbladecaster",
            upgrades: 8,
            hammers_added: 2
        },
        desperado: {
            name: "Sweetwater Demon Sword",
            level: 160,
            class: "weapon",
            type: "desperado",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 180,
                boss_damage: 0.3,
                hp: 2500,
                ied: 0.1,
                str: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterdesperado",
            upgrades: 8,
            hammers_added: 2
        },
        sword: {
            name: "Sweetwater Sword",
            level: 160,
            class: "weapon",
            type: "one-handed sword",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 178,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 460,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatersaber",
            upgrades: 8,
            hammers_added: 2
        },
        axe: {
            name: "Sweetwater Axe",
            level: 160,
            class: "weapon",
            type: "one-handed axe",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 178,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 470,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwateraxe",
            upgrades: 8,
            hammers_added: 2
        },
        hammer: {
            name: "Sweetwater Mace",
            level: 160,
            class: "weapon",
            type: "one-handed blunt weapon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 178,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 350,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterhammer",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_sword: {
            name: "Sweetwater Two-handed Sword",
            level: 160,
            class: "weapon",
            type: "two-handed sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 180,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 480,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatertwohandedsword",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_axe: {
            name: "Sweetwater Two-handed Axe",
            level: 160,
            class: "weapon",
            type: "two-handed axe",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 182,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatertwohandedaxe",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_hammer: {
            name: "Sweetwater Maul",
            level: 160,
            class: "weapon",
            type: "two-handed blunt weapon",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 182,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatertwohandedhammer",
            upgrades: 8,
            hammers_added: 2
        },
        spear: {
            name: "Sweetwater Spear",
            level: 160,
            class: "weapon",
            type: "spear",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 182,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterspear",
            upgrades: 8,
            hammers_added: 2
        },
        polearm: {
            name: "Sweetwater Polearm",
            level: 160,
            class: "weapon",
            type: "polearm",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 182,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterpolearm",
            upgrades: 8,
            hammers_added: 2
        },
        katana: {
            name: "Sweetwater Katana",
            level: 160,
            class: "weapon",
            type: "katana",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 180,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterkatana",
            upgrades: 8,
            hammers_added: 2
        },
        arm_cannon: {
            name: "Sweetwater Gauntlet Buster",
            level: 160,
            class: "weapon",
            type: "arm cannon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 137,
                boss_damage: 0.3,
                ied: 0.1,
                str: 45,
                dex: 45
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterarmcannon",
            upgrades: 8,
            hammers_added: 2
        },
        belt: {
            name: "Sweetwater Belt",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            stars: 15,
            bstat: Object.assign({}, stats, {
                str: 16,
                dex: 16,
                luk: 16,
                int: 16,
                hp: 156,
                def: 156
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterbelt",
            upgrades: 1,
            hammers_added: 2
        },
        gloves: {
            name: "Sweetwater Gloves",
            override_image: "SweetwaterGloves",
            level: 160,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            stars: 15,
            bstat: Object.assign({}, stats, {
                str: 13,
                dex: 13,
                luk: 13,
                int: 13,
                watt: 22,
                matt: 22,
                def: 158
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatergloves",
            upgrades: 7,
            hammers_added: 2
        },
        shoes: {
            name: "Sweetwater Shoes",
            level: 160,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            stars: 15,
            bstat: Object.assign({}, stats, {
                str: 12,
                dex: 12,
                luk: 12,
                int: 12,
                hp: 300,
                mp: 300,
                def: 158
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatershoes",
            upgrades: 7,
            hammers_added: 2
        },
        cape: {
            name: "Sweetwater Cape",
            level: 160,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            stars: 15,
            bstat: Object.assign({}, stats, {
                str: 13,
                dex: 13,
                luk: 13,
                int: 13,
                hp: 330,
                mp: 330,
                def: 154
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatercape",
            upgrades: 7,
            hammers_added: 2
        },
        shoulder: {
            name: "Sweetwater Shoulder",
            level: 160,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                def: 61,
                str: 16,
                dex: 16,
                int: 16,
                luk: 16,
                hp: 390
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatershoulder",
            upgrades: 1,
            hammers_added: 2
        },
        hat: {
            name: "Sweetwater Hat",
            level: 160,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                str: 36,
                dex: 36,
                luk: 36,
                int: 36,
                hp: 45,
                mp: 45,
                def: 288
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterthiefhat",
            upgrades: 11,
            hammers_added: 2
        },
        suit: {
            name: "Sweetwater Suit",
            level: 160,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"],
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                str: 36,
                dex: 36,
                luk: 36,
                int: 36,
                hp: 900,
                mp: 900,
                def: 396
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwaterthiefsuit",
            upgrades: 12,
            hammers_added: 2
        },
        monocle: {
            name: "Sweetwater Monocle",
            level: 160,
            class: "armor",
            type: "eye accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                str: 10,
                dex: 10,
                int: 10,
                luk: 10,
                hp: 240,
                mp: 240,
                def: 120
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatereyepatch",
            upgrades: 5,
            hammers_added: 2
        },
        tattoo: {
            name: "Sweetwater Tattoo",
            level: 160,
            class: "armor",
            type: "face accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                def: 38,
                hp: 120,
                mp: 120
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sweetwatertattoo",
            upgrades: 5,
            hammers_added: 2
        }
    },
    pitched_boss: {
        mitras_rage_warrior: {
            name: "Mitra's Rage: Warrior",
            level: 200,
            class: "armor",
            type: "emblem",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 40,
                dex: 40,
                hp: 700
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-mrw",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        mitras_rage_thief: {
            name: "Mitra's Rage: Thief",
            level: 200,
            class: "armor",
            type: "emblem",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                dex: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-mrt",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        mitras_rage_bowman: {
            name: "Mitra's Rage: Bowman",
            level: 200,
            class: "armor",
            type: "emblem",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-mrb",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        mitras_rage_pirate: {
            name: "Mitra's Rage: Pirate",
            level: 200,
            class: "armor",
            type: "emblem",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-mrp",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        mitras_rage_magician: {
            name: "Mitra's Rage: Magician",
            level: 200,
            class: "armor",
            type: "emblem",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-mrm",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        cursed_red_spellbook: {
            name: "Cursed Red Spellbook",
            level: 200,
            class: "armor",
            type: "pocket item",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 20,
                dex: 10,
                int: 10,
                luk: 10,
                hp: 100,
                mp: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crs",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false,
            enhanceable: false
        },
        cursed_blue_spellbook: {
            name: "Cursed Blue Spellbook",
            level: 200,
            class: "armor",
            type: "pocket item",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 10,
                dex: 10,
                int: 20,
                luk: 10,
                hp: 100,
                mp: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-cbs",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false,
            enhanceable: false
        },
        cursed_green_spellbook: {
            name: "Cursed Green Spellbook",
            level: 200,
            class: "armor",
            type: "pocket item",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 10,
                dex: 20,
                int: 10,
                luk: 10,
                hp: 100,
                mp: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-cgs",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false,
            enhanceable: false
        },
        cursed_yellow_spellbook: {
            name: "Cursed Yellow Spellbook",
            level: 200,
            class: "armor",
            type: "pocket item",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 10,
                dex: 10,
                int: 10,
                luk: 20,
                hp: 100,
                mp: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-cys",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false,
            enhanceable: false
        },
        commanding_force_earrings: {
            name: "Commanding Force Earrings",
            level: 200,
            class: "armor",
            type: "earrings",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 7,
                dex: 7,
                int: 7,
                luk: 7,
                hp: 500,
                mp: 500
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-commandingforceearrings",
            upgrades: 6,
            hammers_added: 2
        },
        endless_terror: {
            name: "Endless Terror",
            level: 200,
            class: "armor",
            type: "ring",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 4,
                matt: 4,
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                hp: 250,
                mp: 250
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-endlessterror",
            upgrades: 2,
            hammers_added: 2
        },
        magic_eye_patch: {
            name: "Magic Eyepatch",
            level: 160,
            class: "armor",
            type: "eye accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 3,
                matt: 3,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-magiceyepatch",
            upgrades: 3,
            hammers_added: 2
        },
        berserked: {
            name: "Berserked",
            level: 160,
            class: "armor",
            type: "face accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 10,
                dex: 10,
                int: 10,
                luk: 10,
                def: 200
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-berserked",
            upgrades: 5,
            hammers_added: 2
        },
        source_of_suffering: {
            name: "Source of Suffering",
            level: 160,
            class: "armor",
            type: "face accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 3,
                matt: 3,
                str: 10,
                dex: 10,
                int: 10,
                luk: 10,
                p_hp: 0.05,
                def: 200
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-sourceofsuffering",
            upgrades: 5,
            hammers_added: 2
        },
        dreamy_belt: {
            name: "Dreamy Belt",
            level: 200,
            class: "armor",
            type: "belt",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 50,
                dex: 50,
                int: 50,
                luk: 50,
                hp: 150,
                mp: 150,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-dreamybelt",
            upgrades: 3,
            hammers_added: 2
        }
    },
    breath_of_divinity: {
        breath_of_divinity: {
            name: "Breath of Divinity",
            level: 150,
            class: "armor",
            type: "ring",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 25,
                matt: 25,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                hp: 200,
                mp: 200,
                speed: 18,
                jump: 10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-bod",
            upgrades: 1,
            hammers_added: 2,
            skill: "Grants the skill Dawn Shield.",
            flavor: "The Heavens themselves are watching over you."
        }
    },
    misc: {
        pink_holy_cup: {
            name: "Pink Holy Cup",
            level: 140,
            class: "armor",
            type: "pocket item",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                hp: 50,
                mp: 50
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-pinkholycup",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            enhanceable: false,
            scrollable: false
        },
        kanna_treasure: {
            name: "KannaTreasureRing",
            alt_name: "Kanna's Treasure",
            level: 140,
            class: "armor",
            type: "ring",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 1,
                matt: 1,
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                hp: 200,
                mp: 200,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-kannatreasure",
            upgrades: 1,
            hammers_added: 2
        },
        guardian_angel_ring: {
            name: "Guardian Angel Ring",
            level: 160,
            class: "armor",
            type: "ring",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                hp: 200,
                mp: 200,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-guardianangelring",
            upgrades: 2,
            hammers_added: 2
        },
        aquarius: {
            name: "Aquarius Crown",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 1,
                matt: 1,
                str: 1,
                dex: 1,
                int: 1,
                luk: 1
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-aquariuscrown",
            upgrades: 22,
            hammers_added: 2
        },
        papulatus_mark: {
            name: "Papulatus Mark",
            level: 145,
            class: "armor",
            type: "eye accessory",
            sub_class: "accessory",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                str: 8,
                dex: 8,
                int: 8,
                luk: 8,
                watt: 1,
                matt: 1,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-papulatusmark",
            upgrades: 5,
            hammers_added: 2
        }
    },
    shield: {
        deimos_sage_shield: {
            name: "Deimos Sage Shield",
            level: 130,
            class: "armor",
            type: "shield",
            speed: "",
            job: ["magician"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                int: 10,
                def: 71
            }),
            req: {
                str: 0,
                dex: 0,
                int: 420,
                luk: 0
            },
            img: "item-deimossageshield",
            upgrades: 7,
            hammers_added: 2
        },
        deimos_warrior_shield: {
            name: "Deimos Warrior Shield",
            level: 130,
            class: "armor",
            type: "shield",
            speed: "",
            job: ["warrior"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 10,
                dex: 10,
                def: 118
            }),
            req: {
                str: 420,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-deimoswarriorshield",
            upgrades: 7,
            hammers_added: 2
        },
        deimos_shadow_shield: {
            name: "Deimos Shadow Shield",
            level: 130,
            class: "armor",
            type: "shield",
            speed: "",
            job: ["thief"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                luk: 10,
                def: 99
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 420
            },
            img: "item-deimosshadowshield",
            upgrades: 7,
            hammers_added: 2
        },
        dragon_khanjar: {
            name: "Dragon Khanjar",
            level: 130,
            class: "armor",
            type: "shield",
            speed: "",
            job: ["thief"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                luk: 2,
                watt: 15,
                def: 5
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 150
            },
            img: "item-dragonkhanjar",
            upgrades: 7,
            hammers_added: 2
        },
        terminus_defender: {
            name: "Terminus Defender",
            level: 160,
            class: "armor",
            type: "shield",
            speed: "",
            job: ["warrior"],
            mstat: "", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 13,
                dex: 13,
                def: 153
            }),
            req: {
                str: 490,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-terminusdefender",
            upgrades: 8,
            hammers_added: 2
        },
    },
    heart: {
        lidium_heart: {
            name: "Lidium Heart",
            override_image: "LidiumHeart",
            level: 30,
            class: "armor",
            type: "mechanical heart",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 3,
                dex: 3,
                int: 3,
                luk: 3,
                hp: 50,
                rank: 5
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lidiumheart",
            upgrades: 7,
            hammers_added: 2
        },
        superior_lidium_heart: {
            name: "Superior Lidium Heart",
            override_image: "LidiumHeart",
            level: 80,
            class: "armor",
            type: "mechanical heart",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 3,
                dex: 3,
                int: 3,
                luk: 3,
                hp: 100,
                rank: 5
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lidiumheart",
            upgrades: 7,
            hammers_added: 2
        },
        titanium_heart: {
            name: "Titanium Heart",
            level: 100,
            class: "armor",
            type: "mechanical heart",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 3,
                dex: 3,
                int: 3,
                luk: 3,
                hp: 50,
                rank: 5
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-titaniumheart",
            upgrades: 9,
            hammers_added: 2
        },
        outlaw_heart: {
            name: "Outlaw Heart",
            level: 150,
            class: "armor",
            type: "mechanical heart",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                str: 5,
                dex: 5,
                int: 5,
                luk: 5,
                hp: 500,
                rank: 5
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-outlawheart",
            upgrades: 10,
            hammers_added: 2
        }
    },
    gollux: {
        earrings: {
            name: "Superior Gollux Earrings",
            level: 150,
            class: "armor",
            type: "earrings",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 10,
                matt: 10,
                str: 15,
                dex: 15,
                int: 15,
                luk: 15,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-supgolluxearrings",
            upgrades: 7,
            hammers_added: 2
        },
        ring: {
            name: "Superior Gollux Ring",
            level: 150,
            class: "armor",
            type: "ring",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 8,
                matt: 8,
                str: 10,
                dex: 10,
                int: 10,
                luk: 10,
                def: 150,
                hp: 250,
                mp: 250
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-supgolluxring",
            upgrades: 6,
            hammers_added: 2
        },
        pendant: {
            name: "Superior Engraved Gollux Pendant",
            level: 150,
            class: "armor",
            sub_class: "accessory",
            type: "pendant",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 28,
                dex: 28,
                int: 28,
                luk: 28,
                def: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-supgolluxpendant",
            upgrades: 6,
            hammers_added: 2
        },
        belt: {
            name: "Superior Engraved Gollux Belt",
            level: 150,
            class: "armor",
            sub_class: "accessory",
            type: "belt",
            speed: "",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 35,
                matt: 35,
                str: 60,
                dex: 60,
                int: 60,
                luk: 60,
                def: 100,
                hp: 200,
                mp: 200
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-supgolluxbelt",
            upgrades: 3,
            hammers_added: 2
        }
    },
    tyrant: {
        thief_belt: {
            name: "Tyrant Lycaon Belt",
            override_image: "TyrantBelt",
            level: 150,
            class: "armor",
            type: "belt",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: true,
            bstat: Object.assign({}, stats, {
                watt: 25,
                matt: 25,
                str: 50,
                dex: 50,
                int: 50,
                luk: 50,
                def: 105
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-tyrantbelt",
            upgrades: 1,
            hammers_added: 2
        },
        warrior_belt: {
            name: "Tyrant Hyades Belt",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_belt"
        },
        mage_belt: {
            name: "Tyrant Hermes Belt",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            override_stat: "tyrant|thief_belt"
        },
        bowman_belt: {
            name: "Tyrant Charon Belt",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_belt"
        },
        pirate_belt: {
            name: "Tyrant Altair Belt",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_belt"
        },
        thief_boots: {
            name: "Tyrant Lycaon Boots",
            override_image: "TyrantBoots",
            level: 150,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: true,
            bstat: Object.assign({}, stats, {
                watt: 30,
                matt: 30,
                str: 50,
                dex: 50,
                int: 50,
                luk: 50,
                def: 130
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-tyrantboots",
            upgrades: 2,
            hammers_added: 2
        },
        warrior_boots: {
            name: "Tyrant Hyades Boots",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_boots"
        },
        mage_boots: {
            name: "Tyrant Hermes Boots",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt",
            override_stat: "tyrant|thief_boots"
        },
        bowman_boots: {
            name: "Tyrant Charon Boots",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_boots"
        },
        pirate_boots: {
            name: "Tyrant Altair Boots",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_boots"
        },
        thief_cloak: {
            name: "Tyrant Lycaon Cloak",
            override_image: "TyrantCloak",
            level: 150,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: true,
            bstat: Object.assign({}, stats, {
                watt: 30,
                matt: 30,
                str: 50,
                dex: 50,
                int: 50,
                luk: 50,
                def: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-tyrantcloak",
            upgrades: 2,
            hammers_added: 2
        },
        warrior_cloak: {
            name: "Tyrant Hyades Cloak",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_cloak"
        },
        mage_cloak: {
            name: "Tyrant Hermes Cloak",
            job: ["magician"],
            mstat: "int", 
            pstat: ["luk", "luk"], 
            att_type: "matt",
            override_stat: "tyrant|thief_cloak"
        },
        bowman_cloak: {
            name: "Tyrant Charon Cloak",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_cloak"
        },
        pirate_cloak: {
            name: "Tyrant Altair Cloak",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            override_stat: "tyrant|thief_cloak"
        },
        thief_gloves: {
            name: "Tyrant Lycaon Gloves",
            override_image: "TyrantGloves",
            level: 150,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            superior: true,
            bstat: Object.assign({}, stats, {
                int: 12,
                luk: 12,
                def: 160,
                watt: 15
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-tyrantgloves",
            upgrades: 2,
            hammers_added: 2
        },
        warrior_gloves: {
            name: "Tyrant Hyades Gloves",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            bstat: Object.assign({}, stats, {
                str: 12,
                dex: 12,
                def: 160,
                watt: 15
            }),
            override_stat: "tyrant|thief_gloves"
        },
        mage_gloves: {
            name: "Tyrant Hermes Gloves",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt",
            bstat: Object.assign({}, stats, {
                int: 12,
                luk: 12,
                mp: 300,
                matt: 15
            }),
            override_stat: "tyrant|thief_gloves"
        },
        bowman_gloves: {
            name: "Tyrant Charon Gloves",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            bstat: Object.assign({}, stats, {
                str: 12,
                dex: 12,
                def: 160,
                watt: 15
            }),
            override_stat: "tyrant|thief_gloves"
        },
        pirate_gloves: {
            name: "Tyrant Altair Gloves",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            bstat: Object.assign({}, stats, {
                str: 12,
                dex: 12,
                def: 160,
                watt: 15
            }),
            override_stat: "tyrant|thief_gloves"
        }
    },
    crimson_root_abyss: {
        thief_hat: {
            name: "Royal Assassin Hood",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 40,
                luk: 40,
                def: 300,
                ied: 0.10,
                hp: 360,
                mp: 360
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-crathiefhat",
            upgrades: 11,
            hammers_added: 2
        },
        bowman_hat: {
            name: "Royal Ranger Beret",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 40,
                str: 40,
                def: 300,
                ied: 0.10,
                hp: 360,
                mp: 360
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-craarcherhat",
            upgrades: 11,
            hammers_added: 2
        },
        warrior_hat: {
            name: "Royal Warrior Helm",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 40,
                str: 40,
                def: 300,
                ied: 0.10,
                hp: 360,
                mp: 360
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crawarriorhat",
            upgrades: 11,
            hammers_added: 2
        },
        pirate_hat: {
            name: "Royal Wanderer Hat",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 40,
                str: 40,
                def: 300,
                ied: 0.10,
                hp: 360,
                mp: 360
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crapiratehat",
            upgrades: 11,
            hammers_added: 2
        },
        mage_hat: {
            name: "Royal Dunwitch Hat",
            level: 150,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 2,
                int: 40,
                luk: 40,
                def: 300,
                ied: 0.10,
                hp: 360,
                mp: 360
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-cramagehat",
            upgrades: 11,
            hammers_added: 2
        },
        thief_top: {
            name: "Eagle Eye Assassin Shirt",
            level: 150,
            class: "armor",
            type: "top",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                luk: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-crathieftop",
            upgrades: 7,
            hammers_added: 2
        },
        thief_bottom: {
            name: "Trixter Assassin Pants",
            level: 150,
            class: "armor",
            type: "bottom",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                luk: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-crathiefbottom",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_top: {
            name: "Eagle Eye Ranger Cowl",
            level: 150,
            class: "armor",
            type: "top",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-craarchertop",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_bottom: {
            name: "Trixter Ranger Pants",
            level: 150,
            class: "armor",
            type: "bottom",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-craarcherbottom",
            upgrades: 7,
            hammers_added: 2
        },        
        mage_top: {
            name: "Eagle Eye Dunwitch Robe",
            level: 150,
            class: "armor",
            type: "top",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 2,
                int: 30,
                luk: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-cramagetop",
            upgrades: 7,
            hammers_added: 2
        },
        mage_bottom: {
            name: "Trixter Dunwitch Pants",
            level: 150,
            class: "armor",
            type: "bottom",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 2,
                int: 30,
                luk: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-cramagebottom",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_top: {
            name: "Eagle Eye Warrior Armor",
            level: 150,
            class: "armor",
            type: "top",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 210,
                ied: 0.05
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crawarriortop",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_bottom: {
            name: "Trixter Warrior Pants",
            level: 150,
            class: "armor",
            type: "bottom",
            speed: "",
            job: ["warrior"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 210,
                ied: 0.05
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crawarriorbottom",
            upgrades: 7,
            hammers_added: 2
        },   
        pirate_top: {
            name: "Eagle Eye Wanderer Coat",
            level: 150,
            class: "armor",
            type: "top",
            speed: "",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crapiratetop",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_bottom: {
            name: "Trixter Wanderer Pants",
            level: 150,
            class: "armor",
            type: "bottom",
            speed: "",
            job: ["warrior"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 2,
                dex: 30,
                str: 30,
                def: 135,
                ied: 0.05
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-crapiratebottom",
            upgrades: 7,
            hammers_added: 2
        },
        lazuli6: {
            name: "Lazuli Type 6",
            level: 150,
            class: "weapon",
            type: "Long Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 135,
                str: 8,
                dex: 4
            }),
            req: {
                str: 420,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lazuli6",
            upgrades: 8,
            hammers_added: 2 
        },
        lazuli7: {
            name: "Lazuli Type 7",
            level: 170,
            class: "weapon",
            type: "Long Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 169,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lazuli7",
            upgrades: 8,
            hammers_added: 2 
        },
        lapis6: {
            name: "Lapis Type 6",
            level: 150,
            class: "weapon",
            type: "Heavy Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 139,
                str: 35,
                dex: 20,
                def: 130
            }),
            req: {
                str: 420,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lapis6",
            upgrades: 8,
            hammers_added: 2 
        },
        lapis7: {
            name: "Lapis Type 7",
            level: 170,
            class: "weapon",
            type: "Heavy Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 173,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                def: 150
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lapis7",
            upgrades: 8,
            hammers_added: 2 
        },
        energy_chain_str: {
            name: "Fafnir Split Edge",
            alt_name: "Fafnir Split Edge (STR)",
            override_image: "FafnirSplitEdge",
            level: 150,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 128,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirsplitedge",
            upgrades: 8,
            hammers_added: 2
        },
        energy_chain_luk: {
            name: "Fafnir Split Edge",
            alt_name: "Fafnir Split Edge (LUK)",
            override_image: "FafnirSplitEdge",
            level: 150,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 128,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirsplitedge",
            upgrades: 8,
            hammers_added: 2
        },
        soul_shooter: {
            name: "Fafnir Angelic Shooter",
            level: 150,
            class: "weapon",
            type: "soul shooter",
            speed: "fast",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 128,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirangelicshooter",
            upgrades: 8,
            hammers_added: 2
        },
        gun: {
            name: "Fafnir Zeliska",
            level: 150,
            class: "weapon",
            type: "gun",
            speed: "fast",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 125,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirzeliska",
            upgrades: 8,
            hammers_added: 2
        },
        knuckle: {
            name: "Fafnir Perry Talon",
            level: 150,
            class: "weapon",
            type: "knuckle",
            speed: "normal",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 128,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirperrytalon",
            upgrades: 8,
            hammers_added: 2
        },
        hand_cannon: {
            name: "Fafnir Lost Cannon",
            level: 150,
            class: "weapon",
            type: "hand cannon",
            speed: "slow",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 175,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                def: 121
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirhandcannon",
            upgrades: 8,
            hammers_added: 2
        },
        bow: {
            name: "Fafnir Wind Chaser",
            level: 150,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirwindchaser",
            upgrades: 8,
            hammers_added: 2
        },
        crossbow: {
            name: "Fafnir Windwing Shooter",
            level: 150,
            class: "weapon",
            type: "crossbow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirwindwingshooter",
            upgrades: 8,
            hammers_added: 2
        },
        dual_bowguns: {
            name: "Fafnir Dual Windwing",
            level: 150,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirdualwindwing",
            upgrades: 8,
            hammers_added: 2
        },
        whispershot: {
            name: "Fafnir Nightchaser",
            level: 150,
            class: "weapon",
            type: "whispershot",
            speed: "fast",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirnightchaser",
            upgrades: 8,
            hammers_added: 2
        },
        ancient_bow: {
            name: "Fafnir Ancient Bow",
            level: 150,
            class: "weapon",
            type: "ancient bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40,
                knockback: 0.75
            }),
            req: {
                str: 0,
                dex: 450,
                int: 0,
                luk: 0
            },
            img: "item-fafnirancientbow",
            upgrades: 8,
            hammers_added: 2
        },
        chain: {
            name: "Fafnir Chain",
            level: 150,
            class: "weapon",
            type: "chain",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnirchain",
            upgrades: 8,
            hammers_added: 2
        },
        ritual_fan: {
            name: "Fafnir Dragon Ritual Fan",
            level: 150,
            class: "weapon",
            type: "ritual fan",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnirritualfan",
            upgrades: 8,
            hammers_added: 2
        },
        dagger: {
            name: "Fafnir Damascus",
            level: 150,
            class: "weapon",
            type: "dagger",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 160,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnirdamascus",
            upgrades: 8,
            hammers_added: 2
        },
        katara: {
            name: "Fafnir Rapid Edge",
            level: 160,
            class: "weapon",
            type: "katara",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, { 
                watt: 81,
                luk: 30
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnirrapidedge",
            upgrades: 7,
            hammers_added: 2 
        },
        cane: {
            name: "Fafnir Ciel Claire",
            level: 150,
            class: "weapon",
            type: "cane",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnircane",
            upgrades: 8,
            hammers_added: 2
        },
        claw: {
            name: "Fafnir Risk Holder",
            level: 150,
            class: "weapon",
            type: "claw",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 86,
                boss_damage: 0.3,
                ied: 0.1,
                luk: 40,
                dex: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 450
            },
            img: "item-fafnirriskholder",
            upgrades: 8,
            hammers_added: 2
        },
        shining_rod: {
            name: "Fafnir Mana Cradle",
            level: 150,
            class: "weapon",
            type: "shining rod",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 119,
                matt: 201,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirmanacradle",
            upgrades: 8,
            hammers_added: 2
        },
        scepter: {
            name: "Fafnir Scepter",
            level: 150,
            class: "weapon",
            type: "scepter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 119,
                matt: 201,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirscepter",
            upgrades: 8,
            hammers_added: 2
        },
        psy_limiter: {
            name: "Fafnir Psy-limiter",
            level: 150,
            class: "weapon",
            type: "psy-limiter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 119,
                matt: 201,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirpsylimiter",
            upgrades: 8,
            hammers_added: 2
        },
        lucent_gauntlet: {
            name: "Fafnir Lucent Gauntlet",
            level: 150,
            class: "weapon",
            type: "lucent gauntlet",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 119,
                matt: 201,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirlucentgauntlet",
            upgrades: 8,
            hammers_added: 2
        },
        wand: {
            name: "Fafnir Mana Taker",
            level: 150,
            class: "weapon",
            type: "wand",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 119,
                matt: 201,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirwand",
            upgrades: 8,
            hammers_added: 2
        },
        staff: {
            name: "Fafnir Mana Crown",
            level: 150,
            class: "weapon",
            type: "staff",
            speed: "slow",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 204,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirstaff",
            upgrades: 8,
            hammers_added: 2
        },
        fan: {
            name: "Fafnir Indigo Flash",
            level: 150,
            class: "weapon",
            type: "fan",
            speed: "slow",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 126,
                matt: 204,
                boss_damage: 0.3,
                ied: 0.1,
                int: 40,
                luk: 40
            }),
            req: {
                str: 0,
                dex: 0,
                int: 450,
                luk: 0
            },
            img: "item-fafnirfan",
            upgrades: 8,
            hammers_added: 2
        },
        bladecaster: {
            name: "Fafnir Mercy",
            level: 150,
            class: "weapon",
            type: "bladecaster",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirbladecaster",
            upgrades: 8,
            hammers_added: 2
        },
        desperado: {
            name: "Fafnir Death Bringer",
            level: 150,
            class: "weapon",
            type: "desperado",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                hp: 2000
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirdesperado",
            upgrades: 8,
            hammers_added: 2
        },
        sword: {
            name: "Fafnir Mistilteinn",
            level: 150,
            class: "weapon",
            type: "one-handed sword",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirsword",
            upgrades: 8,
            hammers_added: 2
        },
        axe: {
            name: "Fafnir Twin Cleaver",
            level: 150,
            class: "weapon",
            type: "one-handed axe",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafniraxe",
            upgrades: 8,
            hammers_added: 2
        },
        mace: {
            name: "Fafnir Guardian Hammer",
            level: 150,
            class: "weapon",
            type: "one-handed blunt weapon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirmace",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_sword: {
            name: "Fafnir Penitent Tears",
            level: 150,
            class: "weapon",
            type: "two-handed sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirtwosword",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_axe: {
            name: "Fafnir Battle Cleaver",
            level: 150,
            class: "weapon",
            type: "two-handed axe",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirtwoaxe",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_mace: {
            name: "Fafnir Lightning Striker",
            level: 150,
            class: "weapon",
            type: "two-handed blunt weapon",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirtwomace",
            upgrades: 8,
            hammers_added: 2
        },
        spear: {
            name: "Fafnir Brionak",
            level: 150,
            class: "weapon",
            type: "spear",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 171,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirspear",
            upgrades: 8,
            hammers_added: 2
        },
        polearm: {
            name: "Fafnir Moon Glaive",
            level: 150,
            class: "weapon",
            type: "polearm",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 153,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirpolearm",
            upgrades: 8,
            hammers_added: 2
        },
        katana: {
            name: "Fafnir Raven Ring",
            level: 150,
            class: "weapon",
            type: "katana",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 164,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirkatana",
            upgrades: 8,
            hammers_added: 2
        },
        arm_cannon: {
            name: "Fafnir Big Mountain",
            level: 150,
            class: "weapon",
            type: "arm cannon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 128,
                boss_damage: 0.3,
                ied: 0.1,
                str: 40,
                dex: 40
            }),
            req: {
                str: 450,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-fafnirarmcannon",
            upgrades: 8,
            hammers_added: 2
        }
    },
    arcane_umbra: {
        dagger: {
            name: "Arcane Umbra Dagger",
            level: 200,
            class: "weapon",
            type: "dagger",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", //the main stat of the weapon, for scrolling
            pstat: ["dex", "luk"], //visible stats. these are the stats that are updated when starforcing
            att_type: "watt", //watt or matt depending on magic or weapon attack
            flame_type: 2, //whether to use normal flame values (1) or flame advantage values (2) (flame advantage starts at tier 3). type = 0 means no flames
            bstat: Object.assign({}, stats, { //the base stats of the item
                watt: 276,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: { //item requirements
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanedagger",
            upgrades: 8, //max upgrades no hammers
            hammers_added: 2 //current hammers added to the weapon
        },
        lazuli9: {
            name: "Lazuli Type 9",
            level: 200,
            class: "weapon",
            type: "Long Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 293,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lazuli9",
            upgrades: 8,
            hammers_added: 2 
        },
        lapis9: {
            name: "Lapis Type 9",
            level: 200,
            class: "weapon",
            type: "Heavy Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 297,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100,
                def: 200
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-lapis9",
            upgrades: 8,
            hammers_added: 2 
        },
        katara: {
            name: "Arcane Umbra Katara",
            level: 160,
            class: "weapon",
            type: "katara",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, { 
                watt: 140,
                luk: 65            
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanekatara",
            upgrades: 7,
            hammers_added: 2 
        },
        energy_chain_luk: {
            name: "Arcane Umbra Energy Chain",
            alt_name: "Arcane Umbra Energy Chain (LUK)", //for displaying in other places
            override_image: "ArcaneUmbraEnergyChain",
            level: 200,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 221,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneenergychain",
            upgrades: 8,
            hammers_added: 2
        },
        energy_chain_str: {
            name: "Arcane Umbra Energy Chain",
            alt_name: "Arcane Umbra Energy Chain (STR)",
            override_image: "ArcaneUmbraEnergyChain",
            level: 200,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 221,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneenergychain",
            upgrades: 8,
            hammers_added: 2
        },
        chain: {
            name: "Arcane Umbra Chain",
            level: 200,
            class: "weapon",
            type: "chain",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanechain",
            upgrades: 8,
            hammers_added: 2
        },
        cane: {
            name: "Arcane Umbra Cane",
            level: 200,
            class: "weapon",
            type: "cane",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanecane",
            upgrades: 8,
            hammers_added: 2
        },
        guards: {
            name: "Arcane Umbra Guards",
            level: 200,
            class: "weapon",
            type: "claw",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 149,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcaneguards",
            upgrades: 8,
            hammers_added: 2
        },
        ritual_fan: {
            name: "Arcane Umbra Super Ritual Fan",
            level: 200,
            class: "weapon",
            type: "ritual fan",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 100,
                dex: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcaneritualfan",
            upgrades: 8,
            hammers_added: 2
        },
        shining_rod: {
            name: "Arcane Umbra Shining Rod",
            level: 200,
            class: "weapon",
            type: "shining rod",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcaneshiningrod",
            upgrades: 8,
            hammers_added: 2
        },
        scepter: {
            name: "Arcane Umbra Scepter",
            level: 200,
            class: "weapon",
            type: "scepter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanescepter",
            upgrades: 8,
            hammers_added: 2
        },
        psy_limiter: {
            name: "Arcane Umbra Psy-limiter",
            level: 200,
            class: "weapon",
            type: "psy-limiter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanepsylimiter",
            upgrades: 8,
            hammers_added: 2
        },
        lucent_gauntlet: {
            name: "Arcane Umbra Lucent Gauntlet",
            level: 200,
            class: "weapon",
            type: "lucent gauntlet",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.1,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanelucentgauntlet",
            upgrades: 8,
            hammers_added: 2
        },
        wand: {
            name: "Arcane Umbra Wand",
            level: 200,
            class: "weapon",
            type: "wand",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanewand",
            upgrades: 8,
            hammers_added: 2
        },
        staff: {
            name: "Arcane Umbra Staff",
            level: 200,
            class: "weapon",
            type: "staff",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 218,
                matt: 353,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanestaff",
            upgrades: 8,
            hammers_added: 2
        },
        fan: {
            name: "Arcane Umbra Fan",
            level: 200,
            class: "weapon",
            type: "fan",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 206,
                matt: 347,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanefan",
            upgrades: 8,
            hammers_added: 2
        },
        hand_cannon: {
            name: "Arcane Umbra Siege Gun",
            level: 200,
            class: "weapon",
            type: "hand cannon",
            speed: "slow",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 302,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 100,
                str: 100,
                def: 200
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanesiegegun",
            upgrades: 8,
            hammers_added: 2
        },
        gun: {
            name: "Arcane Umbra Pistol",
            level: 200,
            class: "weapon",
            type: "gun",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 216,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 100,
                str: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanepistol",
            upgrades: 8,
            hammers_added: 2
        },
        knuckle: {
            name: "Arcane Umbra Knuckle",
            level: 200,
            class: "weapon",
            type: "knuckle",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 221,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 100,
                str: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneknuckle",
            upgrades: 8,
            hammers_added: 2
        },
        soul_shooter: {
            name: "Arcane Umbra Soul Shooter",
            level: 200,
            class: "weapon",
            type: "soul shooter",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 221,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 100,
                str: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanesoulshooter",
            upgrades: 8,
            hammers_added: 2
        },
        bow: {
            name: "Arcane Umbra Bow",
            level: 200,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 100,
                str: 100,
                knockback: 0.8
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanebow",
            upgrades: 8,
            hammers_added: 2
        },
        crossbow: {
            name: "Arcane Umbra Crossbow",
            level: 200,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 100,
                str: 100,
                knockback: 0.71
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanecrossbow",
            upgrades: 8,
            hammers_added: 2
        },
        dual_bowguns: {
            name: "Arcane Umbra Dual Bowguns",
            level: 200,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 100,
                str: 100
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanedualbowguns",
            upgrades: 8,
            hammers_added: 2
        },
        ancient_bow: {
            name: "Arcane Umbra Ancient Bow",
            level: 200,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 100,
                str: 100,
                knockback: 0.8
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcaneancientbow",
            upgrades: 8,
            hammers_added: 2
        },
        whispershot: {
            name: "Arcane Umbra Whispershot",
            level: 200,
            class: "weapon",
            type: "whispershot",
            speed: "fast",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 276,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 100,
                str: 100
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanewhispershot",
            upgrades: 8,
            hammers_added: 2
        },
        bladecaster: {
            name: "Arcane Umbra Bladecaster",
            level: 200,
            class: "weapon",
            type: "bladecaster",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanebladecaster",
            upgrades: 8,
            hammers_added: 2
        },
        desperado: {
            name: "Arcane Umbra Desperado",
            level: 200,
            class: "weapon",
            type: "desperado",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                hp: 2500,
                ied: 0.2,
                str: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanedesperado",
            upgrades: 8,
            hammers_added: 2
        },
        sword: {
            name: "Arcane Umbra Saber",
            level: 200,
            class: "weapon",
            type: "one-handed sword",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanesaber",
            upgrades: 8,
            hammers_added: 2
        },
        axe: {
            name: "Arcane Umbra Axe",
            level: 200,
            class: "weapon",
            type: "one-handed axe",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneaxe",
            upgrades: 8,
            hammers_added: 2
        },
        hammer: {
            name: "Arcane Umbra Hammer",
            level: 200,
            class: "weapon",
            type: "one-handed blunt weapon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanehammer",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_sword: {
            name: "Arcane Umbra Two-handed Sword",
            level: 200,
            class: "weapon",
            type: "two-handed sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanetwohandedsword",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_axe: {
            name: "Arcane Umbra Two-handed Axe",
            level: 200,
            class: "weapon",
            type: "two-handed axe",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanetwohandedaxe",
            upgrades: 8,
            hammers_added: 2
        },
        two_handed_hammer: {
            name: "Arcane Umbra Two-handed Hammer",
            level: 200,
            class: "weapon",
            type: "two-handed blunt weapon",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanetwohandedhammer",
            upgrades: 8,
            hammers_added: 2
        },
        spear: {
            name: "Arcane Umbra Spear",
            level: 200,
            class: "weapon",
            type: "spear",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 295,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanespear",
            upgrades: 8,
            hammers_added: 2
        },
        polearm: {
            name: "Arcane Umbra Polearm",
            level: 200,
            class: "weapon",
            type: "polearm",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 264,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanepolearm",
            upgrades: 8,
            hammers_added: 2
        },
        katana: {
            name: "Arcane Umbra Katana",
            level: 200,
            class: "weapon",
            type: "katana",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 283,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanekatana",
            upgrades: 8,
            hammers_added: 2
        },
        arm_cannon: {
            name: "Arcane Umbra Ellaha",
            level: 200,
            class: "weapon",
            type: "arm cannon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 221,
                boss_damage: 0.3,
                ied: 0.2,
                str: 100,
                dex: 100
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneellaha",
            upgrades: 8,
            hammers_added: 2
        },
        thief_gloves: {
            name: "Arcane Umbra Thief Gloves",
            override_image: "ArcaneUmbraGloves",
            level: 200,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                luk: 40,
                dex: 40,
                def: 250
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanegloves",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_gloves: {
            name: "Arcane Umbra Archer Gloves",
            override_image: "ArcaneUmbraGloves",
            level: 200,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanegloves",
            upgrades: 7,
            hammers_added: 2
        },
        mage_gloves: {
            name: "Arcane Umbra Mage Gloves",
            override_image: "ArcaneUmbraGloves",
            level: 200,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 9,
                str: 40,
                dex: 40,
                def: 250
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanegloves",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_gloves: {
            name: "Arcane Umbra Knight Gloves",
            override_image: "ArcaneUmbraGloves",
            level: 200,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanegloves",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_gloves: {
            name: "Arcane Umbra Pirate Gloves",
            override_image: "ArcaneUmbraGloves",
            level: 200,
            class: "armor",
            type: "gloves",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanegloves",
            upgrades: 7,
            hammers_added: 2
        },
        thief_shoes: {
            name: "Arcane Umbra Thief Shoes",
            override_image: "ArcaneUmbraShoes",
            level: 200,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                luk: 40,
                dex: 40,
                def: 250,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcaneshoes",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_shoes: {
            name: "Arcane Umbra Archer Shoes",
            override_image: "ArcaneUmbraShoes",
            level: 200,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoes",
            upgrades: 7,
            hammers_added: 2
        },
        mage_shoes: {
            name: "Arcane Umbra Mage Shoes",
            override_image: "ArcaneUmbraShoes",
            level: 200,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 9,
                str: 40,
                dex: 40,
                def: 250,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcaneshoes",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_shoes: {
            name: "Arcane Umbra Pirate Shoes",
            override_image: "ArcaneUmbraShoes",
            level: 200,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoes",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_shoes: {
            name: "Arcane Umbra Knight Shoes",
            override_image: "ArcaneUmbraShoes",
            level: 200,
            class: "armor",
            type: "shoes",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 40,
                dex: 40,
                def: 250,
                speed: 10,
                jump: 7
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoes",
            upgrades: 7,
            hammers_added: 2
        },
        thief_cape: {
            name: "Arcane Umbra Thief Cape",
            override_image: "ArcaneUmbraCape",
            level: 200,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 450
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanecape",
            upgrades: 7,
            hammers_added: 2
        },
        bowman_cape: {
            name: "Arcane Umbra Archer Cape",
            override_image: "ArcaneUmbraCape",
            level: 200,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 450
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanecape",
            upgrades: 7,
            hammers_added: 2
        },
        mage_cape: {
            name: "Arcane Umbra Mage Cape",
            override_image: "ArcaneUmbraCape",
            level: 200,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 450
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanecape",
            upgrades: 7,
            hammers_added: 2
        },
        pirate_cape: {
            name: "Arcane Umbra Pirate Cape",
            override_image: "ArcaneUmbraCape",
            level: 200,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 450
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanecape",
            upgrades: 7,
            hammers_added: 2
        },
        warrior_cape: {
            name: "Arcane Umbra Knight Cape",
            override_image: "ArcaneUmbraCape",
            level: 200,
            class: "armor",
            type: "cape",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 6,
                matt: 6,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 450
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanecape",
            upgrades: 7,
            hammers_added: 2
        },
        thief_shoulder: {
            name: "Arcane Umbra Thief Shoulder",
            override_image: "ArcaneUmbraShoulder",
            level: 200,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 20,
                matt: 20,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        bowman_shoulder: {
            name: "Arcane Umbra Archer Shoulder",
            override_image: "ArcaneUmbraShoulder",
            level: 200,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 20,
                matt: 20,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        mage_shoulder: {
            name: "Arcane Umbra Mage Shoulder",
            override_image: "ArcaneUmbraShoulder",
            level: 200,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 20,
                matt: 20,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        pirate_shoulder: {
            name: "Arcane Umbra Pirate Shoulder",
            override_image: "ArcaneUmbraShoulder",
            level: 200,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 20,
                matt: 20,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        warrior_shoulder: {
            name: "Arcane Umbra Knight Shoulder",
            override_image: "ArcaneUmbraShoulder",
            level: 200,
            class: "armor",
            type: "shoulder",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 20,
                matt: 20,
                str: 35,
                dex: 35,
                int: 35,
                luk: 35,
                def: 300
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneshoulder",
            upgrades: 1,
            hammers_added: 2
        },
        thief_hat: {
            name: "Arcane Umbra Thief Hat",
            level: 200,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 7,
                dex: 65,
                luk: 65,
                def: 600,
                ied: 0.15
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanethiefhat",
            upgrades: 11,
            hammers_added: 2
        },
        bowman_hat: {
            name: "Arcane Umbra Archer Hat",
            level: 200,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 7,
                dex: 65,
                str: 65,
                def: 600,
                ied: 0.15
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanearcherhat",
            upgrades: 11,
            hammers_added: 2
        },
        warrior_hat: {
            name: "Arcane Umbra Knight Hat",
            level: 200,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 7,
                dex: 65,
                str: 65,
                def: 600,
                ied: 0.15
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneknighthat",
            upgrades: 11,
            hammers_added: 2
        },
        pirate_hat: {
            name: "Arcane Umbra Pirate Hat",
            level: 200,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 7,
                dex: 65,
                str: 65,
                def: 600,
                ied: 0.15
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanepiratehat",
            upgrades: 11,
            hammers_added: 2
        },
        mage_hat: {
            name: "Arcane Umbra Mage Hat",
            level: 200,
            class: "armor",
            type: "hat",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 7,
                int: 65,
                luk: 65,
                def: 600,
                ied: 0.15
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanemagehat",
            upgrades: 11,
            hammers_added: 2
        },
        thief_suit: {
            name: "Arcane Umbra Thief Suit",
            level: 200,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                luk: 85,
                dex: 85,
                def: 500,
                ied: 0.10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-arcanethiefsuit",
            upgrades: 12,
            hammers_added: 2
        },
        bowman_suit: {
            name: "Arcane Umbra Archer Suit",
            level: 200,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 85,
                dex: 85,
                def: 500,
                ied: 0.10
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-arcanearchersuit",
            upgrades: 12,
            hammers_added: 2
        },
        warrior_suit: {
            name: "Arcane Umbra Knight Suit",
            level: 200,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 85,
                dex: 85,
                def: 500,
                ied: 0.10
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcaneknightsuit",
            upgrades: 12,
            hammers_added: 2
        },
        pirate_suit: {
            name: "Arcane Umbra Pirate Suit",
            level: 200,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 9,
                str: 85,
                dex: 85,
                def: 500,
                ied: 0.10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-arcanepiratesuit",
            upgrades: 12,
            hammers_added: 2
        },
        mage_suit: {
            name: "Arcane Umbra Mage Suit",
            level: 200,
            class: "armor",
            type: "overall",
            speed: "",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                matt: 9,
                int: 85,
                luk: 85,
                def: 500,
                ied: 0.10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-arcanemagesuit",
            upgrades: 12,
            hammers_added: 2
        }
    },
    genesis: {
        shining_rod: {
            name: "Genesis Shining Rod",
            level: 200,
            class: "weapon",
            type: "shining rod",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesisshiningrod",
            upgrades: 8,
            hammers_added: 0
        },
        bladecaster: {
            name: "Genesis Bladecaster",
            level: 200,
            class: "weapon",
            type: "bladecaster",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 340,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisbladecaster",
            upgrades: 8,
            hammers_added: 0
        },
        lapis: {
            name: "Genesis Lapis",
            level: 200,
            class: "weapon",
            type: "Heavy Sword",
            speed: "slow",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 342,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150,
                def: 250
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesislapis",
            upgrades: 8,
            hammers_added: 0
        },
        lazuli: {
            name: "Genesis Lazuli",
            level: 200,
            class: "weapon",
            type: "Long Sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 1,
            bstat: Object.assign({}, stats, {
                watt: 337,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesislazuli",
            upgrades: 8,
            hammers_added: 0
        },
        soul_shooter: {
            name: "Genesis Soul Shooter",
            level: 200,
            class: "weapon",
            type: "soul shooter",
            speed: "fast",
            job: ["pirate"],
            mstat: "dex", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 255,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesissoulshooter",
            upgrades: 8,
            hammers_added: 0
        },
        desperado: {
            name: "Genesis Desperado",
            level: 200,
            class: "weapon",
            type: "desperado",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 340,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                maxHP: 2800
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisdesperado",
            upgrades: 8,
            hammers_added: 0
        },
        energy_chain_str: {
            name: "Genesis Whip Blade",
            alt_name: "Genesis Whip Blade (STR)",
            override_image: "GenesisWhipBlade",
            level: 200,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "str", 
            pstat: ["str", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 255,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesiswhipblade",
            upgrades: 8,
            hammers_added: 0
        },
        energy_chain_luk: {
            name: "Genesis Whip Blade",
            alt_name: "Genesis Whip Blade (LUK)",
            override_image: "GenesisWhipBlade",
            level: 200,
            class: "weapon",
            type: "whip blade",
            speed: "fast",
            job: ["thief", "pirate"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 255,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesiswhipblade",
            upgrades: 8,
            hammers_added: 0
        },
        scepter: {
            name: "Genesis Scepter",
            level: 200,
            class: "weapon",
            type: "scepter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesisscepter",
            upgrades: 8,
            hammers_added: 0
        },
        psy_limiter: {
            name: "Genesis Psy-limiter",
            override_image: "GenesisPsyLimiter",
            level: 200,
            class: "weapon",
            type: "psy-limiter",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 6150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesispsylimiter",
            upgrades: 8,
            hammers_added: 0
        },
        chain: {
            name: "Genesis Chain",
            level: 200,
            class: "weapon",
            type: "chain",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-genesischain",
            upgrades: 8,
            hammers_added: 0
        },
        lucent_gauntlet: {
            name: "Genesis Lucent Gauntlet",
            level: 200,
            class: "weapon",
            type: "lucent gauntlet",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesislucentgauntlet",
            upgrades: 8,
            hammers_added: 0
        },
        ritual_fan: {
            name: "Genesis Ritual Fan",
            level: 200,
            class: "weapon",
            type: "ritual fan",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-genesisritualfan",
            upgrades: 8,
            hammers_added: 0
        },
        sword: {
            name: "Genesis Saber",
            level: 200,
            class: "weapon",
            type: "one-handed sword",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesissaber",
            upgrades: 8,
            hammers_added: 0
        },
        axe: {
            name: "Genesis Axe",
            level: 200,
            class: "weapon",
            type: "one-handed axe",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisaxe",
            upgrades: 8,
            hammers_added: 0
        },
        hammer: {
            name: "Genesis Hammer",
            level: 200,
            class: "weapon",
            type: "one-handed blunt weapon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesishammer",
            upgrades: 8,
            hammers_added: 0
        },
        dagger: {
            name: "Genesis Dagger",
            level: 200,
            class: "weapon",
            type: "dagger",
            speed: "fast",
            job: ["thief"],
            mstat: "luk",
            pstat: ["dex", "luk"], 
            att_type: "watt", 
            flame_type: 2, 
            bstat: Object.assign({}, stats, { 
                watt: 318,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 150,
                dex: 150
            }),
            req: { 
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-genesisdagger",
            upgrades: 8, 
            hammers_added: 0
        },
        cane: {
            name: "Genesis Cane",
            level: 200,
            class: "weapon",
            type: "cane",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-genesiscane",
            upgrades: 8,
            hammers_added: 0
        },
        wand: {
            name: "Genesis Wand",
            level: 200,
            class: "weapon",
            type: "wand",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesiswand",
            upgrades: 8,
            hammers_added: 0
        },
        staff: {
            name: "Genesis Staff",
            level: 200,
            class: "weapon",
            type: "staff",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 251,
                matt: 406,
                boss_damage: 0.3,
                ied: 0.2,
                int: 100,
                luk: 100
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesisstaff",
            upgrades: 8,
            hammers_added: 0
        },
        two_handed_sword: {
            name: "Genesis Two-handed Sword",
            override_image: "GenesisTwoHandedSword",
            level: 200,
            class: "weapon",
            type: "two-handed sword",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 340,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesistwohandedsword",
            upgrades: 8,
            hammers_added: 0
        },
        two_handed_axe: {
            name: "Genesis Two-handed Axe",
            override_image: "GenesisTwoHandedAxe",
            level: 200,
            class: "weapon",
            type: "two-handed axe",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 340,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesistwohandedaxe",
            upgrades: 8,
            hammers_added: 0
        },
        two_handed_hammer: {
            name: "Genesis Two-handed Hammer",
            override_image: "GenesisTwoHandedHammer",
            level: 200,
            class: "weapon",
            type: "two-handed blunt weapon",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 340,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesistwohandedhammer",
            upgrades: 8,
            hammers_added: 0
        },
        spear: {
            name: "Genesis Spear",
            level: 200,
            class: "weapon",
            type: "spear",
            speed: "normal",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 304,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisspear",
            upgrades: 8,
            hammers_added: 0
        },
        polearm: {
            name: "Genesis Polearm",
            level: 200,
            class: "weapon",
            type: "polearm",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 304,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesispolearm",
            upgrades: 8,
            hammers_added: 0
        },
        bow: {
            name: "Genesis Bow",
            level: 200,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 150,
                str: 150,
                knockback: 0.8
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesisbow",
            upgrades: 8,
            hammers_added: 0
        },
        crossbow: {
            name: "Genesis Crossbow",
            level: 200,
            class: "weapon",
            type: "bow",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 150,
                str: 150,
                knockback: 0.71
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesiscrossbow",
            upgrades: 8,
            hammers_added: 0
        },
        dual_bowguns: {
            name: "Genesis Dual Bowguns",
            level: 200,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 150,
                str: 150
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesisdualbowguns",
            upgrades: 8,
            hammers_added: 0
        },
        ancient_bow: {
            name: "Genesis Ancient Bow",
            level: 200,
            class: "weapon",
            type: "dual bowguns",
            speed: "normal",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 150,
                str: 150,
                knockback: 0.8
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesisancientbow",
            upgrades: 8,
            hammers_added: 0
        },
        whispershot: {
            name: "Genesis Whispershot",
            level: 200,
            class: "weapon",
            type: "whispershot",
            speed: "fast",
            job: ["bowman"],
            mstat: "dex", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 318,
                boss_damage: 0.3,
                speed: 19,
                ied: 0.2,
                dex: 150,
                str: 150
            }),
            req: {
                str: 0,
                dex: 600,
                int: 0,
                luk: 0
            },
            img: "item-genesiswhispershot",
            upgrades: 8,
            hammers_added: 0
        },
        guards: {
            name: "Genesis Guards",
            level: 200,
            class: "weapon",
            type: "claw",
            speed: "fast",
            job: ["thief"],
            mstat: "luk", 
            pstat: ["luk", "dex"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 172,
                boss_damage: 0.3,
                ied: 0.2,
                luk: 150,
                dex: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 600
            },
            img: "item-genesisguards",
            upgrades: 8,
            hammers_added: 0
        },
        knuckle: {
            name: "Genesis Claw",
            level: 200,
            class: "weapon",
            type: "knuckle",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 255,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 150,
                str: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisclaw",
            upgrades: 8,
            hammers_added: 0
        },
        gun: {
            name: "Genesis Pistol",
            level: 200,
            class: "weapon",
            type: "gun",
            speed: "fast",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 249,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 150,
                str: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesispistol",
            upgrades: 8,
            hammers_added: 0
        },
        hand_cannon: {
            name: "Genesis Siege Gun",
            level: 200,
            class: "weapon",
            type: "hand cannon",
            speed: "slow",
            job: ["pirate"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 348,
                boss_damage: 0.3,
                ied: 0.2,
                dex: 150,
                str: 150,
                def: 250
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesissiegegun",
            upgrades: 8,
            hammers_added: 0
        },
        katana: {
            name: "Genesis Katana",
            level: 200,
            class: "weapon",
            type: "katana",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 326,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesiskatana",
            upgrades: 8,
            hammers_added: 0
        },
        fan: {
            name: "Genesis Fan",
            level: 200,
            class: "weapon",
            type: "fan",
            speed: "normal",
            job: ["magician"],
            mstat: "int", 
            pstat: ["int", "luk"], 
            att_type: "matt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 237,
                matt: 400,
                boss_damage: 0.3,
                ied: 0.2,
                int: 150,
                luk: 150
            }),
            req: {
                str: 0,
                dex: 0,
                int: 600,
                luk: 0
            },
            img: "item-genesisfan",
            upgrades: 8,
            hammers_added: 0
        },
        arm_cannon: {
            name: "Genesis Ellaha",
            level: 200,
            class: "weapon",
            type: "arm cannon",
            speed: "fast",
            job: ["warrior"],
            mstat: "str", 
            pstat: ["dex", "str"], 
            att_type: "watt", 
            flame_type: 2,
            bstat: Object.assign({}, stats, {
                watt: 255,
                boss_damage: 0.3,
                ied: 0.2,
                str: 150,
                dex: 150
            }),
            req: {
                str: 600,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-genesisellaha",
            upgrades: 8,
            hammers_added: 0
        }
    },
    emblem: {
        golden_maple_leaf: {
            name: "Golden Maple Leaf Emblem",
            level: 100,
            class: "armor",
            type: "emblem",
            speed: "none",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 2,
                matt: 2,
                str: 10,
                dex: 10,
                int: 10,
                luk: 10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-goldenmapleleaf",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        honor_roll: {
            name: "Honor Roll Emblem",
            level: 100,
            class: "armor",
            type: "emblem",
            speed: "none",
            job: ["beginner", "warrior", "magician", "bowman", "thief", "pirate"],
            mstat: "", 
            pstat: ["str", "dex", "int", "luk"], 
            att_type: "att", 
            flame_type: 0,
            bstat: Object.assign({}, stats, {
                watt: 5,
                matt: 5,
                str: 10,
                dex: 10,
                int: 10,
                luk: 10
            }),
            req: {
                str: 0,
                dex: 0,
                int: 0,
                luk: 0
            },
            img: "item-honorroll",
            upgrades: 0,
            hammers_added: 0,
            starforce: false,
            scrollable: false
        },
        gold_cygnus: {
            name: "Gold Cygnus Emblem",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_mercedes: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Mercedes",
            alt_name: "Gold Heroes Emblem (Mercedes)",
            img: "img-goldheroesemblemmercedes",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_aran: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Aran",
            alt_name: "Gold Heroes Emblem (Aran)",
            img: "img-goldheroesemblemaran",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_phantom: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Phantom",
            alt_name: "Gold Heroes Emblem (Phantom)",
            img: "img-goldheroesemblemsparta",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_luminous: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Luminous",
            alt_name: "Gold Heroes Emblem (Luminous)",
            img: "img-goldheroesemblemluminous",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_evan: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Evan",
            alt_name: "Gold Heroes Emblem (Evan)",
            img: "img-goldheroesemblemevan",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_heroes_shade: {
            name: "Gold Heroes Emblem",
            override_image: "Gold Heroes Emblem Shade",
            alt_name: "Gold Heroes Emblem (Shade)",
            img: "img-goldheroesemblemshade",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_resistance: {
            name: "Gold Resistance Emblem",
            img: "img-goldresistance",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_demon: {
            name: "Gold Demon Emblem",
            img: "img-golddemon",
            override_stat: "emblem|golden_maple_leaf"
        },
        hybrid_heart: {
            name: "Hybrid Heart",
            img: "img-hybridheart",
            override_stat: "emblem|golden_maple_leaf"
        },
        eternal_time: {
            name: "Eternal Time Emblem",
            img: "img-eternaltime",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_kinesis: {
            name: "Gold Kinesis Emblem",
            img: "img-goldkinesis",
            override_stat: "emblem|golden_maple_leaf"
        },
        dragon: {
            name: "Dragon Emblem",
            img: "img-dragonemblem",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_hitman: {
            name: "Gold Hitman Emblem",
            img: "img-goldhitman",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_agent: {
            name: "Gold Agent Emblem",
            img: "img-goldagent",
            override_stat: "emblem|golden_maple_leaf"
        },
        angel: {
            name: "Angel Emblem",
            img: "img-angelemblem",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_knights: {
            name: "Gold Knight's Emblem",
            img: "img-goldknights",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_crystal: {
            name: "Gold Crystal Emblem",
            img: "img-goldcrystal",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_abyssal: {
            name: "Gold Abyssal Emblem",
            img: "img-goldabyssal",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_earthseer: {
            name: "Gold Earthseer Emblem",
            img: "img-goldearthseer",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_three_paths: {
            name: "Gold Three Paths Emblem",
            img: "img-goldthreepaths",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_astro: {
            name: "Gold Astro Emblem",
            img: "img-goldastro",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_crescent: {
            name: "Gold Crescent Emblem",
            img: "img-goldcrescent",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_blossom: {
            name: "Gold Blossom Emblem",
            img: "img-goldblossom",
            override_stat: "emblem|golden_maple_leaf"
        },
        gold_forest: {
            name: "Gold Forest Emblem",
            img: "img-goldforest",
            override_stat: "emblem|golden_maple_leaf"
        }
    }
};

//metadata that is tacked onto every item in items_store
let items_other_data = {
    stars: -1, //some items are hardcapped at a certain max star despite their item tier
    sub_class: "", //differentiate between armor classes for scrolling purposes
    max_hammers: 2, //number of hammers appliable,
    superior: false, //tyrant-related stuff
    starforce: true, //whether the item can be starforced or not
    enhanceable: true, //whether the item can be cubed
    scrollable: true, //whether the item can be scrolled
    flame_type: 2, //0 - not flammable, 1 - non-boss flames, 2 - boss flames
    skill: "", //orange text at the bottom denoting a skill
    flavor: "", //flavor text in white at the bottom
    shadowknight: false, //use shadowknight coins
    meta: {
        cube_potential: "", //potential type: rare, epic, unique, legendary
        cube_potential_bonus: "", //bonus pot
        starforce_type: "GMS", //GMS or KMS. costs are different
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
            bonus: 0
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
            let istore =  items_store[i][j];

            //if the item uses an override stat, append the stat from a different specified item's stat.
            //used when an item type shares base stats but are for different jobs or whatever
            if (istore.override_stat != null) {
                let os_s = istore.override_stat.split("|");
                istore_override = items_store[os_s[0]][os_s[1]];
            }
            
            let iod = $.extend(true, {}, items_other_data);
            
            iod.meta.max_stars = iod.stars !== -1 ? iod.stars : star_max(istore.level, istore.superior);

            items_store[i][j] = {...iod, ...istore_override, ...items_store[i][j]};
            
            istore = items_store[i][j];

            let img_name = "";

            //if item uses an override image, then append that image instead.
            //override images should share a common istore.img name
            if (istore.override_image != null) {
                if (shared_img.includes(istore.img)) continue;
                img_name = istore.override_image;
                shared_img.push(istore.img);
            } else {
                img_name = istore.name;
            }   

            //github is case sensitive for url
            img_name = img_name.replace("AbsoLab","Absolab").replace(/[\s-:']/gi,"");

            style_items += `
                .${istore.img} {
                    background: url(./assets/maple_items/${img_name}.png);
                    background-repeat: no-repeat;
                    background-size: contain;
                }
            `;   
        }
    }
    
    //css <style> tag gets appended with the dynamically-generated image code
    $("#maple_items").append(style_items);
});