<template>
  <div id="poke">
    <div class="leftContainer">
      <div class="gameMapContainer">
        <img id="mapIMG" src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
        <canvas class="mapCanvas" id="normalCanvas" style="pointer-events:none;"></canvas>
        <canvas class="mapCanvas" id="selectionCanvas" style="pointer-events:none;"></canvas>
        <canvas class="mapCanvas" id="permaCanvas" style="pointer-events:none;"></canvas>
        <map id="GameMap" name="Kanto">
          <area v-for="area in mapData.maps" v-bind:key="area.id" shape="poly" :coords=area.dimensions :id=area.name
            :title=area.name @mouseover="hoverArea(area.name)" @mouseleave="leaveArea()" @click="fetchEncounters(area.location_id)">
        </map>
      </div>
      <div class="searchDiv">
        <table class="regionTable">
          <tbody>
            <tr>
              <th class="regionData header topRight topLeft" colspan=6 max-width="7rem">Filter Games</th>
              <th class="regionData header topRight topLeft" colspan=2 width="50%">Find Location</th>
            </tr>
            <tr>
              <td class="regionData btn gameBox bottomLeft red" v-bind:class="{ active: filteredGames.includes('red') }" colspan=2 @click="filterGame('red')"><b>R</b></td>
              <td class="regionData btn gameBox blue" v-bind:class="{ active: filteredGames.includes('blue') }" colspan=2 @click="filterGame('blue')"><b>B</b></td>
              <td class="regionData btn gameBox bottomRight yellow" v-bind:class="{ active: filteredGames.includes('yellow') }" colspan=2 @click="filterGame('yellow')"><b>Y</b></td>
              <td><input class="regionData searchInput bottomLeft" type="text"></td>
              <td class="regionData btn gameBox blue active bottomRight">Find</td>
            </tr>
            <tr>
              <th colspan=3 class="regionData header topRight topLeft">Other Options</th>
              <th class="regionData header topRight topLeft" colspan=6 width="40%">Find Pokemon</th>
            </tr>
            <tr>
              <td colspan=3 class="regionData btn gameBox blue bottomLeft bottomRight" @click="highlightAll()" v-bind:class="{ active: allOutlines }"><b>All outlines</b></td>
              <td colspan=4><input class="regionData searchInput bottomLeft" type="text"></td>
              <td class="regionData btn gameBox blue active bottomRight" @mouseup="findPokemon()">Find</td>
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
            <th class="regionData header gamesColumn">Games</th>
            <th class="regionData header locationsColumn">Location</th>
            <th class="regionData header" width="19%">Levels</th>
            <th class="regionData header topRight" width="13%">%</th>
          </tr>
          <tr>
            <th class="regionData header" colspan=5 v-if="encounters.name">{{ encounters.name | alias }}</th>
          </tr>
          <template v-for="area in encounters.areas">
            <tr :key="area.name" v-if="encounters.areas.length > 1">
              <td class="regionData" colspan=5>{{ area.name | alias }}</td>
            </tr>
            <tr v-for="encounter in filterEncounters(area.encounters)" v-bind:key="encounter.id" style="height:3rem;">
              <td class="regionData" scope="row">
                <img :src=encounter.pokemon.icon :alt=encounter.pokemon.name class="pokeIcon">
                {{ encounter.pokemon.name | capitalize | pokeAlias }}<br v-if="encounter.pokemon.type!=''">
                <small v-if="encounter.pokemon.type!=''">{{ encounter.pokemon.type | capitalize | pokeAlias }}</small>
              </td>
              <td style="height:100%; padding:0; margin:0;">
                <table class="inTableTable">
                  <div class="regionData fbox gameBox red active" v-if="encounter.games.includes('red')"><b>R</b></div>
                  <div class="regionData fbox gameBox red" v-else><b>R</b></div>
                  <div class="regionData fbox gameBox blue active" v-if="encounter.games.includes('blue')"><b>B</b></div>
                  <div class="regionData fbox gameBox blue" v-else><b>B</b></div>
                  <div class="regionData fbox gameBox yellow active" v-if="encounter.games.includes('yellow')"><b>Y</b></div>
                  <div class="regionData fbox gameBox yellow" v-else><b>Y</b></div>
                </table>
              </td>
              <td class="regionData">
                <img src="../../assets/transparent.png" class="encounterIcon walk" v-if="encounter.method=='Grass'">
                <img src="../../assets/transparent.png" class="encounterIcon swim" v-if="encounter.method=='Surf'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-if="encounter.method=='Old Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-if="encounter.method=='Good Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon fish" v-if="encounter.method=='Super Rod'">
                <img src="../../assets/transparent.png" class="encounterIcon event" v-if="encounter.method=='Event'">
                {{ encounter.method | capitalize }}
              </td>
              <td class="regionData">{{ encounter.min_level }} - {{ encounter.max_level }}</td>
              <td class="regionData">{{ encounter.chance }}%</td>
            </tr>
          </template>
          <tr><td class="regionData regionFooter" colspan=5> - </td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { SetUpHighlighter, DrawNormal, ToggleAll, SelectArea } from '../../assets/js/simplysMapHighlighter'
