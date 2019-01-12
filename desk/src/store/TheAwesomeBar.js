export default {
  namespaced: true,
  state: {
    isFocused: false,
  },
  getters: {
    //
  },
  mutations: {
    setFocus(state, { isFocused }) {
      state.isFocused = isFocused
    },
  },
  actions: {
    //
  },
}
