import pokeIcons from '../../assets/Pokemon/pokeIcons.json'
var encounterTable = {};
var generation;
var baseLocationIds;
var rngCounter = [12, 47]; // Used for randomizing icon gender

function FetchEncounters(gen, encounters) {
    generation = gen;
    encounterTable = AssignGendersToTable(encounters);
    
    return encounterTable;
}

function AssignGendersToTable(table) {
    table.locations.forEach(location => {
        location.areas.forEach(area => {
            area.encounters.forEach(encounter => {
                encounter['iconGender'] = GetIconGender(encounter);
            });
        });
    });

    return table;
}

function GetEncountersForLocation(locationId) {
    for (var i = 0; i < encounterTable.locations.length; i++) {
        if (encounterTable.locations[i].id == locationId) {
            return encounterTable.locations[i];
        }
    }

    return encounterTable.locations[0];
}

// eslint-disable-next-line
function GetIconGender(encounterJSON) {
    var femaleAllowed = true;
    switch (generation) {
        case 1: femaleAllowed = false; break;
        case 2: if (!encounterJSON.games.includes('c')) femaleAllowed = false; break;
        default: femaleAllowed = true;
    }

    if (!femaleAllowed)
        return 0;
    else {
        return getRNG() % 2;
    }
}

function getRNG() {
    tickRNG();
    return tickRNG();
}

function tickRNG() {
    rngCounter[0] = (5 * rngCounter[0] + 1) % 256;
    var c = (rngCounter[1] & 0x80) != 0;
    var z = (rngCounter[1] & 0x10) != 0;
    rngCounter[1] = (2 * rngCounter[1]) % 256;
    if (c == z) {
        rngCounter[1]++;
    }
    return rngCounter[0] + rngCounter[1];
}

// eslint-disable-next-line
function SortByMethod(list) {
    return list.sort((a, b) => (GetMethodValue(a.method) > GetMethodValue(b.method) ? 1 : -1));
}

function GetMethodValue(method) {
    return {
        "gift":0,
        "walk":1,
        "surf":2,
        "seaweed":3,
        "old-rod":4,
        "good-rod":5,
        "super-rod":6,
        "headbutt-normal":7,
        "headbutt-high":8,
        "rock-smash":9,
        "pokeflute":10,
        "squirt-bottle":11,
        "wailmer-pail":12,
        "gift-egg":13,
        "only-one":14
    }[method];
}

function GetPokeList(topIX) {
    var iconsClone = [...pokeIcons.icons];
    iconsClone = iconsClone.splice(0, topIX);

    var ret = [];

    for (var i = 0; i < iconsClone.length; i++) {
        ret.push({
            "name":iconsClone[i].name,
            "icon":iconsClone[i].icon,
            "value":iconsClone[i].name
        });
    }

    return ret;
}

function GetPokeName(dexNo) {
    return pokeIcons.icons[dexNo-1].name;
}

function FindPokemon(poke) {
    var resultsIds = []
    encounterTable.locations.forEach(function(location) {
        for (var i = 0; i < location.areas.length; i++) {
            for (var j = 0; j < location.areas[i].encounters.length; j++) {
                if (GetPokeName(location.areas[i].encounters[j].pkmn) == poke) {
                    resultsIds.push(location.id);
                    return;
                }
            }
        }
    });

    if (resultsIds.length == 1 && resultsIds == baseLocationIds) {
        return []; // Don't highlight base location
    }

    return resultsIds;
}

export { FetchEncounters, GetEncountersForLocation, GetPokeList, FindPokemon, GetPokeName }