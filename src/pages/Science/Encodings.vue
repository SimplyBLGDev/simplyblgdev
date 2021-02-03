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

  <div class="MainPanel">
    <div class="insetBox Graph" id="Graph">
      <svg width="100%" height="100%" id="SVG" @mousemove="graphMouseMove" @mouseleave="graphMouseLeave">
        <polyline points="0,0 0,0" style="stroke:black;stroke-width:2;" id="baseLine" />
        <path class="signalLine" fill="none" stroke="red" d="" id="signalLine" />
        <polyline points="0,0 0,0" style="stoke:black;stroke-width:2;" id="bitLine" />
        <rect width=0 height=0 id="graphHighlightRect" />
      </svg>
    </div>
    <div class="leftPanel">
      <div class="CommandPanel">
        {{ content.LblInputCode }}
        <input type="text" class="BinaryInput" id="BinaryInput" @input="updateBinary()" value="0110">
        {{ content.LblAmplitude }}
        <div>
          -5V
          <input type="range" class="AmplitudeInput" id="AmplitudeInput" @input="updateAmplitude()" min="-45" max="45" value="45">
          5V
        </div>
        {{ content.LblModulation }}
        <select name="Modulation" id="EncodingInput" @input="updateEncoding()">
          <option value="ASK">ASK (Amplitud)</option>
          <option value="FSK">FSK (Frecuencia)</option>
          <option value="BPSK">BPSK (Fase)</option>
          <option value="4QAM">4QAM (Amplitud/Fase)</option>
          <option value="8QAM">8QAM (Amplitud/Fase)</option>
        </select>
        {{ content.LblFrequency }}
        <div>
          1MHz
          <input type="range" class="FrequencyInput" id="FrequencyInput" @input="updateFrequency()" min="1" max="5" value="1">
          5MHz
        </div>
      </div>
      <div class="ConstellationPanel">
        <div class="insetBox" style="width:100%;" id="Constellation">
          <svg id="constSVG" width="100%" height="100%">
            <polyline points="0,0 0,0" style="stroke:black;stroke-width:2;" id="constHAxis" />
            <polyline points="0,0 0,0" style="stroke:black;stroke-width:2;" id="constVAxis" />
          </svg>
        </div>
      </div>
      {{ content.LblFrequencySpectrum }}
      <div class="FrequencySpectrumPanel">
        <div class="insetBox" style="width:100%;" id="FrequencySpectrum">
          <div class="FrequencySpectrumFloatingText">
            <p id="leftStopText" style="block-size:inherit;">-</p>
            <p id="rightStopText">-</p>
          </div>
          <svg width="100%" height="100%" id="frequencySpecSVG">
            <path class="frequencySpectrumLine" fill="#0000aa38" stroke="blue" style="stroke-width:4;" d="" id="frequencySpectrumLine" />
            <polyline points="0,0 0,0" style="stroke:red;stroke-width:4;" id="bandwidthLeftStop" />
            <polyline points="0,0 0,0" style="stroke:red;stroke-width:4;" id="bandwidthRightStop" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import { setUp, updateCode, updateAmplitude, updateEncoding, updateFrequency, graphOnMouseHover } from '../../js/EncodingsGraph.js'
import { constSetUp, constDrawPoints, highlightPoint } from '../../js/ConstellationsGraph.js'
import { setUpFrequencySpectrum, updateFrequencySpectrum, updateFrequencySpectrumsFrequency, setFrequencyDigits } from '../../js/FrequencySpectrumGraph.js'

