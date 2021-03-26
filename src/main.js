import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery'
import 'pokeapi-js-wrapper'
import { DropdownPlugin, TablePlugin, CardPlugin, NavPlugin, NavbarPlugin, CarouselPlugin } from 'bootstrap-vue'
import Layout from './layouts/Main.vue'
import NiceDatalist from './components/NiceDatalist.vue'
import UTNNavBar from './components/UTNNavBar.vue';

Vue.use(VueRouter)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)
Vue.use(CarouselPlugin)

Vue.config.productionTip = false

const routes = [
  { path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */'./pages/Home.vue'),
    meta: {
      title: 'Simply BLG'
    }
  },
  { path: '/Portfolio',
    name: 'Portfolio',
    component: () => import(/* webpackChunkName: "Portfolio" */'./pages/Portfolio.vue'),
    meta: {
      title: 'Digital Portfolio'
    }
  },
  { path: '/Pokemon',
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "Pokemon" */'./pages/Pokemon/PokemonIndex.vue'),
    meta: {
      title: 'Pokémon interactive maps'
    }
  },
  { path: '/Pokemon/Kanto',
    name: 'Kanto',
    component: () => import(/* webpackChunkName: "Pokemon" */'./pages/Pokemon/Pokemon.vue'),
    meta: {
      title: 'Kanto interactive map for RBY'
    },
    props: {
      'region': "Kanto",
      'mapJSON': require('@/assets/Pokemon/Maps/KantoMaps.json'),
      'mapIMGsrc': require('@/assets/Pokemon/Maps/Kanto.png')
    }
  },
  { path: '/Pokemon/Johto',
    name: 'Johto',
    component: () => import(/* webpackChunkName: "Pokemon" */'./pages/Pokemon/Pokemon.vue'),
    meta: {
      title: 'Johto interactive map for GSC'
    },
    props: {
      'region': "Johto",
      'mapJSON': require('@/assets/Pokemon/Maps/JohtoMaps.json'),
      'mapIMGsrc': require('@/assets/Pokemon/Maps/Johto.png')
    }
  },
  { path: '/Pokemon/Kanto3',
    name: 'Kanto Gen 3',
    component: () => import(/* webpackChunkName: "Pokemon" */'./pages/Pokemon/Pokemon.vue'),
    meta: {
      title: 'Kanto interactive map for FRLG'
    },
    props: {
      'region': "Kanto3",
      'mapJSON': require('@/assets/Pokemon/Maps/Kanto3Maps.json'),
      'mapIMGsrc': require('@/assets/Pokemon/Maps/Kanto3.png')
    }
  },
  { path: '/Pokemon/Hoenn',
    name: 'Hoenn',
    component: () => import(/* webpackChunkName: "Pokemon" */'./pages/Pokemon/Pokemon.vue'),
    meta: {
      title: 'Hoenn interactive map for RSE'
    },
    props: {
      'region': "Hoenn",
      'mapJSON': require('@/assets/Pokemon/Maps/HoennMaps.json'),
      'mapIMGsrc': require('@/assets/Pokemon/Maps/Hoenn.png')
    }
  },
  { path: '/Graficadora',
    name: 'Graficadora',
    component: () => import(/* webpackChunkName: "Encodings" */'./pages/Science/Encodings.vue'),
    meta: {
      title: 'Graficadora para señales'
    }
  },
  { path: '/Graficadora/Informacion',
    name: 'Información/Contacto',
    component: () => import(/* webpackChunkName: "Encodings" */'./pages/Science/EncodingsInformation.vue'),
    meta: {
      title: 'Información'
    }
  },
  { path: '/science/sim/pseudorandom',
    name: 'Pseudoaleatorio',
    component: () => import(/* webpackChunkName: "SIM" */'./pages/Science/SIM/pseudoaleatorio.vue'),
    meta: {
      title: 'Generador de Números pseudo-aleatorios'
    }
  },
  { path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */'./pages/404.vue'),
    meta: {
      title: '404 - Page not found'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Simply BLG';
  next();
});

Vue.component('NiceDatalist', NiceDatalist);
Vue.component('UTNNavBar', UTNNavBar);

new Vue({
  el: '#app',
  render: h => h(Layout),
  router
}).$mount('#app')