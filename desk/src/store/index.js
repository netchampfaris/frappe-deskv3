import Vue from 'vue'
import Vuex from 'vuex'
import Meta from './Meta'
import Desktop from '../pages/Desktop.store'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        session: null
    },
    modules: {
        Meta,
        Desktop
    }
})

export default store;