var encounterTable = {};
var pokeAPI;
var allowedGames;

async function FetchEncounters(games, poke, locationCodes) {
    pokeAPI = poke;
    allowedGames = games;
    var table = {
        "games":games,
        "locations":[]
    };

    locationCodes.forEach(async function(locationCode) {
        var locationJSON = await pokeAPI.getLocationByName(locationCode);
        var location = {
            "name":locationJSON.name,
            "areas":GetAreas(locationJSON)
        };

        table.locations.push(location);
    });

    console.log(table);
}

async function GetAreas(locationJSON) {
    var r = [];

    locationJSON.areas.forEach(async function(area) {
        var areaJSON = await pokeAPI.getLocationAreaByName(area.name);
        r.push({
            "name":area.name,
            "encounters":GetEncounters(areaJSON)
        });
    });

    return r;
}

function GetEncounters(areaJSON) {
    var r = []
    var encounters = areaJSON.pokemon_encounters;
    encounters.forEach(function(encounter) {
        var details = GetVersionDetails(encounter);
        details.forEach(function (detail) {
            r.push({
                "pokemon":encounter.pokemon.name,
                "method":detail.method,
                "min_level":detail.min_level,
                "max_level":detail.max_level,
                "chance":detail.chance,
                "games":[detail.game]
            });
        });
    });

    return r;
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
    for (var i = 0; i < encounterDetails.length; i++) {
        if (currentMethod != encounterDetails[i].method.name) {
            r.push({
                "method":currentMethod,
                "min_level":minLevel,
                "max_level":maxLevel,
                "chance":chance
            });
            currentMethod = encounterDetails[i].method.name;
            minLevel = 999;
            maxLevel = 0;
            chance = 0;
        }
        chance += encounterDetails[i].chance;
        minLevel = Math.min(minLevel, encounterDetails[i].min_level);
        maxLevel = Math.max(maxLevel, encounterDetails[i].max_level);
    }
    r.push({
        "method":currentMethod,
        "min_level":minLevel,
        "max_level":maxLevel,
        "chance":chance
    });

    return r;
}

function GetEncountersForLocation() {
    return encounterTable;
}

export { FetchEncounters, GetEncountersForLocation }