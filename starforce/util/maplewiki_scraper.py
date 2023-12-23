#PARSER 

import json
import hashlib
import re
import os
from concurrent import futures
import pip._vendor.requests as r 
from bs4 import BeautifulSoup as bs
from googletrans import Translator

#api-specific variables to call out to maplestory site
ms = {
    "url": "https://maplestory.fandom.com/wiki/Category:Secondary_Weapons"
}

upgrades = {
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
    "android heart": 9,
    "earrings": 7,
    "shoulder": 1,
    "ring": 3,
    "shield": 10,
    "pocket": 0,
    "pocket item": 0,
    "badge": 0,
    "emblem": 0
}

p_stat = {
    "warrior": ["str", "dex"],
    "bowman": ["str", "dex"],
    "magician": ["int", "luk"],
    "thief": ["dex", "luk"],
    "pirate": ["str", "dex"]
}

m_stat = {
    "warrior": "str",
    "bowman": "dex",
    "magician": "int",
    "thief": "luk",
    "pirate": "dex"
}

att_type = {
    "warrior": "watt",
    "bowman": "watt",
    "magician": "matt",
    "thief": "watt",
    "pirate": "watt"
}

maple_jobs = ["beginner", "warrior", "bowman", "magician", "thief", "pirate"]

job_stats = ["str", "int", "dex", "luk"]

def resolve_stat(stat): 
    match stat:
        case "defense":
            return "def"
        case "maxhp":
            return "hp"
        case "maxmp":
            return "mp"
        case "weaponattack":
            return "watt"
        case "magicattack":
            return "matt"
        case "attackspeed":
            return ""
        case "bossdamage": 
            return "boss_damage"
        case "ignoredenemydefense":
            return "ied"
        
    return stat

def get_jobs(job): 
    if job in ['aran', 'adele', 'blaster', 'dawn warrior', 'demon avenger', 'demon slayer', 'hayato', 'kaiser', 'mihile', 'warrior', 'hero', 'dark knight', 'paladin', 'zero']:
        return ["warrior"]
    elif job in ['bowman', 'bowmaster', 'marksman', 'kain', 'mercedes', 'pathfinder', 'wild hunter', 'wind archer']:
        return ["bowman"]
    elif job in ['battle mage', 'beast tamer', 'blaze wizard', 'evan', 'illium', 'kanna', 'kinesis', 'lara', 'luminous', 'magician', 'magician (fire, poison)', 'magician (ice, lightning)', 'bishop']:
        return ["magician"]
    elif job in ['dual blade', 'night walker', 'phantom', 'thief', 'shadower', 'night lord', 'xenon', 'cadena', 'hoyoung', 'khali']:
        return ["thief"]
    elif job in ['angelic buster', 'cannoneer', 'jett', 'mechanic', 'pirate', 'buccaneer', 'corsair', 'shade', 'thunder breaker', 'ark', 'mo xuan']:
        return ["pirate"]
    elif job in ['cygnus knight', 'explorer']:
        return maple_jobs
    
    #plural
    if (job.endsWith("es")):
        return get_jobs(job[:-2])
    elif (job.endswith("s")):
        return get_jobs(job[:-1])
    
    return job

def is_armor(type):
    if type in ["overall", "top", "bottom", "hat","boots","gloves","cape", "belt", "pendant", "face accessory", "eye accessory", "mechanical heart", "android heart", "earrings", "shoulder", "ring", "shield", "totem", "badge", "pocket item"]:
        return "armor"
    
    return "weapon"


def clean_req_type(type):
    type = type.replace(":", "").strip().lower()
    return type

def clean_stat_type(type):
    type = type.replace(":", "").replace(" ", "").strip().lower()
    type = resolve_stat(type)
    return type


#check starforce, scrollability, and cube status
def set_enhancements(item):
    this_enhance = {}

    if (item["type"] in item_enhancibility):
        this_enhance = item_enhancibility[item["type"]]
    elif ("sub_class" in item and item["sub_class"] in item_enhancibility):
        this_enhance = item_enhancibility[item["sub_class"]]

    item.update(this_enhance)


#general enhancability. if not listed, then assume all is allowed
item_enhancibility = {
    "pocket item": {
        "starforce": False,
        "scrollable": False
    },
    "badge": {
        "starforce": False,
        "enhanceable": False,
        "scrollable": False,
        "flame_type": 0
    },
    "totem": {
        "starforce": False,
        "enhanceable": False,
        "scrollable": False,
        "flame_type": 0
    },
    "shoulder": {
        "flame_type": 0
    },
    "ring": {
        "flame_type": 0
    },
    "mechanical heart": {
        "flame_type": 0
    },
    "secondary": {
        "scrollable": False,
        "starforce": False,
        "flame_type": 0
    }
}

