<template>
<div>
  <div style="background: rgba(0, 0, 0, 0) linear-gradient(95deg, rgb(234, 234, 234) 20%, rgba(24, 26, 27, 0) 60%) repeat scroll 0% 0%;">
    <div style="display:flex; padding-left:10px;">
      <img src="https://cdn.worldvectorlogo.com/logos/utn-2.svg" alt="UTN FRC Logo" style="width:80px;">
      <span class="LogoWords">UTN</span>
    </div>
  </div>
  <div style="padding-left:8px; padding-right:8px;">
    <div class="ButtonPanel">
      <button class="PanelButton">{{ buttons.Graph }}</button>
      <button class="PanelButton">{{ buttons.Theory }}</button>
      <button class="PanelButton">{{ buttons.Info }}</button>
    </div>
    <div class="MainPanel">
      <div class="Graph" id="Graph">
        <svg width="100%" height="100%" id="SVG">
          <polyline points="0,0 0,0" style="stroke:black;stroke-width:2;" id="baseLine" />
          <path class="signalLine" fill="none" stroke="red" d="" id="signalLine" />
        </svg>
      </div>
      <div class="CommandPanel">
        <div>
          {{ buttons.InputCode }}
        </div>
        <div>
          <input type="text" class="BinaryInput" id="BinaryInput" @input="updateBinary()" value="0110">
          <input type="range" class="AmplitudeInput" id="AmplitudeInput" @input="updateAmplitude()" min="-50" max="50" value="50">
        </div>
        <div>
          <select name="Modulation" id="EncodingInput" @input="updateEncoding()">
            <option value="ASK">ASK (Amplitud)</option>
            <option value="FSK">FSK (Amplitud)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import { setUp, updateCode, updateAmplitude, updateEncoding } from '../../js/EncodingsGraph.js'

export default {
    name:"Graficadora",
    data: () => ({
      language: "es",
      buttons: {
        "Graph": "Graficadora",
        "Theory": "Marco Teorico",
        "Info": "Información/Contacto",
        "InputCode": "Codigo Binario:"
      }
    }),
    mounted() {
      $('.bg-blgnavbar').css("display","none");
      setUp($('#Graph').width(), $('#Graph').height(), $('#baseLine')[0], document.getElementById("signalLine"), "0110", "ASK", document.getElementById("SVG"));
      this.updateBinary();
    },
    methods: {
      updateBinary() {
        var r = new RegExp("^[01]*$");
        var binary = $('#BinaryInput').val();

        if (binary == "" || !r.test(binary))
          return;

        updateCode(binary);
      },
      updateAmplitude() {
        var p = $('#AmplitudeInput').val() / 100.0;
        updateAmplitude($('#Graph').height() * p);
      },
      updateEncoding() {
        var p = $('#EncodingInput').val();
        updateEncoding(p);
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
.MainPanel {
  display: flex;
  width: 100%;
  height: 70vh;
  padding: 8px;
  border-radius: 1.4rem;
  background-color: #2c2b2d;
}
.Graph {
  background-color: #d2d5d6;
  height: 100%;
  width: 75%;
  border-radius: 1.5rem;
}
.CommandPanel {
  text-align: left;
  font-size: 1.3rem;
  margin-left: 8px;
  width:25%;
}
.BinaryInput {
  color: whitesmoke;
  border-radius: 0.4rem;
  background-color: #bd1353;
  width: 100%;
  padding-left: 5px;
  border: 0;
}
#EncodingInput {
  background-color: #bd1353;
  color: whitesmoke;
  border: 0;
  border-radius: 0.4rem;
  margin-top: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: left;
  width: 100%;
}
.signalLine {
  transition: 0.5s;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');
</style> 
