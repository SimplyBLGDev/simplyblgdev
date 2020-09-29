<template>
  <div class="container-fluid w3-animate-opacity mainDiv">
    <div class=" w3-display-container insetBox titleCard" style="margin-left:0; margin-right:0; margin-top:0; height:100vh; display:flex;justify-content:center;align-items:center;">
      <div>
        <div class="title">Digital Portfolio</div>
        <div class="text-muted w3-animate-left" style="opacity: 0; animation-delay: 880ms; animation-fill-mode: forwards; animation-duration: 1200ms;">
          This is a small sample of some of the projects I've undertaken in my years as a hobbyist programmer.
        </div>
      </div>
    </div>

    <div class="w3-display-container caseContainer">
      <div class="case year left">
        2020
      </div>
      <div class="case insetBox">
        <div class="caseDiv left" style="--rWidth: 60%">
          <div>
            <b class="case header study">Case study:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonHTML.png" alt="HTML5" title="HTML 5">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSS.png" alt="CSS3" title="CSS 3">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonJS.png" alt="JS" title="Javascript">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonNode.png" alt="Node.js" title="Node JS">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonBootstrap.png" alt="Bootstrap" title="Bootstrap">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonSQL.png" alt="SQL" title="SQL">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonVue.png" alt="Vue.js" title="Vue JS">
            <br>
            <b class="case header studyL">Case study:<br></b>
            <b class="case header">Pokémon interactive maps</b>
          </div>
          <div>
            A simple webapp, small, clean, fast and intuitive, it communicates with a <b>third party, open source database</b> to fetch data which is parsed and presented
            in a beautifully designed page.
          </div>
          <div class="case body">
            The application is <b>responsive</b>, adapting itself to any screen size, resolution and device, including mobile devices in both landscape and portrait 
            modes, it is also <b>reactive</b>, thanks to the utilization of the <b>Vue JS</b> framework.
          </div>
          <div class="case body">
            The page is designed to be efficient and easy to cache, downloading all the necessary data in a single request on page load therefore allowing it's use 
            once loaded even when offline and allows the data to be refreshed without delay at user request.
          </div>
          <div class="case body">
            <a href="/Pokemon/Kanto">Visit it here.</a>
          </div>
        </div>
        <div class="caseDiv" style="--rWidth: 40%; position:relative">
          <img src="../assets/Portfolio/PokeMap/aspectratio.png" alt="" style="width:100%">
          <img class="pokeImage" style="width:72%; position:absolute; left:17%" src="../assets/Portfolio/PokeMap/pokemonitor.png" alt="Monitor layout" title="Works in every monitor size!">
          <img class="pokeImage" style="width:56%; position:absolute; left:0; bottom:5%" src="../assets/Portfolio/PokeMap/pokesmall.png" alt="Small screen layout"  title="Works in every monitor size!">
          <img class="pokeImage" style="width:24%; position:absolute; right:0; bottom:0" src="../assets/Portfolio/PokeMap/pokephone.png" alt="Mobile layout" title="Even in mobile devices!">
        </div>
      </div>
    </div>
     <div class="w3-display-container caseContainer">
      <div class="case insetBox">
        <div class="caseDiv left" style="--rWidth: 50%">
          <div>
            <b class="case header study">Case study:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCpp.png" alt="C++" title="C++">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSharp.png" alt="C#" title="C#">
            <br>
            <b class="case header studyL">Case study:<br></b>
            <b class="case header">NARNES</b>
          </div>
          <div>
            A fully featured NES emulator with a twist.
          </div>
          <div class="case body">
            It features a <b>C++ core</b> that emulates NES hardware at a low level and a <b>C# forms GUI</b> intercommunicating via <b>Interop middleware</b>, 
            it has every feature that is expected of a modern emulator: sRAM, save stating, demo recording and even rewinding.
          </div>
          <div class="case body">
            More importantly it features the ability to generate and load <b>'asset packs'</b> that allow the <b>replacement of in-game assets</b> 
            with user-defined alternatives, <b>in real time</b> allowing the bypassing of NES hardware restrictions such as resolution, palette and fidelity.
          </div>
        </div>
        <div class="caseDiv" style="--rWidth: 50%; position:relative">
          <img src="../assets/Portfolio/NARNES/FFOld.png" alt="NARNES: Off" style="width:100%;">
          <img src="../assets/Portfolio/NARNES/FFNew.png" alt="NARNES: On" class="trans" v-bind:class="{ transparent: !narnesEnabled }" style="width:100%; position:absolute; left:0; top:0;">
          <div id="NARNESBtn" class="btn cBtn" v-bind:class="{ active: narnesEnabled }" @click="enableNARNES"><b>Activate NARNES</b></div>
        </div>
        <div class="caseDiv" style="--rWidth: 60%; padding-right:1ch">
          <img src="../assets/Portfolio/NARNES/UI.gif" alt="NARNES GUI" style="width:100%;">
        </div>
        <div class="caseDiv right" style="--rWidth: 40%">
          <div class="case body">
            Assisted with a user friendly, drag-and-drop GUI that allows users to create 'asset packs' without the need to understand NES hardware.<br>
            These asset packs are then saved as a single <b>.narp</b> file that can be easily shared and used by anyone with NARNES.
          </div>
        </div>
      </div>
      <div class="case year right">
        2019
      </div>
    </div>
    <div class="w3-display-container caseContainer">
      <div class="case year left">
        2018
      </div>
      <div class="case insetBox">
        <div class="caseDiv left" style="--rWidth: 60%">
          <div>
            <b class="case header study">Case study:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSharp.png" alt="C#" title="C#">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonGodot.png" alt="Godot" title="Godot Engine">
            <br>
            <b class="case header studyL">Case study:<br></b>
            <b class="case header">NARL</b>
          </div>
          <div>
            A minimalistic yet powerful and lightweight gaming frontend.
          </div>
          <div class="case body">
            It communicates with multiple external <b>API</b>s to help the user find a multitude of banners, screenshots and icons to use as a cover for their games, 
            it then provides a separate executable that launches a clean <b>GUI</b> that can be navigated with either keyboard or gaming controllers.
          </div>
        </div>
        <div class="caseDiv" style="--rWidth: 40%">
          <img src="../assets/Portfolio/NARL/A.png" width="100%" height="auto">
        </div>
        <div class="caseDiv" style="--rWidth: 40%">
          <img src="../assets/Portfolio/NARL/B.png" width="100%" height="auto">
        </div>
        <div class="caseDiv right" style="--rWidth: 60%">
          <div class="case body">
            It allows the user to search and launch any game in their PC from a single place, it also provides other convenient features such as keeping
            track of time spent playing each title.
          </div>
          <div class="case body">
            Published on itch.io on January 1, 2019, it was updated for a year and used by more people than I expected. It is now discontinued.
          </div>
          <div class="case body">
            <a href="https://simplyb.itch.io/narl">Find it here.</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="case header" style="margin:0; margin-bottom:5px; margin-top:-5px;">Other projects/Game Jams</div>

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
              <div class="case body" v-html="project.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w3-display-container insetBox contactBox">
      <div class="case header">Contact Me!</div>
      <div class="case body">e-mail me @ <a href="mailto:fabrilogares@gmail.com">fabrilogares@gmail.com</a></div>
      <div class="case body">Check out my Github: <a href="https://github.com/SimplyBLGDev">SimplyBLGDev</a></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data: () => ({
    narnesEnabled:false,
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
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');
@import url('../assets/w3.css');

a {
  color: #076cd9;
}
.bg-blgnavbar {
  display: none;
}
.title {
  font-weight: 100;
  font-size: 7ch;
}
.mainDiv {
  -webkit-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.75);
  -moz-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.75);
  box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.75);
  margin: 0;
  padding: 0;
  padding-bottom: 2rem;
  font-family: 'Raleway', sans-serif;
}
.titleCard {
  margin-bottom: 0;
  padding-bottom: 1rem;
  background-image: url('../assets/Portfolio/Techs.png');
  background-repeat: repeat;
  background-position: 0 0;
  animation: scrollBG 80s linear infinite;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes scrollBG {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: -1886px -979px;
  }
}
.insetBox {
  -webkit-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  -moz-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.6);
  padding: 10px;
  margin: 10px;
  background-color: #313536;
}
.caseContainer {
  display: flex;
  margin-right: 1px;
  margin-left: 1px;
  margin-bottom: 11px;
}
.case.insetBox {
  width:100%;
  margin:0;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.case.year {
  white-space:nowrap;
  display:none;
  font-family: 'Limelight', cursive;
  font-size: 4ch;
  margin:0;
  padding:0;
}
.case.year.left {
  writing-mode:tb-rl;
  transform:rotate(180deg);
}
.case.year.right {
  writing-mode:tb-rl;
}
.case.header {
  font-family: 'Limelight', cursive;
  font-size: xx-large;
  margin-top: 20px;
}
.case.ribbon {
  position: relative;
  margin-left: 4px;
  top: -27px;
  width:32px;
}
.case.body {
  margin-top:0.8ch;
}
.trans {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, opacity 0.4s ease-in-out;
}
.transparent {
  opacity:0;
}
.cBtn {
  width: 100%;
  background-color: #181a1b;
  color: #328d2b;
  -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
  --box-shadow-color: rgb(0, 0, 0, 0.75);
  border-radius: 3px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 4px;
  text-align: center;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.cBtn.active {
  background-color:#328d2b;
  color: whitesmoke;
}
.cBtn:hover {
  border-color: green;
}
.cBtn.active:hover {
  border-color: whitesmoke;
}
img {
  border-radius: 4px;
}
.pokeImage {
  transition: transform 0.45s;
  transform: translate(0, 0);
}
.pokeImage:hover {
  transform: translate(0, -6vh);
}
.caseDiv {
  width:100%;
  padding-left: 0;
  padding-right: 0;
}
.case.header.study {
  display: none;
}
.case.header.studyL {
  display: contents;
}
.jamContainer {
  margin-top: -5px;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  flex-flow: row;
  flex-wrap: nowrap;
}
.jamColumn {
  margin: 5px;
  flex-basis: 0;
  flex-grow: 1;
}
.jamCard {
  margin-bottom:10px;
  margin-top:10px;
}
.jamCard img {
  margin-bottom:-5px;
}
.jamCard .insetBox {
  margin:0;
}
.jamCard .insetBox .case.header {
  margin-top:0;
}
.jamCard .case.header.year {
  position: absolute;
  text-align: left;
  font-size: 5ch;
  color:#fff;
  text-shadow: 0.05ch 0.05ch rgb(127, 127, 127);
  margin: 0;
  top: -1.7ch;
  left: 0.2ch;
  opacity: 0.4;
}
.contactBox {
  margin: 0;
  background-color: rgb(73, 26, 117);
}
.contactBox .case.header {
  margin:0;
}
@media only screen and (min-width: 720px) {
  .case.year {
    display: block;
  }
  .title {
    font-size: 10ch;
  }
  .caseContainer {
    margin-right: 10px;
    margin-left: 10px;
  }
  .caseDiv {
    width: var(--rWidth);
  }
  .caseDiv.left {
    padding-right: 1ch;
  }
  .caseDiv.right {
    padding-left: 1ch;
  }
  .case.header.study {
    display: contents;
  }
  .case.header.studyL {
    display: none;
  }
  .case.case.ribbon {
    margin-left: 10px;
    width:48px;
  }
  .jamCard .case.header.year {
    font-size: 5rem;
  }
}
</style>