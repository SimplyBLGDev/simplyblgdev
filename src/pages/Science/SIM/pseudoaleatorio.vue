<template>
  <div>

    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="root">
      <div class="cmb">
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
    contactInfo: [
      {
        "name": "Logares Abril",
        "no": "78799",
        "mail": "abrillogares@gmail.com"
      },
      {
        "name": "Saleh Maximiliano",
        "no": "78798",
        "mail": "maxisaleh@outlook.com"
      },
      {
        "name": "Paz Fessia Facundo",
        "no": "78579",
        "mail": "facupazfessia@gmail.com"
      },
      {
        "name": "Landa Valle Santiago",
        "no": "78637",
        "mail": "santi.land4@gmail.com"
      },
      {
        "name": "Villane Ignacio",
        "no": "62687",
        "mail": "ignaciovillane@gmail.com"
      }
    ],
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
          "r": (xi / (this.m - 1)).toFixed(4)
        }

        this.tableValues.push(lastValues);
      }
    },
    updateValuesMultiplicativo() {
      if ($("#a").val() == 0) { this.a = 3 + 8*this.k; }
      if ($("#m").val() == 0) { this.m = Math.pow(2, this.g); }

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
      if ($("#a").val() != "") { this.a = parseInt($("#a").val()); }
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
  @import url('../../../assets/Science/science-table.css');
  .root {
    width: 100%;
    padding: 8px;
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
</style>
