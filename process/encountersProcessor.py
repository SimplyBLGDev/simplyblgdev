from concurrent.futures import process

import json

def readFile(file):
    with open(file, 'r') as f:
        return json.loads(f.read())

def cleanupName(name):
    words = name.split('-')
    newWords = []
    for word in words:
        newWords.append(word.capitalize())
    
    return ' '.join(newWords)

### END UTILS

def processFile(src, fileName, name):
    processed = {}
    original = readFile(src)

    processed['name'] = name
    processed['games'] = original['games']
    processed['locations'] = []
    for location in original['locations']:
        newLocation = processLocation(location)
        processed['locations'].append(newLocation)

    with open(fileName, 'w') as f:
        f.write(json.dumps(processed))

def processLocation(original):
    newLocation = {}
    newLocation['name'] = cleanupName(original['name'])
    newLocation['id'] = original['id']
    newLocation['areas'] = []
    for area in original['areas']:
        newArea = processArea(area)
        newLocation['areas'].append(newArea)
    
    return newLocation

def processArea(original):
    newArea = {}
    name = original['name']
    name = name.removesuffix('-area')
    newArea['name'] = cleanupName(name)
    newArea['encounters'] = []
    for encounter in original['encounters']:
        newEncounter = processEncounter(encounter)
        newArea['encounters'].append(newEncounter)
    
    newArea['encounters'] = collapseEncounters(newArea['encounters'])

    return newArea

def processEncounter(original):
    newEncounter = {}
    pokemonId = original['pokemon']['icon'].split('/')[-1].removesuffix('.png')
    newEncounter['pkmn'] = int(pokemonId)
    newEncounter['method'] = original['method']
    newEncounter['chance'] = original['chance']
    newEncounter['min'] = original['min_level']
    newEncounter['max'] = original['max_level']

    if original['conditions'] != []:
        newEncounter['conditions'] = original['conditions']
    
    newEncounter['games'] = processGames(original['games'])
    if not areTimedChancesIrrelevant(original['timedChances']):
        newEncounter['timedChances'] = {
            'morning': original['timedChances']['time-morning'],
            'day': original['timedChances']['time-day'],
            'night': original['timedChances']['time-night']
        }
    
    return newEncounter

def processGames(games):
    gameCodes = {
        'green': 'g',
        'red': 'r',
        'blue': 'b',
        'yellow': 'y',
        'gold': 'g',
        'silver': 's',
        'crystal': 'c',
        'ruby': 'r',
        'sapphire': 's',
        'emerald': 'e',
        'firered': 'fr',
        'leafgreen': 'lg',
        'diamond': 'd',
        'pearl': 'p',
        'platinum': 'Pt',
        'heartgold': 'hg',
        'soulsilver': 'ss',
        'black': 'b',
        'white': 'w',
        'black2': 'b2',
        'white2': 'w2',
        'x': 'x',
        'y': 'y',
        'omegaruby': 'or',
        'alphasapphire': 'as',
        'sun': 's',
        'moon': 'm',
        'ultrasun': 'US',
        'ultramoon': 'UM',
        'sword': 'sw',
        'shield': 'sh',
        'brilliantdiamond': 'bd',
        'shiningpearl': 'sp',
        'scarlet': 's',
        'violet': 'v'
    }

    ret = []
    for game in games:
        ret.append(gameCodes[game])
    
    return ret

def areTimedChancesIrrelevant(timedChances):
    return 0 == timedChances['time-morning'] == timedChances['time-day'] == timedChances['time-night']

def collapseEncounters(encounters):
    collapsed = {}

    for encounter in encounters:
        mon = encounter['pkmn']
        games = encounter['games']
        method = encounter['method']
        min = encounter['min']
        max = encounter['max']
        conditions = []
        if 'conditions' in encounter:
            conditions = encounter['conditions']
        chance = encounter['chance']
        timedChances = False
        if 'timedChances' in encounter:
            timedChances = encounter['timedChances']

        comparer = json.dumps({
            'mon': mon,
            'games': games,
            'method': method,
            'conditions': conditions,
            'min': min,
            'max': max
        })
        if comparer not in collapsed:
            if timedChances:
                collapsed[comparer] = timedChances
            else:
                collapsed[comparer] = {
                    'morning': chance,
                    'day': chance,
                    'night': chance
                }
        else:
            if timedChances:
                collapsed[comparer]['morning'] += timedChances['morning']
                collapsed[comparer]['day'] += timedChances['day']
                collapsed[comparer]['night'] += timedChances['night']
            else:
                collapsed[comparer]['morning'] += chance
                collapsed[comparer]['day'] += chance
                collapsed[comparer]['night'] += chance
    
    newEncounters = []

    for encounter in collapsed:
        enc = json.loads(encounter)
        hasTimedChance = False
        timedChance = {
            'morning': 0,
            'day': 0,
            'night': 0
        }

        chance = 0
        if collapsed[encounter]['morning'] == collapsed[encounter]['day'] == collapsed[encounter]['night']:
            chance = collapsed[encounter]['day']
        else:
            hasTimedChance = True
            timedChance['morning'] = collapsed[encounter]['morning'] 
            timedChance['day'] = collapsed[encounter]['day']
            timedChance['night'] = collapsed[encounter]['night']

        newEncounter = {
            'pkmn': enc['mon'],
            'method': enc['method'],
            'chance': chance,
            'min': enc['min'],
            'max': enc['max'],
            'games': enc['games']
        }

        if hasTimedChance:
            newEncounter['timedChance'] = timedChance
        
        if 'conditions' in enc:
            newEncounter['conditions'] = enc['conditions']

        newEncounters.append(newEncounter)
    
    return newEncounters

def processRegion(region):
    fileToLoad = '_{0}Encounters.json'.format(region)
    fileToWrite = '{0}Encounters.json'.format(region)
    processFile(fileToLoad, fileToWrite, region)

if __name__ == '__main__':
    processRegion('Kanto')
    processRegion('Johto')
    processRegion('Hoenn')
    processRegion('Kanto3')
    processRegion('Sinnoh')