export default {
    name:"Graficadora",
    data: () => ({
      language: "es",
      text: {
        "es": {
          "BtnGraph":             "Graficadora",
          "BtnTheory":            "Marco Teorico",
          "BtnInfo":              "Información",
          "LblInputCode":         "Codigo Binario: ",
          "LblAmplitude":         "Amplitud onda portadora: ",
          "LblModulation":        "Modulacion: ",
          "LblFrequency":         "Frecuencia onda portadora: ",
          "LblFrequencySpectrum": "Espectro de frecuencia"
        },
        "en": {
          "BtnGraph":             "Graphing Tool",
          "BtnTheory":            "Theory",
          "BtnInfo":              "About",
          "LblInputCode":         "Digital Signal ",
          "LblAmplitude":         "Carrier wave amplitude: ",
          "LblModulation":        "Keying method: ",
          "LblFrequency":         "Carrier wave frequency: ",
          "LblFrequencySpectrum": "Frequency Spectrum"
        }
      }
    }),
    mounted() {
      $('.bg-blgnavbar').css("display","none");
      $('footer').css("display", "none");

      setUp($('#Graph').width(), $('#Graph').height(), $('#baseLine')[0], document.getElementById("signalLine"), document.getElementById("bitLine"),
      "0110", "ASK", 1, document.getElementById("graphHighlightRect"), document.getElementById("SVG"));

      constSetUp($('#Constellation').width(), $('#Constellation').height(), document.getElementById("constHAxis"), document.getElementById("constVAxis"), document.getElementById("constSVG"));
      $('#Constellation').css("display", "none");

      setUpFrequencySpectrum($('#FrequencySpectrum').width(), $('#FrequencySpectrum').height(), document.getElementById("bandwidthLeftStop"), document.getElementById("bandwidthRightStop"),
      $("#leftStopText"), $("#rightStopText"), document.getElementById("frequencySpectrumLine"), "ASK", document.getElementById("frequencySpecSVG"));

      setFrequencyDigits('0MHz', '2MHz');
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

        if (p == "4QAM" || p == "8QAM") {
          $('#Constellation').css("display", "block");
          
          var bits = 2;
          if (p == "8QAM")
            bits = 3;

          constDrawPoints(bits);
        } else
          $('#Constellation').css("display", "none");
        
        updateFrequencySpectrum(p);
        this.updateFrequencySpectrumsDigits();
      },
      updateFrequency() {
        var p = $('#FrequencyInput').val();
        updateFrequency(p);
        updateFrequencySpectrumsFrequency(p);

        this.updateFrequencySpectrumsDigits();
      },
      updateFrequencySpectrumsDigits() {
        var p = parseInt($('#FrequencyInput').val());

        if ($('#EncodingInput').val() == "FSK")
          setFrequencyDigits((p-1) + 'MHz', (parseInt(p)+4) + 'MHz');
        else
          setFrequencyDigits((p-1) + 'MHz', (parseInt(p)+1) + 'MHz');
      },
      graphMouseMove() {
        var e = window.event;
        $("#graphHighlightRect").css('opacity', '0.28125');
        var bitToHighlight = graphOnMouseHover(e.x, e.y);
        
        var p = $('#EncodingInput').val();
        if (p == "4QAM" || p == "8QAM") {
          highlightPoint(bitToHighlight);
        }
      },
      graphMouseLeave() {
        $("#graphHighlightRect").css('opacity', '0');
        highlightPoint(-1);
      },
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

.MainPanel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  padding: 0px;
  border-radius: 1.4rem;
  background-color: #2c2b2d00;
}
.leftPanel {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ConstellationPanel {
  display: flex;
  width: 100%;
}
.FrequencySpectrumPanel {
  display: flex;
  width: 100%;
}
.Graph {
  background-color: #d2d5d6;
  height: 100%;
  min-height: 45vh;
  width: max-content;
  border-radius: 1.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.CommandPanel {
  text-align: left;
  font-size: 1.3rem;
  padding: 8px;
  width:100%;
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
  padding: 2px;
  margin: 2px;
  background-color: #d8dfe1;
}
#graphHighlightRect {
  opacity: 0.28125;
  fill: #323aa8;
  transition: all 0.19s cubic-bezier(.22,.61,.36,1);
}
.FrequencySpectrumFloatingText {
  position:relative;
  width: 0;
  height: 0;
}
.FrequencySpectrumFloatingText * {
  position: relative;
  font-weight: bold;
  top:0;
  left:0;
  width: min-content;
  margin-top: 0;
  margin-bottom: 0;
  color:black;
}
.desktopOnly {
  display: none;
}
.mobileOnly {
  display:flex;
}

@media only screen and (min-width: 610px) {
  .MainPanel {
    flex-direction: row;
    padding: 8px;
  }
  .Graph {
    width: 70%;
    height: 100%;
  }
  .insetBox {
    padding: 10px;
    margin: 10px;
  }
  .leftPanel {
    width: 30%;
  }
  .desktopOnly {
    display: block;
  }
  .mobileOnly {
    display:none;
  }
  .ButtonPanel {
    margin-left: 1.1rem;
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');
.highlightedPoint {
  fill: red !important;
  stroke: black !important;
  stroke-width: 2px;
}
.constellationPoint {
  fill: black;
  stroke: red;
  stroke-width: 2px;
  transition: all 0.19s cubic-bezier(.22,.61,.36,1);
}
</style> 
