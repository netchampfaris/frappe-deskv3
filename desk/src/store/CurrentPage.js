export default {
    namespaced: true,
    state: {
        showPageHeader: true,
        title: '',
        primaryActionLabel: '',
        primaryAction: null,
        secondaryActionLabel: '',
        secondaryAction: null,
        menuItems: []
    },
    mutations: {
        setPageHeaderSettings(state, payload) {
            for (let key in state) {
                if (payload[key]) {
                    state[key] = payload[key]
                } else {
                    state[key] = null
                }
            }
            state.showPageHeader = true
        },
        hidePageHeader(state) {
            state.showPageHeader = false
        }
    }
}
