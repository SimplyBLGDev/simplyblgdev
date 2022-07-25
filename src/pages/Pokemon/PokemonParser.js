import pokeConstants from '../../assets/Pokemon/pokeConstants.json'
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
    var iconsClone = [...pokeConstants.icons];
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
    return pokeConstants.icons[dexNo-1].name;
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

function FilterEncounters(encounters, currentGames, conditions, currentConditions) {
    var ret = encounters;
    ret = FilterGames(ret, currentGames);
    ret = ConditionEncounters(ret, conditions, currentConditions);
    ret = CollapseEncounters(ret);

    return ret;
}

function FilterGames(encounters, games) {
    var filtered = [];
    for (var i = 0; i < encounters.length; i++) {
        if (Intersects(encounters[i].games, games)) {
            filtered.push(encounters[i]);
        }
    }

    return filtered;
}

function ConditionEncounters(encounters, conditions, currentConditions) {
    var conditioned = [];
      for (var j = 0; j < encounters.length; j++) {
        var valid = true;
        if (encounters[j].conditions.length > 0) {
          currentConditions.forEach(conditionGroup => {

            switch (conditionGroup.type) {

              case "selection":
                var allConditionsExceptSelected = conditionGroup.options.slice(); // Copy
                allConditionsExceptSelected.splice(conditions[conditionGroup.name], 1); // Remove selected

                var values = allConditionsExceptSelected.map(a => a.value);
                if (Intersects(values, encounters[j].conditions)) {
                  valid = false;
                }
                break;
              
              case "toggle":
                if (conditions[conditionGroup.name] != 0) {
                  valid = false;
                }
                break;
              
            }

          });
        }

        if (valid) {
          conditioned.push(encounters[j]);
        }
      }
      
      return conditioned;
}

function Intersects(a, b) {
    return a.some(r=>b.includes(r));
}

function CollapseEncounters(encounters) {
    var collapsed = {};
    var cloned = [];

    encounters.forEach(encounter => {
        var key = encounter.pkmn + ';' + encounter.method + ';' + encounter.games.join(';');
        
        if (!collapsed[key]) {
            collapsed[key] = encounter;
        } else {
            if (!cloned.includes(key)) {
                // Copy by value (as to not invoke getters and setters in the UI and enter an endless loop)
                // The stringification allows us to get rid of all the setters and getters attached to the properties
                // Altough it is pretty awkward
                // The cloned array allows us to only clone it by value once and only whene necessary (when we're
                // about to fuse two encounters)
                collapsed[key] = JSON.parse(JSON.stringify(collapsed[key]));
                cloned.push(key);
            }
            collapsed[key].max = Math.max(collapsed[key].max, encounter.max);
            collapsed[key].min = Math.min(collapsed[key].min, encounter.min);
            collapsed[key].iconGender = Math.min(collapsed[key].iconGender, encounter.iconGender);
            
            if (collapsed[key]['timedChance'] || encounter['timedChance']) {
                console.log(key);
                collapsed[key].timedChance = JoinTimedChances([collapsed[key], encounter]);
                console.log(collapsed[key].timedChance);
                if (collapsed[key].timedChance.morning == collapsed[key].timedChance.day && collapsed[key].timedChance.day == collapsed[key].timedChance.night) {
                    collapsed[key].chance = collapsed[key].timedChance.day;
                    delete collapsed[key].timedChance;
                }
            } else {
                collapsed[key].chance += encounter.chance;
            }
        }
    });

    var result = [];

    // Move from a dictionary to an array
    for (var key in collapsed) {
        result.push(collapsed[key]);
    }

    return result;
}

function JoinTimedChances(encounters) {
    var result = {
        'morning': 0,
        'day': 0,
        'night': 0
    }

    encounters.forEach(member => {
        if (!member.timedChance) {
            result.morning += member.chance;
            result.day += member.chance;
            result.night += member.chance;
        } else {
            result.morning += member.timedChance.morning;
            result.day += member.timedChance.day;
            result.night += member.timedChance.night;
        }
    });

    return result;
}

export { FetchEncounters, GetEncountersForLocation, GetPokeList, FindPokemon, GetPokeName, FilterEncounters }