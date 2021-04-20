<template>
  <div>
    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="cmb">
      <label for="metodo"><b>Metodo: </b></label>
      <select name="metodo" id="metodo" @input="updateValues()">
        <option value="uniform">Uniforme</option>
        <option value="boxMuller">Normal (Box Muller)</option>
        <option value="convolucion">Normal (Convolucion)</option>
        <option value="poisson">Poisson</option>
        <option value="exp">Exponencial inversa</option>
      </select>
    </div>
    <div class="linea_texts">
      <label for="n">Cantidad a generar:</label>
      <input type="text" name="n" id="n" placeholder="20" @input="updateValues()">
      <div :class="{ invisible: metodo != 'uniform' }">
        <label for="min">Limite Inferior:</label>
        <input type="text" name="min" id="min" placeholder="1" @input="updateValues()">
        <label for="max">Limite Superior:</label>
        <input type="text" name="max" id="max" placeholder="10" @input="updateValues()">
      </div>
      <div :class="{ invisible: metodo != 'boxMuller' && metodo != 'convolucion' }">
        <label for="median">Media:</label>
        <input type="text" name="median" id="median" placeholder="5" @input="updateValues()">
        <label for="dev">Desviacion Estandar:</label>
        <input type="text" name="dev" id="dev" placeholder="1" @input="updateValues()">
      </div>
      <div :class="{ invisible: metodo != 'poisson' && metodo != 'exp' }">
        <label for="lambda">Lambda:</label>
        <input type="text" name="lambda" id="lambda" placeholder="10" @input="updateValues()">
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

    <div style="display: flex;">
      <div class="data-container values">
        <table class="data-table">
          <tr>
            <th>Valor</th>
          </tr>
          <tr v-for="(result, id) in this.results" :key="id" class="data-table-cell">
            <td>{{ result }}</td>
          </tr>
          <tr>
              <td class="data-foot">-</td>
            </tr>
        </table>
      </div>
      <div class="data-container graph">
        <div style="width: 100%">
          <svg id="Graph">
          </svg>
          <div class="data-container proof" :class="{ accepted: accepted, rejected: !accepted }">
            Ji Square: {{ jiSquare }}<br>
            c: {{ c }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line
import { generarUniforme, generarNormalBoxMuller, generarNormalConvolucion, generarPoisson, generarExponencialMedia, generarExponencialLambda } from '../../../../public/SIMTP3.js';
import { setUp, graph } from "@/assets/Science/jiSquareGraphicManager.js";
import $ from 'jquery';

export default {
  data: () => ({
    contactInfo: [
      {
        "name": "Logares Fabricio",
        "no": "78799",
        "mail": "fabrilogares@gmail.com"
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
    metodo: 'uniform',
    intervals: 5,
    results: [],
    jiSquare: 0,
    c: 0,
    accepted: true
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
      var n, inf, sup, median, dev, lambda = 0;

      if ($("#n").val() != "") { n = parseInt($("#n").val()); } else { n = 20; }
      if ($("#min").val() != "") { inf = parseInt($("#min").val()); } else { inf = 1; }
      if ($("#max").val() != "") { sup = parseInt($("#max").val()); } else { sup = 10; }
      if ($("#median").val() != "") { median = parseInt($("#median").val()); } else { median = 5; }
      if ($("#dev").val() != "") { dev = parseInt($("#dev").val()); } else { dev = 1; }
      if ($("#lambda").val() != "") { lambda = parseInt($("#lambda").val()); } else { lambda = 10; }

      switch (this.metodo) {
        case 'uniform': this.results = generarUniforme(inf, sup, n); break;
        case 'boxMuller': this.results = generarNormalBoxMuller(median, dev, n); break;
        case 'convolucion': this.results = generarNormalConvolucion(median, dev, n); break;
        case 'poisson': this.results = generarPoisson(lambda, n); break;
        case 'exp': this.results = generarExponencialLambda(lambda, n); break;
      }

      var intervalInfo = this.graph();

      this.jiSquare = this.getJiSquareValue(this.metodo, this.intervals);
      var cAcc = 0;

      for (var i = 0; i < intervalInfo.length; i++) {
        switch (this.metodo) {
          case "uniform": intervalInfo[i].fe = this.getUniformFe(this.intervals, n); break;
          case "boxMuller":
          case "convolucion":
            intervalInfo[i].fe = this.getNormalFe(intervalInfo[i].from, intervalInfo[i].to, median, dev, n);
            break;
          case "poisson":
            intervalInfo[i].fe = this.getPoissonFe(intervalInfo[i].from, intervalInfo[i].to, lambda, n);
            break;
          case "exp":
            intervalInfo[i].fe = this.getExpFe(intervalInfo[i].from, intervalInfo[i].to, lambda, n);
            break;
        }

        cAcc += Math.pow(intervalInfo[i].f0 - intervalInfo[i].fe, 2) / intervalInfo[i].fe;
      }

      this.c = cAcc;
      this.accepted = this.c <= this.jiSquare;
    },
    graph() {
      var r = [];
      var max = 0;
      var min = 9999999;

      for (var k = 0; k < this.results.length; k++) {
        max = Math.max(this.results[k], max);
        min = Math.min(this.results[k], min);
      }

      var l = (max - min) / this.intervals;

      for (var j = 0; j < this.intervals; j++) {
        r.push({
          'f0': 0,
          'fe': 0,
          'from': parseFloat(((l * j) + min).toPrecision(4)),
          'to': parseFloat(((l * (j + 1)) + min).toPrecision(4))
        });
      }

      for (var i = 0; i < this.results.length; i++) {
        var ix = Math.min(Math.floor((this.results[i] - min) / l), this.intervals - 1);
        r[ix].f0 += 1;
      }

      graph(r);

      return r;
    },
    getExpFe(limInf, limSup, lambda, n) {
      var pInf = 1-Math.exp(-lambda*limInf);
      var pSup = 1-Math.exp(-lambda*limSup);
      var pArea = pSup - pInf;
      return pArea * n;
    },
    getNormalFe(limInf, limSup, media, dev, n) {
      var intervalMiddlePoint = (limInf + limSup) / 2;
      var pArea = 1 / (dev * Math.sqrt(2 * Math.PI)) * Math.exp((-1 / 2) * Math.pow((intervalMiddlePoint-media) / dev, 2));
      return pArea * n;
    },
    getPoissonFe(limInf, limSup, lambda, n) {
      var fe = 0;

      for (var i = limInf; i <= limSup; i++) {
        console.log(i);
        var pI = Math.pow(lambda, i)*Math.exp(-lambda) / this.factorial(i);
        fe += pI;
      }

      return fe * n;
    },
    getUniformFe(intervals, n) {
      return n / intervals;
    },
    getJiSquareValue(distribution, intervals) {
      return {
        "uniform": {
          5: 9.49,
          10: 16.9,
          15: 23.7,
          20: 30.1
        },
        "boxMuller": {
          5: 5.99,
          10: 14.1,
          15: 21,
          20: 27.6
        },
        "convolucion": {
          5: 5.99,
          10: 14.1,
          15: 21,
          20: 27.6
        },
        "poisson": {
          5: 7.81,
          10: 15.5,
          15: 22.4,
          20: 28.9
        },
        "exp": {
          5: 7.81,
          10: 15.5,
          15: 22.4,
          20: 28.9
        }
      }[distribution][intervals];
    },
    factorial(n) {
      if (n == 0 || n == 1) { return 1; }
      return n * this.factorial(n-1);
    }
  }
}
</script>

<style>
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
.data-container.values {
  width: 20%;
}
.data-container.proof {
  font-weight: bolder;
}
.data-container.proof.accepted {
  background-image: url("../../../assets/Science/accepted.png");
  background-repeat: no-repeat;
  background-color: rgb(14, 133, 53);
  background-size: 15rem;
  background-position-x: right -10%;
  background-position-y: bottom -50%;
}
.data-container.proof.rejected {
  background-image: url("../../../assets/Science/rejected.png");
  background-repeat: no-repeat;
  background-color: rgb(133, 14, 14);
  background-size: 15rem;
  background-position-x: right -10%;
  background-position-y: bottom -50%;
}
.data-container.graph {
  width: 80%;
  padding: 8px;
  background-color: white;
}
#Graph {
  height: 50vh;
  width: 100%;
}
</style>
