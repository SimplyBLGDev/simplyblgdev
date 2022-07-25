import copy
import json
import utils

SPECIES_PREFIX = 'SPECIES_'
NATDEX = []
currentMapIx = 0

def process(fileName, dest):
    src = utils.readFile(fileName)
    dst = parse(src['wild_encounter_groups'][0]) # gWildMonHeaders
    utils.writeFile(dest, dst)


def parse(src):
    encounter_method_slots = parseEncounterMethodSlots(src['fields'])

    for map in src['encounters']:
        parseMap(map, encounter_method_slots)


def parseEncounterMethodSlots(fields):
    encounter_method_slots = {}

    for field in fields:
        encounter_method_slots[field['type']] = field['encounter_rates']
    
    return encounter_method_slots


def parseMap(map, encounter_method_slots):
    global currentMapIx

    name = map['base_label']
    tables = []

    for method in encounter_method_slots:
        if method in map:
            newTable = parseTable(map[method], encounter_method_slots[method], method)
            tables.append(newTable)
    
    map = {
        'name': name,
        'id': currentMapIx,
        'areas': [
            'name': '',
            'encounters': tables
        ]
    }
    currentMapIx += 1
    
    return postProcessMap(map)


def parseTable(table, slots, method):
    encounters = []
    ix = 0
    for encounter in table:
        newEncounter = parseEncounter(encounter, slots[ix], method)
        encounter.append(newEncounter)
        ix += 1
    
    collapsed = collapseTable(encounters)
    return collapsed


def parseEncounter(encounter, chance, method):
    species = getNatDexNumber(encounter['species'])
    return {
        'pkmn': species,
        'method': method,
        'chance': chance,
        'min': encounter['min_level'],
        'max': encounter['max_level']
    }


def getNatDexNumber(specie):
    specie = specie.removePrefix(SPECIES_PREFIX)
    natDexNo = NATDEX.index(specie)
    return natDexNo


def collapseTable(table):
    result = {}
    for encounter in table:
        key = encounter['table']
        if key not in result:
            result[key] = copy.deepcopy(encounter)
        else:
            result[key]['min'] = min(result[key]['min'], encounter['min'])
            result[key]['max'] = max(result[key]['max'], encounter['max'])
            result[key]['chance'] += encounter['min']
    
    return result.values()


def postProcessMap(map):
    return map


if __name__ == '__main__':
    process('_ROWEEncounters.json', 'ROWEEncounter.json')
