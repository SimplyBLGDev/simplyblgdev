<template>
  <div>
    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="linea_texts">
      <label for="n">Minutos a simular:</label>
      <input type="text" name="n" id="n" placeholder="600" @input="updateValues()">
      <label for="from">Mostrar desde minuto:</label>
      <input type="text" name="from" id="from" placeholder="0" @input="updateValues()">
      <label for="to">por</label>
      <input type="text" name="to" id="to" placeholder="30" @input="updateValues()">
      <label for="ambulances">iteraciones. Ambulancias:</label>
      <input type="text" name="ambulances" id="ambulances" placeholder="1" @input="updateValues()">
    </div>
    <div class="linea_texts" style="background-color: #C01111; padding: 5px; margin: 1.5rem 0" v-if="warnings.length > 0">
      <b v-for="(warning, index) in warnings" :key="index">{{ warning }}</b>
    </div>

    <div style="background-color: #303040; padding: 5px; margin: 1.5rem 0">
      <div class="linea_texts">
        <b>Auto Calculo:</b><br>
        <label for="iterations">Iteraciones:</label>
        <input type="text" name="iterations" id="iterations" placeholder="100" @input="updateValues()">
        <button class="rkButton" @click="calc()">Calcular!</button>
      </div>
      <div class="data-container values" v-if="calcR.length > 0">
        <table class="data-table">
          <tr>
            <th>Numero de Ambulancias</th>
            <th>Tiempo total</th>
            <th>Pacientes total</th>
            <th>Pacientes sin espera</th>
            <th>Porcentaje</th>
          </tr>
          <tr v-for="result in this.calcR" :key="result.ambulancias">
            <td class="data-table-cell">{{ result.ambulancias }}</td>
            <td class="data-table-cell">{{ result.tiempoTotal | getTime }}</td>
            <td class="data-table-cell">{{ result.pacientes }}</td>
            <td class="data-table-cell">{{ result.noWait }}</td>
            <td class="data-table-cell">{{ result.r | percent }}</td>
          </tr>
          <tr>
            <td class="data-foot" colspan="5">-</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="display: flex;align-items: center;justify-content: center;">
        <table>
            <tr><td style="text-align:right"><b>Tiempo Total:</b></td><td style="text-align:left"> {{ stats.tiempoTotal | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Cantidad Pacientes:</b></td><td style="text-align:left"> {{ stats.pacientes }}<br></td></tr>
            <tr><td style="text-align:right"><b>Pacientes sin demora:</b></td><td style="text-align:left"> {{ stats.noWait }}<br></td></tr>
            <tr><td style="text-align:right"><b>Porcentaje pacientes sin demora:</b></td><td style="text-align:left"> {{ (stats.noWait / stats.pacientes) | percent }}<br></td></tr>
        </table>
    </div>

    <div class="data-container values">
      <table class="data-table">
        <tr>
          <th>#</th>
          <th>Reloj</th>
          <th>Evento</th>
          <th>Pacientes sin atender</th>
          <th>Ambulancias Libres</th>
          <th>Ambulancias Ocupadas</th>
        </tr>
        <tr v-for="result in this.results" :key="result.I">
          <td class="data-table-cell" @click="showDetailedData(1, [result.tPacientes, result.tNoWait, result.proxPaciente])">{{ result.I }}</td>
          <td class="data-table-cell">{{ result.clock | getTime }}</td>
          <td class="data-table-cell" @click="showDetailedData(0, result.ambulancias)">{{ result.evento }}</td>
          <td class="data-table-cell" @click="showDetailedData(2, result.cola)">{{ result.cola.length }}</td>
          <td class="data-table-cell">{{ result.libre }}</td>
          <td class="data-table-cell">{{ result.ocupados }}</td>
        </tr>
        <tr>
          <td class="data-foot" colspan="6">-</td>
        </tr>
      </table>
    </div>

      <DataBox ref="dataBox"></DataBox>
  </div>
</template>

<script>
import DataBox from './DataBox.vue';
import { simulate } from '../../../assets/Science/Queue/TPF.js';
import $ from 'jquery';

export default {
  data: () => ({
    contactInfo: [
      {
        "name": "Logares Abril",
        "no": "78799",
        "mail": "abrillogares@gmail.com"
      }
    ],
    n: 600,
    ambulances: 1,
    results: [],
    calcR: [],
    from: 0,
    to: 30,
    warnings: [],
    stats: {}
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");
    this.updateValues();
  },
  methods: {
    updateValues() {
      if ($("#n").val() != "") { this.n = parseInt($("#n").val()); } else { this.n = 600; }
      if ($("#ambulances").val() != "") { this.ambulances = parseInt($("#ambulances").val()); } else { this.ambulances = 1; }
      if ($("#iterations").val() != "") { this.iterations = parseInt($("#iterations").val()); } else { this.iterations = 100; }
      if ($("#from").val() != "") { this.from = parseInt($("#from").val()); } else { this.from = 0; }
      if ($("#to").val() != "") { this.to = parseInt($("#to").val()); } else { this.to = 30; }

      this.updateWarnings();

      var result = simulate(this.n, this.ambulances, this.from, this.to);
      this.results = result.log;
      this.stats = result.estadisticas;
    },
    updateWarnings() {
      this.warnings = [];

      if (this.from < 0) {
        this.from = 0;
        this.warnings.push("El minuto minimo de muestra no puede ser menor a 0.");
      }
      if (this.to < 0) {
        this.to = 0;
        this.warnings.push("No se pueden mostrar menos de 0 iteraciones a partir del minuto de inicio.");
      }
      if (this.from > 500) {
        this.to = 500;
        this.warnings.push("Maximas iteraciones a mostrar: 500");
      }
      if (this.ambulances <= 0) {
        this.ambulances = 1;
        this.warnings.push("Se requiere por lo menos 1 ambulancia.");
      }
      if (this.n < 0) {
        this.n = 0;
        this.warnings.push("No se puede simular menos de 0 minutos.");
      }
    },
    showDetailedData(mode, data) {
      var newText = [];

      switch (mode) {
        case 0: // Estados
          for (var i = 0; i < data.length; i++) {
            if (data[i].estado == "ocupado") {
              newText.push("Ambulancia " + (i + 1) + " - " + data[i].estado + ": " + this.$options.filters.getTime(data[i].tDesocupacion));
            } else {
              newText.push("Ambulancia " + (i + 1) + " - " + data[i].estado);
            }
          }
          break;
        case 1: // #
          newText.push("Total parcial pacientes: " + data[0]);
          newText.push("Total parcial pacientes con atencion inmediata: " + data[1]);
          newText.push("Proximo Paciente: " + this.$options.filters.getTime(data[2].tiempo));
          break;
        case 2: // Cola
          for (var j = 0; j < data.length; j++) {
            newText.push("Paciente " + (j + 1) + " - " + this.$options.filters.getTime(data[j]));
          }
          break;
      }

      this.$refs.dataBox.$props.text = newText;
      event.target.appendChild(this.$refs.dataBox.$el);
    },
    calc() {
      var ambulanceTests = [];
      
      do {
        var accPercent = 0;
        var accPacientes = 0;
        var accNoWait = 0;
        var accTime = 0;
        for (var i = 0; i < this.iterations; i++) {
          var result = simulate(this.n, ambulanceTests.length + 1, 0, 0);
          accPercent += result.estadisticas.noWait / result.estadisticas.pacientes;
          accPacientes += result.estadisticas.pacientes;
          accNoWait += result.estadisticas.noWait;
          accTime += result.estadisticas.tiempoTotal;
        }

        ambulanceTests.push({
          "tiempoTotal": accTime,
          "pacientes": accPacientes,
          "noWait": accNoWait,
          "ambulancias": ambulanceTests.length + 1,
          "r": accPercent / this.iterations
        });
      } while (ambulanceTests[ambulanceTests.length - 1].r < 1);

      this.calcR = ambulanceTests;
    }
  },
  filters: {
    round: function(value) {
      return value.toPrecision(4);
    },
    getTime: function(value) {
        var m = "" + Math.floor(value % 60);
        if (m.length == 1) {
            m = "0" + m;
        }
        return Math.floor(value / 60) + ":" + m;
    },
    percent: function(value) {
        return (Math.round(value * 1000000)/10000) + "%";
    }
  },
  components: {
    // eslint-disable-next-line
    DataBox
  }
}
</script>

<style>
@import url('../../../assets/Science/science-table.css');
.rkButton {
  border: 0;
  border-radius: 4px;
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 3px 8px;
  height: 100%;
}
.data-container.rungeKutta {
  background-color: #d38900;
  position: absolute;
  width: 50%;
  left: 25%;
  box-shadow: 1px 1px 50px -1px rgba(0,0,0,0.75);
}
.data-container.rungeKutta tr th {
  background-color: #96660e;
}
.data-container.rungeKutta .data-foot {
  background-color: #96660e;
}
.data-container.rungeKutta tr td {
  background-color: rgb(226, 151, 12);
}
</style>
