<template>
  <div class="container-fluid w3-animate-opacity mainDiv">
    <div class=" w3-display-container insetBox titleCard" style="margin-left:0; margin-right:0; margin-top:0; height:100vh; display:flex;justify-content:center;align-items:center;">
      <div>
        <div class="title">{{ content["title"] }}</div>
        <div class="text-muted w3-animate-left" style="opacity: 0; animation-delay: 880ms; animation-fill-mode: forwards; animation-duration: 1200ms;">
          {{ content["subtitle"] }}
        </div>
      </div>
      <div style="position: absolute; bottom:10px;">
        <img src="../assets/arrow.svg" alt="" style="border-radius:0; margin-bottom:5px">
        <div class="trans lan-flags" v-bind:class="{ spanish: (language==='es') }">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/gb.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language==='es') }" @click="language='en'">
          <img src="https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.9/svg/es.svg" alt="GB" height="48px" v-bind:class="{ deactive: (language!=='es') }" @click="language='es'">
        </div>
      </div>
    </div>

    <div class="w3-display-container caseContainer" v-for="(display, index) in content.displays" :key="display.title">
      <div class="case year left" v-if="index % 2 === 0">
        {{ display.year }}
      </div>
      <div class="case insetBox">
        <template v-for="(row, rIx) in display.contents">
          <div class="caseDiv left" :style="{ '--rWidth': row.textWidth, 'padding-right': '1ch' }" :key="rIx+'text'" v-if="rIx % 2 === 0">
            <div>
              <template v-if="rIx === 0">
                <b class="case header study">{{ content["case-study"] }}</b>
                <img v-if="display['ribbons'].includes('HTML5')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonHTML.png" alt="HTML5" title="HTML 5">
                <img v-if="display['ribbons'].includes('CSS3')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSS.png" alt="CSS3" title="CSS 3">
                <img v-if="display['ribbons'].includes('JS')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonJS.png" alt="JS" title="Javascript">
                <img v-if="display['ribbons'].includes('Node.js')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonNode.png" alt="Node.js" title="Node JS">
                <img v-if="display['ribbons'].includes('Bootstrap')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonBootstrap.png" alt="Bootstrap" title="Bootstrap">
                <img v-if="display['ribbons'].includes('SQL')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonSQL.png" alt="SQL" title="SQL">
                <img v-if="display['ribbons'].includes('Vue.js')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonVue.png" alt="Vue.js" title="Vue JS">
                <img v-if="display['ribbons'].includes('C++')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCpp.png" alt="C++" title="C++">
                <img v-if="display['ribbons'].includes('C#')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSharp.png" alt="C#" title="C#">
                <img v-if="display['ribbons'].includes('Godot')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonGodot.png" alt="Godot" title="Godot Engine">
                <img v-if="display['ribbons'].includes('ASM')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonASM.png" alt="ASM" title="Intel 8080 Assembly Code">
                <img v-if="display['ribbons'].includes('Python')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonPython.png" alt="Python" title="Python">
                <img v-if="display['ribbons'].includes('Ghidra')" class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonGhidra.png" alt="Ghidra" title="Ghidra">
                <br>
                <b class="case header studyL">{{ content["case-study"] }}<br></b>
                <b class="case header">{{ display["title"] }}</b>
              </template>
              <div class="case body" v-for="p in row.text" :key="p" v-html="p"></div>
            </div>
          </div>
          <div class="caseDiv" :style="{ '--rWidth': row.contentWidth, 'position':'relative' }" :key="rIx+'content'">
            <template v-if="row.hContents === 0">
              <img src="../assets/Portfolio/PokeMap/aspectratio.png" alt="" style="width:100%">
              <img class="pokeImage" style="width:72%; position:absolute; left:17%" src="../assets/Portfolio/PokeMap/pokemonitor.png" alt="Monitor layout" title="Works in every monitor size!">
              <img class="pokeImage" style="width:56%; position:absolute; left:0; bottom:5%" src="../assets/Portfolio/PokeMap/pokesmall.png" alt="Small screen layout"  title="Works in every monitor size!">
              <img class="pokeImage" style="width:24%; position:absolute; right:0; bottom:0" src="../assets/Portfolio/PokeMap/pokephone.png" alt="Mobile layout" title="Even in mobile devices!">
            </template>
            <template v-else-if="row.hContents === 1">
              <img src="../assets/Portfolio/PokeMap/aspectratio.png" alt="" style="width:100%">
              <img class="pokeImage" style="width:72%; position:absolute; left:17%" src="../assets/Portfolio/PokeMap/pokemonitor.png" alt="Monitor layout" title="¡Funciona en cualquier tamaño de monitor!">
              <img class="pokeImage" style="width:56%; position:absolute; left:0; bottom:5%" src="../assets/Portfolio/PokeMap/pokesmall.png" alt="Small screen layout"  title="¡Funciona en cualquier tamaño de monitor!">
              <img class="pokeImage" style="width:24%; position:absolute; right:0; bottom:0" src="../assets/Portfolio/PokeMap/pokephone.png" alt="Mobile layout" title="¡Incluso en dispositivos mobiles!">
            </template>
            <template v-else-if="row.hContents === 2">
              <img src="../assets/Portfolio/NARNES/FFOld.png" alt="NARNES: Off" style="width:100%;">
              <img src="../assets/Portfolio/NARNES/FFNew.png" alt="NARNES: On" class="trans" v-bind:class="{ transparent: !narnesEnabled }" style="width:100%; position:absolute; left:0; top:0;">
              <div id="NARNESBtn" class="btn cBtn" v-bind:class="{ active: narnesEnabled, attention: !narnesNoticed }" @click="enableNARNES"><b>Activate NARNES</b></div>
            </template>
            <template v-else-if="row.hContents === 3">
              <img src="../assets/Portfolio/NARNES/FFOld.png" alt="NARNES: Off" style="width:100%;">
              <img src="../assets/Portfolio/NARNES/FFNew.png" alt="NARNES: On" class="trans" v-bind:class="{ transparent: !narnesEnabled }" style="width:100%; position:absolute; left:0; top:0;">
              <div id="NARNESBtn" class="btn cBtn" v-bind:class="{ active: narnesEnabled, attention: !narnesNoticed }" @click="enableNARNES"><b>Activar NARNES</b></div>
            </template>
            <template v-else-if="row.hContents === 4">
              <img src="../assets/Portfolio/NARNES/UI1.png" alt="NARNES GUI" style="width:100%;">
            </template>
            <template v-else-if="row.hContents === 5">
              <img src="../assets/Portfolio/NARL/A.png" width="100%" height="auto">
            </template>
            <template v-else-if="row.hContents === 6">
              <img src="../assets/Portfolio/NARL/B.png" width="100%" height="auto">
            </template>
            <template v-else-if="row.hContents === 7">
              <img src="../assets/Portfolio/PokeMap/aspectratio.png" alt="" style="width:100%">
              <img class="pokeImage" style="width:72%; position:absolute; left:17%" src="../assets/Portfolio/Decompilation/hex.png" alt="Hex code" title="Hexadecimal source code">
              <img class="pokeImage" style="width:56%; position:absolute; left:0; bottom:5%" src="../assets/Portfolio/Decompilation/Makefile.png" alt="Makefile script"  title="Makefile">
              <img class="pokeImage" style="width:55%; position:absolute; right:0; bottom:0" src="../assets/Portfolio/Decompilation/Defs.png" alt="Constant definitions" title="Constant Definitions">
            </template>
            <template v-else-if="row.hContents === 8">
              <img src="../assets/Portfolio/KK64.png" width="100%" height="auto">
            </template>
          </div>
          <div class="caseDiv left" :style="{ '--rWidth': row.textWidth, 'padding-left': '1ch' }" :key="rIx+'text'" v-if="rIx % 2 === 1">
            <div class="case body" v-for="p in row.text" :key="p" v-html="p"></div>
          </div>
        </template>
      </div>
      <div class="case year right" v-if="index % 2 === 1">
        {{ display.year }}
      </div>
    </div>
    
    <div class="case header" style="margin:0; margin-bottom:5px; margin-top:-5px;">{{ content.otherProjects }}</div>

    <div class="w3-display-container jamContainer">
      <div class="jamColumn" v-for="indexC in otherPsColumns" :key="indexC">
        <div v-for="(project, index) in otherPs" :key="project.title">
          <div class="jamCard" v-if="index % otherPsColumns === indexC-1">
            <img :src="project.preview" :alt="project.title + ' preview'" style="width:100%">
            <div style="position:relative">
                <div class="case header year">{{ project.year }}</div>
              </div>
            <div class="insetBox">
              <div class="case header">{{ project.title }}</div>
              <div class="case body" v-html="content.otherPs[index]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w3-display-container insetBox contactBox">
      <div class="case header">{{ content.contactMe }}</div>
      <div class="case body">{{ content.email }}<a href="mailto:abrillogares@gmail.com">abrillogares@gmail.com</a></div>
      <div class="case body">{{ content.git }} <a href="https://github.com/SimplyBLGDev">SimplyBLGDev</a></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import portfolioJSON from '../assets/Portfolio/portfolio.json'

