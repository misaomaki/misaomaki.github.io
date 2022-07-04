#PARSER TO GET CUBE RATES FOR ALL ITEMS AT ALL LEVELS USING MAPLESTORY'S CUBE RATES API FOR KMS
#LAZY WAY TO DO IT. NOT LOOKING FOR FORMULAS OR ANYTHING. JUST TAKING WHATEVER THEIR API RETURNS AND USING THAT AS IS

import json
import hashlib
import re
import os
from concurrent import futures
import pip._vendor.requests as r 
from bs4 import BeautifulSoup as bs
from googletrans import Translator

#issue: rate limit hit for googletrans API calls, even with caching
TRANSLATE_TEXT = False
TRANSLATE_FROM_LANGUAGE = "ko"

#api-specific variables to call out to maplestory site
ms = {
    "url": "https://maplestory.nexon.com/Guide/OtherProbability/cube/GetSearchProbList",
    #used to trick maplestory's API into giving us its sweet, sweet data. not spoofing the origin redirects us to maplestory site
    "spoofed_headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Content-Length": "51",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "maplestory.nexon.com",
        "Origin": "https://maplestory.nexon.com",
        "Referer": "https://maplestory.nexon.com/Guide/OtherProbability/cube/red",
        "sec-ch-ua": '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
    }
}

#IDs to send to Maplestory API
enums = {
    "cube": {
        "red": 5062009,
        "black": 5062010,
        "bonus": 5062500,
        "occult": 2711000,
        "master": 2711003,
        "meister": 2711004
    },
    "grade": {
        "rare": 1,
        "epic": 2,
        "unique": 3,
        "legendary": 4
    },
    "partsType": {
        "weapon": 0,
        "emblem": 1,
        "secondary": 2,
        "force_shield": 3,
        "shield": 4,
        "hat": 5,
        "top": 6,
        "overall": 7,
        "bottom": 8,
        "shoes": 9,
        "gloves": 10,
        "cape": 11,
        #"belt": 12, #SHARES WITH 11
        #"shoulder": 13, #SHARES WITH 11
        "face_accessory": 14,
        #"eye_accessory": 15, #SHARES WITH 14
        #"earrings": 16, #SHARES WITH 14
        #"ring": 17, #SHARES WITH 14
        #"pendant": 18, #SHARES WITH 14
        "mechanical_heart": 19 #SHARES WITH BADGE (BADGE POT NOT KMS)
    }
}

#stat is increased by 1 at 160+ for epic and above tier
#"str", "dex", "int", "luk", "watt", "matt", "dmg", "allstat"
STAT_UPGRADES_160 = ["STR", "DEX", "INT", "LUK", "공격력", "마력", "데미지", "올스탯"]

translator = Translator()
translated_cache = {} #already translated, so pull from here

#increase stat of line type
def increase_stat(match):
    val = int(match.group()) + 1
    return str(val)

#call out to maplestory's API to get cube rates. it is returned as an HTML table, so will need to parse it
#cubeItemId = cube type (red, black, etc)
#grade = tier (rare, epic, etc)
#partsType = item class (weapon, emblem, etc)
#reqLev = level of item
def request_cube_rates(cubeItemId, partsType, grade, reqLev):
    data = {
        "nCubeItemID": cubeItemId,
        "nGrade": grade,
        "nPartsType": partsType+1,
        "nReqLev": reqLev
    }
    
    x = r.post(ms["url"], headers=ms["spoofed_headers"], data=data)

    results_data = parse_raw_html(reqLev, x.text)
    return results_data

