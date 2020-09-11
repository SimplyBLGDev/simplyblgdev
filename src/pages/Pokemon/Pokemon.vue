<template>
  <div id="poke">
    <div class="gameMapContainer">
      <img src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
      <map id="GameMap" name="Kanto">
        <area v-for="area in mapData.maps" v-bind:key="area.id" shape="rect" :coords=processedDimensions(area.dimensions)
          :title=area.name @mouseover="setArea(area.name)">
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
          <div class="col">#</div>
          <div class="col">Pokémon</div>
          <div class="col">Games</div>
          <div class="col">Location</div>
          <div class="col">Levels</div>
          <div class="col">%</div>
        </div>
        <div class="row" v-for="encounter in encounters" v-bind:key="encounter.id">
          <div class="col">{{ encounter.number }}</div>
          <div class="col">{{ encounter.pokemon }}</div>
          <div class="col">{{ encounter.games }}</div>
          <div class="col">{{ encounter.location }}</div>
          <div class="col">{{ encounter.levels }}</div>
          <div class="col">{{ encounter.probability }}</div>
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
import { ProcessLocation, GetEncountersForLocation } from './PokemonParser'
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
      this.fetchEncounters();
    },
    fetchEncounters: function() {
      const P = new Pokedex();
      GetEncountersForLocation();

      P.getLocationAreaByName("295").then(function(response) {
        console.log(ProcessLocation(response, ["red", "blue", "yellow"]));
      });
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
</style>
