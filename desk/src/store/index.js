import Vue from 'vue'
import Vuex from 'vuex'
import CurrentPage from './CurrentPage'
import CurrentUser from './CurrentUser'
import Desktop from './Desktop'
import Form from './Form'
import List from './List'
import Meta from './Meta'
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
    CurrentPage,
    CurrentUser,
    Desktop,
    Form,
    List,
    Meta,
    TheAwesomeBar,
  },
})

export default store
