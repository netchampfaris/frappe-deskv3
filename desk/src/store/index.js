import Vue from 'vue'
import Vuex from 'vuex'
import TheAwesomeBar from './TheAwesomeBar'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
  },
  mutations: {
    setLoggedIn(state, { loggedIn }) {
      state.loggedIn = loggedIn
    },
  },
  modules: {
    TheAwesomeBar,
  },
})

export default store
