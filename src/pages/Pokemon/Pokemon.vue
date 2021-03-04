<template>
<div>
  <div id="poke">
    <div class="leftContainer">
      <div class="gameMapContainer">
        <img id="mapIMG" :src=mapIMGsrc class="mapImage" alt="Game Map" usemap="#Map" :width=mapJSON.mapWidth :height=mapJSON.mapHeight>
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
          <tr>
            <th class="regionData header topLeft">Pokémon</th>
            <th class="regionData header gamesColumn"><span>Games</span></th>
            <th class="regionData header locationsColumn">Location</th>
            <th class="regionData header levelsColumn">Levels</th>
            <th class="regionData header topRight" width="13%">%</th>
          </tr>
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
              </td>
              <td class="regionData" :class="{ kanto: region==='Kanto', johto: region==='Johto', male: encounter.iconGender===0}">
                <img src="../../assets/transparent.png" class="encounterIcon walk" v-if="encounter.method=='Grass'">
                <img src="../../assets/transparent.png" class="encounterIcon swim" v-else-if="encounter.method=='Surf'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-else-if="encounter.method=='Old Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-else-if="encounter.method=='Good Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-else-if="encounter.method=='Super Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon event" v-else-if="encounter.method=='Event'">
                <img src="../../assets/transparent.png" class="encounterIcon egg" v-else-if="encounter.method=='Egg'">
                <img src="../../assets/transparent.png" class="encounterIcon rockSmash" v-else-if="encounter.method=='Rock Smash'">
                {{ encounter.method }}
              </td>
              <td class="regionData" v-if="encounter.min_level != encounter.max_level">{{ encounter.min_level }} - {{ encounter.max_level }}</td>
              <td class="regionData" v-else>{{ encounter.max_level }}</td>
              <td class="regionData">{{ encounter.chance }}%</td>
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
    FetchEncounters(2, this.mapJSON.games, new Pokedex(), this.mapJSON.maps);
    $('#permaCanvas').fadeOut(0);

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
      var search = this.$refs.PokeInput._data.searchResults[0].name;
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
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
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
* {
  box-sizing: border-box;
}
#poke {
  display: flex;
  flex-flow: column;
  padding: 2px;
}
.leftContainer {
  width:100%;
  margin-right:4px;
  margin-bottom:8px;
}
.searchInput {
  border:0;
  width: 100%;
  height:2.3rem;
  max-height:100%;
  text-align: center;
  color:whitesmoke;
}
.searchDiv {
  margin-top: 12px;
  padding: 4px;
  background-color: #39b331;
  height: min-content;
  border-radius: 1.5rem;
}
.mapImage {
  image-rendering: -moz-crisp-edges;
  image-rendering: pixelated;
  width: 100%;
  height: auto;
  border-radius: 3vw;
  box-shadow: -0.4vw 0.4vw #39b331;
}
.gameMapContainer {
  margin-bottom: 0.3vw;
  margin-left: 0.3vw;
  padding: 4px;
  width: 100%;
  position: relative;
}
.mapCanvas {
  position: absolute;
  left:0px;
  top:0px;
}
.regionInfo {
  min-width: 35vw;
  height: min-content;
  margin-left: 4px;
  margin-right: 4px;
  padding: 4px;
  background-color: #39b331;
  border-radius: 1.5rem;
}
.regionTable {
  color:whitesmoke;
  vertical-align: middle;
  text-align: center;
  width:100%;
  border-radius: 1rem;
  border: 2px;
  background-color: transparent;
  border-spacing: 4px;
  border-collapse: separate;
}
.regionData {
  background-color:#328d2b;
  -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  --box-shadow-color: rgb(0, 0, 0, 0.75);
  border-radius: 3px;
}
.inTableTable {
  width:100%;
  height:100%;
  padding:0;
  margin:0;
  display:inline-flex;
}
.regionData.fbox:first-child {
  margin-left: 0;
  margin-top: 0;
}
.regionData.fbox:last-child {
  margin-right: 0;
  margin-bottom: 0;
}
.regionData.fbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-left: 0;
  margin-right: 0;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0;
} 
.regionData.header {
  background-color: #2a7925;
}
.regionData.topLeft {
  border-top-left-radius: 1rem;
}
.regionData.topRight {
  border-top-right-radius: 1rem;
}
.regionData.header.gamesColumn {
  width: 5%;
}
.regionData.header.gamesColumn span {
  display: none;
}
.regionData.header.locationsColumn {
  width: 26%;
}
.regionData.header.levelsColumn {
  width: 21%;
}
.regionFooter {
  background-color: #2a7925;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.inTableTable > .gameBox {
  height: 100%;
  min-height: 3rem;
}
.gameBox {
  margin-left:0.2rem;
  margin-right:0.2rem;
  width:2rem;
  height:2rem;
  text-align: center;
  vertical-align: middle;
  color:white;
}
.gameBox.red {
  color:#eb4034;
}
.gameBox.blue {
  color:#3434eb;
}
.gameBox.yellow {
  color:#e0c032;
}
.gameBox.red.active {
  color:whitesmoke;
  background-color:#eb4034;
}
.gameBox.blue.active {
  color:whitesmoke;
  background-color:#3434eb;
}
.gameBox.yellow.active {
  color:whitesmoke;
  background-color:#e0c032;
}
.gameBox.gold {
  color:#f0ca0d;
}
.gameBox.silver {
  color:#a5bfd8;
}
.gameBox.crystal {
  color:#74c6df;
}
.gameBox.gold.active {
  color:whitesmoke;
  background-color:#f0ca0d;
}
.gameBox.silver.active {
  color:whitesmoke;
  background-color:#a5bfd8;
}
.gameBox.crystal.active {
  color:whitesmoke;
  background-color:#74c6df;
}
.regionData.bottomLeft {
  border-bottom-left-radius: 1rem;
}
.regionData.bottomRight {
  border-bottom-right-radius: 1rem;
}
.btn.gameBox {
  display: table-cell;
  width:13%;
}
.btn.gameBox:hover {
  border-width: 1px;
  border-color: white;
}
.pokeIcon {
  image-rendering: pixelated;
  transform: scale(2);
  float: left;
  margin-bottom: 2px;
  margin-right: -5px;
  margin-left: -8px;
}
.encounterIcon {
  background-image: url('../../assets/Pokemon/encounterIcons.png');
  image-rendering: pixelated;
  transform: scale(2);
  margin-right: 12px;
  --y-pos: 0px;
}
.male>.encounterIcon {
  --y-pos: -21px;
}
.kanto>.encounterIcon.walk {
  width: 16px;
  height: 20px;
  background-position: 0px var(--y-pos);
}
.kanto>.encounterIcon.swim {
  width: 16px;
  height: 11px;
  background-position: -17px var(--y-pos);
}
.kanto>.encounterIcon.fish {
  width: 22px;
  height: 16px;
  background-position: -34px var(--y-pos);
}
.kanto>.encounterIcon.event {
  width: 16px;
  height: 16px;
  background-position: -57px var(--y-pos);
}
.johto>.encounterIcon.walk {
  width: 15px;
  height: 19px;
  background-position: -74px var(--y-pos);
}
.johto>.encounterIcon.fish {
  width: 22px;
  height: 16px;
  background-position: -90px var(--y-pos);
}
.johto>.encounterIcon.swim {
  width: 16px;
  height: 16px;
  background-position: -113px var(--y-pos);
}
.johto>.encounterIcon.event {
  width: 16px;
  height: 16px;
  background-position: -130px var(--y-pos);
}
.johto>.encounterIcon.headbutt {
  width: 16px;
  height: 16px;
  background-position: -147px var(--y-pos);
}
.johto>.encounterIcon.rockSmash {
  width: 16px;
  height: 16px;
  background-position: -164px var(--y-pos);
}
.johto>.encounterIcon.egg {
  width: 12px;
  height: 12px;
  background-position: -181px var(--y-pos);
}
.contactMe {
  background-color: purple;
  height: 3rem;
  display:flex;
  align-items:center;
  justify-content:center;
}

@media only screen and (min-width: 1200px) {
  #poke {
    flex-flow: row;
    padding: 8px;
  }
  .leftContainer {
    min-width: 550px;
    width: 30%;
  }
  .regionInfo {
    width:70%;
  }
}

@media only screen and (min-width: 720px) {
  .pokeIcon {
    margin-right: -5px;
  }
}

@media only screen and (min-width: 610px) {
  .pokeIcon {
    margin-right: -40px;
    margin-left: 0px;
  }
  .regionData.header.gamesColumn {
    width: 15%;
  }
  .regionData.header.gamesColumn span {
    display: block;
  }
  .regionData.header.locationsColumn {
    width: 24%;
  }
  .regionData.header.levelsColumn {
    width: 16%;
  }
  .inTableTable {
    flex-direction: row;
  }
  .regionData.fbox:first-child {
    margin-left: 0;
  }
  .regionData.fbox:last-child {
    margin-right: 0;
  }
  .regionData.fbox {
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
