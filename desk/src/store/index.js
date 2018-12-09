import Vue from 'vue'
import Vuex from 'vuex'
import frappe from '../frappe'
import CurrentPage from './CurrentPage'
import Desktop from '../pages/Desktop.store'
import List from '../pages/List.store'
import Meta from './Meta'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        session: null
    },
    mutations: {
        setSession(state, { userInfo }) {
            state.session = userInfo
        }
    },
    actions: {
        async login({ dispatch }, { email, password }) {
            await frappe.call('login', { usr: email, pwd: password })
            await dispatch('fetchUserInfo')
        },
        async fetchUserInfo({ commit }) {
            const userInfo = await frappe.call('frappe.utils.user.get_user_info')
            commit('setSession', { userInfo })
        }
    },
    modules: {
        CurrentPage,
        Desktop,
        List,
        Meta,
    }
})

export default store;