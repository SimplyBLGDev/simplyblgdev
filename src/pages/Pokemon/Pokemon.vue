<template>
  <div id="poke">
    <div class="leftContainer">
      <div class="gameMapContainer">
        <img src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
        <map id="GameMap" name="Kanto">
          <area v-for="area in mapData.maps" v-bind:key="area.id" shape="rect" :coords=processedDimensions(area.dimensions)
            :title=area.name @mouseover="setArea(area.name)" @mouseup="fetchEncounters(area.location_id)">
        </map>
      </div>
      <div class="searchDiv">
        <table class="regionTable">
          <tbody>
            <tr>
              <th class="regionData header right left" colspan="6" width="40%" max-width="7rem">Filter Games</th>
              <th class="regionData header right left">Find Location</th>
              <th class="regionData header right left">Find Pokemon</th>
            </tr>
            <tr>
              <td class="regionData btn gameBox bottomLeft red" v-bind:class="{ active: filteredGames.includes('red') }" colspan=2 @mouseup="filterGame('red')"><b>R</b></td>
              <td class="regionData btn gameBox blue" v-bind:class="{ active: filteredGames.includes('blue') }" colspan=2 @mouseup="filterGame('blue')"><b>B</b></td>
              <td class="regionData btn gameBox bottomRight yellow" v-bind:class="{ active: filteredGames.includes('yellow') }" colspan=2 @mouseup="filterGame('yellow')"><b>Y</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="regionInfo">
      <table class="regionTable">
        <tbody>
          <tr>
            <th class="regionData header left">Pokémon</th>
            <th class="regionData header" colspan=6 width="15%">Games</th>
            <th class="regionData header" width="20%">Location</th>
            <th class="regionData header" width="14%">Levels</th>
            <th class="regionData header right" colspan=3 width="20%">%</th>
          </tr>
          <tr>
            <th class="regionData header" colspan="11" v-if="encounters.name">{{ encounters.name | alias }}</th>
          </tr>
          <template v-for="area in encounters.areas">
            <tr :key="area.name" v-if="encounters.areas.length > 1">
              <td class="regionData" colspan="11">{{ area.name | alias }}</td>
            </tr>
            <tr v-for="encounter in filterEncounters(area.encounters)" v-bind:key="encounter.id" style="height:3rem;">
              <td class="regionData" scope="row">
                <img :src=encounter.pokemon.icon :alt=encounter.pokemon.name class="pokeIcon">
                {{ encounter.pokemon.name | capitalize | alias }}<br v-if="encounter.pokemon.type!=''">
                <small v-if="encounter.pokemon.type!=''">{{ encounter.pokemon.type | capitalize | alias }}</small>
              </td>
              <td class="regionData gameBox red active" colspan=2 v-if="encounter.games.includes('red')"><b>R</b></td>
              <td class="regionData gameBox red" colspan=2 v-else><b>R</b></td>
              <td class="regionData gameBox blue active" colspan=2 v-if="encounter.games.includes('blue')"><b>B</b></td>
              <td class="regionData gameBox blue" colspan=2 v-else><b>B</b></td>
              <td class="regionData gameBox yellow active" colspan=2 v-if="encounter.games.includes('yellow')"><b>Y</b></td>
              <td class="regionData gameBox yellow" colspan=2 v-else><b>Y</b></td>
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
              <td class="regionData" colspan=3>{{ encounter.chance }}%</td>
            </tr>
          </template>
          <tr><td class="regionData regionFooter" colspan="11"> - </td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import imageMapResize from 'image-map-resizer'
import 'maphilight'
import { Pokedex } from 'pokeapi-js-wrapper'
import { FetchEncounters, GetEncountersForLocation } from './PokemonParser'
import mapJSON from '../../assets/Pokemon/Maps/KantoMaps.json'

export default {
  name: 'Pokemon',
  data: () => ({
    selectedArea: "default",
    filteredGames: ['red', 'blue', 'yellow'],
    mapData: mapJSON,
    encounters: []
  }),
  mounted() {
    imageMapResize(document.getElementById('GameMap'));
    $.fn.maphilight.defaults = {
      fill: true,
      fillColor: '000000',
      fillOpacity: 0.1,
      stroke: true,
      strokeColor: '0011ee',
      strokeOpacity: 1,
      strokeWidth: 2,
      fade: true,
      alwaysOn: false,
      neverOn: false,
      groupBy: false,
      wrapClass: true,
      shadow: false,
      shadowX: 0,
      shadowY: 0,
      shadowRadius: 6,
      shadowColor: '000000',
      shadowOpacity: 0.8,
      shadowPosition: 'outside',
      shadowFrom: false
    }
    $('img[usemap]').maphilight();
    FetchEncounters(["red", "blue", "yellow"], new Pokedex(), mapJSON.maps);
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
    setArea: function (newArea) {
      this.selectedArea = newArea;
    },
    fetchEncounters: function(locationId) {
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
    }
  }
}
</script>

<style>
#poke {
  display: flex;
  flex-flow: row;
  margin: 8px;
  padding: 8px;
  background-color: #2c2b2a;
  border-radius: 4vw 2vw 2vw 2vw;
}
.leftContainer {
  display: flex;
  flex-wrap: wrap;
  height: min-content;
}
.searchDiv {
  display: flex;
  flex-flow: row;
  margin: 4px;
  margin-top: 8px;
  padding: 4px;
  background-color: #39b331;
  width: 100%;
  height: min-content;
  border-radius: 1.5rem;
}
.mapImage {
  image-rendering: pixelated;

  width: 35vw;
  height: auto;
  border-radius: 3vw;
  box-shadow: -0.4vw 0.4vw #39b331;
}
.gameMapContainer {
  margin-bottom: 0.3vw;
  margin-left: 0.3vw;
  padding:4px;
}
.regionInfo {
  width: 100%;
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
.regionData.header {
  background-color: #2a7925;
}
.regionData.header.left {
  border-top-left-radius: 1rem;
}
.regionData.header.right {
  border-top-right-radius: 1rem;
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
.gameBox.bottomLeft {
  border-bottom-left-radius: 1rem;
}
.gameBox.bottomRight {
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
  margin-right: -40px;
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
</style>
