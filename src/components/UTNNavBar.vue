<template>
  <div>
    <div class="bar">
      <img src="../assets/UTN Logo.png" alt="UTN FRC Logo" style="width:15%;">
    </div>
    <div class="button-panel">
      <button onclick="window.location.href='/Graficadora/Informacion';">Contacto</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'utnnavbar'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
</style>

<style scoped>
  .bar {
    background-color: #1c68ba;
  }
  .button-panel {
    display: flex;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .button-panel button {
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    border: 0;
    margin: 0 5px;
    background-color: #1c68ba;
    color: whitesmoke;
    padding: 4px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px;
    box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
    -webkit-box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 5px 4px 5px 0px rgba(0,0,0,0.3);
    font-size: xx-large;
    position: relative;
    transition: all 0.1s;
    top: -2rem;
    text-shadow: black 3px 3px;
  }
  .button-panel button:hover {
    top: -1rem;
    background-color: #3577bd;
  }
</style>
