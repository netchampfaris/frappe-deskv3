export default {
  data() {
    return {
      desktopIcons: [],
    }
  },
  methods: {
    async fetchUserIcons() {
      if (this.desktopIcons.length > 0) return
      const user = this.session.user
      const data = await this.call(
        'frappe.desk.doctype.desktop_icon.desktop_icon.get_module_icons',
        { user }
      )
      if (data) {
        const userIcons = data.icons.filter(icon => !icon.hidden)
        this.desktopIcons = userIcons
      }
    },
  },
}
