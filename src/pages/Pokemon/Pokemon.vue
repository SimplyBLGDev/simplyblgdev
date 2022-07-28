<template>
<div>
  <div id="poke">
    <div class="leftContainer">

      <div class="mapSwitchHUD" v-if="mapJSON.subregions">
        <div class="mapSwitchButton" v-for="subregion in mapJSON.subregions" :key="subregion.name" :class="{ active: mapSubregion === subregion.id }" @click="setSubregion(subregion.id)">
          <img src="../../assets/pokemon/alert.png" alt="!!" v-if="subregionSearchResults.includes(subregion.id)">
          {{ subregion.name }}
        </div>
      </div>

      <div class="gameMapContainer">
        <img id="mapIMG" :src=mapIMGsrc[mapSubregion] class="mapImage" alt="Game Map" usemap="#Map" :width=mapJSON.mapWidth :height=mapJSON.mapHeight @click="baseClick()">
        <canvas class="mapCanvas" id="normalCanvas" style="pointer-events:none;"></canvas>
        <canvas class="mapCanvas" id="selectionCanvas" style="pointer-events:none;"></canvas>
        <canvas class="mapCanvas" id="searchCanvas" style="pointer-events:none;"></canvas>
        <canvas class="mapCanvas" id="permaCanvas" style="pointer-events:none;"></canvas>
        <map id="GameMap" name="Map">
          <area v-for="area in mapJSON.maps" v-bind:key="area.id" shape="poly" :coords=area.dimensions :data-locationId=area.location_id
            :title=area.name @mouseover="hoverArea(area.name)" @mouseleave="leaveArea()" @click="fetchEncounters(area.location_id)">
        </map>
      </div>
      <div class="searchDiv">
        <table class="regionTable">
          <tbody>
            <tr>
              <th class="regionData header topRight topLeft" colspan=6 max-width="7rem">Filter Games</th>
              <th class="regionData header topRight topLeft" colspan=2 width="61%">Go to Location</th>
            </tr>
            <tr>
              <template v-if="mapJSON.region==='kanto'">
                <td class="regionData btn gameBox bottomLeft red" v-bind:class="{ active: filteredGames.includes('r') }" colspan=2 @click="filterGame('r')"><b>R</b></td>
                <td class="regionData btn gameBox blue" v-bind:class="{ active: filteredGames.includes('b') }" colspan=2 @click="filterGame('b')"><b>B</b></td>
                <td class="regionData btn gameBox bottomRight yellow" v-bind:class="{ active: filteredGames.includes('y') }" colspan=2 @click="filterGame('y')"><b>Y</b></td>
              </template>
              <template v-else-if="mapJSON.region==='johto'">
                <td class="regionData btn gameBox bottomLeft gold" v-bind:class="{ active: filteredGames.includes('g') }" colspan=2 @click="filterGame('g')"><b>G</b></td>
                <td class="regionData btn gameBox silver" v-bind:class="{ active: filteredGames.includes('s') }" colspan=2 @click="filterGame('s')"><b>S</b></td>
                <td class="regionData btn gameBox bottomRight crystal" v-bind:class="{ active: filteredGames.includes('c') }" colspan=2 @click="filterGame('c')"><b>C</b></td>
              </template>
              <template v-else-if="mapJSON.region==='kanto3'">
                <td class="regionData btn gameBox bottomLeft fireRed" v-bind:class="{ active: filteredGames.includes('fr') }" colspan=3 @click="filterGame('fr')"><b>FR</b></td>
                <td class="regionData btn gameBox bottomRight leafGreen" v-bind:class="{ active: filteredGames.includes('lg') }" colspan=3 @click="filterGame('lg')"><b>LG</b></td>
              </template>
              <template v-else-if="mapJSON.region==='hoenn'">
                <td class="regionData btn gameBox bottomLeft ruby" v-bind:class="{ active: filteredGames.includes('r') }" colspan=2 @click="filterGame('r')"><b>R</b></td>
                <td class="regionData btn gameBox sapphire" v-bind:class="{ active: filteredGames.includes('s') }" colspan=2 @click="filterGame('s')"><b>S</b></td>
                <td class="regionData btn gameBox bottomRight emerald" v-bind:class="{ active: filteredGames.includes('e') }" colspan=2 @click="filterGame('e')"><b>E</b></td>
              </template>
              <template v-else-if="mapJSON.region==='sinnoh'">
                <td class="regionData btn gameBox bottomLeft diamond" v-bind:class="{ active: filteredGames.includes('d') }" colspan=2 @click="filterGame('d')"><b>D</b></td>
                <td class="regionData btn gameBox pearl" v-bind:class="{ active: filteredGames.includes('p') }" colspan=2 @click="filterGame('p')"><b>P</b></td>
                <td class="regionData btn gameBox bottomRight platinum" v-bind:class="{ active: filteredGames.includes('Pt') }" colspan=2 @click="filterGame('Pt')"><b>Pt</b></td>
              </template>
              <template v-else-if="mapJSON.region==='johto4'">
                <td class="regionData btn gameBox bottomLeft heartgold" v-bind:class="{ active: filteredGames.includes('hg') }" colspan=3 @click="filterGame('hg')"><b>HG</b></td>
                <td class="regionData btn gameBox bottomRight soulsilver" v-bind:class="{ active: filteredGames.includes('ss') }" colspan=3 @click="filterGame('ss')"><b>SS</b></td>
              </template>
              <td style="padding: 0">
                <NiceDatalist class="regionData bottomLeft" :list=mapJSON.maps ref="LocInput"></NiceDatalist>
              </td>
              <td class="regionData btn gameBox blue active bottomRight" width="14%" @click="findLocation()">Go</td>
            </tr>
          </tbody>
        </table>
        <table class="regionTable">
          <tbody>
            <tr>
              <th class="regionData header topRight topLeft" width="19.5%">Outlines</th>
              <th colspan=2 class="regionData header topRight topLeft">Find Pokémon</th>
            </tr>
            <tr>
              <td class="regionData btn gameBox blue bottomLeft bottomRight" @click="highlightAll()" v-bind:class="{ active: allOutlines }"><b>Enable</b></td>
              <td style="padding: 0">
                <NiceDatalist class="regionData bottomLeft" :list=findablePokemon ref="PokeInput"></NiceDatalist>
              </td>
              <td class="regionData btn gameBox blue active bottomRight" @click="findPokemon()">Find</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="regionInfo">
      <table class="regionTable">
        <tbody>
          <template v-if="mapJSON.enableTimeHUD">
            <tr>
              <th class="regionData header topLeft" rowspan="2">Pokémon</th>
              <th class="regionData header gamesColumn" rowspan="2" v-if="mapJSON.games.length > 1"><span>Games</span></th>
              <th class="regionData header locationsColumn" rowspan="2">Location</th>
              <th class="regionData header levelsColumn" width="11%" rowspan="2">Levels</th>
              <th class="regionData header topRight" width="18%">%</th>
            </tr>
            <tr>
              <td class="inTableTable">
                <div class="regionData fbox gameBox morning" style="min-height:auto">
                  <b>04:00 - 09:59</b>
                </div>
                <div class="regionData fbox gameBox day" style="min-height:auto">
                  <b v-if="mapJSON.region==='johto'">10:00 - 17:59</b>
                  <b v-else>10:00 - 19:59</b>
                </div>
                <div class="regionData fbox gameBox night" style="min-height:auto">
                  <b v-if="mapJSON.region==='johto'">18:00 - 03:59</b>
                  <b v-else>20:00 - 03:59</b>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <th class="regionData header topLeft">Pokémon</th>
              <th class="regionData header gamesColumn" v-if="mapJSON.games.length > 1"><span>Games</span></th>
              <th class="regionData header locationsColumn">Location</th>
              <th class="regionData header levelsColumn">Levels</th>
              <th class="regionData header topRight" width="13%">%</th>
            </tr>
          </template>
          <tr>
            <th colspan=5 v-if="encounters.name">
              <div class="inTableTable conditionTable">
                <div class="regionData header">{{ alias(encounters.name) }}</div>
                <div v-for="condition in currentConditions" :key="condition.name" :class=" [ 'regionData', 'conditionButton', condition.name, condition.options[selectedConditions[condition.name]].value ]" @click="selectCondition(condition)">
                  {{ condition.options[selectedConditions[condition.name]].name }}
                </div>
              </div>
            </th>
          </tr>
          <template v-for="area in encounters.areas">
            <tr :key="area.name" v-if="encounters.areas.length > 1">
              <td class="regionData" colspan=5>{{ alias(area.name) }}</td>
            </tr>
            <tr v-for="encounter in filterEncounters(area.encounters)" v-bind:key="encounter.id" :class="[ mapJSON.generation <= 7 ? 'gen-7-cell' : 'gen-8-cell' ]">
              <td class="regionData" scope="row">
                <img :src=PKMNIcon(encounter.pkmn) :alt=encounter.pkmn|PKMNName class="pokeIcon">
                {{ pokeFromDex(encounter.pkmn) }}
              </td>
              <td class="inTableTable" v-if="mapJSON.games.length > 1">
                <template v-if="mapJSON.region==='kanto'">
                  <div class="regionData fbox gameBox red" v-bind:class="{ active: encounter.games.includes('r') }"><b>R</b></div>
                  <div class="regionData fbox gameBox blue" v-bind:class="{ active: encounter.games.includes('b') }"><b>B</b></div>
                  <div class="regionData fbox gameBox yellow" v-bind:class="{ active: encounter.games.includes('y') }"><b>Y</b></div>
                </template>
                <template v-else-if="mapJSON.region==='johto'">
                  <div class="regionData fbox gameBox gold" v-bind:class="{ active: encounter.games.includes('g') }"><b>G</b></div>
                  <div class="regionData fbox gameBox silver" v-bind:class="{ active: encounter.games.includes('s') }"><b>S</b></div>
                  <div class="regionData fbox gameBox crystal" v-bind:class="{ active: encounter.games.includes('c') }"><b>C</b></div>
                </template>
                <template v-else-if="mapJSON.region==='kanto3'">
                  <div class="regionData fbox gameBox fireRed" v-bind:class="{ active: encounter.games.includes('fr') }"><b>FR</b></div>
                  <div class="regionData fbox gameBox leafGreen" v-bind:class="{ active: encounter.games.includes('lg') }"><b>LG</b></div>
                </template>
                <template v-else-if="mapJSON.region==='hoenn'">
                  <div class="regionData fbox gameBox ruby" v-bind:class="{ active: encounter.games.includes('r') }"><b>R</b></div>
                  <div class="regionData fbox gameBox sapphire" v-bind:class="{ active: encounter.games.includes('s') }"><b>S</b></div>
                  <div class="regionData fbox gameBox emerald" v-bind:class="{ active: encounter.games.includes('e') }"><b>E</b></div>
                </template>
                <template v-else-if="mapJSON.region==='sinnoh'">
                  <div class="regionData fbox gameBox diamond" v-bind:class="{ active: encounter.games.includes('d') }"><b>D</b></div>
                  <div class="regionData fbox gameBox pearl" v-bind:class="{ active: encounter.games.includes('p') }"><b>P</b></div>
                  <div class="regionData fbox gameBox platinum" v-bind:class="{ active: encounter.games.includes('Pt') }"><b>Pt</b></div>
                </template>
                <template v-else-if="mapJSON.region==='johto4'">
                  <div class="regionData fbox gameBox heartgold" v-bind:class="{ active: encounter.games.includes('hg') }"><b>HG</b></div>
                  <div class="regionData fbox gameBox soulsilver" v-bind:class="{ active: encounter.games.includes('ss') }"><b>SS</b></div>
                </template>
              </td>
              <td class="regionData" :class="[ encounter.iconGender===0?'male':'', mapJSON.grassMapsLocationIds.includes(encounters.id)?'grass':'', mapJSON.region ]">
                <img src="../../assets/transparent.png" class="encounterIcon" :class="[encounter.method, GetPKMNName(encounter.pkmn)]">
                {{ encounter.method | convertMethod }}
              </td>
              <td class="regionData" v-if="encounter.min != encounter.max">{{ encounter.min }} - {{ encounter.max }}</td>
              <td class="regionData" v-else>{{ encounter.max }}</td>
              <td class="inTableTable" v-if="encounter.timedChance">
                <div class="regionData fbox gameBox morning">
                  {{ encounter.timedChance["morning"] }}%
                </div>
                <div class="regionData fbox gameBox day">
                  {{ encounter.timedChance["day"] }}%
                </div>
                <div class="regionData fbox gameBox night">
                  {{ encounter.timedChance["night"] }}%
                </div>
              </td>
              <td class="regionData" v-else>
                {{ encounter.chance }}%
              </td>
            </tr>
          </template>
          <tr><td class="regionData regionFooter" colspan=5 style="color:transparent; user-select:none;"> - </td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="container-fluid contactMe">
    See something wrong? -<a href="mailto:simplyblgdev@gmail.com">Contact me!</a>-
  </div>
  <div class="container-fluid contactMe">
    Wanna support the development of more tools? -<a href="https://paypal.me/ppTheAGame">Donate here!</a>-
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import pokeConstants from '../../assets/pokemon/pokeConstants.json'
import { SetUpHighlighter, DrawNormal, ToggleAll, SelectArea, DrawSearch, SetOffset } from '../../assets/js/simplysMapHighlighter'
import { FetchEncounters, GetEncountersForLocation, GetPokeList, FindPokemon, GetPokeName, FilterEncounters } from './PokemonParser'

