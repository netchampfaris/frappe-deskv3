import partition from 'lodash/groupBy'

export default {
  data() {
    return {
      desktopModules: [],
    }
  },
  methods: {
    async fetchDesktopModules() {
      if (this.desktopModules.length > 0) return
      const data = await this.fr.call(
        'frappe.config.get_modules_from_all_apps_for_user'
      )
      if (data) {
        this.desktopModules = partition(data, module => module.category)
      }
    },
  },
}
