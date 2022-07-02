#PARSER TO GET CUBE RATES FOR ALL ITEMS AT ALL LEVELS USING MAPLESTORY'S CUBE RATES API FOR KMS
#LAZY WAY TO DO IT. NOT LOOKING FOR FORMULAS OR ANYTHING. JUST TAKING WHATEVER THEIR API RETURNS AND USING THAT AS IS

import json
from concurrent import futures
import pip._vendor.requests as r 
from bs4 import BeautifulSoup as bs

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
        "overalls": 7,
        "pants": 8,
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
        "mechanical heart": 19 #SHARES WITH BADGE (BADGE POT NOT KMS)
    }
}

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

    results_data = parse_raw_html(x.text)

    return results_data

#parse the results tables from the returning HTML data
def parse_raw_html(content):
    #encounter an issue parsing = return no data as the item likely has no lines for that particular level
    try:
        soup = bs(content, features="html.parser")

        line_data = []
        
        #loop through the data tables for results with class _1, ... to denote line
        for i in [1,2,3]:
            table = soup.find("table", attrs={
                "class": f"cube_data _{i}"
            })

            #get the data rows
            rows = table.find("tbody").find_all("tr")

            data = {}

            #loop through the data rows and get the cube's line (td1) and line's probability rate (td2)
            for row in rows:
                cols = row.find_all("td")
                [line_type, line_prob_rate] = [ele.text.strip() for ele in cols]
                data[line_type] = line_prob_rate

            line_data.append(data)

        return line_data
    except:
        return []


def create_cube_rates_json():
    #construct data going into the master_data
    #priority cube -> item type -> level -> line rates
    #parallel process it using futures so that it doesn't take a billion years, as each call to the API is not dependent on other calls to the API
    #only the last part needed to be parallel. too late now.
    master_data = {}

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
            fparts = [
                e.submit(level_process, cube, cubeId, partsType, partsTypeId, level) for level in range(0,160,20)
            ]

    #parallel process for LEVEL
    def level_process(cube, cubeId, partsType, partsTypeId, level):
        master_data[cube][partsType][level] = {}
        with futures.ThreadPoolExecutor() as e:
            fparts = [
                e.submit(grade_process, cube, cubeId, partsType, partsTypeId, level, grade) for grade in enums["grade"]
            ]

    #parallel process for GRADE (final)
    def grade_process(cube, cubeId, partsType, partsTypeId, level, grade):
        gradeId = enums["grade"][grade]

        result = f"{cube} {partsType} {level} {grade}"
        print(f"{result} STARTING")
        master_data[cube][partsType][level][grade] = request_cube_rates(cubeId, partsTypeId, gradeId, level)
        print(f"{result} COMPLETED")


    #start here for beginning to loop through enum data to send data to Maplestory's API for cube rates data
    with futures.ThreadPoolExecutor() as e:
        fcube = [
            e.submit(cube_process, cube) for cube in enums["cube"]
        ]

    #have each cube be its own file. too much data for one file to comfortably handle
    for cube in master_data:
        #write the JSON data to a txt file
        f = open(f"cube_rates_json_{cube}.txt", "w")
        f.write(json.dumps(master_data[cube]))
        f.close()

    return master_data

#go!
create_cube_rates_json()