import Vue from 'vue'
import frappe from '../frappe'

export default {
  namespaced: true,
  state: {
    DocType: null,
  },
  getters: {
    getMeta: state => doctype => state[doctype],
  },
  mutations: {
    setMeta(state, { doctype, meta }) {
      Vue.set(state, doctype, meta)
    },
  },
  actions: {
    async fetchMeta({ commit, state }, { doctype }) {
      if (state[doctype]) return

      const meta = await frappe.call('frappe.client.get', {
        doctype: 'DocType',
        name: doctype,
      })
      if (meta) {
        commit('setMeta', { doctype, meta })
      }
    },
  },
}