#categories page
def request_items_page(url):
    x = r.get(url=url)

    soup = bs(x.text, features="html.parser")
    page_subtitle = soup.find("div", {"class": "page-header__page-subtitle"}).get_text().strip().lower()
    
    if page_subtitle != "category page":
        print("Not a category page.")
        return
    
    #get all links that link to an item page
    item_anchors = soup.select('a.category-page__member-link[title*="Category:"]')

    #get the anchor href link and go to it
    for anchors in item_anchors:
        category_link = f'https://maplestory.fandom.com/{anchors["href"]}'
        y = r.get(url=category_link)
        soup2 = bs(y.text, features="html.parser").find("div", {"class": "mw-parser-output"})
        item_main_anchor = soup2.select('a[href*="/wiki/"]')

        if (len(item_main_anchor) == 0):
            continue

        item_main_url = f'https://maplestory.fandom.com/{item_main_anchor[0]["href"]}'
        request_item_page(item_main_url, 1)

    
    print("DONE!")



#get page source data
#type 1 = parse table of an items page; type 2 - parse table of a categories page
def request_item_page(url, type):    
    x = r.get(url=url)
    soup = bs(x.text, features="html.parser")
    results_data = parse_item_from_table(soup, type)
    return results_data

def parse_item_from_table(soup, type):
    item_category = soup.find("span", {"class": "mw-page-title-main"}).get_text().strip().lower().replace(" ", "_")

    main_content = soup.find("div", attrs={
        "class": "mw-parser-output"
    })

    item_tables = main_content.find_all("table", {"class": "wikitable"})
    if type == 1:
        item_data = extract_item_from_link(soup, item_tables)
    elif type == 2: 
        item_data = extract_item_from_table(soup, item_tables)

    item_store = f'item_store["{item_category}"] = {json.dumps(item_data)};'

    with open('test.txt', 'a') as f:
        f.write(item_store)
        f.writelines('\n\n\n')

#from the item table, loop through the rows and get the data
#ex: https://maplestory.fandom.com/wiki/Hex_Seeker
def extract_item_from_table(soup, tables):
    for table in tables:
        rows = table.find("tbody").find_all("tr")

        items = {}

        cell_enums = {
            "pictureandname": 0,
            "type": 1,
            "requirements": 2,
            "effects": 3
        }

        delimiter = "#####"
        
        #loop through the rows
        for row in rows:
            #check if header row
            header = row.find_all("th")

            lHeader = len(header)

            if lHeader > 0:
                if header[0].get_text().upper().strip() != "PICTURE AND NAME":
                    break

                #if only 3 headers, then type is missing because the page is looking at only this equipment type
                if (lHeader == 3):
                    cell_enums = {
                        "pictureandname": 0,
                        "type": -1,
                        "requirements": 1,
                        "effects": 2
                    }
            
                continue

            #get item row data
            cells = row.find_all("td")

            item = {
                "name": "",
                "level": 0,
                "class": "",
                "type": "",
                "job": [],
                "mstat": "", 
                "pstat": ["str", "dex", "int", "luk"], 
                "att_type": "att", 
                "flame_type": 2,
                "bstat": {},
                "req": {
                    "str": 0,
                    "dex": 0,
                    "int": 0,
                    "luk": 0
                },
                "img": "",
                "upgrades": 0,
                "hammers_added": 0,
                "starforce": True,
                "enhanceable": True,
                "scrollable": True
            }

            #PICTURE AND NAME
            cell0 = cells[cell_enums["pictureandname"]]
            item["name"] = cell0.get_text().strip()

            #save image to disk
            img_url = cell0.find("a", {"class": "image"})["href"]

            img_data_name = re.sub(r'\W+', '', item["name"])
            item["img"] = f"img-{img_data_name.lower()}"
            
            img_data = r.get(img_url).content
            #save image as name of item, removing any special characters
            with open(f'{img_data_name}.png', 'wb') as handler:
                handler.write(img_data)

            #REQUIREMENTS
            cell2 = cells[cell_enums["requirements"]]

            #remove any tags for requirements data (achor links to jobs and whatnot)
            for a in cell2.findAll('a'):
                a.replaceWithChildren()

            #replace line break tag with easily splitable delimiter
            for _br in cell2.find_all("br"):
                _br.replaceWith(delimiter)

            requirements = cell2.get_text().split(delimiter)

            for rq in requirements:
                if (rq.strip().lower() == "none"):
                    continue

                [rq_type, rq_value] = rq.split(" ", 1)
                rq_type = clean_req_type(rq_type)
                rq_value = rq_value.strip().lower()

                if rq_type == "level":
                    item["level"] = int(rq_value.replace(",",""))
                elif rq_type == "job":
                    true_job = get_jobs(rq_value)
                    item["job"] = true_job

                    if (len(true_job) == 1):
                        item["pstat"] = p_stat[true_job[0]]
                        item["mstat"] = m_stat[true_job[0]]
                        item["att_type"] = att_type[true_job[0]]
                elif rq_type in ["str", "dex", "int", "luk"]:
                    item["bstat"][rq_type] = rq_value

            #EFFECTS (ITEM STATS)
            cell3 = cells[cell_enums["effects"]]       
            #replace line break tag with easily splitable delimiter
            for _br in cell3.find_all("br"):
                _br.replaceWith(delimiter)

            stats = cell3.get_text().split(delimiter)
            #print(stats)
            for stat in stats:
                if (stat.strip().lower()) == "none": 
                    continue

                [st_type, st_value] = stat.split(":", 1)

                st_type = clean_stat_type(st_type)
                #print(f"{st_type} - {st_value}")

                if st_type not in ["", "allstats"]:
                    if ("%" not in st_value):
                        item["bstat"][st_type] = int(st_value.replace(",",""))
                    else:
                        #is percent value
                        item["bstat"][f"p_{st_type}"] = int(st_value.replace(",","").replace("%", "")) / 100

                if (st_type == "allstats"):
                    for job_stat in job_stats:
                        item["bstat"][job_stat] = int(st_value.replace(",",""))



            #TYPE
            #if type column doesn't exist, then check main title page for the equipment type
            if cell_enums["type"] == -1:
                item["type"] = soup.find("span", {"class": "mw-page-title-main"}).get_text().strip().lower()

                #job may not be listed if type is missing
                if len(item["job"]) == 0:
                    #assume first anchor tag in description is the job
                    description = soup.find("div", {"class": "mw-parser-output"}).find("p")
                    find_job = description.select('a[href*="/wiki/"]')[0].get_text().strip().lower()
                    true_job = get_jobs(find_job)
                    item["job"] = true_job                 
                    if (len(true_job) == 1):
                        item["pstat"] = p_stat[true_job[0]]
                        item["mstat"] = m_stat[true_job[0]]
                        item["att_type"] = att_type[true_job[0]]

                    if "secondary weapon" in description.get_text().lower():
                        item["sub_class"] = "secondary"
            else:
                cell1 = cells[cell_enums["type"]].get_text().strip().lower()
                item["type"] = cell1


            item["class"] = is_armor(item["type"])

            if (item["type"] in upgrades):
                item["upgrades"] = upgrades[item["type"]]
            
            if (item["upgrades"] != 0):
                item["hammers_added"] = 2

            #set any subclasses
            if (item["type"] == "face accessory"):
                item["sub_class"] = "accessory"


            #no job = all job
            if len(item["job"]) == 0:
                   item["job"] = maple_jobs

            set_enhancements(item)
            
            items[item["name"].lower().replace(" ", "_")] = item
    return items


