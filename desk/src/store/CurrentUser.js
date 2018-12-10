import frappe from '../frappe'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, { userInfo }) {
      state.user = userInfo
    }
  },
  actions: {
    async login({ dispatch }, { email, password }) {
      await frappe.call('login', { usr: email, pwd: password })
      await dispatch('fetchUserInfo')
    },
    async fetchUserInfo({ commit }) {
      const userInfo = await frappe.call('frappe.utils.user.get_user_info')
      commit('setUser', { userInfo })
      commit('setLoggedIn', { loggedIn: true }, { root: true })
    }
  },
}