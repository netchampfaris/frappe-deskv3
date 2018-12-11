import Vue from 'vue'
import Vuex from 'vuex'
import CurrentPage from './CurrentPage'
import CurrentUser from './CurrentUser'
import Desktop from '../pages/Desktop.store'
import Form from '../pages/Form.store'
import List from '../pages/List.store'
import Meta from './Meta'
import TheAwesomeBar from '../components/TheAwesomeBar.store'

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
        Form,
        List,
        Meta,
        TheAwesomeBar
    }
})

export default store;