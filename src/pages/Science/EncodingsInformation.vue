<template>
<div>
    <div>
    <div style="background: rgba(0, 0, 0, 0) linear-gradient(95deg, rgb(234, 234, 234) 20%, rgba(24, 26, 27, 0) 60%) repeat scroll 0% 0%;">
    <div style="display:flex; padding-left:10px;">
      <img src="https://cdn.worldvectorlogo.com/logos/utn-2.svg" alt="UTN FRC Logo" style="width:80px;">
      <span class="LogoWords">UTN</span>
    </div>
  </div>
  </div>
  <div style="padding-left:8px; padding-right:8px;">
    <div class="ButtonPanel">
      <button class="PanelButton" onclick="window.location.href='/Graficadora';">Graficadora</button>
      <button class="PanelButton" onclick="window.location.href='/Documents/Marco_Teorico_Graficadora.pdf';">Marco teorico</button>
      <button class="PanelButton" onclick="window.location.href='/Graficadora/Informacion';">Información</button>
    </div>
  </div>
  <h1>Proyecto: Modulador Digital</h1>
  <li>
    <ul>ASK (Modulación por conmutación de Amplitud)</ul>
    <ul>FSK (Modulación por conmutación de Frecuencia)</ul>
    <ul>BPSK (Modulación por conmutacion de Fase)</ul>
    <ul>QAM (Modulación por combinación de Fase y Amplitud) (Y sus variantes)</ul>
  </li>
  <table>
    <tr>
      <td>Nombre</td>
      <td>Apellido</td>
      <td>DNI</td>
      <td>Legajo</td>
      <td>Correo Electrónico</td>
      <td>Teléfono</td>
    </tr>
    <tr>
      <td>Maximiliano</td>
      <td>Saleh</td>
      <td>42107152</td>
      <td>78798</td>
      <td><a href="mailto:maxisaleh@outlook.com">maxisaleh@outlook.com</a></td>
      <td>+54 9 351 394 9988</td>
    </tr>
    <tr>
      <td>Fabricio Andres</td>
      <td>Logares Avilés</td>
      <td>42474766</td>
      <td>78799</td>
      <td><a href="mailto:fabrilogares@gmail.com">fabrilogares@gmail.com</a></td>
      <td>+54 9 351 625 7124</td>
    </tr>
  </table>
</div>
</template>

<script>
import $ from 'jquery'

export default {
    name:"Graficadora",
    mounted() {
      $('.bg-blgnavbar').css("display","none");
      $('footer').css("display", "none");
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
  margin-left: 1.1rem;
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
</style>
