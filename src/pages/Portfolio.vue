<template>
  <div class="container-fluid w3-animate-opacity mainDiv">
    <div class=" w3-display-container insetBox titleCard" style="margin-left:0; margin-right:0; margin-top:0; padding-top:8rem; padding-bottom:8rem;">
      <div class="title">Digital Portfolio</div>
      <div class="text-muted w3-animate-left" style="opacity: 0; animation-delay: 880ms; animation-fill-mode: forwards; animation-duration: 1200ms;">
        This is a small sample of some of the projects I've undertaken in my years as a hobbyist programmer.
      </div>
    </div>

    <div class="w3-display-container caseContainer">
      <div class="case year">
        2020
      </div>
      <div class="case insetBox">
        <div>
          <div>
            <b class="case header">Study case:</b>
            <img class="case ribbon" src="../assets/Portfolio/RibbonHTML.png" alt="HTML5" title="HTML 5">
            <img class="case ribbon" src="../assets/Portfolio/RibbonCSS.png" alt="CSS3" title="CSS 3">
            <img class="case ribbon" src="../assets/Portfolio/RibbonJS.png" alt="JS" title="Javascript">
            <img class="case ribbon" src="../assets/Portfolio/RibbonBootstrap.png" alt="Bootstrap" title="Bootstrap">
            <img class="case ribbon" src="../assets/Portfolio/RibbonSQL.png" alt="SQL" title="SQL">
            <img class="case ribbon" src="../assets/Portfolio/RibbonVue.png" alt="Vue.js" title="Vue JS">
            <br>
            <b class="case header">Pokémon interactive maps</b>
          </div>
          <div>
            A simple webapp, small, clean, fast and intuitive, it communicates with a third party, open source database to fetch data which is parsed and presented
            in a beautifully designed page, the page itself is responsive, allowing the use of the app on screens of every size and aspect ratio, including
            mobile devices.
            The page is 
          </div>
        </div>
        <div class="" style="display: inline-table; width: 600px; height: 300px;">
          <img class="w3-animate-bottom w3-animate-opacity" style="margin-left: 80px;" src="../assets/Portfolio/pokemonitor.png" alt="Monitor layout">
          <img class="w3-animate-bottom w3-animate-opacity" style="animation-delay: 500ms; animation-fill-mode: forwards; opacity: 0; margin-top: -150px" src="../assets/Portfolio/pokesmall.png" alt="Small screen layout">
          <img class="w3-animate-bottom w3-animate-opacity" style="animation-delay: 1000ms; animation-fill-mode: forwards; opacity: 0; margin-top:-250px; margin-left: 110px;" src="../assets/Portfolio/pokephone.png" alt="Mobile layout">
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
  text-align: left;
  display: flex;
}
.case.year {
  writing-mode:tb-rl;
  transform:rotate(180deg);
  white-space:nowrap;
  display:block;
  font-family: 'Limelight', cursive;
  font-size: 4ch;
  margin:0;
  padding:0;
}
.case.header {
  font-family: 'Limelight', cursive;
  font-size: xx-large;
  margin-top: 20px;
}
.case.ribbon {
  position: relative;
  margin-left: 10px;
  top: -30px;
}
</style>