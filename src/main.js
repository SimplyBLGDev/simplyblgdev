import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery'
import 'maphilight'
import { DropdownPlugin, TablePlugin, CardPlugin, NavPlugin, NavbarPlugin } from 'bootstrap-vue'
import Layout from './layouts/Main.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Pokemon from './pages/Pokemon/Pokemon.vue'

Vue.use(VueRouter)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Pokemon',
    name: 'Pokemon',
    component: Pokemon
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes // short for `routes: routes`
})

Vue.component('Pokemon', Pokemon)

new Vue({
  el: '#app',
  render: h => h(Layout),
  router
}).$mount('#app')