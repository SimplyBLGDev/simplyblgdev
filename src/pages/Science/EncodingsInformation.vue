<template>
<div>
  <div>
    <div style="background: rgba(0, 0, 0, 0) linear-gradient(-105deg, rgb(234, 234, 234) 20%, rgba(24, 26, 27, 0) 60%) repeat scroll 0% 0%;">
      <div style="display:flex; padding-left:10px;">
        <img src="../../assets/UTN Logo.png" alt="UTN FRC Logo" style="width:20%; margin:8px;">
      </div>
    </div>
  </div>
  <div style="padding-left:8px; padding-right:8px;">
    <div class="mobileOnly" style="justify-content:center;align-items:center;width:100%;margin-top:0.5rem;margin-bottom:0.5rem;">
      <div>
        <img src="../../assets/arrow.svg" alt="" style="border-radius:0; margin-bottom:5px">
        <div class="trans lan-flags" v-bind:class="{ spanish: (language==='es') }">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/gb.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language==='es') }" @click="language='en'">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/es.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language!=='es') }" @click="language='es'">
        </div>
      </div>
    </div>
    <div class="ButtonPanel">
      <button class="PanelButton" onclick="window.location.href='/Graficadora';">{{ content.BtnGraph }}</button>
      <button class="PanelButton" v-on:click="openTheory">{{ content.BtnTheory }}</button>
      <button class="PanelButton" onclick="window.location.href='/Graficadora/Informacion';">{{ content.BtnInfo }}</button>
      <div class="desktopOnly" style="position:absolute; right: 50px">
        <img src="../../assets/arrow.svg" alt="" style="border-radius:0; margin-bottom:5px">
        <div class="trans lan-flags" v-bind:class="{ spanish: (language==='es') }">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/gb.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language==='es') }" @click="language='en'">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/es.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language!=='es') }" @click="language='es'">
        </div>
      </div>
    </div>
  </div>
  
  <h1>{{ content.Title }}</h1>
  <li>
    <ul>{{ content.c1 }}</ul>
    <ul>{{ content.c2 }}</ul>
    <ul>{{ content.c3 }}</ul>
    <ul>{{ content.c4 }}</ul>
  </li>
  <table>
    <tr>
      <td>{{ content.table.Name }}</td>
      <td>{{ content.table.Surname }}</td>
      <td>{{ content.table.FileNo }}</td>
      <td class="desktopOnlyTable">{{ content.table.Mail }}</td>
    </tr>
    <tr>
      <td>Maximiliano</td>
      <td>Saleh</td>
      <td>78798</td>
      <td class="desktopOnlyTable"><a href="mailto:maxisaleh@outlook.com">maxisaleh@outlook.com</a></td>
    </tr>
    <tr>
      <td>Abril</td>
      <td>Logares Avilés</td>
      <td>78799</td>
      <td class="desktopOnlyTable"><a href="mailto:abrillogares@gmail.com">abrillogares@gmail.com</a></td>
    </tr>
  </table>
</div>
</template>

<script>
import $ from 'jquery'

export default {
    name:"Graficadora",
    data: () => ({
      language: "es",
      text: {
        "es": {
          "BtnGraph":   "Graficadora",
          "BtnTheory":  "Marco Teorico",
          "BtnInfo":    "Contacto",
          "Title":      "Proyecto: Modulador Digital",
          "c1":         "ASK (Modulación por conmutación de Amplitud)",
          "c2":         "FSK (Modulación por conmutación de Frecuencia)",
          "c3":         "BPSK (Modulación por conmutacion de Fase)",
          "c4":         "QAM (Modulación por combinación de Fase y Amplitud) (Y sus variantes)",
          "table": {
            "Name":     "Nombre",
            "Surname":  "Apellido",
            "Mail":     "Correo Electronico",
            "FileNo":    "Legajo"
          }
        },
        "en": {
          "BtnGraph":   "Graphing Tool",
          "BtnTheory":  "Theory",
          "BtnInfo":    "About",
          "Title":      "Project: Signal Graphing Tool",
          "c1":         "ASK (Amplitude Shift-Keying)",
          "c2":         "FSK (Frequenct Shift-Keying)",
          "c3":         "BPSK (Binary Phase-Shift Keying)",
          "c4":         "QAM (Quadrature amplitude modulation)",
          "table": {
            "Name":     "Name",
            "Surname":  "Surname",
            "Mail":     "e-Mail",
            "FileNo":   "File#"
          }
        }
      }
    }),
    mounted() {
      $('.bg-blgnavbar').css("display","none");
      $('footer').css("display", "none");
    },
    methods: {
      openTheory() {
        if (this.language == "es")
          window.location.href='/Documents/Marco_Teorico_Graficadora.pdf';
        else if (this.language == "en")
          window.location.href='/Documents/Graphing_calculator_theory_en.pdf';
      }
    },
    computed: {
      content: function() {
        if (this.language == "es") {
          return this.text.es;
        }
        return this.text.en;
      } 
    }
}
</script>

<style scoped>
  .LogoWords {
  color: black;
  margin-left: 5px;
  font-size: 5rem;
  font-weight: bold;
}
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
.PanelButton:first-child {
  margin-left: 0;
}
.PanelButton:last-child {
  margin-right: 0;
}

  table {
    width: 100%;
  }
  tr:first-child {
    background-color: #1155CC;
    font-weight: bold;
    margin-left: 0;
    margin-right: 0;
  }
  tr {
    background-color: #434343;
  }
  a {
    color: #a8bde2;
  }
  .desktopOnly {
    display: none;
  }
  .mobileOnly {
    display:flex;
  }
  .desktopOnlyTable {
    display: none;
  }

  @media only screen and (min-width: 610px) {
  .desktopOnly {
    display: block;
  }
  .mobileOnly {
    display:none;
  }
  .desktopOnlyTable {
    display: revert;
  }
  .ButtonPanel {
    margin-left: 1.1rem;
  }
}
</style>
