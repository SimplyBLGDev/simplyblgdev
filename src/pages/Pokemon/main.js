import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import { DropdownPlugin, TablePlugin, CardPlugin, NavPlugin, NavbarPlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(CardPlugin)
Vue.use(NavPlugin)
Vue.use(NavbarPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
