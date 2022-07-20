import pokeIcons from '../../assets/Pokemon/pokeIcons.json'
var excludeMethod = ["headbutt-low"];
var encounterTable = {};
var pokeAPI;
var allowedGames;
var generation;
var baseLocationIds;
var rngCounter = [12, 47]; // Used for randomizing icon gender

async function FetchEncounters(gen, games, poke, locations, baseLocations) {
    pokeAPI = poke;
    allowedGames = games;
    generation = gen;
    if (baseLocations.length > 0) {
        baseLocationIds = baseLocations[0].location_id;
        locations = locations.concat(baseLocations);
    }
    var table = {
        "games":games,
        "locations":[]
    };

    locations.forEach(async function(locationCode) {
        var locationJSON = await pokeAPI.getLocationByName(locationCode.location_id);
        var location = {
            "name":locationJSON.name,
            "id":locationJSON.id,
            "hasTimedEncounters":false,
            "areas":GetAreas(locationJSON)
        };

        table.locations.push(location);
    });

    encounterTable = table;
    
    return encounterTable;
}

function GetEncountersForLocation(locationID) {
    for (var i = 0; i < encounterTable.locations.length; i++) {
        if (encounterTable.locations[i].id == locationID) {
            return encounterTable.locations[i];
        }
    }

    return encounterTable.locations[0];
}

function GetAreas(locationJSON) {
    var r = [];

    locationJSON.areas.forEach(async function(area) {
        var areaJSON = await pokeAPI.getLocationAreaByName(area.name);
        var encounters = GetEncounters(areaJSON);
        if (encounters.length > 0) {
            r.push({
                "name":area.name,
                "encounters":SortByMethod(encounters)
            });
        }
    });

    return r;
}

function GetEncounters(areaJSON) {
    var r = []
    var encounters = areaJSON.pokemon_encounters;
    encounters.forEach(async function(encounter) {
        var details = GetVersionDetails(encounter);
        details.forEach(function (detail) {
            r.push({
                "pokemon":{
                    "name":encounter.pokemon.name,
                    "type":"",
                    "icon":GetIcon(encounter.pokemon.name)
                },
                "method":detail.method,
                "min_level":detail.min_level,
                "max_level":detail.max_level,
                "chance":detail.chance,
                "conditions":detail.conditions,
                "timedChances":detail.timedChances, // To be replaced on collapse with time of day chances
                "games":[detail.game],
                "iconGender":0 // For display purposes only, assigned on collapse
            });
        });
    });

    var collapsed = CollapseEncountersGames(CollapseEncountersTimes(r));

    for (var i = 0; i < collapsed.length; i++) {
        collapsed[i]["iconGender"] = GetIconGender(collapsed[i]);
    }

    return collapsed;
}

function GetVersionDetails(encounterJSON) {
    var r = [];
    var versionDetails = encounterJSON.version_details;

    versionDetails.forEach(function(versionDetail) {
        if (allowedGames.includes(versionDetail.version.name)) {
            var details = GetEncounterDetails(versionDetail);
            details.forEach(function (detail) {
                r.push({
                    "game":versionDetail.version.name,
                    "method":detail.method,
                    "conditions":detail.conditions,
                    "timedChances":detail.timedChances,
                    "min_level":detail.min_level,
                    "max_level":detail.max_level,
                    "chance":detail.chance
                });
            });
        }
    });

    return r;
}