export default {
  name: 'Pokemon',
  data: () => ({
    selectedArea: "-",
    allOutlines: false,
    filteredGames: [],
    findablePokemon: [],
    encounters: [],
    mapSubregion: 0,
    subregionSearchResults: [],
    mapCoordsOffset: [0, 0],
    currentConditions: [],
    selectedConditions: []
  }),
  props: [ 'mapJSON', 'encountersJSON', 'mapIMGsrc' ],
  mounted() {
    console.log("v2.1");
    this.filteredGames = this.mapJSON.games;
    console.log(FetchEncounters(this.mapJSON.generation, this.encountersJSON));
    $('#permaCanvas').fadeOut(0);
    $('.contactMe').css('--color-hue', Math.floor(Math.random() * 360)); // Random hue for contact boxes

    this.findablePokemon = GetPokeList(this.mapJSON.maxDexIx);
    for (var i = 0; i < this.findablePokemon.length; i++) {
      this.findablePokemon[i].name = this.$options.filters.capitalize(this.pokeAlias(this.findablePokemon[i].name, this.mapJSON));
    }

    SetUpHighlighter(document.querySelector('#GameMap'), document.querySelector('#mapIMG'), document.querySelector('#normalCanvas'),
      document.querySelector('#selectionCanvas'), document.querySelector('#permaCanvas'), document.querySelector('#searchCanvas'), document.querySelectorAll('area'));
    this.visibleMaps = this.mapJSON.maps;
  },
  methods: {
    intersects: function(a, b) {
      return a.some(r=>b.includes(r));
    },

    processedDimensions: function (dimensions) {
      var x = dimensions[0];
      var y = dimensions[1];
      var x2 = x + dimensions[2];
      var y2 = y + dimensions[3];

      return [x, y, x2, y2].join(',');
    },

    // eslint-disable-next-line
    hoverArea: function (newArea) {
      DrawNormal(event.target);
      $('#normalCanvas').stop(true, false);
      $('#normalCanvas').fadeIn(120);
    },

    leaveArea: function() {
      this.selectedArea = "-";
      $('#normalCanvas').stop(true, false);
      $('#normalCanvas').fadeOut(120);
    },

    fetchEncounters: function(locationId) {
      if (this.mapJSON.subregions) {
        for (var i = 0; i < this.mapJSON.subregions.length; i++) {
          if (this.mapJSON.subregions[i].locationIds.includes(locationId)) {
            if (this.mapJSON.subregions[i].id != this.mapSubregion) {
              this.setSubregion(this.mapJSON.subregions[i].id);
            }
          }
        }
      }
      
      SelectArea(event.target);
      this.setLocation(locationId);
    },

    filterGame(game) {
      if (this.filteredGames.includes(game)) {
        this.filteredGames.splice(this.filteredGames.indexOf(game), 1);
      } else {
        this.filteredGames.push(game);
      }
    },

    filterEncounters: function(encounters) {
      return FilterEncounters(encounters, this.filteredGames, this.selectedConditions, this.currentConditions);
    },

    findPokemon: function() {
      if (this.$refs.PokeInput._data.writtenText == "") {
        DrawSearch([]); // Clear search if nothing is written
        this.subregionSearchResults = [];
        return;
      }
      var search = this.unPokeAlias(this.$refs.PokeInput._data.writtenText);
      var resultsIds = FindPokemon(search.toLowerCase());
      var results = []
      resultsIds.forEach(function(id) {
        results.push(document.querySelector('[data-locationId = "' + id + '"]'));
      });

      if (this.mapJSON.subregions) {
        this.subregionSearchResults = [];
        for (var i = 0; i < this.mapJSON.subregions.length; i++) {
          if (this.intersects(this.mapJSON.subregions[i].locationIds, resultsIds)) {
            this.subregionSearchResults.push(this.mapJSON.subregions[i].id);
          }
        }
      }

      DrawSearch(results);
    },

    findLocation: function() {
      document.querySelector('[title = "' + this.$refs.LocInput._data.searchResults[0].name + '"]').click();
    },

    highlightAll: function() {
      this.allOutlines = !this.allOutlines;
      ToggleAll(this.allOutlines)
      $('#permaCanvas').fadeToggle(200);
    },

    alias: function(value) {
      for (var i = 0; i < this.mapJSON.aliases.length; i++) {
        if (this.mapJSON.aliases[i].name == value) {
          return this.mapJSON.aliases[i].display;
        }
      }

      return value;
    },

    pokeFromDex: function(value) {
      value = this.$options.filters.PKMNName(value);
      value = this.pokeAlias(value);
      value = this.$options.filters.capitalize(value);

      return value;
    },

    pokeAlias: function(value) {
      for (var i = 0; i < this.mapJSON.pokeAliases.length; i++) {
        if (this.mapJSON.pokeAliases[i].name == value) {
          return this.mapJSON.pokeAliases[i].display;
        }
      }

      return value;
    },

    unPokeAlias: function(value) {
      for (var i = 0; i < this.mapJSON.pokeAliases.length; i++) {
        if (this.mapJSON.pokeAliases[i].display == value) {
          return this.mapJSON.pokeAliases[i].name;
        }
      }

      return value;
    },

    baseClick: function() {
      if (this.mapJSON.baseLocation.length > 0) {
        this.setLocation(this.mapJSON.baseLocation[0].location_id);
      }
    },

    GetPKMNName: function(value) {
      return this.$options.filters.PKMNName(value);
    },

    setSubregion: function(value) {
      this.mapSubregion = value;
      var offset = [
        -this.mapJSON.subregions[this.mapSubregion].imgRegion[0],
        -this.mapJSON.subregions[this.mapSubregion].imgRegion[1]
      ];
      SetOffset(offset);
    },

    setLocation: function(locationId) {
      this.encounters = GetEncountersForLocation(locationId);
      this.populateConditions();
    },

    populateConditions: function() {
      var foundConditions = [];
      this.currentConditions = [];
      this.selectedConditions = [];

      this.encounters.areas.forEach(area => {
        area.encounters.forEach(encounter => {
          encounter.conditions.forEach(condition => {
            if (!foundConditions.includes(condition)) {

              pokeConstants.condition_groups.forEach(conditionGroup => {
                conditionGroup.options.forEach(option => {
                  if (condition == option.value && !foundConditions.includes(conditionGroup)) {
                    foundConditions.push(conditionGroup);
                  }
                });
              });

            }
          });
        });
      });

      var selectedConditions = {};

      foundConditions.forEach(conditionGroup => {
        selectedConditions[conditionGroup.name] = 0;
      });

      this.selectedConditions = selectedConditions;
      this.currentConditions = foundConditions;
    },

    selectCondition: function(conditionGroup) {
      var currentOptionIx = this.selectedConditions[conditionGroup.name];
      this.selectedConditions[conditionGroup.name] = (currentOptionIx + 1) % conditionGroup.options.length;
    },

    PKMNIcon: function(value) {
      if (this.mapJSON.generation <= 7) {
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/' + value + '.png';
      }
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/' + value + '.png';
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    convertMethod: function(value) {
      return {
        "walk": "Walk",
        "surf": "Surf",
        "old-rod": "Old Rod",
        "good-rod": "Good Rod",
        "super-rod": "Super Rod",
        "seaweed": "Seaweed",
        "headbutt-low": "Headbutt Low",
        "headbutt-normal": "Headbutt",
        "headbutt-high": "Headbutt Rare trees",
        "rock-smash": "Rock Smash",
        "pokeflute": "Pokéflute",
        "gift": "Gift",
        "gift-egg": "Gift Egg",
        "only-one": "Only One",
        "wailmer-pail": "Wailmer Pail",
        "squirt-bottle": "Squirt Bottle",
        "devon-scope": "Hidden"
      }[value];
    },
    
    PKMNName: function(dexNo) {
      if (dexNo > 898) {
        return dexNo + '';
      }
      return GetPokeName(dexNo);
    }
  }
}
</script>

<style>
html {
  /* The slight width change when a scrollbar appears doesn't call resize() and therefore offsets the canvases and breaks the highlighting temporarily */
  /* to prevent this we always have the scrollbar visible */
  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;
}
</style>

<style scoped>
@import url('../../assets/pokemon/css/PokemonMaps.css');
@import url('../../assets/pokemon/css/PokemonEncounterIcons.css');
@import url('../../assets/pokemon/css/PokemonGameBoxes.css');
@import url('../../assets/pokemon/css/PokemonConditions.css');
</style>
