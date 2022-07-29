import re
import json
import utils

def readFile(file):
    with open(file, 'r') as f:
        return json.loads(f.read())

def writeFile(fileName, object):
    with open(fileName, 'w') as f:
        f.write(json.dumps(object))

def cleanupName(name, ignoreRoot = ''):
    destroyWords = [ 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar' ]

    name = name.removesuffix('-area')
    if name == ignoreRoot:
        return ' '.join(utils.capitalizeAll(name.split('-')))
    
    if ignoreRoot != '':
        name = name.replace(ignoreRoot, '')
    name = name.replace('sea-route', 'route')
    words = name.split('-')
    newWords = []
    for word in words:
        if (word not in destroyWords and not name.startswith('roaming')):
            if re.search(r'b?[0-9]+f', word):
                newWords.append(word)
            else:
                newWords.append(word.capitalize())
    
    return ' '.join(newWords)

def getDictionaryValues(dict):
    values = []
    for key in dict:
        values.append(dict[key])
    
    return values


def getDictKeyFromValue(dict, value):
    values = list(dict.values())
    keys = list(dict.keys())
    ix = values.index(value)
    return keys[ix]


def capitalizeAll(words):
    r = []
    for word in words:
        r.append(word.capitalize())
    
    return r
