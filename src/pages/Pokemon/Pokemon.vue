<template>
  <div id="poke">
    <div class="gameMapContainer">
      <img src="../../assets/Pokemon/Maps/Kanto.png" class="mapImage" alt="Kanto Map" usemap="#Kanto" width="160" height="136">
      <map id="GameMap" name="Kanto">
        <area v-for="area in mapData.maps" v-bind:key="area.id" shape="rect" :coords=processedDimensions(area.dimensions) :title=area.name @mouseover="setArea(area.name)">
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

<script src="./Pokemon.js"></script>
<script>
import imageMapResize from 'image-map-resizer'
import mapJSON from '../../assets/Pokemon/Maps/KantoMaps.json'
export default {
  name: 'Pokemon',
  data: () => ({
    selectedArea: "default",
    mapData: mapJSON,
    encounters: [
      {
        id: 0,
        number: "001",
        pokemon: "Bulbasaur",
        games: "RBY",
        location: "Grass",
        levels: "2-12",
        probability: "5%"
      },
      {
        id: 1,
        number: "005",
        pokemon: "Charmander",
        games: "RBY",
        location: "Grass",
        levels: "2-12",
        probability: "5%"
      }
    ]
  }),
  mounted() {
    imageMapResize(document.getElementById('GameMap'));
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
  margin-bottom: 0.4vw;
  margin-left: 0.4vw;
  padding: 4px;
  width: 35vw;
  height: auto;
  border-radius: 3vw;
  box-shadow: -0.4vw 0.4vw #32a852;
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
