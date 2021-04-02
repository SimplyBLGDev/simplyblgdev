<template>
<div>
  <div id="poke">
    <div class="leftContainer">
      <div class="gameMapContainer">
        <img id="mapIMG" :src=mapIMGsrc class="mapImage" alt="Game Map" usemap="#Map" :width=mapJSON.mapWidth :height=mapJSON.mapHeight @click="baseClick()">
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
              <template v-if="region==='Kanto'">
                <td class="regionData btn gameBox bottomLeft red" v-bind:class="{ active: filteredGames.includes('red') }" colspan=2 @click="filterGame('red')"><b>R</b></td>
                <td class="regionData btn gameBox blue" v-bind:class="{ active: filteredGames.includes('blue') }" colspan=2 @click="filterGame('blue')"><b>B</b></td>
                <td class="regionData btn gameBox bottomRight yellow" v-bind:class="{ active: filteredGames.includes('yellow') }" colspan=2 @click="filterGame('yellow')"><b>Y</b></td>
              </template>
              <template v-else-if="region==='Johto'">
                <td class="regionData btn gameBox bottomLeft gold" v-bind:class="{ active: filteredGames.includes('gold') }" colspan=2 @click="filterGame('gold')"><b>G</b></td>
                <td class="regionData btn gameBox silver" v-bind:class="{ active: filteredGames.includes('silver') }" colspan=2 @click="filterGame('silver')"><b>S</b></td>
                <td class="regionData btn gameBox bottomRight crystal" v-bind:class="{ active: filteredGames.includes('crystal') }" colspan=2 @click="filterGame('crystal')"><b>C</b></td>
              </template>
              <template v-else-if="region==='Kanto3'">
                <td class="regionData btn gameBox bottomLeft fireRed" v-bind:class="{ active: filteredGames.includes('firered') }" colspan=3 @click="filterGame('firered')"><b>FR</b></td>
                <td class="regionData btn gameBox bottomRight leafGreen" v-bind:class="{ active: filteredGames.includes('leafgreen') }" colspan=3 @click="filterGame('leafgreen')"><b>LG</b></td>
              </template>
              <template v-else-if="region==='Hoenn'">
                <td class="regionData btn gameBox bottomLeft ruby" v-bind:class="{ active: filteredGames.includes('ruby') }" colspan=2 @click="filterGame('ruby')"><b>R</b></td>
                <td class="regionData btn gameBox sapphire" v-bind:class="{ active: filteredGames.includes('sapphire') }" colspan=2 @click="filterGame('sapphire')"><b>S</b></td>
                <td class="regionData btn gameBox bottomRight emerald" v-bind:class="{ active: filteredGames.includes('emerald') }" colspan=2 @click="filterGame('emerald')"><b>E</b></td>
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
              <th class="regionData header gamesColumn" rowspan="2"><span>Games</span></th>
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
                  <b>10:00 - 17:59</b>
                </div>
                <div class="regionData fbox gameBox night" style="min-height:auto">
                  <b>18:00 - 03:59</b>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <th class="regionData header topLeft">Pokémon</th>
              <th class="regionData header gamesColumn"><span>Games</span></th>
              <th class="regionData header locationsColumn">Location</th>
              <th class="regionData header levelsColumn">Levels</th>
              <th class="regionData header topRight" width="13%">%</th>
            </tr>
          </template>
          <tr>
            <th class="regionData header" colspan=5 v-if="encounters.name">{{ alias(encounters.name) }}</th>
          </tr>
          <template v-for="area in encounters.areas">
            <tr :key="area.name" v-if="encounters.areas.length > 1">
              <td class="regionData" colspan=5>{{ alias(area.name) }}</td>
            </tr>
            <tr v-for="encounter in filterEncounters(area.encounters)" v-bind:key="encounter.id" style="height:3rem;">
              <td class="regionData" scope="row">
                <img :src=encounter.pokemon.icon :alt=encounter.pokemon.name class="pokeIcon">
                {{ pokeAlias(encounter.pokemon.name) | capitalize }}<br v-if="encounter.pokemon.type!=''">
                <small v-if="encounter.pokemon.type!=''">{{ pokeAlias(encounter.pokemon.type) | capitalize }}</small>
              </td>
              <td class="inTableTable">
                <template v-if="region==='Kanto'">
                  <div class="regionData fbox gameBox red" v-bind:class="{ active: encounter.games.includes('red') }"><b>R</b></div>
                  <div class="regionData fbox gameBox blue" v-bind:class="{ active: encounter.games.includes('blue') }"><b>B</b></div>
                  <div class="regionData fbox gameBox yellow" v-bind:class="{ active: encounter.games.includes('yellow') }"><b>Y</b></div>
                </template>
                <template v-else-if="region==='Johto'">
                  <div class="regionData fbox gameBox gold" v-bind:class="{ active: encounter.games.includes('gold') }"><b>G</b></div>
                  <div class="regionData fbox gameBox silver" v-bind:class="{ active: encounter.games.includes('silver') }"><b>S</b></div>
                  <div class="regionData fbox gameBox crystal" v-bind:class="{ active: encounter.games.includes('crystal') }"><b>C</b></div>
                </template>
                <template v-else-if="region==='Kanto3'">
                  <div class="regionData fbox gameBox fireRed" v-bind:class="{ active: encounter.games.includes('firered') }"><b>FR</b></div>
                  <div class="regionData fbox gameBox leafGreen" v-bind:class="{ active: encounter.games.includes('leafgreen') }"><b>LG</b></div>
                </template>
                <template v-else-if="region==='Hoenn'">
                  <div class="regionData fbox gameBox ruby" v-bind:class="{ active: encounter.games.includes('ruby') }"><b>R</b></div>
                  <div class="regionData fbox gameBox sapphire" v-bind:class="{ active: encounter.games.includes('sapphire') }"><b>S</b></div>
                  <div class="regionData fbox gameBox emerald" v-bind:class="{ active: encounter.games.includes('emerald') }"><b>E</b></div>
                </template>
              </td>
              <td class="regionData" :class="{ kanto: region==='Kanto', johto: region==='Johto', kanto3: region==='Kanto3', hoenn: region==='Hoenn', male: encounter.iconGender===0,
                grass: mapJSON.grassMapsLocationIds.includes(encounters.id) }">
                <img src="../../assets/transparent.png" class="encounterIcon" :class="[encounter.method, encounter.pokemon.name]">
                {{ encounter.method | convertMethod }}
              </td>
              <td class="regionData" v-if="encounter.min_level != encounter.max_level">{{ encounter.min_level }} - {{ encounter.max_level }}</td>
              <td class="regionData" v-else>{{ encounter.max_level }}</td>
              <td class="regionData" v-if="encounter.timedChances.default != 0">
                {{ encounter.timedChances.default }}%
              </td>
              <td class="inTableTable" v-else>
                <div class="regionData fbox gameBox morning">
                  {{ encounter.timedChances["time-morning"] }}%
                </div>
                <div class="regionData fbox gameBox day">
                  {{ encounter.timedChances["time-day"] }}%
                </div>
                <div class="regionData fbox gameBox night">
                  {{ encounter.timedChances["time-night"] }}%
                </div>
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
import { SetUpHighlighter, DrawNormal, ToggleAll, SelectArea, DrawSearch } from '../../assets/js/simplysMapHighlighter'
import { Pokedex } from 'pokeapi-js-wrapper'
import { FetchEncounters, GetEncountersForLocation, GetPokeList, FindPokemon } from './PokemonParser'