#parse the results tables from the returning HTML data
def parse_raw_html(level, content):
    #encounter an issue parsing = return no data as the item likely has no lines for that particular level
    try:
        soup = bs(content, features="html.parser")

        line_data = []

        #line types are in korean, so translate to english (which will give a rough english translation. will have to check against English maple)
        def process_translations(row, data):
            cols = row.find_all("td")
            [line_type, line_prob_rate] = [ele.text.strip() for ele in cols]

            #pull from translation cache if available
            if TRANSLATE_TEXT:
                if line_type in translated_cache.keys():
                    line_type_translated = translated_cache[line_type]
                else:
                    line_type_translated = translator.translate(line_type, src=TRANSLATE_FROM_LANGUAGE).text
                    translated_cache[line_type] = line_type_translated
            else:
                line_type_translated = line_type

            #for 160+ level item tiers, add 1 to stat value based on list of stats
            if level >= 160:
                for stat in STAT_UPGRADES_160:
                    if line_type_translated.startswith(stat):
                        line_type_translated = re.sub(r'(\d+)', increase_stat, line_type_translated)

            #convert % format to decimal, rounding to 10 decimal places to get rid of floating point imprecision stuff
            line_prob_rate = round(float(line_prob_rate.replace("%", "")) / 100.0, 10) 

            #some lines are duplicated, so the hackiest way to get those lines into the dictionary as a dupe item is to append spaces
            item_added = False
            while (item_added == False):
                if (line_type_translated not in data):
                    data[line_type_translated] = line_prob_rate
                    item_added = True
                else:
                    line_type_translated = line_type_translated + " "

        #loop through the data tables for results with class _1, ... to denote line
        for i in [1,2,3]:
            table = soup.find("table", attrs={
                "class": f"cube_data _{i}"
            })

            #get the data rows
            rows = table.find("tbody").find_all("tr")

            data = {}

            #loop through the data rows and get the cube's line (td1) and line's probability rate (td2)
            with futures.ThreadPoolExecutor() as e:
                fcol = [
                    e.submit(process_translations, row, data) for row in rows
                ]

            line_data.append(data)

        return line_data
    except Exception as e:
        return []


def create_cube_rates_json():
    #construct data going into the master_data
    #priority cube -> item type -> level -> line rates
    #parallel process it using futures so that it doesn't take a billion years, as each call to the API is not dependent on other calls to the API
    #only the last part needed to be parallel. too late now.
    master_data = {}
    hashed_line_data = {}

    #parallel process for CUBE looping
    def cube_process(cube):
        master_data[cube] = {}
        cubeId = enums["cube"][cube]

        with futures.ThreadPoolExecutor() as e:
            fparts = [
                e.submit(partsType_process, partsType, cube, cubeId) for partsType in enums["partsType"]
            ]

    #parallel process for ITEM TYPE looping
    def partsType_process(partsType, cube, cubeId):
        master_data[cube][partsType] = {}
        partsTypeId = enums["partsType"][partsType]

        with futures.ThreadPoolExecutor() as e:
            flevel = [
                e.submit(level_process, cube, cubeId, partsType, partsTypeId, level) for level in range(0,161,10)
            ]

    #parallel process for LEVEL
    def level_process(cube, cubeId, partsType, partsTypeId, level):
        master_data[cube][partsType][level] = {}
        
        with futures.ThreadPoolExecutor() as e:
            fgrade = [
                e.submit(grade_process, cube, cubeId, partsType, partsTypeId, level, grade) for grade in enums["grade"]
            ]
  

    #parallel process for GRADE (final)
    def grade_process(cube, cubeId, partsType, partsTypeId, level, grade):
        gradeId = enums["grade"][grade]

        result = f"{cube} {partsType} {level} {grade}"
        print(f"{result} STARTING")
        line_data = request_cube_rates(cubeId, partsTypeId, gradeId, level)
        print(f"{result} COMPLETED")

        #generate a hash of the line data to be used as a lookup. the equipment data will reference the hash
        line_hash = []

        for line in line_data:
            hashed_data = hashlib.sha512(json.dumps(line).encode("utf-8")).hexdigest()

            if hashed_data not in hashed_line_data.keys():
                hashed_line_data[hashed_data] = line
            
            line_hash.append(hashed_data)
                
                
        master_data[cube][partsType][level][grade] = line_hash

        return line_data


    #start here for beginning to loop through enum data to send data to Maplestory's API for cube rates data
    with futures.ThreadPoolExecutor() as e:
        fcube = [
            e.submit(cube_process, cube) for cube in enums["cube"]
        ]

    print("writing file")

    #have each item type be its own file. too much data for one file to comfortably handle
    for cube in master_data:
        for partsType in master_data[cube]:
            #write the JSON data to a txt file
            with open(f"cube_rates_json_{cube}_{partsType}.txt", 'w', encoding="utf-8") as f:
                json.dump(master_data[cube][partsType], f, ensure_ascii=False)

    #create hash map file for rates
    with open(f"cube_hashes.txt", 'w', encoding="utf-8") as f:
        json.dump(hashed_line_data, f, ensure_ascii=False)

    print("done")
    return master_data

#go!
#create_cube_rates_json()

#debug
#request_cube_rates(5062009, 0, 1, 160)


path = os.path.realpath(__file__)
dir = os.path.dirname(path).replace("util", "cube_rates")

