import copy
import utils
import NatDex
import nameParser
import ROWE_MAP_IDS

GAME = 'R'
NATDEX = NatDex.NATDEX
SPECIES_PREFIX = 'SPECIES_'
MAP_IDS = ROWE_MAP_IDS.ROWE_MAP_IDS
currentMapIx = 0

def process(fileName, dest, parser):
    src = utils.readFile(fileName)
    dst = parse(src['wild_encounter_groups'][0], parser) # gWildMonHeaders
    utils.writeFile(dest, dst)


def parse(src, nameParser):
    encounter_method_slots = parseEncounterMethodSlots(src['fields'])

    maps = []
    for map in src['encounters']:
        newMap = parseMap(map, encounter_method_slots)
        maps.append(newMap)

    locations = groupLocations(maps, nameParser)
    
    return {
        'name': 'ROWE',
        'locations': locations
    }


def parseEncounterMethodSlots(fields):
    encounter_method_slots = {}

    for field in fields:
        encounter_method_slots[field['type']] = field['encounter_rates']
    
    return encounter_method_slots


def parseMap(map, encounter_method_slots):
    global currentMapIx
    hasTimedEncounters = 'land_mons_night' in map

    table = []

    for method in encounter_method_slots:
        if method in map:
            newTable = parseTable(map[method]['mons'], encounter_method_slots[method], method, hasTimedEncounters)
            table += newTable

    currentMapIx += 1
    
    return {
        'name': map['map'],
        'encounters': table
        }


def parseTable(table, slots, method, hasTimedEncounters):
    encounters = []
    ix = 0
    for encounter in table:
        newEncounter = parseEncounter(encounter, slots[ix], method, ix, hasTimedEncounters)
        encounters.append(newEncounter)
        ix += 1
    
    collapsed = collapseTable(encounters)
    return collapsed


def parseEncounter(encounter, chance, method, slotId, hasTimedEncounters):
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

    if hasTimedEncounters:
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
    natDexNo = utils.getDictKeyFromValue(NATDEX, specie)
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
                result[key]['chance'] = result[key]['timedChance']['day']
                del result[key]['timedChance']

    return utils.getDictionaryValues(result)


def groupLocations(maps, nameParser):
    locations = {}

    for map in maps:
        group, name = nameParser.parse(map['name'])
        map['name'] = name

        if group not in locations.keys():
            if group in MAP_IDS:
                id = MAP_IDS[group]
            else:
                id = 0
            locations[group] = {
                'name': group,
                'id': id,
                'areas': [ map ]
            }
        else:
            locations[group]['areas'].append(map)
        
    return utils.getDictionaryValues(locations)


def defineNameAndGroupsFromFile(file: str, parser):
    data = utils.readFile(file)
    groups = getGroups(data['wild_encounter_groups'][0]['encounters'], parser)
    
    for group in groups:
        print("'{0}': {1}".format(group, getPokeAPIIDForLocation(group, 'hoenn ')))


def getGroups(encounters, parser):
    groups = []
    for encounter in encounters:
        group, name = parser.parse(encounter['map'])
        if group not in groups:
            groups.append(group)
    
    return groups


if __name__ == '__main__':
    process('_ROWEEncounters.json', 'ROWEEncounters.json', nameParser.GBASourceNameParser())
    #groups = defineNameAndGroupsFromFile('_ROWEEncounters.json', nameParser.GBASourceNameParser())
