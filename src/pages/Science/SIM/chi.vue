<template>
  <div>

    <UTNNavBar />

    <div class="cmb">
      <label for="metodo"><b>Metodo: </b></label>
      <select name="metodo" id="metodo" @input="updateValues()">
        <option value="js">Generador de JS</option>
        <option value="lineal">Congruencial lineal</option>
      </select>
    </div>
    <div>
      <label for="rawData">Mostrar valores fuente:</label>
      <input type="checkbox" name="rawData" id="rawData" @input="showSource = !showSource">
    </div>
    <div class="linea_texts">
      <label for="n">Cantidad a generar:</label>
      <input type="text" name="n" id="n" :placeholder="n" @input="updateValues()">
      <div :class="{ invisible: metodo != 'lineal' }">
        <label for="x0">X0:</label>
        <input type="text" name="x0" id="x0" :placeholder="x0" @input="updateValues()">
        <label for="a">a:</label>
        <input type="text" name="a" id="a" :placeholder="a" @input="updateValues()">
        <label for="c">c:</label>
        <input type="text" name="c" id="c" :placeholder="c" @input="updateValues()">
        <label for="m">m:</label>
        <input type="text" name="m" id="m" :placeholder="m" @input="updateValues()">
        <label for="g">g:</label>
        <input type="text" name="g" id="g" :placeholder="g" @input="updateValues()">
        <label for="k">k:</label>
        <input type="text" name="k" id="k" :placeholder="k" @input="updateValues()">
      </div>
      <div class="cmb">
        <label for="intervals"><b>Intervalos: </b></label>
        <select name="intervals" id="intervals" @input="updateValues()">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>

    <div class="main-flex">
      <div class="data-container data-fold">
        <table class="data-table">
          <tr>
            <th>Desde</th>
            <th>Hasta</th>
            <th>f0</th>
            <th>fe</th>
            <th>c</th>
            <th>c Acumulado</th>
          </tr>
          <tr v-for="result in this.results" :key="result.from">
            <td class="data-table-cell">{{ result.from }}</td>
            <td class="data-table-cell">{{ result.to }}</td>
            <td class="data-table-cell">{{ result.f0 }}</td>
            <td class="data-table-cell">{{ result.fe }}</td>
            <td class="data-table-cell">{{ result.c }}</td>
            <td class="data-table-cell">{{ result.cAcc }}</td>
          </tr>
          <tr>
            <td class="data-foot" colspan="6">-</td>
          </tr>
        </table>
      </div>
      <div class="results-fold">
        <div class="data-container results-panel" :class="{ accepted: accepted, rejected: !accepted }">
          Ji-Cuadrado: {{ jiSquare }}
          c: {{ accumulatedC }}
        </div>
        <div class="data-container graph">
          <svg id="Graph">
          </svg>
        </div>
      </div>

      <div class="data-container source-table" :class="{ removed: !showSource }">
        <table class="data-table">
          <tr>
            <th>Value</th>
          </tr>
          <tr v-for="(value, index) in this.source" :key="index">
            <td class="data-table-cell">{{ value }}</td>
          </tr>
          <tr>
            <td class="data-foot">-</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
</template>

<script>

// eslint-disable-next-line
import { generate } from "@/assets/Science/parametrizedRNG.js";
import { setUp, graph } from "@/assets/Science/jiSquareGraphicManager.js";
import $ from 'jquery';

export default {
  data: () => ({
    x0: 0, a: 0, c: 0, m: 0, g: 0, k: 0, n: 20, intervals: 20,
    source: [],
    jiSquare: 0,
    accumulatedC: 0,
    accepted: false,
    results: [],
    metodo: "js",
    showSource: false
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");

    setUp(document.getElementById("Graph"), $("#Graph").width(), $("#Graph").height());
  },
  methods: {
    updateValues() {
      this.metodo = $("#metodo").val();
      this.intervals = $("#intervals").val();
      if ($("#x0").val() != "") { this.x0 = parseInt($("#x0").val()); }
      if ($("#a").val() != "") { this.a = parseInt($("#a").val()); }
      if ($("#c").val() != "") { this.c = parseInt($("#c").val()); }
      if ($("#m").val() != "") { this.m = parseInt($("#m").val()); }
      if ($("#g").val() != "") { this.g = parseInt($("#g").val()); }
      if ($("#k").val() != "") { this.k = parseInt($("#k").val()); }
      if ($("#n").val() != "") { this.n = parseInt($("#n").val()); }

      var ret = generate(this.metodo, this.x0, this.a, this.c, this.m, this.g, this.k, this.n, this.intervals);

      // Remove floating point precision errors and remove unnecessary 0s
      for (var i = 0; i < ret.results.length; i++) {
        ret.results[i].from = parseFloat(ret.results[i].from.toPrecision(4));
        ret.results[i].to = parseFloat(ret.results[i].to.toPrecision(4));
        ret.results[i].cAcc = parseFloat(ret.results[i].cAcc.toPrecision(4));
        ret.accumulatedC = parseFloat(ret.accumulatedC.toPrecision(4));
      }

      this.results = ret.results;
      this.jiSquare = ret.jiSquare;
      this.accumulatedC = ret.accumulatedC;
      this.accepted = ret.accepted;
      this.source = ret.sourceValues;

      this.fetchFrequencies();
    },
    fetchFrequencies() {
      graph(this.results);
    }
  }
}
</script>

<style>
  .fe-bar {
    fill: #0db52f4d;
  }
  .f0-bar {
    fill: #1C68BA;
  }
  .intervalText {
    color: black;
    font-weight: bold;
  }
</style>

<style scoped>
  @import url('../../../assets/Science/science-table.css');
  .removed {
    opacity: 0;
  }
  .main-flex {
    display: flex;
    width: 100%;
  }
  .data-fold {
    width: 60%;
  }
  .results-fold {
    width: 40%;
  }
  .results-panel {
    height: 20rem;
    font-weight: bolder;
  }
  .results-panel.accepted {
    background-image: url("../../../assets/Science/accepted.png");
    background-repeat: no-repeat;
    background-color: rgb(14, 133, 53);
    background-size: 15rem;
    background-position-x: right -10%;
    background-position-y: bottom -50%;
  }
  .results-panel.rejected {
    background-image: url("../../../assets/Science/rejected.png");
    background-repeat: no-repeat;
    background-color: rgb(133, 14, 14);
    background-size: 15rem;
    background-position-x: right -10%;
    background-position-y: bottom -50%;
  }
  .data-container.graph {
    background-color: white;
    height: 30rem;
    padding: 10px;
  }
  #Graph {
    width: 100%;
    height: 100%;
  }
</style>
