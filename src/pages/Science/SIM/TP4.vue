<template>
  <div>
    <UTNNavBar :data="contactInfo"></UTNNavBar>

    <div class="cmb">
      <label for="politica"><b>Politica: </b></label>
      <select name="politica" id="politica" @input="updateValues()">
        <option value="a">Politica A</option>
        <option value="b">Politica B</option>
      </select>
    </div>
    <div class="linea_texts">
      <label for="n">Cantidad a simular:</label>
      <input type="text" name="n" id="n" placeholder="25" @input="updateValues()">
      <label for="from">Mostrar:</label>
      <input type="text" name="from" id="from" placeholder="1" @input="updateValues()">
      <label for="to">-</label>
      <input type="text" name="to" id="to" placeholder="100" @input="updateValues()">
    </div>
    <div>
      Costo Total: {{ totalCost }}<br>
      Promedio: {{ avgCost }}<br>
      Demanda Total: {{ totalDemand }}
    </div>

    <div class="data-container values">
        <table class="data-table">
          <tr>
            <th>Dia</th>
            <th>RND Demanda</th>
            <th>RND Delay</th>
            <th>Stock</th>
            <th>Demanda</th>
            <th>Proximo restock</th>
            <th>Restock</th>
            <th>Costo Stockout</th>
            <th>Costo restock</th>
            <th>Costo Almacenamiento</th>
            <th>Costo Total</th>
          </tr>
          <tr v-for="result in this.results" :key="result.period">
            <td class="data-table-cell">{{ result.period }}</td>
            <td class="data-table-cell">{{ result.rndDemand | round }}</td>
            <td class="data-table-cell">{{ result.rndDelay | round }}</td>
            <td class="data-table-cell">{{ result.stock }}</td>
            <td class="data-table-cell">{{ result.demand }}</td>
            <td class="data-table-cell">{{ result.nextArrival }}</td>
            <td class="data-table-cell">{{ result.arrival }}</td>
            <td class="data-table-cell">{{ result.stockoutCost }}</td>
            <td class="data-table-cell">{{ result.orderCost }}</td>
            <td class="data-table-cell">{{ result.storageCost }}</td>
            <td class="data-table-cell">{{ result.periodCost }}</td>
          </tr>
          <tr>
            <td class="data-foot" colspan="11">-</td>
          </tr>
        </table>
      </div>

  </div>
</template>

<script>
// eslint-disable-next-line
import { ejercicioA, ejercicioB, _simulate, _setFromTo, _setDays } from '../../../assets/Science/MonteCarlo/tp4.js';
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
    n: 25,
    from: 10,
    to: 100,
    results: [],
    totalCost: "-",
    avgCost: "-",
    totalDemand: "-"
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    $('footer').css("display", "none");
  },
  methods: {
      updateValues() {
        if ($("#n").val() != "") { this.n = parseInt($("#n").val()); } else { this.n = 25; }
        if ($("#from").val() != "") { this.from = parseInt($("#from").val()); } else { this.from = 1; }
        if ($("#to").val() != "") { this.to = parseInt($("#to").val()); } else { this.to = 100; }

        switch ($("#politica").val()) {
          case "a": ejercicioA(); break;
          case "b": ejercicioB(); break;
        }

        _setFromTo(this.from, this.to);
        _setDays(this.n);
        var result = _simulate();
        this.results = result.savedRows;
        this.totalCost = result.stats.totalCost;
        this.totalDemand = result.stats.totalDemand;
        this.avgCost = result.stats.average;
      }
  },
  filters: {
    round: function(value) {
      return value.toPrecision(4);
    }
  }
}
</script>

<style scoped>
@import url('../../../assets/Science/science-table.css');

</style>
