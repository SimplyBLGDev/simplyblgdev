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
        <div style="width:calc(100% - 600px)">
          <div>
            <b class="case header">Study case:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonHTML.png" alt="HTML5" title="HTML 5">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSS.png" alt="CSS3" title="CSS 3">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonJS.png" alt="JS" title="Javascript">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonNode.png" alt="Node.js" title="Node JS">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonBootstrap.png" alt="Bootstrap" title="Bootstrap">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonSQL.png" alt="SQL" title="SQL">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonVue.png" alt="Vue.js" title="Vue JS">
            <br>
            <b class="case header">Pokémon interactive maps</b>
          </div>
          <div>
            A simple webapp, small, clean, fast and intuitive, it communicates with a <b>third party, open source database</b> to fetch data which is parsed and presented
            in a beautifully designed page.
          </div>
          <div class="case body">
            The page itself is <b>responsive</b>, allowing the use of the app on screens of every size and aspect ratio, including
            mobile devices.<br>
          </div>
        </div>
        <div class="" style="display: inline-table; width: 600px; height: 300px;">
          <img class="w3-animate-bottom w3-animate-opacity" style="margin-left: 80px;" src="../assets/Portfolio/PokeMap/pokemonitor.png" alt="Monitor layout" title="Works in every monitor size!">
          <img class="w3-animate-bottom w3-animate-opacity" style="animation-delay: 500ms; animation-fill-mode: forwards; opacity: 0; margin-top: -150px" src="../assets/Portfolio/PokeMap/pokesmall.png" alt="Small screen layout"  title="Works in every monitor size!">
          <img class="w3-animate-bottom w3-animate-opacity" style="animation-delay: 1000ms; animation-fill-mode: forwards; opacity: 0; margin-top:-250px; margin-left: 110px;" src="../assets/Portfolio/PokeMap/pokephone.png" alt="Mobile layout" title="Even in mobile devices!">
        </div>
      </div>
    </div>
     <div class="w3-display-container caseContainer">
      <div class="case insetBox">
        <div style="width:60%">
          <div>
            <b class="case header">Study case:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCpp.png" alt="C++" title="C++">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSharp.png" alt="C#" title="C#">
            <br>
            <b class="case header">NARNES</b>
          </div>
          <div>
            A fully featured NES emulator with a twist.
          </div>
          <div class="case body">
            
          </div>
        </div>
      </div>
      <div class="case year">
        2019
      </div>
    </div>
    <div class="w3-display-container caseContainer">
      <div class="case year left">
        2018
      </div>
      <div class="case insetBox">
        <div style="width:60%">
          <div>
            <b class="case header">Study case:</b>
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonCSharp.png" alt="C#" title="C#">
            <img class="case ribbon" src="../assets/Portfolio/Ribbons/RibbonGodot.png" alt="Godot" title="Godot Engine">
            <br>
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
        <div style="width:40%;padding-left:1ch">
          <img src="../assets/Portfolio/NARL/A.png" width="100%" height="auto">
        </div>
        <div style="width:40%;padding-right:1ch">
          <img src="../assets/Portfolio/NARL/B.png" width="100%" height="auto">
        </div>
        <div style="width:60%">
          <div class="case body">
            It allows the user to search and launch any game in the user's PC from a single place, it also provides other convenient features such as keeping
            track of time spent playing each title.
          </div>
          <div class="case body">
            Published on itch.io on January 1, 2019, it was updated for a year and used by more people than I expected. It is now discontinued.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');
@import url('../assets/w3.css');

.title {
  font-weight: 100;
  font-size: 10ch;
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
  animation: scrollBG 60s linear infinite;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes scrollBG {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: -1575px -998px;
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
  margin-right: 10px;
  margin-left: 10px;
}
.case.insetBox {
  width:100%;
  margin:0;
  margin-bottom:11px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
}
.case.year {
  writing-mode:tb-rl;
  white-space:nowrap;
  display:block;
  font-family: 'Limelight', cursive;
  font-size: 4ch;
  margin:0;
  padding:0;
}
.case.year.left {
  transform:rotate(180deg);
}
.case.header {
  font-family: 'Limelight', cursive;
  font-size: xx-large;
  margin-top: 20px;
}
.case.ribbon {
  position: relative;
  margin-left: 10px;
  top: -27px;
}
.case.body {
  margin-top:0.8ch;
}
</style>