import { Pokedex } from 'pokeapi-js-wrapper'
import { FetchEncounters, GetEncountersForLocation } from './PokemonParser'
import mapJSON from '../../assets/Pokemon/Maps/KantoMaps.json'

export default {
  name: 'Pokemon',
  data: () => ({
    selectedArea: "-",
    allOutlines: false,
    filteredGames: ['red', 'blue', 'yellow'],
    mapData: mapJSON,
    encounters: []
  }),
  mounted() {
    FetchEncounters(["red", "blue", "yellow"], new Pokedex(), mapJSON.maps);
    $('#permaCanvas').fadeOut(0);
    SetUpHighlighter(document.querySelector('#GameMap'), document.querySelector('#mapIMG'), document.querySelector('#normalCanvas'),
      document.querySelector('#selectionCanvas'), document.querySelector('#permaCanvas'), document.querySelectorAll('area'));
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

    },
    highlightAll: function() {
      this.allOutlines = !this.allOutlines;
      ToggleAll(this.allOutlines)
      $('#permaCanvas').fadeToggle(200);
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    alias: function(value) {
      for (var i = 0; i < mapJSON.aliases.length; i++) {
        if (mapJSON.aliases[i].name == value) {
          return mapJSON.aliases[i].display;
        }
      }

      return value;
    },
    pokeAlieas: function(value) {
      for (var i = 0; i < mapJSON.pokeAliases.length; i++) {
        if (mapJSON.pokeAliases[i].name == value) {
          return mapJSON.pokeAliases[i].display;
        }
      }

      return value;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#poke {
  display: flex;
  flex-flow: column;
  margin: 2px;
  padding: 2px;
  background-color: #2c2b2a;
  border-radius: 4vw 2vw 2vw 2vw;
}
.leftContainer {
  width:100%;
  margin-right:4px;
}
.searchInput {
  border:0;
  width: 100%;
  height:2.2rem;
  max-height:100%;
  text-align: center;
  color:whitesmoke;
}
.searchDiv {
  margin: 4px;
  margin-top: 8px;
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
  margin-right: 20px;
  border-radius: 3vw;
  box-shadow: -0.4vw 0.4vw #39b331;
}
.gameMapContainer {
  margin-bottom: 0.3vw;
  padding:4px;
  width:100%;
  position:relative;
}
.mapCanvas {
  position: absolute;
  left:0px;
  top:0px;
}
.regionInfo {
  min-width: 35vw;
  height: min-content;
  margin: 4px;
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
  display:flex;
  flex-direction: column;
  padding:0;
  margin:0;
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
  width: 10%;
}
.regionData.header.locationsColumn {
  width: 29%;
}
.regionFooter {
  background-color: #2a7925;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
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
.regionData.bottomLeft {
  border-bottom-left-radius: 1rem;
}
.regionData.bottomRight {
  border-bottom-right-radius: 1rem;
}
.btn.gameBox {
  display: table-cell;
}
.btn.gameBox:hover {
  border-width: 1px;
  border-color: white;
}
.pokeIcon {
  image-rendering: pixelated;
  scale: 200%;
  float: left;
  margin-bottom: 2px;
  margin-right: -5px;
  margin-left: -12px;
}
.encounterIcon {
  background-image: url('../../assets/Pokemon/encounterIcons.png');
  image-rendering: pixelated;
  scale: 200%;
  margin-right: 12px;
}
.encounterIcon.walk {
  width: 16px;
  height: 20px;
  background-position: 0px 0px;
}
.encounterIcon.swim {
  width: 16px;
  height: 11px;
  background-position: -17px -6px;
}
.encounterIcon.fish {
  width: 22px;
  height: 16px;
  background-position: -34px 0px;
}
.encounterIcon.event {
  width: 16px;
  height: 16px;
  background-position: -57px 0px;
}

@media only screen and (min-width: 1200px) {
  #poke {
    flex-flow: row;
    margin: 8px;
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
  .regionData.header.locationsColumn {
    width: 24%;
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
