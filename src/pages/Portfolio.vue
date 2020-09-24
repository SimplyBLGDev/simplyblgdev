<template>
  <div class="container-fluid w3-animate-opacity mainDiv">
    <div class="titleCard w3-display-container">
      <div class="title">Digital Portfolio</div>
      <div class="text-muted w3-animate-left" style="opacity: 0; animation-delay: 880ms; animation-fill-mode: forwards; animation-duration: 1200ms;">
        This is a small sample of some of the projects I've undertaken in my years as a hobbyist programmer.
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
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-family: 'Raleway', sans-serif;
}
.titleCard {
  -webkit-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.5);
  -moz-box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.5);
  box-shadow: inset 0px 0px 5px 5px rgba(0,0,0,0.5);
  margin: 10px;
  margin-bottom: 0;
  padding-bottom: 1rem;
  background-color: #313536;
  background-image: url('../assets/Techs.png');
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
</style>