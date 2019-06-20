var item_db_rangified = {};

var gacha_db = {
    "a": [{
        "name": "Titanium Heart",
        "chance": 0.2,
        "item_idx": "8328"
    }, {
        "name": "AbsoLab Archer Cape",
        "chance": 0.3,
        "item_idx": "8409"
    }, {
        "name": "AbsoLab Archer Gloves",
        "chance": 0.3,
        "item_idx": "8394"
    }, {
        "name": "AbsoLab Archer Hood",
        "chance": 0.3,
        "item_idx": "8399"
    }, {
        "name": "AbsoLab Archer Shoes",
        "chance": 0.3,
        "item_idx": "8414"
    }, {
        "name": "AbsoLab Archer Shoulder",
        "chance": 0.3,
        "item_idx": "8389"
    }, {
        "name": "AbsoLab Archer Suit",
        "chance": 0.3,
        "item_idx": "8404"
    }, {
        "name": "AbsoLab Bandit Cap",
        "chance": 0.3,
        "item_idx": "8400"
    }, {
        "name": "AbsoLab Bandit Cape",
        "chance": 0.3,
        "item_idx": "8410"
    }, {
        "name": "AbsoLab Bandit Gloves",
        "chance": 0.3,
        "item_idx": "8395"
    }, {
        "name": "AbsoLab Bandit Shoes",
        "chance": 0.3,
        "item_idx": "8415"
    }, {
        "name": "AbsoLab Bandit Suit",
        "chance": 0.3,
        "item_idx": "8405"
    }, {
        "name": "AbsoLab Knight Cape",
        "chance": 0.3,
        "item_idx": "8407"
    }, {
        "name": "AbsoLab Knight Gloves",
        "chance": 0.3,
        "item_idx": "8392"
    }, {
        "name": "AbsoLab Knight Helm",
        "chance": 0.3,
        "item_idx": "8397"
    }, {
        "name": "AbsoLab Knight Shoes",
        "chance": 0.3,
        "item_idx": "8412"
    }, {
        "name": "AbsoLab Knight Shoulder",
        "chance": 0.3,
        "item_idx": "8387"
    }, {
        "name": "AbsoLab Knight Suit",
        "chance": 0.3,
        "item_idx": "8402"
    }, {
        "name": "AbsoLab Mage Cape",
        "chance": 0.3,
        "item_idx": "8408"
    }, {
        "name": "AbsoLab Mage Crown",
        "chance": 0.3,
        "item_idx": "8398"
    }, {
        "name": "AbsoLab Mage Gloves",
        "chance": 0.3,
        "item_idx": "8393"
    }, {
        "name": "AbsoLab Mage Shoes",
        "chance": 0.3,
        "item_idx": "8413"
    }, {
        "name": "AbsoLab Mage Shoulder",
        "chance": 0.3,
        "item_idx": "8388"
    }, {
        "name": "AbsoLab Mage Suit",
        "chance": 0.3,
        "item_idx": "8403"
    }, {
        "name": "AbsoLab Pirate Cape",
        "chance": 0.3,
        "item_idx": "8411"
    }, {
        "name": "AbsoLab Pirate Fedora",
        "chance": 0.3,
        "item_idx": "8401"
    }, {
        "name": "AbsoLab Pirate Gloves",
        "chance": 0.3,
        "item_idx": "8396"
    }, {
        "name": "AbsoLab Pirate Shoes",
        "chance": 0.3,
        "item_idx": "8416"
    }, {
        "name": "AbsoLab Pirate Shoulder",
        "chance": 0.3,
        "item_idx": "8391"
    }, {
        "name": "AbsoLab Pirate Suit",
        "chance": 0.3,
        "item_idx": "8406"
    }, {
        "name": "AbsoLab Thief Shoulder",
        "chance": 0.3,
        "item_idx": "8390"
    }, {
        "name": "Alicia's Mutated Staff",
        "chance": 0.09,
        "item_idx": "8435"
    }, {
        "name": "Aquarius Crown",
        "chance": 0.06,
        "item_idx": "8437"
    }, {
        "name": "Arcane Umbra Archer Cape",
        "chance": 0.01,
        "item_idx": "8427"
    }, {
        "name": "Arcane Umbra Archer Gloves",
        "chance": 0.01,
        "item_idx": "8422"
    }, {
        "name": "Arcane Umbra Knight Cape",
        "chance": 0.01,
        "item_idx": "8425"
    }, {
        "name": "Arcane Umbra Knight Gloves",
        "chance": 0.01,
        "item_idx": "8420"
    }, {
        "name": "Arcane Umbra Knight Shoes",
        "chance": 0.01,
        "item_idx": "8417"
    }, {
        "name": "Arcane Umbra Mage Cape",
        "chance": 0.01,
        "item_idx": "8426"
    }, {
        "name": "Arcane Umbra Mage Gloves",
        "chance": 0.01,
        "item_idx": "8421"
    }, {
        "name": "Arcane Umbra Pirate Cape",
        "chance": 0.01,
        "item_idx": "8429"
    }, {
        "name": "Arcane Umbra Pirate Gloves",
        "chance": 0.01,
        "item_idx": "8424"
    }, {
        "name": "Arcane Umbra Pirate Shoes",
        "chance": 0.01,
        "item_idx": "8419"
    }, {
        "name": "Arcane Umbra Thief Cape",
        "chance": 0.01,
        "item_idx": "8428"
    }, {
        "name": "Arcane Umbra Thief Gloves",
        "chance": 0.01,
        "item_idx": "8423"
    }, {
        "name": "Arcane Umbra Thief Shoes",
        "chance": 0.01,
        "item_idx": "8418"
    }, {
        "name": "Cursed Kaiserium",
        "chance": 0.09,
        "item_idx": "8444"
    }, {
        "name": "Fafnir Angelic Shooter",
        "chance": 0.4,
        "item_idx": "8330"
    }, {
        "name": "Fafnir Battle Cleaver",
        "chance": 0.4,
        "item_idx": "8344"
    }, {
        "name": "Fafnir Big Mountain",
        "chance": 0.4,
        "item_idx": "8360"
    }, {
        "name": "Fafnir Brionak",
        "chance": 0.4,
        "item_idx": "8346"
    }, {
        "name": "Fafnir Chain",
        "chance": 0.4,
        "item_idx": "8358"
    }, {
        "name": "Fafnir Ciel Claire",
        "chance": 0.4,
        "item_idx": "8340"
    }, {
        "name": "Fafnir Damascus",
        "chance": 0.4,
        "item_idx": "8338"
    }, {
        "name": "Fafnir Death Bringer",
        "chance": 0.4,
        "item_idx": "8331"
    }, {
        "name": "Fafnir Dual Windwing",
        "chance": 0.4,
        "item_idx": "8353"
    }, {
        "name": "Fafnir Guardian Hammer",
        "chance": 0.4,
        "item_idx": "8337"
    }, {
        "name": "Fafnir Indigo Flash",
        "chance": 0.4,
        "item_idx": "8356"
    }, {
        "name": "Fafnir Lightning Striker",
        "chance": 0.4,
        "item_idx": "8345"
    }, {
        "name": "Fafnir Lost Cannon",
        "chance": 0.4,
        "item_idx": "8354"
    }, {
        "name": "Fafnir Lucent Gauntlet",
        "chance": 0.4,
        "item_idx": "8359"
    }, {
        "name": "Fafnir Mana Crown",
        "chance": 0.4,
        "item_idx": "8342"
    }, {
        "name": "Fafnir Mana Taker",
        "chance": 0.4,
        "item_idx": "8341"
    }, {
        "name": "Fafnir Mana Cradle",
        "chance": 0.4,
        "item_idx": "8329"
    }, {
        "name": "Fafnir Perry Talon",
        "chance": 0.4,
        "item_idx": "8351"
    }, {
        "name": "Fafnir Moon Glaive",
        "chance": 0.4,
        "item_idx": "8347"
    }, {
        "name": "Fafnir Mistilteinn",
        "chance": 0.4,
        "item_idx": "8335"
    }, {
        "name": "Fafnir Penitent Tears",
        "chance": 0.4,
        "item_idx": "8343"
    }, {
        "name": "Fafnir Psy-limiter",
        "chance": 0.4,
        "item_idx": "8357"
    }, {
        "name": "Fafnir Rapid Edge",
        "chance": 0.4,
        "item_idx": "8339"
    }, {
        "name": "Fafnir Raven Ring",
        "chance": 0.4,
        "item_idx": "8355"
    }, {
        "name": "Fafnir Risk Holder",
        "chance": 0.4,
        "item_idx": "8350"
    }, {
        "name": "Fafnir Scepter",
        "chance": 0.4,
        "item_idx": "8334"
    }, {
        "name": "Fafnir Split Edge (Pirate Set)",
        "chance": 0.4,
        "item_idx": "8333"
    }, {
        "name": "Fafnir Split Edge (Thief Set)",
        "chance": 0.4,
        "item_idx": "8332"
    }, {
        "name": "Fafnir Twin Cleaver",
        "chance": 0.4,
        "item_idx": "8336"
    }, {
        "name": "Fafnir Wind Chaser",
        "chance": 0.4,
        "item_idx": "8348"
    }, {
        "name": "Fafnir Windwing Shooter",
        "chance": 0.4,
        "item_idx": "8349"
    }, {
        "name": "Fafnir Zeliska",
        "chance": 0.4,
        "item_idx": "8352"
    }, {
        "name": "Firestarter Ring",
        "chance": 0.02,
        "item_idx": "8454"
    }, {
        "name": "Lightseeker",
        "chance": 0.09,
        "item_idx": "8436"
    }, {
        "name": "Lucid's Earrings",
        "chance": 0.09,
        "item_idx": "8438"
    }, {
        "name": "Meister Shoulder",
        "chance": 0.1,
        "item_idx": "8431"
    }, {
        "name": "Reaper's Pendant",
        "chance": 0.05,
        "item_idx": "8446"
    }, {
        "name": "Ryude's Sword",
        "chance": 0.07,
        "item_idx": "8434"
    }, {
        "name": "Scarlet Earring",
        "chance": 0.4,
        "item_idx": "8362"
    }, {
        "name": "Scarlet Ring",
        "chance": 0.4,
        "item_idx": "8361"
    }, {
        "name": "Scarlet Shoulder",
        "chance": 0.4,
        "item_idx": "8363"
    }, {
        "name": "Superior Engraved Gollux Belt",
        "chance": 0.3,
        "item_idx": "8364"
    }, {
        "name": "Superior Engraved Gollux Pendant",
        "chance": 0.3,
        "item_idx": "8365"
    }, {
        "name": "Superior Gollux Earrings",
        "chance": 0.1,
        "item_idx": "8366"
    }, {
        "name": "The Ring of Torment",
        "chance": 0.02,
        "item_idx": "8455"
    }, {
        "name": "Tinkerer's Black Belt",
        "chance": 0.05,
        "item_idx": "8442"
    }, {
        "name": "Tinkerer's Black Shoulder Accessory",
        "chance": 0.05,
        "item_idx": "8443"
    }, {
        "name": "Tyrant Altair Belt",
        "chance": 0.3,
        "item_idx": "8386"
    }, {
        "name": "Tyrant Altair Boots",
        "chance": 0.3,
        "item_idx": "8381"
    }, {
        "name": "Tyrant Altair Cloak",
        "chance": 0.3,
        "item_idx": "8376"
    }, {
        "name": "Tyrant Altair Gloves",
        "chance": 0.3,
        "item_idx": "8371"
    }, {
        "name": "Tyrant Charon Belt",
        "chance": 0.3,
        "item_idx": "8384"
    }, {
        "name": "Tyrant Charon Boots",
        "chance": 0.3,
        "item_idx": "8379"
    }, {
        "name": "Tyrant Charon Cloak",
        "chance": 0.3,
        "item_idx": "8374"
    }, {
        "name": "Tyrant Charon Gloves",
        "chance": 0.3,
        "item_idx": "8369"
    }, {
        "name": "Tyrant Hermes Belt",
        "chance": 0.3,
        "item_idx": "8383"
    }, {
        "name": "Tyrant Hermes Boots",
        "chance": 0.3,
        "item_idx": "8378"
    }, {
        "name": "Tyrant Hermes Cloak",
        "chance": 0.3,
        "item_idx": "8373"
    }, {
        "name": "Tyrant Hermes Gloves",
        "chance": 0.3,
        "item_idx": "8368"
    }, {
        "name": "Tyrant Hyades Belt",
        "chance": 0.3,
        "item_idx": "8382"
    }, {
        "name": "Tyrant Hyades Boots",
        "chance": 0.3,
        "item_idx": "8377"
    }, {
        "name": "Tyrant Hyades Cloak",
        "chance": 0.3,
        "item_idx": "8372"
    }, {
        "name": "Tyrant Hyades Gloves",
        "chance": 0.3,
        "item_idx": "8367"
    }, {
        "name": "Tyrant Lycaon Belt",
        "chance": 0.3,
        "item_idx": "8385"
    }, {
        "name": "Tyrant Lycaon Boots",
        "chance": 0.3,
        "item_idx": "8380"
    }, {
        "name": "Tyrant Lycaon Cloak",
        "chance": 0.3,
        "item_idx": "8375"
    }, {
        "name": "Tyrant Lycaon Gloves",
        "chance": 0.3,
        "item_idx": "8370"
    }, {
        "name": "Rifle Bullet",
        "chance": 0.02,
        "item_idx": "8447"
    }, {
        "name": "King of Beasts Hide",
        "chance": 0.07,
        "item_idx": "8432"
    }, {
        "name": "King of Beasts Totem",
        "chance": 0.07,
        "item_idx": "8433"
    }, {
        "name": "Dark Avenger Totem",
        "chance": 0.02,
        "item_idx": "8449"
    }, {
        "name": "Dark Doom Totem",
        "chance": 0.02,
        "item_idx": "8448"
    }, {
        "name": "Dark Grin Totem",
        "chance": 0.02,
        "item_idx": "8451"
    }, {
        "name": "Dark Hellia Totem",
        "chance": 0.02,
        "item_idx": "8450"
    }, {
        "name": "Frenzy Totem",
        "chance": 0.02,
        "item_idx": "8453"
    }, {
        "name": "Hunter Totem",
        "chance": 0.02,
        "item_idx": "8452"
    }, {
        "name": "100% 15-Star Enhancement (Lv. 150)",
        "chance": 0.07,
        "item_idx": "8439"
    }, {
        "name": "100% 15-Star Enhancement (Lv. 160)",
        "chance": 0.07,
        "item_idx": "8440"
    }, {
        "name": "100% 17-Star Enhancement (Lv. 150)",
        "chance": 0.05,
        "item_idx": "8456"
    }, {
        "name": "100% 17-Star Enhancement (Lv. 160)",
        "chance": 0.05,
        "item_idx": "8457"
    }, {
        "name": "9th Anniversary Prime Scroll for Accessory",
        "chance": 0.9,
        "item_idx": "8303"
    }, {
        "name": "9th Anniversary Prime Scroll for Armor",
        "chance": 0.9,
        "item_idx": "8306"
    }, {
        "name": "9th Anniversary Prime Scroll for One-Handed Weapon",
        "chance": 0.9,
        "item_idx": "8304"
    }, {
        "name": "9th Anniversary Prime Scroll for Two-Handed Weapon",
        "chance": 0.9,
        "item_idx": "8305"
    }, {
        "name": "Advanced Equip Enhancement Scroll",
        "chance": 1.5,
        "item_idx": "8308"
    }, {
        "name": "Advanced Equip Enhancement Scroll (2)",
        "chance": 1.5,
        "item_idx": "8309"
    }, {
        "name": "Incredible Chaos Scroll of Goodness 50% (3)",
        "chance": 5,
        "item_idx": "8296"
    }, {
        "name": "Legendary Potential Scroll 50%",
        "chance": 0.07,
        "item_idx": "8430"
    }, {
        "name": "Unique Potential Scroll 100%",
        "chance": 0.1,
        "item_idx": "8325"
    }, {
        "name": "Unique Potential Scroll 60%",
        "chance": 1.5,
        "item_idx": "8327"
    }, {
        "name": "Unique Potential Scroll 80%",
        "chance": 0.1,
        "item_idx": "8326"
    }, {
        "name": "Red Cube (11)",
        "chance": 0.5,
        "item_idx": "8316"
    }, {
        "name": "Black Cube (5)",
        "chance": 0.5,
        "item_idx": "8317"
    }, {
        "name": "Black Cube (11)",
        "chance": 0.4,
        "item_idx": "8319"
    }, {
        "name": "Bonus Potential Cube (5)",
        "chance": 0.5,
        "item_idx": "8318"
    }, {
        "name": "Bonus Potential Cube (11)",
        "chance": 0.4,
        "item_idx": "8320"
    }, {
        "name": "Violet Cube (3)",
        "chance": 0.3,
        "item_idx": "8323"
    }, {
        "name": "Violet Cube (5)",
        "chance": 0.3,
        "item_idx": "8324"
    }, {
        "name": "White Cube (3)",
        "chance": 0.6,
        "item_idx": "8321"
    }, {
        "name": "White Cube (5)",
        "chance": 0.3,
        "item_idx": "8322"
    }, {
        "name": "Golden Hammer 100 % Coupon (2)",
        "chance": 1.5,
        "item_idx": "8310"
    }, {
        "name": "Hyper Teleport Rock (7 Days)",
        "chance": 3,
        "item_idx": "8285"
    }, {
        "name": "Permanent Hyper Teleport Rock Coupon",
        "chance": 0.06,
        "item_idx": "8313"
    }, {
        "name": "Permanent Pendant Slot Expansion Coupon",
        "chance": 0.05,
        "item_idx": "8441"
    }, {
        "name": "Nodestone (10)",
        "chance": 0.2,
        "item_idx": "8311"
    }, {
        "name": "Onyx Apple (50)",
        "chance": 0.2,
        "item_idx": "8312"
    }, {
        "name": "1-day 2x EXP Special Coupon",
        "chance": 0.49,
        "item_idx": "8458"
    }, {
        "name": "Gachapon Ticket (5)",
        "chance": 5,
        "item_idx": "8284"
    }, {
        "name": "Gachapon Ticket (11)",
        "chance": 1.5,
        "item_idx": "8307"
    }, {
        "name": "Gachapon Ticket (50)",
        "chance": 0.1,
        "item_idx": "8314"
    }, {
        "name": "Royal Face Coupon (5)",
        "chance": 2,
        "item_idx": "8302"
    }, {
        "name": "Royal Hair Coupon (5)",
        "chance": 2,
        "item_idx": "8301"
    }, {
        "name": "All Stars Hair Coupon",
        "chance": 4.499,
        "item_idx": "8283"
    }, {
        "name": "Black Friday Royal Face Coupon (3)",
        "chance": 0.2,
        "item_idx": "8298"
    }, {
        "name": "Black Friday Royal Hair Coupon (3)",
        "chance": 0.2,
        "item_idx": "8297"
    }, {
        "name": "Christmas Royal Face Coupon (3)",
        "chance": 0.2,
        "item_idx": "8300"
    }, {
        "name": "Christmas Royal Hair Coupon (3)",
        "chance": 0.2,
        "item_idx": "8299"
    }, {
        "name": "Premium Surprise Style Box",
        "chance": 3,
        "item_idx": "8286"
    }, {
        "name": "Anniversary Surprise Style Box",
        "chance": 3,
        "item_idx": "8294"
    }, {
        "name": "Autumn Surprise Style Box",
        "chance": 3,
        "item_idx": "8292"
    }, {
        "name": "Black Mage Surprise Style Box",
        "chance": 3,
        "item_idx": "8295"
    }, {
        "name": "Halloween Surprise Style Box",
        "chance": 3,
        "item_idx": "8290"
    }, {
        "name": "Spring Surprise Style Box",
        "chance": 3,
        "item_idx": "8289"
    }, {
        "name": "St. Patrick's Day Surprise Style Box",
        "chance": 3,
        "item_idx": "8293"
    }, {
        "name": "Summer Surprise Style Box",
        "chance": 3,
        "item_idx": "8291"
    }, {
        "name": "Valentine Surprise Style Box",
        "chance": 3,
        "item_idx": "8288"
    }, {
        "name": "Winter Surprise Style Box",
        "chance": 3,
        "item_idx": "8287"
    }, {
        "name": "50,000 Maple Points",
        "chance": 0.1,
        "item_idx": "8315"
    }, {
        "name": "1 Million Maple Points",
        "chance": 0.001,
        "item_idx": "8445"
    }],
    "b": [{
        "name": "Aliciaroid Coupon",
        "chance": 0.2,
        "item_idx": "8525"
    }, {
        "name": "Damienroid Coupon",
        "chance": 0.2,
        "item_idx": "8526"
    }, {
        "name": "Battle-Roid (F) Coupon",
        "chance": 0.1,
        "item_idx": "8530"
    }, {
        "name": "Battle-Roid (M) Coupon",
        "chance": 0.1,
        "item_idx": "8529"
    }, {
        "name": "Fantastical Android (F) Coupon",
        "chance": 0.55,
        "item_idx": "8499"
    }, {
        "name": "Fantastical Android (M) Coupon",
        "chance": 0.55,
        "item_idx": "8498"
    }, {
        "name": "Grimroid (F) Coupon",
        "chance": 0.5,
        "item_idx": "8528"
    }, {
        "name": "Grimroid (M) Coupon",
        "chance": 0.5,
        "item_idx": "8527"
    }, {
        "name": "Princessoid Coupon",
        "chance": 1,
        "item_idx": "8502"
    }, {
        "name": "Summeroid (F) Coupon",
        "chance": 1,
        "item_idx": "8501"
    }, {
        "name": "Summeroid (M) Coupon",
        "chance": 1,
        "item_idx": "8500"
    }, {
        "name": "Zero Android Coupon",
        "chance": 1,
        "item_idx": "8503"
    }, {
        "name": "Outlaw Heart",
        "chance": 0.1,
        "item_idx": "8523"
    }, {
        "name": "Titanium Heart",
        "chance": 0.2,
        "item_idx": "8522"
    }, {
        "name": "Electronic Heart Ω-Series",
        "chance": 0.25,
        "item_idx": "8524"
    }, {
        "name": "Superior Lidium Heart",
        "chance": 0.3,
        "item_idx": "8521"
    }, {
        "name": "Lidium Heart",
        "chance": 0.5,
        "item_idx": "8520"
    }, {
        "name": "Dominator Pendant",
        "chance": 0.5,
        "item_idx": "8531"
    }, {
        "name": "Eagle Eye Assassin Shirt",
        "chance": 0.05,
        "item_idx": "8546"
    }, {
        "name": "Eagle Eye Dunwitch Robe",
        "chance": 0.05,
        "item_idx": "8544"
    }, {
        "name": "Eagle Eye Ranger Cowl",
        "chance": 0.05,
        "item_idx": "8545"
    }, {
        "name": "Eagle Eye Wanderer Coat",
        "chance": 0.05,
        "item_idx": "8547"
    }, {
        "name": "Eagle Eye Warrior Armor",
        "chance": 0.05,
        "item_idx": "8543"
    }, {
        "name": "Evolving Ring Lv. 17 (Tradable)",
        "chance": 0.4,
        "item_idx": "8519"
    }, {
        "name": "Fearless Pendant",
        "chance": 0.5,
        "item_idx": "8532"
    }, {
        "name": "Royal Assassin Hood",
        "chance": 0.05,
        "item_idx": "8541"
    }, {
        "name": "Royal Dunwitch Hat",
        "chance": 0.05,
        "item_idx": "8539"
    }, {
        "name": "Royal Ranger Beret",
        "chance": 0.05,
        "item_idx": "8540"
    }, {
        "name": "Royal Wanderer Hat",
        "chance": 0.05,
        "item_idx": "8542"
    }, {
        "name": "Royal Warrior Helm",
        "chance": 0.05,
        "item_idx": "8538"
    }, {
        "name": "Sweetwater Axe",
        "chance": 0.065,
        "item_idx": "8581"
    }, {
        "name": "Sweetwater Belt",
        "chance": 0.065,
        "item_idx": "8570"
    }, {
        "name": "Sweetwater Bow",
        "chance": 0.065,
        "item_idx": "8593"
    }, {
        "name": "Sweetwater Cane",
        "chance": 0.065,
        "item_idx": "8585"
    }, {
        "name": "Sweetwater Cape",
        "chance": 0.065,
        "item_idx": "8563"
    }, {
        "name": "Sweetwater Chain",
        "chance": 0.065,
        "item_idx": "8602"
    }, {
        "name": "Sweetwater Chain Sword",
        "chance": 0.065,
        "item_idx": "8577"
    }, {
        "name": "Sweetwater Crossbow",
        "chance": 0.065,
        "item_idx": "8594"
    }, {
        "name": "Sweetwater Demon Sword",
        "chance": 0.065,
        "item_idx": "8576"
    }, {
        "name": "Sweetwater Earrings",
        "chance": 0.065,
        "item_idx": "8568"
    }, {
        "name": "Sweetwater Gauntlet Buster",
        "chance": 0.065,
        "item_idx": "8604"
    }, {
        "name": "Sweetwater Gloves",
        "chance": 0.065,
        "item_idx": "8564"
    }, {
        "name": "Sweetwater Grip",
        "chance": 0.065,
        "item_idx": "8596"
    }, {
        "name": "Sweetwater Hand Cannon",
        "chance": 0.065,
        "item_idx": "8599"
    }, {
        "name": "Sweetwater Hat",
        "chance": 0.065,
        "item_idx": "8565"
    }, {
        "name": "Sweetwater Katana",
        "chance": 0.065,
        "item_idx": "8600"
    }, {
        "name": "Sweetwater Katara",
        "chance": 0.065,
        "item_idx": "8584"
    }, {
        "name": "Sweetwater Knife",
        "chance": 0.065,
        "item_idx": "8583"
    }, {
        "name": "Sweetwater Lucent Gauntlet",
        "chance": 0.065,
        "item_idx": "8603"
    }, {
        "name": "Sweetwater Mace",
        "chance": 0.065,
        "item_idx": "8582"
    }, {
        "name": "Sweetwater Maul",
        "chance": 0.065,
        "item_idx": "8590"
    },{
        "name": "Sweetwater Monocle",
        "chance": 0.065,
        "item_idx": "85901"
    }, {
        "name": "Sweetwater Pendant",
        "chance": 0.065,
        "item_idx": "8566"
    }, {
        "name": "Sweetwater Polearm",
        "chance": 0.065,
        "item_idx": "8592"
    }, {
        "name": "Sweetwater Psy-limiter",
        "chance": 0.065,
        "item_idx": "8579"
    }, {
        "name": "Sweetwater Shining Rod",
        "chance": 0.065,
        "item_idx": "8574"
    }, {
        "name": "Sweetwater Shoes",
        "chance": 0.065,
        "item_idx": "8573"
    }, {
        "name": "Sweetwater Shooter",
        "chance": 0.065,
        "item_idx": "8597"
    }, {
        "name": "Sweetwater Shoulder",
        "chance": 0.065,
        "item_idx": "8571"
    }, {
        "name": "Sweetwater Soul Shooter",
        "chance": 0.065,
        "item_idx": "8575"
    }, {
        "name": "Sweetwater Spear",
        "chance": 0.065,
        "item_idx": "8591"
    }, {
        "name": "Sweetwater Staff",
        "chance": 0.065,
        "item_idx": "8587"
    }, {
        "name": "Sweetwater Steer",
        "chance": 0.065,
        "item_idx": "8595"
    }, {
        "name": "Sweetwater Suit",
        "chance": 0.065,
        "item_idx": "8572"
    }, {
        "name": "Sweetwater Sword",
        "chance": 0.065,
        "item_idx": "8580"
    }, {
        "name": "Sweetwater Tattoo",
        "chance": 0.065,
        "item_idx": "8569"
    }, {
        "name": "Sweetwater Tigress Scepter",
        "chance": 0.065,
        "item_idx": "8578"
    }, {
        "name": "Sweetwater Twin Angels",
        "chance": 0.065,
        "item_idx": "8598"
    }, {
        "name": "Sweetwater Two-Handed Axe",
        "chance": 0.065,
        "item_idx": "8589"
    }, {
        "name": "Sweetwater Two-Handed Sword",
        "chance": 0.065,
        "item_idx": "8588"
    }, {
        "name": "Sweetwater Wand",
        "chance": 0.065,
        "item_idx": "8586"
    }, {
        "name": "Sweetwater Wind",
        "chance": 0.065,
        "item_idx": "8601"
    }, {
        "name": "Tinkerer's Red Belt",
        "chance": 0.03,
        "item_idx": "8607"
    }, {
        "name": "Tinkerer's Red Shoulder Accessory",
        "chance": 0.03,
        "item_idx": "8608"
    }, {
        "name": "Trixter Assassin Pants",
        "chance": 0.05,
        "item_idx": "8536"
    }, {
        "name": "Trixter Dunwitch Pants",
        "chance": 0.05,
        "item_idx": "8534"
    }, {
        "name": "Trixter Ranger Pants",
        "chance": 0.05,
        "item_idx": "8535"
    }, {
        "name": "Trixter Wanderer Pants",
        "chance": 0.05,
        "item_idx": "8537"
    }, {
        "name": "Trixter Warrior Pants",
        "chance": 0.05,
        "item_idx": "8533"
    }, {
        "name": "Magnificent Crimson Queen Soul",
        "chance": 0.15,
        "item_idx": "8613"
    }, {
        "name": "Magnificent Cygnus Soul",
        "chance": 0.15,
        "item_idx": "8616"
    }, {
        "name": "Magnificent Damien Soul",
        "chance": 0.15,
        "item_idx": "8611"
    }, {
        "name": "Magnificent Darknell Soul",
        "chance": 0.15,
        "item_idx": "8610"
    }, {
        "name": "Magnificent Lotus Soul",
        "chance": 0.15,
        "item_idx": "8612"
    }, {
        "name": "Magnificent Lucid Soul",
        "chance": 0.15,
        "item_idx": "8617"
    }, {
        "name": "Magnificent Magnus Soul",
        "chance": 0.15,
        "item_idx": "8615"
    }, {
        "name": "Magnificent Murgoth Soul",
        "chance": 0.15,
        "item_idx": "8614"
    }, {
        "name": "Magnificent Papulatus Soul",
        "chance": 0.15,
        "item_idx": "8609"
    }, {
        "name": "Magnificent Will Soul",
        "chance": 0.15,
        "item_idx": "8618"
    }, {
        "name": "9th Anniversary Prime Scroll for Accessory (3)",
        "chance": 0.4,
        "item_idx": "8489"
    }, {
        "name": "9th Anniversary Prime Scroll for Armor (3)",
        "chance": 0.4,
        "item_idx": "8492"
    }, {
        "name": "9th Anniversary Prime Scroll for One-Handed Weapon (3)",
        "chance": 0.4,
        "item_idx": "8490"
    }, {
        "name": "9th Anniversary Prime Scroll for Two-Handed Weapon (3)",
        "chance": 0.4,
        "item_idx": "8491"
    }, {
        "name": "Scroll for One-Handed Weapon for Magic ATT 90%",
        "chance": 0.51,
        "item_idx": "8484"
    }, {
        "name": "Two-Handed Weapon for ATT 90%",
        "chance": 0.51,
        "item_idx": "8485"
    }, {
        "name": "Two-Handed Weapon Magic ATT 90%",
        "chance": 0.51,
        "item_idx": "8486"
    }, {
        "name": "Epic Potential Scroll 50% (3)",
        "chance": 0.4,
        "item_idx": "8493"
    }, {
        "name": "Special Bonus Potential Scroll",
        "chance": 5,
        "item_idx": "8473"
    }, {
        "name": "Shield Scroll",
        "chance": 7,
        "item_idx": "8467"
    }, {
        "name": "Guardian Scroll",
        "chance": 7,
        "item_idx": "8468"
    }, {
        "name": "Innocence Scroll 50% (3)",
        "chance": 0.4,
        "item_idx": "8488"
    }, {
        "name": "Chaos Scroll of Goodness 50%",
        "chance": 5,
        "item_idx": "8472"
    }, {
        "name": "5 Star Enhancement Scroll",
        "chance": 0.5,
        "item_idx": "8505"
    }, {
        "name": "Red Cube (2)",
        "chance": 4,
        "item_idx": "8487"
    }, {
        "name": "Bonus Potential Cube",
        "chance": 4,
        "item_idx": "8470"
    }, {
        "name": "Violet Cube",
        "chance": 0.1,
        "item_idx": "8483"
    }, {
        "name": "White Cube",
        "chance": 0.1,
        "item_idx": "8482"
    }, {
        "name": "Golden Hammer 100% Coupon",
        "chance": 0.5,
        "item_idx": "8506"
    }, {
        "name": "Eternal Rebirth Flame (5)",
        "chance": 0.4,
        "item_idx": "8494"
    }, {
        "name": "Powerful Rebirth Flame (5)",
        "chance": 0.4,
        "item_idx": "8495"
    }, {
        "name": "2x Drop Coupon (1 Hour) (6)",
        "chance": 3,
        "item_idx": "8464"
    }, {
        "name": "2x EXP Coupon (1 Hour) (6)",
        "chance": 3,
        "item_idx": "8463"
    }, {
        "name": "4-hour 2x Drop Special Coupon",
        "chance": 5,
        "item_idx": "8469"
    }, {
        "name": "4-hour 2x EXP Special Coupon",
        "chance": 7,
        "item_idx": "8496"
    }, {
        "name": "6-hour 2x Drop Special Coupon",
        "chance": 1,
        "item_idx": "8504"
    }, {
        "name": "Platinum Scissors of Karma",
        "chance": 2,
        "item_idx": "8497"
    }, {
        "name": "Onyx Apple (25)",
        "chance": 0.1,
        "item_idx": "8507"
    }, {
        "name": "Gachapon Ticket (25)",
        "chance": 0.06,
        "item_idx": "8517"
    }, {
        "name": "20 Slot Chair Bag",
        "chance": 0.45,
        "item_idx": "8479"
    }, {
        "name": "20 Slot Herb Bag",
        "chance": 0.45,
        "item_idx": "8475"
    }, {
        "name": "20 Slot Mineral Bag",
        "chance": 0.45,
        "item_idx": "8476"
    }, {
        "name": "20 Slot Production Bag",
        "chance": 0.45,
        "item_idx": "8477"
    }, {
        "name": "20 Slot Recipe Bag",
        "chance": 0.45,
        "item_idx": "8478"
    }, {
        "name": "20 Slot Scroll Bag",
        "chance": 0.2,
        "item_idx": "8481"
    }, {
        "name": "20 Slot Soul Bag",
        "chance": 0.45,
        "item_idx": "8474"
    }, {
        "name": "20 Slot Title Bag",
        "chance": 0.45,
        "item_idx": "8480"
    }, {
        "name": "Transparent Cape",
        "chance": 0.05,
        "item_idx": "8548"
    }, {
        "name": "Transparent Claw",
        "chance": 0.05,
        "item_idx": "8557"
    }, {
        "name": "Transparent Earrings",
        "chance": 0.05,
        "item_idx": "8551"
    }, {
        "name": "Transparent Eye Accessory",
        "chance": 0.05,
        "item_idx": "8553"
    }, {
        "name": "Transparent Face Accessory",
        "chance": 0.05,
        "item_idx": "8554"
    }, {
        "name": "Transparent Gloves",
        "chance": 0.05,
        "item_idx": "8549"
    }, {
        "name": "Transparent Hat",
        "chance": 0.05,
        "item_idx": "8552"
    }, {
        "name": "Transparent Katara",
        "chance": 0.05,
        "item_idx": "8556"
    }, {
        "name": "Transparent Knuckle",
        "chance": 0.05,
        "item_idx": "8558"
    }, {
        "name": "Transparent Shield",
        "chance": 0.05,
        "item_idx": "8560"
    }, {
        "name": "Transparent Shoes",
        "chance": 0.05,
        "item_idx": "8550"
    }, {
        "name": "Transparent Wand",
        "chance": 0.05,
        "item_idx": "8559"
    }, {
        "name": "Universal Transparent Weapon",
        "chance": 0.05,
        "item_idx": "8555"
    }, {
        "name": "Beast Tamer Transparent Ears",
        "chance": 0.05,
        "item_idx": "8561"
    }, {
        "name": "Beast Tamer Transparent Tail",
        "chance": 0.05,
        "item_idx": "8562"
    }, {
        "name": "Hair Style Coupon (REG)",
        "chance": 6.07,
        "item_idx": "8471"
    }, {
        "name": "Royal Face Coupon",
        "chance": 3,
        "item_idx": "8460"
    }, {
        "name": "Royal Hair Coupon",
        "chance": 3,
        "item_idx": "8459"
    }, {
        "name": "Anniversary Royal Face Coupon",
        "chance": 1,
        "item_idx": "8466"
    }, {
        "name": "Anniversary Royal Hair Coupon",
        "chance": 1,
        "item_idx": "8465"
    }, {
        "name": "April Fools' Day Face Coupon",
        "chance": 3,
        "item_idx": "8462"
    }, {
        "name": "April Fools' Day Hair Coupon",
        "chance": 3,
        "item_idx": "8461"
    }, {
        "name": "Premium Surprise Style Box (11)",
        "chance": 0.4,
        "item_idx": "8518"
    }, {
        "name": "Always a Winner Chair",
        "chance": 0.2,
        "item_idx": "8510"
    }, {
        "name": "Animal Crystal Ball Chair",
        "chance": 0.2,
        "item_idx": "8511"
    }, {
        "name": "Blooming Angel Chair",
        "chance": 0.2,
        "item_idx": "8515"
    }, {
        "name": "Cat-in-a-Box Chair",
        "chance": 0.2,
        "item_idx": "8512"
    }, {
        "name": "Fire Engine Chair",
        "chance": 0.2,
        "item_idx": "8516"
    }, {
        "name": "Giant Ducky Chair",
        "chance": 0.2,
        "item_idx": "8508"
    }, {
        "name": "Maple Swingboat Chair",
        "chance": 0.2,
        "item_idx": "8513"
    }, {
        "name": "Special Watermelon Bowl Chair",
        "chance": 0.2,
        "item_idx": "8514"
    }, {
        "name": "White Clamshell Chair",
        "chance": 0.2,
        "item_idx": "8509"
    }, {
        "name": "10,000 Maple Points Chip",
        "chance": 0.03,
        "item_idx": "8605"
    }, {
        "name": "25,000 Maple Points",
        "chance": 0.01,
        "item_idx": "8606"
    }, {
        "name": "100,000 Maple Points",
        "chance": 0.01,
        "item_idx": "8619"
    }],
    "c": [{
        "name": "Breath of Divinity Ring",
        "chance": 0.01,
        "item_idx": "8724"
    }, {
        "name": "Dragon Khanjar",
        "chance": 0.1,
        "item_idx": "8667"
    }, {
        "name": "Evolving Ring II Lv. 17 (Tradable)",
        "chance": 0.3,
        "item_idx": "8662"
    }, {
        "name": "Evolving Ring III Lv. 10 (Tradable)",
        "chance": 0.3,
        "item_idx": "8663"
    }, {
        "name": "Hilla's Rage",
        "chance": 0.01,
        "item_idx": "8723"
    }, {
        "name": "Lightning God Ring",
        "chance": 0.03,
        "item_idx": "8720"
    }, {
        "name": "Magnus's Rage",
        "chance": 0.01,
        "item_idx": "8722"
    }, {
        "name": "Marvelous",
        "chance": 0.09,
        "item_idx": "8715"
    }, {
        "name": "Meister Earring",
        "chance": 0.1,
        "item_idx": "8679"
    }, {
        "name": "Meister Ring",
        "chance": 0.1,
        "item_idx": "8680"
    }, {
        "name": "Terminus Bolter",
        "chance": 0.09,
        "item_idx": "8702"
    }, {
        "name": "Terminus Chain",
        "chance": 0.09,
        "item_idx": "8711"
    }, {
        "name": "Terminus Chopper",
        "chance": 0.09,
        "item_idx": "8689"
    }, {
        "name": "Terminus Crusher",
        "chance": 0.09,
        "item_idx": "8690"
    }, {
        "name": "Terminus Defender",
        "chance": 0.08,
        "item_idx": "8682"
    }, {
        "name": "Terminus Demolisher",
        "chance": 0.09,
        "item_idx": "8698"
    }, {
        "name": "Terminus Devastator",
        "chance": 0.09,
        "item_idx": "8697"
    }, {
        "name": "Terminus Divider",
        "chance": 0.09,
        "item_idx": "8688"
    }, {
        "name": "Terminus Dominator",
        "chance": 0.09,
        "item_idx": "8696"
    }, {
        "name": "Terminus Enchanter",
        "chance": 0.09,
        "item_idx": "8694"
    }, {
        "name": "Terminus Executioner",
        "chance": 0.09,
        "item_idx": "8703"
    }, {
        "name": "Terminus Firebreather",
        "chance": 0.09,
        "item_idx": "8684"
    }, {
        "name": "Terminus Gauntlet",
        "chance": 0.09,
        "item_idx": "8713"
    }, {
        "name": "Terminus Grand Master",
        "chance": 0.09,
        "item_idx": "8708"
    }, {
        "name": "Terminus Illuminator",
        "chance": 0.09,
        "item_idx": "8683"
    }, {
        "name": "Terminus Impaler",
        "chance": 0.09,
        "item_idx": "8699"
    }, {
        "name": "Terminus Jaeger",
        "chance": 0.08,
        "item_idx": "8686"
    }, {
        "name": "Terminus Lucent Gauntlet",
        "chance": 0.09,
        "item_idx": "8712"
    }, {
        "name": "Terminus Mesmerizer",
        "chance": 0.09,
        "item_idx": "8695"
    }, {
        "name": "Terminus Orchestrator",
        "chance": 0.09,
        "item_idx": "8693"
    }, {
        "name": "Terminus Prowler",
        "chance": 0.09,
        "item_idx": "8691"
    }, {
        "name": "Terminus Psy-limiter",
        "chance": 0.09,
        "item_idx": "8710"
    }, {
        "name": "Terminus Raider",
        "chance": 0.09,
        "item_idx": "8705"
    }, {
        "name": "Terminus Raptor",
        "chance": 0.09,
        "item_idx": "8706"
    }, {
        "name": "Terminus Scepter",
        "chance": 0.09,
        "item_idx": "8687"
    }, {
        "name": "Terminus Scorcher",
        "chance": 0.09,
        "item_idx": "8707"
    }, {
        "name": "Terminus Silencer",
        "chance": 0.09,
        "item_idx": "8692"
    }, {
        "name": "Terminus Stormchaser",
        "chance": 0.09,
        "item_idx": "8701"
    }, {
        "name": "Terminus Striker",
        "chance": 0.09,
        "item_idx": "8704"
    }, {
        "name": "Terminus Summoner",
        "chance": 0.09,
        "item_idx": "8709"
    }, {
        "name": "Terminus Vanquisher",
        "chance": 0.09,
        "item_idx": "8685"
    }, {
        "name": "Terminus Warmonger",
        "chance": 0.09,
        "item_idx": "8700"
    }, {
        "name": "Tinkerer's Blue Belt",
        "chance": 0.08,
        "item_idx": "8718"
    }, {
        "name": "Tinkerer's Blue Shoulder Accessory",
        "chance": 0.08,
        "item_idx": "8719"
    }, {
        "name": "VIP Magician Shield",
        "chance": 0.3,
        "item_idx": "8665"
    }, {
        "name": "VIP Necklace",
        "chance": 0.1,
        "item_idx": "8678"
    }, {
        "name": "VIP Thief Shield",
        "chance": 0.3,
        "item_idx": "8666"
    }, {
        "name": "VIP Warrior Shield",
        "chance": 0.3,
        "item_idx": "8664"
    }, {
        "name": "9th Anniversary Prime Scroll for Accessory",
        "chance": 0.08,
        "item_idx": "8638"
    }, {
        "name": "9th Anniversary Prime Scroll for Armor",
        "chance": 0.08,
        "item_idx": "8641"
    }, {
        "name": "9th Anniversary Prime Scroll for One-Handed Weapon",
        "chance": 0.08,
        "item_idx": "8639"
    }, {
        "name": "9th Anniversary Prime Scroll for Two-Handed Weapon",
        "chance": 0.08,
        "item_idx": "8640"
    }, {
        "name": "Evolution One-handed Weapon ATT Scroll (2)",
        "chance": 3.3,
        "item_idx": "8631"
    }, {
        "name": "Evolution One-handed Weapon Magic ATT Scroll (2)",
        "chance": 3.3,
        "item_idx": "8632"
    }, {
        "name": "Evolution Two-handed Weapon ATT Scroll (2)",
        "chance": 3.3,
        "item_idx": "8633"
    }, {
        "name": "Evolution Two-handed Weapon Magic ATT Scroll (2)",
        "chance": 3.3,
        "item_idx": "8634"
    }, {
        "name": "Incredible Chaos Scroll of Goodness 50% (1)",
        "chance": 2,
        "item_idx": "8653"
    }, {
        "name": "Innocence Scroll 50%",
        "chance": 0.9,
        "item_idx": "8635"
    }, {
        "name": "2 Star Enhancement Scroll",
        "chance": 1,
        "item_idx": "8654"
    }, {
        "name": "3 Star Enhancement Scroll",
        "chance": 3,
        "item_idx": "8655"
    }, {
        "name": "Clean Slate Scroll 20% (2)",
        "chance": 0.9,
        "item_idx": "8636"
    }, {
        "name": "Epic Potential Scroll 50%",
        "chance": 1,
        "item_idx": "8637"
    }, {
        "name": "Special Potential Scroll",
        "chance": 4,
        "item_idx": "8624"
    }, {
        "name": "Red Cube",
        "chance": 3.5,
        "item_idx": "8622"
    }, {
        "name": "Red Cube (2)",
        "chance": 0.35,
        "item_idx": "8652"
    }, {
        "name": "Red Cube (3)",
        "chance": 0.25,
        "item_idx": "8661"
    }, {
        "name": "Red Cube (5)",
        "chance": 0.08,
        "item_idx": "8681"
    }, {
        "name": "Black Cube",
        "chance": 1.5,
        "item_idx": "8629"
    }, {
        "name": "Powerful Rebirth Flame (5)",
        "chance": 1.5,
        "item_idx": "8726"
    }, {
        "name": "Eternal Rebirth Flame (5)",
        "chance": 1.5,
        "item_idx": "8725"
    }, {
        "name": "Spell Trace (5000)",
        "chance": 5,
        "item_idx": "8677"
    }, {
        "name": "Respawn Pass",
        "chance": 5,
        "item_idx": "8627"
    }, {
        "name": "Safety Gem",
        "chance": 0.5,
        "item_idx": "8626"
    }, {
        "name": "Onyx Apple (5)",
        "chance": 2,
        "item_idx": "8630"
    }, {
        "name": "Tinkerer's Chest",
        "chance": 7,
        "item_idx": "8620"
    }, {
        "name": "4-hour 2x Drop Special Coupon",
        "chance": 3,
        "item_idx": "8625"
    }, {
        "name": "Soft Petal Skin Android Coupon",
        "chance": 1.5,
        "item_idx": "8727"
    }, {
        "name": "Fusion Anvil",
        "chance": 3,
        "item_idx": "8623"
    }, {
        "name": "Gachapon Ticket",
        "chance": 6,
        "item_idx": "8621"
    }, {
        "name": "Equip Tab 4 Slot Coupon",
        "chance": 2.5,
        "item_idx": "8642"
    }, {
        "name": "Equip Tab 8 Slot Coupon",
        "chance": 1.5,
        "item_idx": "8646"
    }, {
        "name": "ETC Tab 4 Slot Coupon",
        "chance": 2.5,
        "item_idx": "8645"
    }, {
        "name": "Etc Tab 8 Slot Coupon",
        "chance": 1.5,
        "item_idx": "8649"
    }, {
        "name": "Set-up Tab 4 Slot Coupon",
        "chance": 2.5,
        "item_idx": "8644"
    }, {
        "name": "Set-Up Tab 8 Slot Coupon",
        "chance": 1.5,
        "item_idx": "8648"
    }, {
        "name": "Ten-Chair Bag",
        "chance": 1.5,
        "item_idx": "8628"
    }, {
        "name": "Use Tab 4 Slot Coupon",
        "chance": 2.5,
        "item_idx": "8643"
    }, {
        "name": "Use Tab 8 Slot Coupon",
        "chance": 1.5,
        "item_idx": "8647"
    }, {
        "name": "Beauty Salon Face Slot Coupon (3)",
        "chance": 3.73,
        "item_idx": "8651"
    }, {
        "name": "Beauty Salon Hair Slot Coupon (3)",
        "chance": 3.73,
        "item_idx": "8650"
    }, {
        "name": "Wolf Underling Familiar",
        "chance": 0.1,
        "item_idx": "8717"
    }, {
        "name": "Castle Golem Familiar",
        "chance": 0.2,
        "item_idx": "8716"
    }, {
        "name": "Coco Familiar",
        "chance": 0.2,
        "item_idx": "8721"
    }, {
        "name": "Gorilla Robo",
        "chance": 0.1,
        "item_idx": "8660"
    }, {
        "name": "Monkey",
        "chance": 0.1,
        "item_idx": "8656"
    }, {
        "name": "Orange Tiger",
        "chance": 0.1,
        "item_idx": "8659"
    }, {
        "name": "Robot",
        "chance": 0.1,
        "item_idx": "8657"
    }, {
        "name": "White Monkey",
        "chance": 0.1,
        "item_idx": "8658"
    }, {
        "name": "Ballroom Classic Hair Coupon (F)",
        "chance": 0.1,
        "item_idx": "8671"
    }, {
        "name": "Bed Head Coupon (M)",
        "chance": 0.1,
        "item_idx": "8668"
    }, {
        "name": "Ellinia Hair Coupon (F)",
        "chance": 0.1,
        "item_idx": "8674"
    }, {
        "name": "Evan Hair Coupon (M)",
        "chance": 0.1,
        "item_idx": "8670"
    }, {
        "name": "Fairy King Oberon Hair Coupon (Male)",
        "chance": 0.1,
        "item_idx": "8673"
    }, {
        "name": "Henesys Hair Coupon (F)",
        "chance": 0.1,
        "item_idx": "8675"
    }, {
        "name": "Kerning City Hair Coupon (M)",
        "chance": 0.1,
        "item_idx": "8672"
    }, {
        "name": "Vivacious Wavy Hair Coupon (F)",
        "chance": 0.1,
        "item_idx": "8669"
    }, {
        "name": "Nautilus Hair Coupon (F)",
        "chance": 0.1,
        "item_idx": "8676"
    }, {
        "name": "5,000 Maple Points Chip",
        "chance": 0.07,
        "item_idx": "8714"
    }]
};

