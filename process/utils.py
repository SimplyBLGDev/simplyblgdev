import json

def readFile(file):
    with open(file, 'r') as f:
        return json.loads(f.read())

def writeFile(fileName, object):
    with open(fileName, 'w') as f:
        f.write(json.dumps(object))

def cleanupName(name, ignoreRoot = ''):
    destroyWords = [ 'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar' ]

    name = name.removesuffix('-area')
    if ignoreRoot != '':
        name = name.replace(ignoreRoot, '')
    name = name.replace('sea-route', 'route')
    words = name.split('-')
    newWords = []
    for word in words:
        if (word not in destroyWords and not name.startswith('roaming')):
            if len(word) > 3:
                newWords.append(word.capitalize())
            else:
                newWords.append(word)
    
    return ' '.join(newWords)

def getDictionaryValues(dict):
    values = []
    for key in dict:
        values.append(dict[key])
    
    return values
