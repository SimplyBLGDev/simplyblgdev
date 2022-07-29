<template>
  <div id="app" class="app">
    <b-navbar class="bg-blgnavbar" toggleable="lg" type="dark">
      <b-navbar-brand href="/">SimplyBLG</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Pokémon Maps" type="dark">
          <b-dropdown-item href="/pokemon">Index</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/pokemon/kanto">Gen 1 - Kanto</b-dropdown-item>
          <b-dropdown-item href="/pokemon/johto">Gen 2 - Johto</b-dropdown-item>
          <b-dropdown-item href="/pokemon/hoenn">Gen 3 - Hoenn</b-dropdown-item>
          <b-dropdown-item href="/pokemon/sinnoh">Gen 4 - Sinnoh</b-dropdown-item>
          <b-dropdown-item href="/pokemon/unova">Gen 5 - Unova</b-dropdown-item>
          <b-dropdown-item href="/pokemon/unova2">Gen 5 - Unova2</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/pokemon/kanto3">Gen 3 - Kanto</b-dropdown-item>
          <b-dropdown-item href="/pokemon/johto4">Gen 4 - Johto</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Other" type="dark">
          <b-dropdown-item href="/pokemon/googletranslatedemerald">Google translated Pokémon Emerald</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    
    <router-view></router-view>

    <footer>
      <hr>
      <div class="container-fluid text-muted">
        <table style="width: 100%; margin-top: 2rem;">
          <tbody>
            <tr>
              <td colspan=2>SimplyBLG's 2020 - 2022</td>
            </tr>
            <tr>
              <td width="50%"><a href="https://github.com/SimplyBLGDev">Github</a></td>
              <td width="50%"><a href="mailto:simplyblgdev@gmail.com">Send me an email</a></td>
            </tr>
            <tr>
              <td></td>
              <td><a href="https://paypal.me/SimplyBLGDev">Donate</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style>
html {
  background-color: #181a1b;
}
.bg-blgnavbar {
  background-color: #319e2a;
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
footer table a {
  color:grey;
}
</style>
