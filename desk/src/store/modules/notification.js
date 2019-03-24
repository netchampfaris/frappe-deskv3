import Vue from 'vue'

export default new Vue({
  data() {
    return {
      notifications: {},
      total: 0,
      excluded: ['targets', 'new_messages'],
    }
  },
  methods: {
    async getNotifications() {
      const notifications = await this.fr.call(
        'frappe.desk.notifications.get_notifications'
      )
      this.notifications = notifications
      await this.updateNotificationTotal()
    },
    async updateNotificationTotal() {
      let total = 0
      const add = (a, b) => a + b
      let keys = keys
        ? keys
        : Object.keys(this.notifications)
            .sort()
            .filter(e => !this.excluded.includes(e))
      keys.forEach(key => {
        total = total + Object.values(this.notifications[key]).reduce(add, 0)
      })
      this.total = total
    },
  },
})