#from the item table of a categories page, get the link to the item from the picture and name column and get the item data there
#ex: https://maplestory.fandom.com/wiki/Category:Canes -> https://maplestory.fandom.com/wiki/AbsoLab_Forked_Cane
def extract_item_from_link(soup, tables):
    for table in tables:
        rows = table.find("tbody").find_all("tr")

        items = {}

        delimiter = "#####"
        
        #loop through the rows
        for row in rows:
            #check if header row
            header = row.find_all("th")

            lHeader = len(header)

            if lHeader > 0:
                if header[0].get_text().upper().strip() != "PICTURE AND NAME":
                    break

                continue

            #get item row data
            cells = row.find_all("td")

            item = {
                "name": "",
                "level": 0,
                "class": "",
                "type": "",
                "job": [],
                "mstat": "", 
                "pstat": ["str", "dex", "int", "luk"], 
                "att_type": "att", 
                "flame_type": 2,
                "bstat": {},
                "req": {
                    "str": 0,
                    "dex": 0,
                    "int": 0,
                    "luk": 0
                },
                "img": "",
                "upgrades": 0,
                "hammers_added": 0,
                "starforce": True,
                "enhanceable": True,
                "scrollable": True
            }

            #PICTURE AND NAME
            cell0 = cells[0]
            item["name"] = cell0.get_text().strip()

            if (False):
                #save image to disk
                img_url = cell0.find("a", {"class": "image"})["href"]

                img_data_name = re.sub(r'\W+', '', item["name"])
                item["img"] = f"img-{img_data_name.lower()}"
                
                img_data = r.get(img_url).content
                #save image as name of item, removing any special characters
                with open(f'{img_data_name}.png', 'wb') as handler:
                    handler.write(img_data)

            item_anchor = cell0.select("a")[1]
            item_link = f'https://maplestory.fandom.com/{item_anchor["href"]}'
            y = r.get(url=item_link)
            soup2 = bs(y.text, features="html.parser").find("div", {"class": "mw-parser-output"})
            item_tables = soup2.select("table")

            for item_table in item_tables:
                item_row = item_table.select("tbody tr")
                print(item_row)
                return
            
            #get url data
            

    return items


request_item_page('https://maplestory.fandom.com/wiki/Hex_Seeker', 2)
#request_itemS_page('https://maplestory.fandom.com/wiki/Cane#Obtainable')