<template>
  <div>
    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="linea_texts">
      <label for="n">Cantidad a simular:</label>
      <input type="text" name="n" id="n" placeholder="25" @input="updateValues()">
      <label for="from">Mostrar:</label>
      <input type="text" name="from" id="from" placeholder="1" @input="updateValues()">
      <label for="to">-</label>
      <input type="text" name="to" id="to" placeholder="100" @input="updateValues()">
    </div>
    <div style="display: flex;align-items: center;justify-content: center;">
        <table>
            <tr><td style="text-align:right"><b>Cantidad Equipos Basket:</b></td><td style="text-align:left"> {{ stats.cantEquBasket }}<br></td></tr>
            <tr><td style="text-align:right"><b>Cantidad Equipos Futbol:</b></td><td style="text-align:left"> {{ stats.cantEquFutbol }}<br></td></tr>
            <tr><td style="text-align:right"><b>Cantidad Equipos Handball:</b></td><td style="text-align:left"> {{ stats.cantEquHandball }}<br></td></tr>
            <tr><td style="text-align:right"><b>Porcentaje de tiempo en reacondicionamiento:</b></td><td style="text-align:left"> {{ ((stats.cantReacondicionamientos * 10) / stats.tiempoTotal) | percent }}<br></td></tr>
        </table>
        <table>
            <tr><td style="text-align:right"><b>Tiempo Espera Promedio Basket:</b></td><td style="text-align:left"> {{ (stats.tiempoEsperaTotalBasket / stats.cantEquBasket) | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo Espera Promedio Futbol:</b></td><td style="text-align:left"> {{ (stats.tiempoEsperaTotalFutbol / stats.cantEquFutbol) | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo Espera Promedio Handball:</b></td> <td style="text-align:left">{{ (stats.tiempoEsperaTotalHandball / stats.cantEquHandball) | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo Libre:</b></td><td style="text-align:left"> {{ stats.tiempoLibreServidor | getTime }}<br></td></tr>
            <tr><td style="text-align:right"><b>Tiempo Total dos basket:</b></td><td style="text-align:left"> {{ stats.tiempoTotalDuoBasket | getTime }}<br></td></tr>
        </table>
    </div>

    <div class="data-container values">
        <table class="data-table">
          <tr>
            <th>#</th>
            <th>Reloj</th>
            <th>Evento</th>
            <th>Estado cancha</th>
            <th>Estado subcancha</th>
            <th>Cola</th>
            <th>Jugando</th>
            <th>Jugando subcancha</th>
            <th>Demora Futbol</th>
            <th>Proxima llegada Futbol</th>
            <th>Demora Handball</th>
            <th>Proxima llegada Handball</th>
            <th>Demora Basket</th>
            <th>Proxima llegada Basket</th>
          </tr>
          <tr v-for="result in this.results" :key="result.I">
            <td class="data-table-cell">{{ result.I }}</td>
            <td class="data-table-cell">{{ result.clock | getTime }}</td>
            <td class="data-table-cell">{{ result.evento }}</td>
            <td class="data-table-cell" @click="showDetailedData(0, result.server)">{{ result.server.estado }}</td>
            <td class="data-table-cell" @click="showDetailedData(1, result.subserver)">{{ result.subserver.estado }}</td>
            <td class="data-table-cell" @click="showDetailedData(2, result.cola)">{{ result.cola.length }}</td>
            <td class="data-table-cell" @click="showDetailedData(3, result.jugando)">{{ result.jugando == null ? "" : result.jugando.name }}</td>
            <td class="data-table-cell" @click="showDetailedData(4, result.jugando2)">{{ result.jugando2 == null ? "" : result.jugando2.name }}</td>
            <td class="data-table-cell">{{ result.delayFutbol | getTime }}</td>
            <td class="data-table-cell">{{ result.nextFutbol | getTime }}</td>
            <td class="data-table-cell">{{ result.delayHandball | getTime }}</td>
            <td class="data-table-cell">{{ result.nextHandball | getTime }}</td>
            <td class="data-table-cell">{{ result.delayBasket | getTime }}</td>
            <td class="data-table-cell">{{ result.nextBasket | getTime }}</td>
          </tr>
          <tr>
            <td class="data-foot" colspan="14">-</td>
          </tr>
        </table>
      </div>

      <DataBox ref="dataBox"></DataBox>
  </div>
</template>

<script>
import DataBox from './DataBox.vue';
// eslint-disable-next-line
import { simulate } from '../../../assets/Science/Queue/TP5.js';
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
      }
    ],
    n: 25,
    from: 10,
    to: 100,
    results: [],
    stats: {}
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");
    this.updateValues();
  },
  methods: {
      updateValues() {
        if ($("#n").val() != "") { this.n = parseInt($("#n").val()); } else { this.n = 25; }
        if ($("#from").val() != "") { this.from = parseInt($("#from").val()); } else { this.from = 1; }
        if ($("#to").val() != "") { this.to = parseInt($("#to").val()); } else { this.to = 100; }

        var result = simulate(this.n, this.from, this.to);
        this.results = result.log;
        this.stats = result.estadisticas;

        console.log(result);
      },
      showDetailedData(mode, data) {
        var newText = [];

        switch (mode) {
          case 0: // Server
          case 1: // Subserver
            if (data.cliente != null) {
              newText.push("Tiempo juego: " + this.$options.filters.getTime(data.cliente.tiempoJuego));
            }
            newText.push("Tiempo desocupacion: " + this.$options.filters.getTime(data.tiempoDesocupacion));
            break;
          case 2: // Cola
            for (var i = 0; i < data.length; i++) {
              newText.push(i + " - " + data[i].name);
            }
            break;
          case 3:
          case 4:
            newText.push("Tiempo creacion: " + this.$options.filters.getTime(data.tiempoCreacion));
            newText.push("Tiempo comienzo juego: " + this.$options.filters.getTime(data.tiempoJuego));
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
        return (Math.round(value * 10000)/100) + "%";
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
</style>