export default {
  name: 'Pokemon',
  data: () => ({
    selectedArea: "-",
    allOutlines: false,
    filteredGames: [],
    findablePokemon: [],
    encounters: []
  }),
  props: ['region', 'mapJSON', 'mapIMGsrc' ],
  mounted() {
    this.filteredGames = this.mapJSON.games;
    console.log(FetchEncounters(this.mapJSON.generation, this.mapJSON.games, new Pokedex(), this.mapJSON.maps, this.mapJSON.baseLocation));
    $('#permaCanvas').fadeOut(0);
    $('.contactMe').css('--color-hue', Math.floor(Math.random() * 360)); // Random hue for contact boxes

    this.findablePokemon = GetPokeList(this.mapJSON.maxDexIx);
    for (var i = 0; i < this.findablePokemon.length; i++) {
      this.findablePokemon[i].name = this.pokeAlias(this.$options.filters.capitalize(this.findablePokemon[i].name), this.mapJSON);
    }

    SetUpHighlighter(document.querySelector('#GameMap'), document.querySelector('#mapIMG'), document.querySelector('#normalCanvas'),
      document.querySelector('#selectionCanvas'), document.querySelector('#permaCanvas'), document.querySelector('#searchCanvas'), document.querySelectorAll('area'));
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
      SelectArea(event.target);
      this.encounters = GetEncountersForLocation(locationId);
    },
    filterGame(game) {
      if (this.filteredGames.includes(game)) {
        this.filteredGames.splice(this.filteredGames.indexOf(game), 1);
      } else {
        this.filteredGames.push(game);
      }
    },
    filterEncounters: function(encounters) {
      var r = [];
      for (var i = 0; i < encounters.length; i++) {
        if (this.intersects(encounters[i].games, this.filteredGames)) {
          r.push(encounters[i]);
        }
      }
      
      return r;
    },
    findPokemon: function() {
      if (this.$refs.PokeInput._data.writtenText == "") {
        DrawSearch([]); // Clear search if nothing is written
        return;
      }
      var search = this.$refs.PokeInput._data.writtenText;
      var resultsIds = FindPokemon(search.toLowerCase());
      var results = []
      resultsIds.forEach(function(id) {
        results.push(document.querySelector('[data-locationId = "' + id + '"]'));
      });
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
    pokeAlias: function(value) {
      for (var i = 0; i < this.mapJSON.pokeAliases.length; i++) {
        if (this.mapJSON.pokeAliases[i].name == value) {
          return this.mapJSON.pokeAliases[i].display;
        }
      }

      return value;
    },
    baseClick: function() {
      if (this.mapJSON.baseLocation.length > 0) {
        this.encounters = GetEncountersForLocation(this.mapJSON.baseLocation[0].location_id);
      }
    }
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
        "rock-smash":"Rock Smash",
        "pokeflute":"Pokéflute",
        "gift": "Gift",
        "gift-egg": "Gift Egg",
        "only-one": "Only One",
        "wailmer-pail": "Wailmer Pail",
        "squirt-bottle": "Squirt Bottle"
      }[value];
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
@import url('../../assets/Pokemon/CSS/PokemonMaps.css');
@import url('../../assets/Pokemon/CSS/PokemonEncounterIcons.css');
@import url('../../assets/Pokemon/CSS/PokemonGameBoxes.css');
</style>
