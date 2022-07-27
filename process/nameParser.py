import re

def capitalizeWords(src: str) -> str:
    r = []
    words = src.split(' ')
    for word in words:
        r.append(word.capitalize())
    
    return ' '.join(r)

class GBASourceNameParser:
    ROWE_EXCEPTIONS = {
        'ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS': {
            'group': 'Abandoned Ship',
            'name': 'Hidden floor corridors'
        },
        'ROUTE101HOLE': {
            'group': 'Route 101',
            'name': 'Hole'
        },
        'TWO_ISLAND_CAPE_BRINK2': {
            'group': 'Two Island Cape Brink',
            'name': 'Area 2'
        },
        'FIERY_PATH2': {
            'group': 'Fiery Path',
            'name': 'Area 2'
        }
    }

    def __init__(self) -> None:
        pass


    def parse(self, name: str):
        SUFFIX_REGEX = r'(?P<group>[A-Z_]*?)_(?P<name>(([B0-9]{1,3}F(_[0-9]R)?)|([0-9]R)|((SOUTH|NORTH|EAST|WEST)+|INSIDE|OUTSIDE|ENTRANCE|EXIT|TIDE|INNER|OUTER|ROOF|SUMMIT|ITEM|UPPER|LOWER|HEATRANS|STEVENS|SHIP|INTERIOR|EXTERIOR)(_(ROOM|PATCH)[0-9]*)?|(ROOM|CHAMBER)[0-9]*)|([0-9]))$'

        name = name.removeprefix('MAP_')
        if name in self.ROWE_EXCEPTIONS.keys():
            group = self.ROWE_EXCEPTIONS[name]['group']
            name = self.ROWE_EXCEPTIONS[name]['name']
        elif re.search(r'^ROUTE[0-9]*', name):
            group = 'Route ' + name.removeprefix('ROUTE')
            name = group
        elif re.search(r'^UNDERWATER_ROUTE[0-9]*', name):
            group = 'Underwater Route ' + name.removeprefix('UNDERWATER_ROUTE')
            name = group
        else:
            suffixMatch = re.search(SUFFIX_REGEX, name)
            if suffixMatch:
                group = suffixMatch.group('group')
                group = group.replace('_', ' ')
                group = capitalizeWords(group)
                name = suffixMatch.group('name')
                name = name.replace('_', ' ')
                name = capitalizeWords(name)
            else:
                group = name.replace('_', ' ')
                group = capitalizeWords(group)
                name = group
            
        
        return group, name
