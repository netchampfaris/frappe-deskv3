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
                }
            }
            state.showPageHeader = true
        },
        hidePageHeader(state) {
            state.showPageHeader = false
        }
    }
}
