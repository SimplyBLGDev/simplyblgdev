<template>
  <div>
    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="linea_texts">
      <label for="n">Pasos a simular:</label>
      <input type="text" name="n" id="n" placeholder="600" @input="updateValues()">
      <label for="from">Mostrar desde paso:</label>
      <input type="text" name="from" id="from" placeholder="0" @input="updateValues()">
      <label for="to">por</label>
      <input type="text" name="to" id="to" placeholder="30" @input="updateValues()">
      <label>pasos.</label>
    </div>
    <div class="linea_texts" style="background-color: #C01111; padding: 5px; margin: 1.5rem 0" v-if="warnings.length > 0">
      <b v-for="(warning, index) in warnings" :key="index">{{ warning }}</b>
    </div>

    <div style="display: flex;align-items: center;justify-content: center;">
        <table>
            <tr><td style="text-align:right"><b>Tiempo total:</b></td><td style="text-align:left"> {{ stats.tiempoTotal | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Total clientes:</b></td><td style="text-align:left"> {{ stats.clientes }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo promedio atencion:</b></td><td style="text-align:left"> {{ (stats.tiempoClientesTotal / stats.clientes) | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo promedio atencion factura no vencida:</b></td><td style="text-align:left"> {{ (stats.tiempoClientesNoVencidaTotal / stats.clientesNoVencida) | getTime}}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo promedio atencion sin pago:</b></td><td style="text-align:left"> {{ (stats.tiempoClientesNoPaganTotal / stats.clientesNoPagan) | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo promedio atencion pago y actualizacion:</b></td><td style="text-align:left"> {{ (stats.tiempoClientesFullServiceTotal / stats.clientesFullService) | getTime }}<br></td></tr>
        </table>
    </div>

    <div class="data-container values">
      <table class="data-table">
        <tr>
          <th>#</th>
          <th>Reloj</th>
          <th>Evento</th>
          <th>Cola pago</th>
          <th>Cola actualizacion</th>
          <th>Ventanillas Libres</th>
          <th>Cajas Libres</th>
        </tr>
        <tr v-for="result in this.results" :key="result.I">
          <td class="data-table-cell" @click="showDetailedData(1, [result.clientes, result.tClientes, result.clientesNV, result.tClientesNV, result.clientesNP, result.tClientesNP, result.clientesFS, result.tClientesFS, result.proxPaciente])">{{ result.I }}</td>
          <td class="data-table-cell">{{ result.clock | getTime }}</td>
          <td class="data-table-cell" @click="showDetailedData(0, result.servers)">{{ result.evento }}</td>
          <td class="data-table-cell" @click="showDetailedData(2, result.cola)">{{ result.cola.length }}</td>
          <td class="data-table-cell" @click="showDetailedData(2, result.colaActualizacion)">{{ result.colaActualizacion.length }}</td>
          <td class="data-table-cell">{{ result.ventanillasLibres }}</td>
          <td class="data-table-cell">{{ result.cajasLibres }}</td>
        </tr>
        <tr>
          <td class="data-foot" colspan="7">-</td>
        </tr>
      </table>
    </div>

      <DataBox ref="dataBox"></DataBox>
  </div>
</template>

<script>
import DataBox from './DataBox.vue';
import { simulate } from '../../../assets/Science/Queue/TPF2.js';
import $ from 'jquery';

export default {
  data: () => ({
    contactInfo: [
      {
        "name": "Logares Fabricio",
        "no": "78799",
        "mail": "fabrilogares@gmail.com"
      }
    ],
    n: 600,
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
      if ($("#iterations").val() != "") { this.iterations = parseInt($("#iterations").val()); } else { this.iterations = 100; }
      if ($("#from").val() != "") { this.from = parseInt($("#from").val()); } else { this.from = 0; }
      if ($("#to").val() != "") { this.to = parseInt($("#to").val()); } else { this.to = 30; }

      this.updateWarnings();

      var result = simulate(this.n, this.from, this.to);
      this.results = result.log;
      this.stats = result.estadisticas;
      console.log(result);
    },
    updateWarnings() {
      this.warnings = [];

      if (this.from < 0) {
        this.from = 0;
        this.warnings.push("El primer evento a mostrar no puede ser menor a 0.");
      }
      if (this.to < 0) {
        this.to = 0;
        this.warnings.push("No se pueden mostrar menos de 0 iteraciones a partir del inicio.");
      }
      if (this.n < 0) {
        this.n = 0;
        this.warnings.push("No se puede simular menos de 0 pasos.");
      }
    },
    showDetailedData(mode, data) {
      var newText = [];

      switch (mode) {
        case 0: // Estados
          for (var i = 0; i < data.length; i++) {
            if (data[i].estado == "ocupado") {
              newText.push(data[i].id + " - " + data[i].estado + ": " + this.$options.filters.getTime(data[i].tDesocupacion));
            } else {
              newText.push(data[i].id + " - " + data[i].estado);
            }
          }
          break;
        case 1: // #
          newText.push(" - Totales parciales - ");
          newText.push("Todos: " + data[0]);
          newText.push("Factura no vencida: " + data[2]);
          newText.push("Sin pagar: " + data[4]);
          newText.push("Full service: " + data[6]);
          newText.push(" - Tiempos acumulados parciales - ");
          newText.push("Todos: " + this.$options.filters.getTime(data[1]));
          newText.push("Factura no vencida: " + this.$options.filters.getTime(data[3]));
          newText.push("Sin pagar: " + this.$options.filters.getTime(data[5]));
          newText.push("Full service: " + this.$options.filters.getTime(data[7]));
          newText.push(" - Tiempo de llegada del proximo paciente - ");
          newText.push(this.$options.filters.getTime(data[8].tiempo));
          break;
        case 2: // Cola
          for (var j = 0; j < data.length; j++) {
            newText.push("Cliente " + (j + 1) + " - " + this.$options.filters.getTime(data[j]));
          }
          break;
      }

      this.$refs.dataBox.$props.text = newText;
      event.target.appendChild(this.$refs.dataBox.$el);
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
