import utils
import pokepy

pokeAPI = pokepy.V2Client()

def getPokeAPIIDForLocation(name, routeRegions):
    name = name.replace(' ', '-').lower()
    if name.startswith('route') or name.startswith('victory') or name.startswith('safari') or name.startswith('pokemon-league') or name.startswith('altering-cave'):
        name = routeRegions + '-' + name
    
    locationName = name
    try:
        response = pokeAPI.get_location(locationName)
    except:
        print("Couldn't find " + name)
        return input("Manually input ID: ")

    return response[0].id


def getPokemonFormsAPI():
    for i in range(1, 906):
        p = pokeAPI.get_pokemon(i)[0]
        print("{1}: '{0}',".format(p.name.upper().replace('-', '_'), str(i)))
    for i in range(10001, 10250):
        p = pokeAPI.get_pokemon(i)[0]
        print("{1}: '{0}',".format(p.name.upper().replace('-', '_'), str(i)))


def geticonPokeConstantsAPI():
    exceptions = {
        'nidoran-f': {
            'name': 'Nidoran F',
            'form': ''
        },
        'nidoran-m': {
            'name': 'Nidoran M',
            'form': ''
        },
        'mr-mime': {
            'name': 'Mr. Mime',
            'form': ''
        },
        'farfetchd': {
            'name': 'Farfetch\'d',
            'form': ''
        },
        'ho-oh': {
            'name': 'Ho-Oh',
            'form': ''
        },
        'mime-jr': {
            'name': 'Mime Jr.',
            'form': ''
        },
        'mr-rime': {
            'name': 'Mr. Rime',
            'form': ''
        },
        'pumpkaboo-average': {
            'name': 'Pumpkaboo',
            'form': ''
        },
        'gourgeist.average': {
            'name': 'Gourgeist',
            'form': ''
        },
        'tapu-koko': {
            'name': 'Tapu-Koko',
            'form': ''
        },
        'tapu-lele': {
            'name': 'Tapu-Lele',
            'form': ''
        },
        'tapu-fini': {
            'name': 'Tapu-Fini',
            'form': ''
        },
        'tapu-bulu': {
            'name': 'Tpu-Bulu',
            'form': ''
        },
        'porygon-z': {
            'name': 'Porygon-Z',
            'form': ''
        }
    }
    def getStr(i):
        p = pokeAPI.get_pokemon(i)[0]
        spriteURL = p.sprites.front_shiny
        name = p.name.lower()
        if name in exceptions:
            form = exceptions[name]['form']
            name = exceptions[name]['name']
        else:
            form = ' '.join(utils.capitalizeAll(p.name.split('-')[1:]))
            name = p.name.split('-')[0].capitalize()

        if spriteURL:
            spriteURL = spriteURL.split('/')[-1][:-4]
        else:
            spriteURL = '0'
        
        if form == '':
            print('{"name": "' + name + '", "icon": "' + spriteURL + '", "ix": ' + str(i) + '},')
        else:
            print('{"name": "' + name + '", "form": "' + form + '", "icon": "' + spriteURL + '", "ix": ' + str(i) + '},')
    
    for i in range(1, 906):
        getStr(i)
    for i in range(10001, 10250):
        getStr(i)


def getRegion():
    region = input("Region >").lower()
    locations = input(">").split(' ')
    for location in locations:
        print(getPokeAPIIDForLocation(location, region))


if __name__ == '__main__':
    #getRegion()
    geticonPokeConstantsAPI()
