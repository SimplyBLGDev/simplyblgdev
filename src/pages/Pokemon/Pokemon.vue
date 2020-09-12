<template>
  <div id="poke">
    <div class="gameMapContainer">
      <img src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
      <map id="GameMap" name="Kanto">
        <area v-for="area in mapData.maps" v-bind:key="area.id" shape="rect" :coords=processedDimensions(area.dimensions)
          :title=area.name @mouseover="setArea(area.name)" @mouseup="fetchEncounters(area.location_id)">
      </map>
    </div>
    <div class="regionInfo">
      <table class="regionTable">
        <tbody>
          <tr>
            <th class="regionData header left">Pokémon</th>
            <th class="regionData header" colspan=6 width="15%">Games</th>
            <th class="regionData header" width="17%">Location</th>
            <th class="regionData header" width="17%">Levels</th>
            <th class="regionData header right" colspan=3 width="20%">%</th>
          </tr>
          <tr v-for="encounter in encounters" v-bind:key="encounter.id">
            <td class="regionData" scope="row">{{ encounter.pokemon | capitalize }}</td>
            <td class="regionData gameBox red active" colspan=2 v-if="encounter.games.includes('red')"><b>R</b></td>
            <td class="regionData gameBox red" colspan=2 v-else><b>R</b></td>
            <td class="regionData gameBox blue active" colspan=2 v-if="encounter.games.includes('blue')"><b>B</b></td>
            <td class="regionData gameBox blue" colspan=2 v-else><b>B</b></td>
            <td class="regionData gameBox yellow active" colspan=2 v-if="encounter.games.includes('yellow')"><b>Y</b></td>
            <td class="regionData gameBox yellow" colspan=2 v-else><b>Y</b></td>
            <td class="regionData">{{ encounter.method | capitalize }}</td>
            <td class="regionData">{{ encounter.min_level }} - {{ encounter.max_level }}</td>
            <td class="regionData" colspan=3>{{ encounter.chance }}%</td>
          </tr>
          <tr><td class="regionFooter" colspan="11"> - </td></tr>
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
    mapData: mapJSON,
    encounters: [
    ]
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
#poke {
  display: flex;
  flex-flow: row;
  margin: 8px;
  padding: 8px;
  background-color: #2c2b2a;
  border-radius: 8px;
}
.mapImage {
  image-rendering: pixelated;

  width: 35vw;
  height: auto;
  border-radius: 3vw;
  box-shadow: -0.4vw 0.4vw #39b331;
}
.gameMapContainer {
  margin-bottom: 0.4vw;
  margin-left: 0.4vw;
  padding:8px;
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
  color:#ebc934;
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
  background-color:#ebc934;
}
</style>
