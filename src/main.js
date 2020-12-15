import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery'
import 'pokeapi-js-wrapper'
import { DropdownPlugin, TablePlugin, CardPlugin, NavPlugin, NavbarPlugin, CarouselPlugin } from 'bootstrap-vue'
import Layout from './layouts/Main.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import PokemonIndex from './pages/Pokemon/PokemonIndex.vue'
import Pokemon from './pages/Pokemon/Pokemon.vue'
import Graficadora from './pages/Science/Encodings.vue'
import Portfolio from './pages/Portfolio.vue'
import NiceDatalist from './components/NiceDatalist.vue'

Vue.use(VueRouter)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)
Vue.use(CarouselPlugin)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Simply BLG'
    }
  },
  {
    path: '/Portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: {
      title: 'Digital Portfolio'
    }
  },
  {
    path: '/Pokemon',
    name: 'Pokemon',
    component: PokemonIndex,
    meta: {
      title: 'Pokémon interactive maps'
    }
  },
  {
    path: '/Pokemon/Kanto',
    name: 'Kanto',
    component: Pokemon,
    meta: {
      title: 'Kanto interactive map for RBY'
    }
  },
  {
    path: '/Graficadora',
    name: 'Graficadora',
    component: Graficadora,
    meta: {
      title: 'Graficadora para señales'
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404 - Page not found'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes // short for `routes: routes`
})

// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Simply BLG';
  next();
});

Vue.component('Pokemon', Pokemon)
Vue.component('NiceDatalist', NiceDatalist)

new Vue({
  el: '#app',
  render: h => h(Layout),
  router
}).$mount('#app')