function pop_db() {
    item_db_rangified = {};
    for (let slot in gacha_db) {
        item_db_rangified[slot] = [];
        let shuffled_slot_items = shuffle(gacha_db[slot].slice(0));
        let startAt = 0;
        for (let i = 0; i < shuffled_slot_items.length; ++i) {
            let this_item = shuffled_slot_items[i];
            let new_start_at = startAt + this_item.chance;
            item_db_rangified[slot].push({
                name: this_item.name,
                item_idx: this_item.item_idx,
                from: startAt,
                to: (i == shuffled_slot_items.length - 1 ? 100 : new_start_at)
            });

            startAt += this_item.chance;
        }
    }
};

pop_db();

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var table_body = $("#items");
var max_records = 10;
var myItems = [];

Number.prototype.toNumber = function() {
    return this.toLocaleString();
};

(function ($) {
    $.fn.itemRotator = function (options) {
        var defaults = {
            speed: 600
        }
        var settings = $.extend(defaults, options);

        this.each(function (n) {
            var $this = $(this),
			item = $('.item-icons div', $this),
            item_panel = $this.find('.item-icons'),
            numOfItems = item.length, // Get number of items
			heightOfItem = item.height(), // Get width of item
			itemStrip = numOfItems * heightOfItem, // Calculate the width to set the item strip
			itemPositions = [], // Create an array to hold our item positions
			currentPosition = 1, // Set the current item position
			play, // Timer variable
			disable = false,
            citem = null; // Used to offset the banner rotation
            // Set the width of the strip size of all items combined
            $('.item-icons', $this).css('width', itemStrip);
            $('.prize-list').eq(n).mouseenter(function () { disable = true; }).mouseleave(function () { disable = false; }).find('li').mouseenter(function () {
                //window.gachapon.sounds['short_stick'].play();
                var idx = $(this).data('idx');
                citem = item_panel.children('[data-idx="{0}"]'.format(idx));
                item_panel.css({ top: -(citem.index() * heightOfItem) });
            });

            function switchItems() {
                if (currentPosition < numOfItems - 1) {
                    currentPosition++;
                } else {
                    currentPosition = 0;
                }
                if (!disable) {
                    item_panel.clearQueue().animate({
                        top: -(currentPosition * heightOfItem)
                    }, settings.speed);
                }
            }

            function rotationTimer() {
                play = setInterval(switchItems, 3000);
            }

            startTime = options.speed * n * 2;
            // Start rotation
            setTimeout(
            function () {
                rotationTimer();
            }, startTime);
        });
    }

    $.fn.tabs = function () {
        var last = $(this).filter('.active');
        $('.content-holder.dn').hide().removeClass('dn');
        return $(this).click(function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) return;
            $this.addClass('active');
            if (last != null) {
                last.removeClass('active');
                $('#' + last.data('tab')).hide();
            }
            $('#' + $this.data('tab')).show();
            last = $this;
        });
    }

    function popupShow(name, callback) {
        return false;
    }

    function popupError(msg) {
        return false;
    }
    var gachapon = function () { this.init(); }
    gachapon.prototype = {
        init: function () {
            //this.items = [];
            this.spin_types = [];
            this.is_service_on = false;
            this.is_spin_service_on = false;
            this.event_no = null;
            this.spin_cnt = 0;
            this.spinItems = [];
            this.spin_use_id = null;
            this.spinning = false;
            this.prizeItems = null;
            this.spin2Interval = null;
            this.itemHeight = 0;

            this.nx = null;
            this.sounds = {};
            this.opts = {
                prepaid: '.nx_prepaid',
                credit: '.nx_credit'
            };
            this.banCountries = ['BE'];
            var _this = this;

            soundManager.setup({
                url: '/assets/js/soundmanager/', // required: path to directory containing SM2 SWF files
                debugMode: false,
                useFlashBlock: false // optional - if used, required flashblock.css
            });

            soundManager.onready(function () {
                _this.soundLoad(['start', 'stop', 'error']); //, 'short_stick', 'button-19']);
                soundManager.setVolume('start', 40);
                if (_this.is_spin_service_on) {
                    _this.onActive();
                }
            });

            this.checkService();
            $(function () { // dom ready

                if (_this.spinItems.length < 2)
                    //$('#machine').startWaiting();

                _this.pager = new pageHelper($('#history_pager'), { prev5Btn: null, next5Btn: null });
                _this.dom = {
                    congrats: $('.congrats'),
                    animations: $('#reels .reel-animation'),
                    multipliers: $('#machine .double.hidden'),
                    slots: $('#machine .slot-artboard'),
                    prizes: $('#machine .slot-item .label.coupon'),
                    spin_more: $('#spend-more'),
                    spin_more_pay_type: $('#spend-more input:radio[name=double_funds_source]')
                };

                for (n = 0; n < 3; n++) {
                    var target = _this.dom.slots.eq(n);
                    target.children().clone().appendTo(target);
                }
                _this.itemHeight = _this.dom.slots.eq(0).children(':first').height();

                _this.dom.spin_more.find('.btn-close').click(function () {
                    _this.showDoubleMarble(false);
                });
                _this.dom.spin_more.find('#spend-btn').click(function () {
                    var pay_type = _this.dom.spin_more_pay_type.filter(':checked').val();
                    _this.runSpin2(pay_type == 'prepaid');
                    return false;
                });
                _this.dom.spin_more.find('#refresh-btn').click(function () {
                    _this.updateNXBalance();
                    _this.dom.spin_more_pay_type.eq(0).click();
                    return false;
                });
                _this.dom.spin_more_pay_type.click(function (e) {
                    var type = $(this).val();
                    var parent = $(this).parents('.nx-total').first();
                    var price = _this.spinItems[1][0].price;
                    var oPrices = parent.find('.spin2_price');
                    oPrice = oPrices.filter('.' + type);
                    oPrice.text(price.digits());
                    oPrices.not(oPrice).empty();
                    parent.find('.remain_prepaid').text((_this.nx.prepaid - (type == 'prepaid' ? price : 0)).digits());
                    //parent.find('.remain_credit').text((_this.nx.credit - (type == 'credit' ? price : 0)).digits());
                });

                _this.dom.prizes.find('ul > li p').text('Coupon Code');

                $('#refresh-count').click(function (x) {
                    x.preventDefault();
                    _this.updateRaffleCount();
                });

                $('#spin-btn').click(function (x) {
                    if (_this.spinning) return
                    x.preventDefault();
                    _this.runSpin1();
                });

                $('#marvelmachine-moreinfo').click(function (e) {
                    e.preventDefault();
                    popupShow('detailedGuide');
                    return false;
                });

                $('#tabs li').tabs().filter('[data-tab="coupon-history"]').click(function (e) {
                    e.preventDefault();
                    _this.showHistory();
                });

                $('#search-box').focus(function () {
                    $(this).addClass('searchFocus');
                    $('#search-options').show();
                });

                /*
                $('#search-box').blur(function () {
                    $(this).removeClass('searchFocus');
                    $('#search-options').hide();
                });
                */
                $('#search-wrap').keydown(function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var text = $('#search-box').val();
                        $('#search-options').hide();
                        _this.searchHistory(1, 10, null, text);
                    }
                });

                $('#search-submit').click(function (e) {
                    e.preventDefault();
                    var text = $('#search-box').val();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, null, text);
                });

                $('#search-equip').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 1, null);
                });

                $('#search-use').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 2, null);
                });

                $('#search-etc').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 4, null);
                });

                $('#search-setup').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 3, null);
                });

                $('#search-cash').click(function (e) {
                    e.preventDefault();
                    $('#search-options').hide();
                    _this.searchHistory(1, 10, 5, null);
                });

                //// test
                //_this.updateNXBalance({ credit: '#credit', prepaid: '#prepaid' });

                $('#more-spins-btn').click(function (e) {
                    e.preventDefault();
                    if (!_this.is_service_on) { popupShow('stopPurchase'); return; }
                    if (!nexon.sso.isLoggedIn) { nexon.gnt.popupLogin(); return; }

                    _this.updateNXBalance();
                    var p = popupShow('getMoreSpins');
                    var types = p.center.find('input:radio[name=payment-type]');
                    var selector = p.center.find('.currentSpins select');

                    function updatePrices() {
                        var option = selector.find('option:selected').data();
                        if (option.origin_price === undefined) return;
                        var paytype = types.filter(':checked').val();
                        var prepaid = _this.nx.prepaid;
                        //var credit = _this.nx.credit;
                        var remain_prepaid = p.center.find('.remain_prepaid');
                        //var remain_credit = p.center.find('.remain_credit');
                        var spin_origin_prices = p.center.find('.spin_origin_price');
                        var spin_prices = p.center.find('.spin_price');
                        var sales_row = p.center.find('.sales_row');

                        var IsSale = (option.origin_price > option.price);
                        var txt_origin = (IsSale ? '<s>- {0} NX Prepaid</s>' : '- {0} NX Prepaid').format(option.origin_price.digits());

                        sales_row.toggle(IsSale);
                        sales_row.next().toggleClass('add-bg', IsSale);

                        //var ind = (paytype == 'prepaid' ? 0 : 1);
                        var ind = 0;
                        //spin_origin_prices.eq((ind + 1) % 2).html('');
                        spin_origin_prices.eq(ind).html(txt_origin);

                        if (IsSale) {
                            var txt_price = '- {0} NX Prepaid'.format(option.price.digits());
                            spin_prices.eq(ind).text(txt_price);
                            //spin_prices.eq((ind + 1) % 2).text('');
                        }

                        //if (paytype == 'prepaid') prepaid -= option.price; else credit -= option.price;
                        prepaid -= option.price;

                        remain_prepaid.text(prepaid.digits());
                        //remain_credit.text(credit.digits());
                    }

                    types.click(function (e) {
                        updatePrices();
                    });
                    selector.change(function (e) {
                        var changed = $(e.target);
                        updatePrices();
                    });

                    types.eq(0).click();
                    p.center.find('.gnt_bot .gnt_button:eq(0)').click(function (e) {
                        e.preventDefault();
                        var value = selector.val();
                        var paytype = types.filter(':checked').val();
                        if (value == '') {
                            alert('Please select quantity');
                            return;
                        }
                        _this.purchaseSpin(value, paytype == 'prepaid', function () {
                            popupShow('thankYou');
                        });
                    });
                });

                /*
                $(".slot-artboard .icon,.prize-container li").balloon({
                    css: { opacity: 1 },
                    minLifetime: 0, showDuration: 0, hideDuration: 0
                });
                */

                $('.item-scroll').itemRotator({
                    speed: 400
                });

                $('#soundToggle').click(function () {
                    $(this).toggleClass('active');
                    $(this).hasClass('active') ? soundManager.unmute() : soundManager.mute();
                    return false;
                });
                /*
                $('#more-spins-btn,#spin-btn, #soundToggle,#gachapon-text a,#tabs li,.btn-close,#spend-btn,#refresh-btn').mouseenter(function () {
                _this.sounds['short_stick'].play();
                }).click(function () {
                _this.sounds['button-19'].play();
                });*/
            });

            /*
            this.updateSpinCnt();
            this.updateRaffleCount();
            */
        }, //////////////////////////////////////////////////////////////////////////
        soundLoad: function (array) {
            for (var n = 0, len = array.length; n < len; n++) {
                var name = array[n];
                this.sounds[name] = soundManager.createSound({
                    id: name,
                    url: 'http://nxcache.nexon.net/maplestory/shop/gachapon/sound/' + name + '.mp3'
                });
            }
        },
        onActive: function () {
            for (var sound in this.sounds) {
                if (!this.sounds.hasOwnProperty(sound)) continue;
                this.sounds[sound].load();
            }
        },
        checkService: function () {
            return false;
        },
        apicall: function (opts, callback, callback_fail, req_type) {
            return false;
        },
        updateRaffleCount: function () {
            return false;
            $(function () {
                $('#raffle-count').text(bal);
                $('#ticket-count').text(bal);
            });
        },
        updateSpinCnt: function (p = false, o = 1) {
            if (!p) return false;
            this.spin_cnt += o;
            $('.spins-left').html(this.spin_cnt);
        },
        useSpin: function (type, use_id = "", callback, fail) {
            /*
            let testData = {
                spin_use_id: 1,
                prizes: [{
                    item_idx: 8453, //2nd (A)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8533, //3rd (B)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }, {
                    item_idx: 8724, //1st (C)
                    coupon_code: "JEWJEWJEWJEWJEW"
                }]
            };
            */

            let data = this.generate_item();

            callback.call(this, data);

            return false;
        },
        runSpin1: function (thisItem, callback) {
            //this.spin_cnt = 0;
            this.spinning = true;
            var start = +new Date();

            this.sounds['start'].play();

            this.dom.congrats.hide();
            this.dom.multipliers.hide();
            //this.dom.animations.show();
            //this.dom.slots.hide();

            this.dom.prizes.find('ul > li:nth-child(2)').remove();
            this.dom.prizes.find('ul > li p').text('Coupon Code');

            this.spin_use_id == null

            this.dom.slots.animate({ top: '-=1000' }, 1000, 'easeInQuad').animate({ top: '-=' + (this.itemHeight * 40) }, 2000, 'linear');

            var _this = this;

            if (typeof thisItem !== 'undefined') {
                var diff = (+new Date()) - start;

                let data = thisItem;
                setTimeout(function () {
                    _this.selectPrize(0, data.prizes[2]);
                    setTimeout(function () {
                        _this.selectPrize(2, data.prizes[1]);
                        setTimeout(function () {
                            _this.selectPrize(1, data.prizes[0], function () {
                                _this.dom.congrats.show().removeClass('hidden');
                                _this.spinning = false;
                                pop_db();
                                $('#spin-btn').prop("disabled", false);
                                if (typeof callback === 'function') {
                                    callback(); 
                                } else {
                                    _this.pop_table([data]);
                                }
                            });
                        }, 700);
                    }, 700);
                }, 1500 - diff);
            } else {
                // call api and get prizes info
                this.useSpin(1, "", function (data) {
                    var diff = (+new Date()) - start;

                    this.spin_use_id = data.spin_use_id;

                    setTimeout(function () {
                        _this.selectPrize(0, data.prizes[2]);
                        setTimeout(function () {
                            _this.selectPrize(2, data.prizes[1]);
                            setTimeout(function () {
                                _this.selectPrize(1, data.prizes[0], function () {
                                    _this.dom.congrats.show().removeClass('hidden');
                                    _this.updateSpinCnt(true);
                                    _this.spinning = false;
                                    pop_db();
                                    $('#spin-btn').prop("disabled", false);
                                    _this.pop_table([data]);
                                });
                            }, 700);
                        }, 700);
                    }, 1500 - diff);
                });
            }
        },
        runSpin1_prog: function(count = 1, callback) {
            let item_arr = [];
            for (var i = 0; i < count; ++i) {
                item_arr.push(this.generate_item());
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, count);
                    _this.pop_table(item_arr);
                });
            }
        },
        runSpin1_prog2: function(item_idx, callback) {
            let item_arr = [];
            let is_item = false;
            let numSpins = 0;
            while (!is_item) {
                ++numSpins;
                let this_item = this.generate_item();
                item_arr.push(this_item);

                for (let i = 0; i < this_item.prizes.length; ++i) {
                    let this_prize = this_item.prizes[i];
                    if (this_prize.item_idx === item_idx) {
                        is_item = true;
                        break;
                    }
                }
            }

            let _this = this;

            if (typeof callback === 'function') {
                callback(item_arr[item_arr.length - 1], function() {
                    _this.updateSpinCnt(true, numSpins);
                    _this.pop_table(item_arr);
                });
            }
        },
        generate_item: function() {
            let items = {};
            for (let i in item_db_rangified) {
                let item = item_db_rangified[i];
                let prn = this.cryptoRandom() * 100;

                let thisItem = item.filter((a)=>{return a.from <= prn && prn < a.to})[0];
                let prize = {
                    item_idx: thisItem.item_idx,
                    coupon_code: this.generateCouponCode(),
                    name: thisItem.name
                };
                items[i] = prize;
            }

            let data = {
                spin_use_id: 1,
                prizes: [items.a, items.b, items.c]
            };

            return data;
        },
        pop_table: function(data = []) {
            if (data.length > 0) {
                for (let a = 0; a < data.length; ++a) {
                    let _data = data[a];
                    for (let i = 0; i < _data.prizes.length; ++i) {
                        let _tp = _data.prizes[i];
                        myItems.push(_tp);
                    }
                }
            }

            let thesePrizes = "";
            let _myItems = [];
            if (max_records !== -1) {
                _myItems = myItems.slice(Math.max(myItems.length - max_records, 0));
            } else {
                _myItems = myItems;
            }
            for (let i = _myItems.length - 1; i >= 0; --i) {
                let _tp = _myItems[i];
                thesePrizes += `<tr class="item-row">
                    <td>${(new Date()).toLocaleDateString()}</td>
                    <td>${_tp.name}</td>
                    <td>${_tp.coupon_code}</td>
                    <td>${(new Date()).toLocaleDateString()}</td>
                </tr>`
            }

            table_body.html(thesePrizes);
            if (myItems.length > 0) {
                let bundle = myItems.length / 3;
                let indivNx =(bundle % 11) * 4900;
                let bundleNx = Math.floor(bundle / 11) * 49000;
                $("#nx-spent").html((bundleNx + indivNx).toNumber() + " NX Spent");
            } else {
                $("#nx-spent").html("0 NX Spent");
            }
        },
        stopSpin1: function () {
            console.log("stopped");
            this.dom.slots.clearQueue().stop().css({ top: 0 });
            this.spinning = false;
            this.sounds['start'].stop();
        },
        selectPrize: function (n, item, callback) {
            //$('.reel-strip').eq(n).show().css({ top: iconReelPositions[prize] }); spin = true;
            var target = this.dom.slots.eq(n);
            var oItems = target.children(`[data-idx="${item.item_idx}"]`);
            var index = oItems.eq(1).index();
            var height = this.itemHeight;
            target.clearQueue().stop().css({ top: -(height * (index - 9)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                //target.clearQueue().stop().css({ top: -(height * (index - 10)) }).animate({ top: -(height * (index)) }, 1000, 'easeOutQuad', function () {
                window.gachapon.sounds['stop'].play();
                $(window.gachapon.dom.prizes[n]).text(item.coupon_code);
                //$(this).css({ top: -((height * oItems.eq(0).index()) + 97), opacity: 0 }).animate({ opacity: 1 });
                $(this).css({ top: -((height * oItems.eq(0).index()) - 70), opacity: 0 }).animate({ opacity: 1 });
                if (typeof callback == 'function') callback.call(this);
            });
            this.dom.animations.eq(n).hide();
        },
        cryptoRandom: function() {
            let arr = new Uint32Array(2);
            crypto.getRandomValues(arr);
            let m = (arr[0] * Math.pow(2,20)) + (arr[1] >>> 12)
            return m * Math.pow(2,-52);
        },
        generateCouponCode: function() {
            let result = '';
            const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let charactersLength = characters.length;
            for (let i = 0; i < 17; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return "Y" + result;
        }
    }
    window.gachapon = new gachapon();
})(jQuery);