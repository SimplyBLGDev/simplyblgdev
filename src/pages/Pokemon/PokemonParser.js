var encounterTable;

function ProcessLocation(apiJSON, games) {
    // For every encounter
    //  get pokemon
    //  For every version detail
    //      check if the version is correct
    //      For every encounter detail
    //          accumulate by encounter detail method
    //      
    //  For every encounter (method/Pokemon)
    //      accumulate chances
    //      calculate min and max level
    //  Combine identical entries in different games and fuse games fields
    //  Add to response JSON
    // Save full JSON
    var encounters = apiJSON.pokemon_encounters;
    var r = [];
    for (var i = 0; i < encounters.length; i++) {
        var versionDetails = encounters[i].version_details;
        for (var j = 0; j < versionDetails.length; j++) {
            if (games.includes(versionDetails[j].version.name)) {
                var methods = ProcessEncounterDetails(versionDetails[j].encounter_details);
                console.log(methods);
                for (var k = 0; k < methods.length; k++) {
                    r.push({
                        "pokemon":encounters[i].pokemon.name,
                        "method": methods[k].method,
                        "min_level": methods[k].min_level,
                        "max_level": methods[k].max_level,
                        "chance": methods[k].chance,
                        "games":[versionDetails[j].version.name]
                    });
                }
            }
        }
    }

    encounterTable = encounters;
    return { "encounters":r };
}

function ProcessEncounterDetails(encounterDetails) {
    var methods = [];
    var currentMethod = encounterDetails[0].method.name;
    var minLevel = 999;
    var maxLevel = 0;
    var chance = 0;
    for (var i = 0; i < encounterDetails.length; i++) {
        if (currentMethod != encounterDetails[i].method.name) {
            methods.push({
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
    methods.push({
        "method":currentMethod,
        "min_level":minLevel,
        "max_level":maxLevel,
        "chance":chance
    });

    return methods;
}

function GetEncountersForLocation() {
    return encounterTable;
}

export { ProcessLocation, GetEncountersForLocation }