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
    <div class="ButtonPanel">
      <button class="PanelButton" onclick="window.location.href='/Graficadora';">Graficadora</button>
      <button class="PanelButton" onclick="window.location.href='/Documents/Marco_Teorico_Graficadora.pdf';">Marco teorico</button>
      <button class="PanelButton" onclick="window.location.href='/Graficadora/Informacion';">Información</button>
    </div>
  </div>

  <div class="MainPanel">
    <div class="insetBox" id="Graph">
      <svg width="100%" height="100%" id="SVG">
        <polyline points="0,0 0,0" style="stroke:black;stroke-width:2;" id="baseLine" />
        <path class="signalLine" fill="none" stroke="red" d="" id="signalLine" />
        <polyline points="0,0 0,0" style="stoke:black;stroke-width:2;" id="bitLine" />
      </svg>
    </div>
    <div class="CommandPanel">
      <div>
        {{ buttons.InputCode }}
        <input type="text" class="BinaryInput" id="BinaryInput" @input="updateBinary()" value="0110">
        Amplitud onda portadora:
        <input type="range" class="AmplitudeInput" id="AmplitudeInput" @input="updateAmplitude()" min="-45" max="45" value="45">
        Modulacion:
        <select name="Modulation" id="EncodingInput" @input="updateEncoding()">
          <option value="ASK">ASK (Amplitud)</option>
          <option value="FSK">FSK (Frecuencia)</option>
          <option value="BPSK">BPSK (Fase)</option>
          <option value="4QAM">4QAM (Amplitud/Fase)</option>
          <option value="8QAM">8QAM (Amplitud/Fase)</option>
        </select>
        Frecuencia onda portadora:
        <input type="range" class="FrequencyInput" id="FrequencyInput" @input="updateFrequency()" min="1" max="5" value="1">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import { setUp, updateCode, updateAmplitude, updateEncoding, updateFrequency } from '../../js/EncodingsGraph.js'

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
      $('footer').css("display", "none");
      setUp($('#Graph').width(), $('#Graph').height(), $('#baseLine')[0], document.getElementById("signalLine"), document.getElementById("bitLine"),
      "0110", "ASK", 1, document.getElementById("SVG"));
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
      },
      updateFrequency() {
        var p = $('#FrequencyInput').val();
        updateFrequency(p);
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
  background-color: #2c2b2d00;
}
.Graph {
  background-color: #d2d5d6;
  height: 100%;
  width: 75%;
  border-radius: 1.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
  background-color: #5b069c;
  width: 100%;
  padding-left: 5px;
  border: 0;
}
#EncodingInput {
  background-color: #5b069c;
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
.insetBox {
  -webkit-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  -moz-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  padding: 10px;
  margin: 10px;
  background-color: #d8dfe1;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');
</style> 
