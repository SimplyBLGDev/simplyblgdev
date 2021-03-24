<template>
  <div>
    <div>
      <div style="background: rgba(0, 0, 0, 0) linear-gradient(-105deg, rgb(234, 234, 234) 20%, rgba(24, 26, 27, 0) 60%) repeat scroll 0% 0%;">
        <div style="display:flex; padding-left:10px;">
          <img src="../../../assets/UTN Logo.png" alt="UTN FRC Logo" style="width:20%; margin:8px;">
        </div>
      </div>
    </div>
    <div class="ButtonPanel">
      <button class="PanelButton" onclick="window.location.href='/Graficadora';">Generador Pseudoaleatorio</button>
      <button class="PanelButton" v-on:click="openTheory">Prueba de Frecuencias</button>
      <button class="PanelButton" onclick="window.location.href='/Graficadora/Informacion';">Contacto</button>
    </div>

    <div class="root">
      <div class="metodo_cmb">
      <label for="metodo"><b>Metodo: </b></label>
      <select name="metodo" id="metodo" @input="updateValues()">
        <option value="lineal">Congruencial lineal</option>
        <option value="multiplicativo">Congruencial multiplicativo</option>
      </select>
    </div>
    <div class="linea_texts">
      X0:<input type="text" name="x0" id="x0" :placeholder="calculated.x0" @input="updateValues()">
      a:<input type="text" name="a" id="a" :placeholder="calculated.a" @input="updateValues()">
      c:<input type="text" name="c" id="c" :placeholder="calculated.c" @input="updateValues()">
      m:<input type="text" name="m" id="m" :placeholder="calculated.m" @input="updateValues()">
      g:<input type="text" name="g" id="g" :placeholder="calculated.g" @input="updateValues()">
      k:<input type="text" name="k" id="k" :placeholder="calculated.k" @input="updateValues()">
    </div>
    <div class="warning">
      Los valores introducidos no cumplen con las recomendaciones para maximizar el periodo
    </div>
    <div class="data-container">
      <table class="data-table">
        <tr>
          <th>i</th>
          <th>Xi</th>
          <th colspan="2">Resultado</th>
        </tr>
        <tr v-for="value in this.tableValues" :key="value.i">
          <td class="data-table-cell">{{ value.i }}</td>
          <td class="data-table-cell">{{ value.xi }}</td>
          <td class="data-table-cell" colspan="2" :class="{ mesimo: (value.i%calculated.m)===0 }">{{ value.r }}</td>
        </tr>
        <tr>
          <td class="data-foot" colspan="3">-</td>
          <td class="data-btn-add" @mousedown="incrementMaxI()">+</td>
        </tr>
      </table>
    </div>
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line
import $ from 'jquery';

export default {
   data: () => ({
    inputted: {
      x0: "", a: "", c: "", m: "", g: "", k: ""
    },
    calculated: {
      x0: 0, a: 0, c: 0, m: 0, g: 0, k: 0
    },
    maxI: 20,
    tableValues: []
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");
  },
  methods: {
    updateValuesLineal() {
      this.calculated.a = 1 + 4*this.calculated.k;
      this.calculated.m = Math.pow(2, this.calculated.g);

      this.tableValues = [];
      var lastValues = {
        i: 0,
        xi: this.calculated.x0,
        r:0
      }

      for (var i = 1; i <= this.maxI; i++) {
        var xi = (lastValues.xi * this.calculated.a + this.calculated.c) % this.calculated.m;
        lastValues = {
          "i": i,
          "xi": xi,
          "r": (xi / this.calculated.m).toFixed(4)
        }

        this.tableValues.push(lastValues);
      }
    },
    updateValuesMultiplicativo() {
      this.calculated.a = 3 + 8*this.calculated.k;
      this.calculated.m = Math.pow(2, this.calculated.g);

      this.tableValues = [];
      var lastValues = {
        i: 0,
        xi: this.calculated.x0,
        r:0
      }

      for (var i = 1; i <= this.maxI; i++) {
        var xi = (lastValues.xi * this.calculated.a) % this.calculated.m;
        lastValues = {
          "i": i,
          "xi": xi,
          "r": (xi / this.calculated.m).toFixed(4)
        }

        this.tableValues.push(lastValues);
      }
    },
    updateValues() {
      this.calculated.x0 = parseInt($("#x0").val());
      this.calculated.c = parseInt($("#c").val());
      this.calculated.m = parseInt($("#m").val());
      this.calculated.k = parseInt($("#k").val());
      this.calculated.g = parseInt($("#g").val());
      if (isNaN(this.calculated.k)) { this.calculated.k=0; }
      if (isNaN(this.calculated.g)) { this.calculated.g=0; }

      if ($("#metodo").val() == "lineal") {
        this.updateValuesLineal();
      } else {
        this.updateValuesMultiplicativo();
      }
    },
    incrementMaxI() {
      this.maxI += 1;
      this.updateValues();
    }
  }
}
</script>

<style scoped>
  .ButtonPanel {
    display: flex;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .PanelButton {
    font-family: 'Oxygen Mono', monospace;
    font-weight: bold;
    border: 0;
    margin: 5px;
    background-color: #6905b5;
    color: whitesmoke;
    padding: 4px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px;
    box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
    -webkit-box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
  }

  .root {
    width: 100%;
    padding: 8px;
  }
  .metodo_cmb {
    width: 100%;
    text-align: left;
  }
  .linea_texts {
    width: 100%;
    display: flex;
    align-items:center;
  }
  .linea_texts input {
    border: none;
    border-radius: 4px;
    width: 3rem;
    height: 2rem;
    margin: 0 0.5rem;
    background-color: #872d8e;
    color: whitesmoke;
  }
  .warning {
    width: 100%;
    margin: 1rem 0;
    background-color: #dfcb27;
    color: #2828db;
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .data-container {
    min-width: 35vw;
    height: min-content;
    margin-left: 4px;
    margin-right: 4px;
    padding: 4px;
    background-color: #39b331;
    border-radius: 1.5rem;
  }
  .data-table {
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
  .data-table-cell {
    background-color: #328d2b;
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
    border-radius: 3px;
  }
  .data-table-cell .mesimo {
    background-color: blue;
  }
  .data-table tr th {
    background-color: #2a7925;
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
    border-radius: 3px;
  }
  .data-table tr th:first-child {
    border-top-left-radius: 1rem;
  }
  .data-table tr th:last-child {
    border-top-right-radius: 1rem;
  }
  .data-foot {
    background-color: #2a7925;
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
    border-radius: 3px;
    border-radius: 3px 3px 3px 1rem;
    user-select: none;
    color: transparent;
  }
  .data-btn-add {
    width: 10%;
    background-color: rgb(12, 12, 247);
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
    border-radius: 3px 3px 1rem 3px;
    font-weight: bold;
  }
  .data-btn-add:hover {
    border-width: 1px;
    border-color: white;
  }
</style>
