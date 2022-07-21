
    /* some lower-level items have different upgrade slots */
    let upgrades = {
        "overall": 10,
        "top": 7,
        "bottom": 7,
        "hat": 11,
        "boots": 8,
        "gloves": 6,
        "cape": 7,
        "weapon": 8,
        "belt": 3,
        "pendant": 5,
        "face accessory": 5,
        "eye accessory": 3,
        "mechanical heart": 9,
        "earrings": 7,
        "shoulder": 1,
        "ring": 3,
        "shield": 10
    };

    let is_armor = function(type) {
        return ["overall", "top", "bottom", "hat","boots","gloves","cape", "belt", "pendant", "face accessory", "eye accessory", "mechanical heart", "earrings", "shoulder", "ring", "shield", "totem", "badge"].includes(type);
    }

    let get_jobs = function(job) {
        if (
            ["adele", "demon avenger", "hayato", "blaster"].includes(job) 
        ) {
            return "warrior";
        } else if (
            ["kain","pathfinder"].includes(job)
        ) {
            return "bowman";
        } else if (
            ["luminous", "beast tamer", "kinesis", "illium", "kanna"].includes(job)
        ) {
            return "magician";
        } else if (
            ["xenon", "hoyoung", "cadena"].includes(job)
        ) {
            return "thief";
        } else if (
            ["angelic buster"].includes(job)
        ) {
            return "pirate";
        }

        return job;
    }

    let p_stat = {
        "warrior": ["str", "dex"],
        "bowman": ["str", "dex"],
        "magician": ["int", "luk"],
        "thief": ["dex", "luk"],
        "pirate": ["str", "dex"]
    };

    let m_stat = {
        "warrior": "str",
        "bowman": "dex",
        "magician": "int",
        "thief": "luk",
        "pirate": "dex"
    };

    /* resolve maplewiki stat to internal stat */
    let resolve_stat = function(stat) {
        switch (stat) {
            case "defense":
                return "def";
            break;
            case "maxhp":
                return "hp";
            break;
            case "maxmp":
                return "mp";
            break;
            case "weaponattack":
                return "watt";
            break;
            case "magicattack":
                return "matt";
            break;
            case "attackspeed":
            case "allstats":
                return "";
            break;
            case "bossdamage": 
                return "boss_damage";
            break;
            case "ignoredenemydefense":
                return "ied";
            break;
        }

        return stat;
    }

    /* template of item_db item */
    let item_template = {
        name: "",
        level: 0,
        class: "",
        type: "",
        speed: "",
        job: [],
        mstat: "", 
        pstat: ["str", "dex", "int", "luk"], 
        att_type: "att", 
        flame_type: 2,
        bstat: {},
        req: {
            str: 0,
            dex: 0,
            int: 0,
            luk: 0
        },
        img: "",
        upgrades: 0,
        hammers_added: 0,
        starforce: true,
        enhanceable: true,
        scrollable: true
    };

    //stat variables shared through all processes
    let stats = {
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

    let regex_removespecialchar = /[\s-'\(\)]/gi;