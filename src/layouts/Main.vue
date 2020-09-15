<template>
  <div id="app" class="app">
    <b-navbar class="bg-blgnavbar" toggleable="lg" type="dark">
      <b-navbar-brand href="/">SimplyBLG</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Pokémon Maps" type="dark">
          <b-dropdown-item href="/Pokemon/Kanto">Gen 1 - Kanto</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Johto">Gen 2 - Johto</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Hoenn">Gen 3 - Hoenn</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Sinnoh">Gen 4 - Sinnoh</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Unova">Gen 5 - Unova</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Kalos">Gen 6 - Kalos</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Alola">Gen 7 - Alola</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/Pokemon/Kanto_3">Gen 3 - Kanto</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Johto_4">Gen 4 - Johto</b-dropdown-item>
          <b-dropdown-item href="/Pokemon/Hoenn_6">Gen 6 - Hoenn</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    
    <router-view></router-view>

    <footer>
      <div class="container-fluid text-muted text-right">
        <hr>
        SimplyBLG's 2020
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    components: {

    }
}
</script>

<style>
html {
    overflow: -moz-scrollbars-vertical; 
    overflow-y: scroll;
}
.bg-blgnavbar {
  background-color: #319e2a;
  -webkit-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 1px 20px 0px rgba(0,0,0,0.75);
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e6e6e6;
  background-color: #181a1b;
  min-height: 100vh;
}
</style>
