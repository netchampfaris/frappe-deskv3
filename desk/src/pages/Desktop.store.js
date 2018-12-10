import frappe from '../frappe';

export default {
    namespaced: true,
    state: {
        icons: []
    },
    getters: {
        visibleIcons(state) {
            return state.icons.filter(icon => !icon.hidden)
        }
    },
    mutations: {
        setUserIcons(state, { userIcons }) {
            state.icons = userIcons
        }
    },
    actions: {
        async fetchUserIcons(context) {
            if (context.state.icons.length > 0) return;
            const user = context.rootState['CurrentUser'].user.name;
            const data = await frappe.call('frappe.desk.doctype.desktop_icon.desktop_icon.get_module_icons', { user })
            if (data) {
                const userIcons = data.icons.filter(icon => !icon.hidden);
                context.commit('setUserIcons', {
                    userIcons
                })
            }
        }
    }
}
