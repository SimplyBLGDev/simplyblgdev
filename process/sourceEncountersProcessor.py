import copy
import json
import utils
import NatDex

GAME = 'R'
NATDEX = NatDex.NATDEX
SPECIES_PREFIX = 'SPECIES_'
currentMapIx = 0

def process(fileName, dest):
    src = utils.readFile(fileName)
    dst = parse(src['wild_encounter_groups'][0]) # gWildMonHeaders
    utils.writeFile(dest, dst)


def parse(src):
    encounter_method_slots = parseEncounterMethodSlots(src['fields'])

    maps = []
    for map in src['encounters']:
        newMap = parseMap(map, encounter_method_slots)
        maps.append(newMap)
    
    return {
        'name': 'ROWE',
        'locations': maps
    }


def parseEncounterMethodSlots(fields):
    encounter_method_slots = {}

    for field in fields:
        encounter_method_slots[field['type']] = field['encounter_rates']
    
    return encounter_method_slots


def parseMap(map, encounter_method_slots):
    global currentMapIx

    name = map['base_label']
    table = []

    for method in encounter_method_slots:
        if method in map:
            newTable = parseTable(map[method]['mons'], encounter_method_slots[method], method)
            table += newTable
    
    map = {
        'name': name,
        'id': currentMapIx,
        'areas': [
            {
                'name': '',
                'encounters': table
            }
        ]
    }
    currentMapIx += 1
    
    return postProcessMap(map)


def parseTable(table, slots, method):
    encounters = []
    ix = 0
    for encounter in table:
        newEncounter = parseEncounter(encounter, slots[ix], method, ix)
        encounters.append(newEncounter)
        ix += 1
    
    collapsed = collapseTable(encounters)
    return collapsed


def parseEncounter(encounter, chance, method, slotId):
    species = getNatDexNumber(encounter['species'])
    enc = {
        'pkmn': species,
        'method': parseMethod(method, slotId),
        'chance': chance,
        'min': encounter['min_level'],
        'max': encounter['max_level'],
        'conditions': [],
        'games': [ GAME ]
    }

    if method in ['land_mons_night']:
        enc['timedChance'] = {
            'morning': 0,
            'day': 0,
            'night': chance
        }
    elif method in ['land_mons']:
        enc['timedChance'] = {
            'morning': chance,
            'day': chance,
            'night': 0
        }
    
    return enc


def parseMethod(method, slotId):
    if method == 'fishing_mons':
        if slotId in [0, 1]:
            return 'old-rod'
        elif slotId in [2, 3, 4]:
            return 'good-rod'
        elif slotId in [5, 6, 7, 8, 9]:
            return 'super-rod'
    
    return {
        'land_mons': 'walk',
        'land_mons_night': 'walk',
        'water_mons': 'surf',
        'rock_smash_mons': 'rock-smash',
        'headbutt_mons': 'headbutt',
        'hidden_mons': 'devon-scope'
    }[method]


def getNatDexNumber(specie):
    specie = specie.removeprefix(SPECIES_PREFIX)
    natDexNo = NATDEX.index(specie) + 1
    return natDexNo


def collapseTable(table):
    result = {}
    for encounter in table:
        key = str(encounter['pkmn']) + ';' + encounter['method']
        if key not in result:
            result[key] = copy.deepcopy(encounter)
        else:
            result[key]['min'] = min(result[key]['min'], encounter['min'])
            result[key]['max'] = max(result[key]['max'], encounter['max'])
            result[key]['chance'] += encounter['chance']
            if 'timedChance' in result[key]:
                result[key]['timedChance']['morning'] += encounter['timedChance']['morning']
                result[key]['timedChance']['day'] += encounter['timedChance']['day']
                result[key]['timedChance']['night'] += encounter['timedChance']['night']
    
    for key in result:
        if 'timedChance' in result[key]:
            if result[key]['timedChance']['morning'] == result[key]['timedChance']['day'] == result[key]['timedChance']['night']:
                print('yelp')
                result[key]['chance'] = result[key]['timedChance']['day']
                del result[key]['timedChance']

    return utils.getDictionaryValues(result)


def postProcessMap(map):
    return map


def generateConstantIcons():
    res = []
    for i in range(0, 898):
        res.append({
            'name': NATDEX[i].lower(),
            'icon': i+1
        })
    
    print(res)


if __name__ == '__main__':
    process('_ROWEEncounters.json', 'ROWEEncounters.json')
    #generateConstantIcons()
