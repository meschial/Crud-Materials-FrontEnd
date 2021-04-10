import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToastify from "vue-toastify"
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueToastify)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