#get all line items and its translations
def get_translations_from_lines():
    data = {}
    keys = {}
    with open(f"{dir}\cube_hashes.txt", 'r', encoding="utf-8") as f: 
        data = json.loads(f.read())

    for d in data:
        for lines in data[d]:
            if (lines not in keys.keys()):
                keys[lines] = translator.translate(lines, src=TRANSLATE_FROM_LANGUAGE).text
                print(keys[lines])

    with open(f"line_translations.txt", 'w', encoding="utf-8") as f:
        json.dump(keys, f, ensure_ascii=False)

#replace korean lines with english lines
def translate_cube_hash_lines():
    lines = ""
    translations = {}
    with open(f"{dir}\cube_hashes.txt", 'r', encoding="utf-8") as f: 
        lines = f.read()

    with open(f"{dir}\line_translations.txt", 'r', encoding="utf-8") as f: 
        translations = json.loads(f.read())

    for kr, en in translations.items():
        lines = lines.replace(kr, en)

    with open(f"cube_hashes_english.txt", 'w', encoding="utf-8") as f:
        f.write(lines)


#the translator can only do so good of a job, so replace its translations with GMS translations where appropriate
kr_en_lines = {
    "All stats:": "All Stats:",
    "Horsepower:": "Magic ATT",
    "Magic:": "Magic ATT:",
    "Attack power:": "ATT:",
    "Attack Power:": "ATT:",
    "Jump power:": "Jump",
    "Movement speed:": "Movement Speed:",
    "Defense:": "DEF:",
    "Ignore monster defense rate:": "Ignored Enemy DEF:",
    "Damage when attacking boss monsters:": "Boss Monster Damage:",
    "Max MP :": "Max MP:",
    "Invincible time after being hit: +1 seconds": "Invincibility time after being hit: +1 second",
    "Invincible time after being hit: +2 seconds": "Invincibility time after being hit: +2 seconds",
    "Invincible time after being hit: +3 seconds": "Invincibility time after being hit: +3 seconds",
    "HP recovery item and recovery skill efficiency:": "HP Recovery Items and Skills:",
    "<Useful Advanced Bless> skill available": "Enables the &lt;Decent Advanced Blessing&gt; skill",
    "<Useful Mystic Door> skill available": "Enables the &lt;Decent Mystic Door&gt; skill",
    "<Useful Wind Booster> skill available": "Enables the &lt;Decent Speed Infusion&gt; skill",
    "<Useful Combat Orders> skill available": "Enables the &lt;Decent Combat Orders&gt; skill",
    "<Useful Sharp Eyes> skill available": "Enables the &lt;Decent Sharp Eyes&gt; skill",
    "<Useful Hyper Body> skill available": "Enables the &lt;Decent Hyper Body&gt; skill",
    "Cooldown time of all skills: -1 second (10 seconds or less decreases by 5%, cannot be reduced to less than 5 seconds)": "Skill Cooldown: -1 sec (-5% for under 10 sec, minimum cooldown of 10 sec)",
    "Cooldown time of all skills: -2 seconds (10% less than 10 seconds, cannot be reduced to less than 5 seconds)": "Skill Cooldown: -2 sec (-10% for under 10 sec, minimum cooldown of 5 sec)",
    "캐릭터 기준 10레벨 당 STR: +1": "STR per 10 Character Levels: +1",
    "캐릭터 기준 10레벨 당 DEX: +1": "DEX per 10 Character Levels: +1",
    "캐릭터 기준 10레벨 당 INT: +1": "INT per 10 Character Levels: +1",
    "캐릭터 기준 10레벨 당 LUK: +1": "LUK per 10 Character Levels: +1",
    "캐릭터 기준 10레벨 당 STR: +2": "STR per 10 Character Levels: +2",
    "캐릭터 기준 10레벨 당 DEX: +2": "DEX per 10 Character Levels: +2",
    "캐릭터 기준 10레벨 당 INT: +2": "INT per 10 Character Levels: +2",
    "캐릭터 기준 10레벨 당 LUK: +2": "LUK per 10 Character Levels: +2",
    "크리티컬 Damage:": "Critical Damage:",
    "캐릭터 기준 10레벨 당 Attack power: +1": "ATT per 10 Character Levels: +1",
    "캐릭터 기준 10레벨 당 Horsepower: +1": "M. ATT per 10 Character Levels: +1"
}
def convert_kren_to_globalen():
    lines = ""
    with open(f"{dir}\cube_hashes_english.txt", 'r', encoding="utf-8") as f: 
        lines = f.read()

    for kr, en in kr_en_lines.items():
        lines = lines.replace(kr, en)

    with open(f"cube_hashes_gms.txt", 'w', encoding="utf-8") as f:
        f.write(lines)

#get_translations_from_lines()
#translate_cube_hash_lines()
#convert_kren_to_globalen()