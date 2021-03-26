<template>
  <div>

    <UTNNavBar />

    <div class="root">
      <div class="metodo_cmb">
      <label for="metodo"><b>Metodo: </b></label>
      <select name="metodo" id="metodo" @input="updateValues()">
        <option value="lineal">Congruencial lineal</option>
        <option value="multiplicativo">Congruencial multiplicativo</option>
      </select>
    </div>
    <div class="linea_texts">
      X0:<input type="text" name="x0" id="x0" :placeholder="x0" @input="updateValues()">
      a:<input type="text" name="a" id="a" :placeholder="a" @input="updateValues()">
      <div :class="{ invisible: metodo != 'lineal' }">c:<input type="text" name="c" id="c" :placeholder="c" @input="updateValues()"></div>
      m:<input type="text" name="m" id="m" :placeholder="m" @input="updateValues()">
      g:<input type="text" name="g" id="g" :placeholder="g" @input="updateValues()">
      k:<input type="text" name="k" id="k" :placeholder="k" @input="updateValues()">
    </div>
    <div class="warning" v-if="warning != ''">
      {{ warning }}
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
          <td class="data-table-cell" colspan="2" :class="{ mesimo: (value.i%m)===0 }">{{ value.r }}</td>
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
    x0: 0, a: 0, c: 0, m: 0, g: 0, k: 0,
    metodo: "lineal",
    warning: "",
    maxI: 20,
    tableValues: []
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");
  },
  methods: {
    updateValuesLineal() {
      if ($("#a").val() == 0) { this.a = 1 + 4*this.k; }
      if ($("#m").val() == 0) {this.m = Math.pow(2, this.g); }

      this.tableValues = [];
      var lastValues = {
        i: 0,
        xi: this.x0,
        r:0
      }

      for (var i = 1; i <= this.maxI; i++) {
        var xi = (lastValues.xi * this.a + this.c) % this.m;
        lastValues = {
          "i": i,
          "xi": xi,
          "r": (xi / this.m).toFixed(4)
        }

        this.tableValues.push(lastValues);
      }
    },
    updateValuesMultiplicativo() {
      if ($("#a").val() == 0) { this.a = 3 + 8*this.k; }
      if ($("#a").val() == 0) { this.m = Math.pow(2, this.g); }

      this.tableValues = [];
      var lastValues = {
        i: 0,
        xi: this.x0,
        r:0
      }

      for (var i = 1; i <= this.maxI; i++) {
        var xi = (lastValues.xi * this.a) % this.m;
        lastValues = {
          "i": i,
          "xi": xi,
          "r": (xi / this.m).toFixed(4)
        }

        this.tableValues.push(lastValues);
      }
    },
    updateValues() {
      if ($("#x0").val() != "") { this.x0 = parseInt($("#x0").val()); }
      if ($("#c").val() != "") { this.c = parseInt($("#c").val()); }
      if ($("#m").val() != "") { this.m = parseInt($("#m").val()); }
      if ($("#k").val() != "") { this.k = parseInt($("#k").val()); }
      if ($("#g").val() != "") { this.g = parseInt($("#g").val()); }
      if (isNaN(this.k)) { this.k=0; }
      if (isNaN(this.g)) { this.g=0; }
      this.metodo = $("#metodo").val();

      if ($("#metodo").val() == "lineal") {
        this.updateValuesLineal();
      } else {
        this.updateValuesMultiplicativo();
      }

      this.warning = this.getWarning();
    },
    getWarning() {
      var metodo = $("#metodo").val();
      var l;

      switch (metodo) {
        case "lineal":
          if ((this.a - 1) % 4 != 0) { return "a no responde a la formula recomendada"; }
          l = Math.log2(this.m);
          if (l - Math.floor(l) != 0 || l < 0) { return "m no es potencia de 2 positiva"; }
          if (this.shareMember(this.getDivisors(this.c), this.getDivisors(this.m)).length > 0) { return "c y m no son relativamente primos"; }
          break;

        default:
          if ((this.a - 3) % 8 != 0) { return "a no responde a la formula recomendada"; }
          l = Math.log2(this.m);
          if (l - Math.floor(l) != 0) { return "m no es potencia de 2"; }
          if (this.x0 % 2 == 0) { return "X0 no es impar"; }
          break;
      }

      return "";
    },
    shareMember(a, b) {
      return b.filter(function(e) {
        return a.indexOf(e) > -1;
      });
    },
    getDivisors(n) {
      var divisors = [];
      for (var i = 2; i < n / 2 + 1; i++) {
        if (n % i == 0) {
          divisors.push(i);
        }
      }
      return divisors;
    },
    incrementMaxI() {
      this.maxI += 1;
      this.updateValues();
    }
  }
}
</script>

<style scoped>
  .invisible {
    display: none;
  }
  .root {
    width: 100%;
    padding: 8px;
  }
  .metodo_cmb {
    width: 100%;
    text-align: left;
  }
  .metodo_cmb select {
    height: 2rem;
    background-color: #2e87d7;
    border: none;
    color: whitesmoke;
    margin: 0 4px;
    border-radius: 4px;
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
    background-color: #2E87D7;
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
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
    background-color: #1c68ba;
    border-radius: 1.5rem;
    margin-top: 1rem;
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
    background-color: #3883d2;
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
    background-color: #1f5288;
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
    background-color: #1f5288;
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
    background-color: rgb(39, 189, 77);
    -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
    --box-shadow-color: rgb(0, 0, 0, 0.75);
    border-radius: 3px 3px 1rem 3px;
    font-weight: bold;
  }
  .data-btn-add:hover() {
    background-color: rgb(60, 192, 93);
    border-width: 1px;
    border-color: white;
  }
</style>