export default {
  data: () => ({
    language:"en",
    narnesEnabled:false,
    narnesNoticed:false,
    otherPsColumns:3,
    otherPs:[
      {
        title:"Legend of Nowhere",
        year:"2017",
        preview:require('../assets/Portfolio/Jams/LegendOfNowhere.png'),
        description:"A small game made in <b>Unity, C#</b> by a team of 4 people in just 2 weeks for <b>Adventure Jam 2017</b>."
      },
      {
        title:"Simply's Cards",
        year:2020,
        preview:require('../assets/Portfolio/Jams/Cards.png'),
        description:"A cross-platform collection of card and board games made in <b>Godot game engine, GDScript</b>, available for <b>Windows</b>, <b>Linux</b> and <b>Android</b>."
      },
      {
        title:"Boom Bounce",
        year:2018,
        preview:require('../assets/Portfolio/Jams/BoomBounce.png'),
        description:"A game made for <b>Game Maker's Toolkit Game Jam 2018</b> by a team of 6 people, made in <b>Godot game engine, GD Script</b> in just <b>48 hours</b>."
      },
      {
        title:"Untitled Car game",
        year:2018,
        preview:require('../assets/Portfolio/Jams/LDJam41.png'),
        description:"A procedurally generated world with arcade-like gameplay, made by a team of 2 for <b>Ludum Dare 41</b> game jam, in just <b>48 hours</b>."
      },
      {
        title:"Twitch Chatbot",
        year:2018,
        preview:require('../assets/Portfolio/Jams/chatbot.png'),
        description:"An automatic bot that can read and write to a <b>Twitch</b> stream chat, it can detect messages and commands and respond appropriately, made in <b>Python</b>."
      },
      {
        title:"Untitled World Generator",
        year:2015,
        preview:require('../assets/Portfolio/Jams/World2015.png'),
        description:"An early 3D procedurally generated world and walking simulator, it generates a small and simple landscape to walk around in, made in <b>Unity, C#</b> in 2015."
      },
      {
        title:"World Generator with landmass detection",
        year:2016,
        preview:require('../assets/Portfolio/Jams/World2016.png'),
        description:"A map generator with the ability to detect and deliniate continents and islands, made for a forgotten Procedural Generation show-off."
      },
      {
        title:"Protect the Plant",
        year:2017,
        preview:require('../assets/Portfolio/Jams/PTP.png'),
        description:"A simple arcade game made for <b>Grow Jam 2017</b>, made in about a week with <b>Godot Game Engine, GDScript</b>, my objective was to learn the engine by throwing myself into a game jam right away and it worked, it was fun."
      },
      {
        title:"Boat Game Thing",
        year:2018,
        preview:require('../assets/Portfolio/Jams/BoatGameThing.png'),
        description:"A stealth/simulation game set in a boat, featuring some serious programmer art and quite a bit of polish, made in <b>Godot Game Engine, GDScript</b> in 2018."
      },
      {
        title:"Combat",
        year:2018,
        preview:require('../assets/Portfolio/Jams/Combat.png'),
        description:"A multi-platform RPG made in <b>Godot Game Engine</b>."
      },
      {
        title:"Sam Squirrel",
        year:2015,
        preview:require('../assets/Portfolio/Jams/SamSquirrel.png'),
        description:"A simple 3D platformer and my first experience working with a team, made in <b>2015</b> with <b>Unity, C#</b>."
      },
      {
        title:"O2",
        year:2017,
        preview:require('../assets/Portfolio/Jams/O2.png'),
        description:"A tower defense game set in a space station, made in just <b>48 hours</b> for <b>Game Maker's Toolkit Game Jam 2017</b> in <b>Godot Game Engine, GDScript</b>."
      }
    ]
  }),
  mounted() {
    $('.bg-blgnavbar').css("display","none");
    this.calculateColumns();
    window.onresize = () => { this.calculateColumns(); }
  },
  methods: {
    enableNARNES: function() {
      this.narnesEnabled = !this.narnesEnabled;
      this.narnesNoticed = true;
    },
    calculateColumns: function() {
      if (window.innerWidth > 2000) {
        this.otherPsColumns = 4;
      } else if (window.innerWidth > 1200) {
        this.otherPsColumns = 3;
      } else if (window.innerWidth > 800) {
        this.otherPsColumns = 2;
      } else {
        this.otherPsColumns = 1;
      }
    }
  },
  computed: {
   content: function() {
     if (this.language == "es") {
      return portfolioJSON.es;
     }
     return portfolioJSON.en;
   } 
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');
@import url('../assets/w3.css');
@import url('../assets/Portfolio/portfolio.css');
</style>