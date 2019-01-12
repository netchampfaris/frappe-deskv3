export default {
  namespaced: true,
  state: {
    showPageHeader: true,
    title: '',
    indicatorColor: '',
    indicatorText: '',
    primaryActionLabel: '',
    primaryAction: null,
    secondaryActionLabel: '',
    secondaryAction: null,
    menuItems: [],
  },
  mutations: {
    setPageHeaderSettings(state, payload) {
      for (let key in state) {
        if (payload[key]) {
          state[key] = payload[key]
        }
      }
      state.showPageHeader = true
    },
    setIndicator(state, { color, text }) {
      state.indicatorColor = color
      state.indicatorText = text
    },
    hidePageHeader(state) {
      state.showPageHeader = false
    },
  },
}
