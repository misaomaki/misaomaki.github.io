

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