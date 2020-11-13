import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    genr: [],
  },
})