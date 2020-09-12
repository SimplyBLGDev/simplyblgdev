<template>
  <div id="poke">
    <div class="gameMapContainer">
      <img src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
      <map id="GameMap" name="Kanto">
        <area v-for="area in mapData.maps" v-bind:key="area.id" shape="rect" :coords=processedDimensions(area.dimensions)
          :title=area.name @mouseover="setArea(area.name, area.location_id)">
      </map>
    </div>
    <div class="regionInfo">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <h5>{{ selectedArea }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">Event</div>
        </div>
        <div class="row">
          <div class="col">Pokémon</div>
          <div class="col-2">Games</div>
          <div class="col">Location</div>
          <div class="col">Levels</div>
          <div class="col">%</div>
        </div>
        <div class="row" v-for="encounter in encounters" v-bind:key="encounter.id">
          <div class="col">{{ encounter.pokemon | capitalize }}</div>
          <div class="game col-2">
            <div class="row">
              <div class="col gameBox red active" v-if="encounter.games.includes('red')"><b>R</b></div>
              <div class="col gameBox red" v-else><b>R</b></div>
              <div class="col gameBox blue active" v-if="encounter.games.includes('blue')"><b>B</b></div>
              <div class="col gameBox blue" v-else><b>B</b></div>
              <div class="col gameBox yellow active" v-if="encounter.games.includes('yellow')"><b>Y</b></div>
              <div class="col gameBox yellow" v-else><b>Y</b></div>
            </div>
          </div>
          <div class="col">{{ encounter.method | capitalize }}</div>
          <div class="col">{{ encounter.min_level }} - {{encounter.max_level}}</div>
          <div class="col">{{ encounter.chance }}</div>
        </div>
      </div>
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
    setArea: function (newArea, locationId) {
      this.selectedArea = newArea;
      this.fetchEncounters(locationId);
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
  box-shadow: -0.4vw 0.4vw #32a852;
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
  background-color: #492f77;
  border-radius: 8px;
}
.col {
  margin:2px;
  background-color:#2e1f5e;
}
.col-2 {
  margin:2px;
  background-color:#2e1f5e;
}
.game.col-2 {
  background-color:transparent;
}
.gameBox {
  margin:0.2rem;
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
