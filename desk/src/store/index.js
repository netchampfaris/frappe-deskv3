import Vue from 'vue'
import Vuex from 'vuex'
import CurrentPage from './CurrentPage'
import CurrentUser from './CurrentUser'
import Desktop from '../pages/Desktop.store'
import List from '../pages/List.store'
import Meta from './Meta'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loggedIn: false
    },
    mutations: {
        setLoggedIn(state, { loggedIn }) {
            state.loggedIn = loggedIn
        }
    },
    modules: {
        CurrentPage,
        CurrentUser,
        Desktop,
        List,
        Meta,
    }
})

export default store;