function GetEncounterDetails(versionDetailJSON) {
    var r = [];
    var encounterDetails = versionDetailJSON.encounter_details;

    var currentMethod = encounterDetails[0].method.name;
    var minLevel = 999;
    var maxLevel = 0;
    var chance = 0;
    var timedChances = {
        "default": 0,
        "time-morning": 0,
        "time-day": 0,
        "time-night": 0
    };
    var conditions = ProcessEncounterDetailConditions(encounterDetails[0].condition_values)[0];

    for (var i = 0; i < encounterDetails.length; i++) {
        var [nConditions, nTimed] = ProcessEncounterDetailConditions(encounterDetails[i].condition_values);

        if (currentMethod != encounterDetails[i].method.name || JSON.stringify(conditions) != JSON.stringify(nConditions)) {
            if (!excludeMethod.includes(currentMethod)) {
                r.push({
                    "method":currentMethod,
                    "min_level":minLevel,
                    "max_level":maxLevel,
                    "conditions":conditions,
                    "timedChances":timedChances,
                    "chance":chance
                });
            }
            conditions = nConditions;
            currentMethod = encounterDetails[i].method.name;
            minLevel = 999;
            maxLevel = 0;
            chance = 0;
            timedChances = {
                "default": 0,
                "time-morning": 0,
                "time-day": 0,
                "time-night": 0
            };
        }

        chance += encounterDetails[i].chance;
        timedChances[nTimed] += encounterDetails[i].chance;
        minLevel = Math.min(minLevel, encounterDetails[i].min_level);
        maxLevel = Math.max(maxLevel, encounterDetails[i].max_level);
    }
    if (!excludeMethod.includes(currentMethod)) {
        r.push({
            "method":currentMethod,
            "min_level":minLevel,
            "max_level":maxLevel,
            "conditions":conditions,
            "timedChances":timedChances,
            "chance":chance
        });
    }

    return r;
}

function ProcessEncounterDetailConditions(conditions) {
    var rConditions = [];
    var rTimes = "default";

    for (var i = 0; i < conditions.length; i++) {
        if (["time-day", "time-morning", "time-night"].includes(conditions[i].name)) {
            rTimes = conditions[i].name;
        } else {
            rConditions.push(conditions[i].name);
        }
    }

    return [rConditions, rTimes];
}

function CollapseEncountersGames(encountersJSON) {
    // Can be done more efficiently? yes, will I? no
    for (var i = 0; i < encountersJSON.length; i++) {
        for (var j = i+1; j < encountersJSON.length; j++) {
            if (encountersJSON[i].pokemon.name == encountersJSON[j].pokemon.name &&
                encountersJSON[i].method == encountersJSON[j].method &&
                encountersJSON[i].min_level == encountersJSON[j].min_level &&
                encountersJSON[i].max_level == encountersJSON[j].max_level &&
                JSON.stringify(encountersJSON[i].timedChances) == JSON.stringify(encountersJSON[j].timedChances) &&
                JSON.stringify(encountersJSON[i].conditions) == JSON.stringify(encountersJSON[j].conditions)) {
                    encountersJSON[i].games.push(encountersJSON[j].games[0]);
                    encountersJSON.splice(j, 1);
                    j--;
                }
        }
    }

    return encountersJSON;
}

function CollapseEncountersTimes(encountersJSON) {
    for (var i = 0; i < encountersJSON.length; i++) {
        if (encountersJSON[i].timedChances["time-morning"] != 0
            && encountersJSON[i].timedChances["time-morning"] == encountersJSON[i].timedChances["time-night"]
            && encountersJSON[i].timedChances["time-morning"] == encountersJSON[i].timedChances["time-day"]) {
                var realValue = encountersJSON[i].timedChances["time-day"];
                encountersJSON[i].timedChances = {
                    "default": realValue,
                    "time-morning": 0,
                    "time-day": 0,
                    "time-night": 0
                }
            }
    }

    return encountersJSON;
}

function GetIconGender(encounterJSON) {
    var femaleAllowed = true;
    switch (generation) {
        case 1: femaleAllowed = false; break;
        case 2: if (!encounterJSON.games.includes('crystal')) femaleAllowed = false; break;
        default: femaleAllowed = true;
    }

    if (!femaleAllowed)
        return 0;
    else{
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

function GetIcon(poke) {
    for (var i = 0; i < pokeIcons.icons.length; i++) {
        if (pokeIcons.icons[i].name == poke) {
            return pokeIcons.icons[i].icon;
        }
    }

    return "";
}

function FindPokemon(poke) {
    var resultsIds = []
    encounterTable.locations.forEach(function(location) {
        for (var i = 0; i < location.areas.length; i++) {
            for (var j = 0; j < location.areas[i].encounters.length; j++) {
                if (location.areas[i].encounters[j].pokemon.name == poke) {
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

export { FetchEncounters, GetEncountersForLocation, GetPokeList, FindPokemon }