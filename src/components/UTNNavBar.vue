<template>
  <div>
    <div class="bar">
      <img src="../assets/UTN Logo.png" alt="UTN FRC Logo" style="width:15%;">
    </div>
    <div class="button-panel">
      <button @click="showContact = !showContact">Contacto</button>
    </div>
    <div v-if="showContact">
      <table class="contact-table">
        <tr>
          <th>Nombre</th>
          <th>Legajo</th>
          <th>Mail</th>
        </tr>
        <tr v-for="(contact, id) in data" :key="id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.no }}</td>
          <td>{{ contact.mail }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showContact: false
  }),
  props: {
    data: {
      type: Array
    }
  },
  name: 'utnnavbar'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
</style>

<style scoped>
  .contact-table {
    width: 100%;
    margin-bottom: 2rem;
  }
  .contact-table td {
    color: white;
    font-weight: bolder;
    text-shadow: black 3px 3px;
    font-size: x-large;
    background-color: #1C68BA;
  }
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
