import Vue from 'vue'
import Vuex from 'vuex'

import materials from './modules/materials'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
      materials
    }
})

export default store
