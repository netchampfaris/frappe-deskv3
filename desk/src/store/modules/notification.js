export default {
  data() {
    return {
      notifications: {
        notifications: {},
        total: 0,
        excluded: ['targets', 'new_messages'],
      },
    }
  },
  methods: {
    async getNotifications() {
      const notifications = await this.call(
        'frappe.desk.notifications.get_notifications'
      )
      this.notifications.notifications = notifications
      await this.updateNotificationTotal()
    },
    async updateNotificationTotal() {
      let total = 0
      const add = (a, b) => a + b
      let keys = keys ?
        keys :
        Object.keys(this.notifications.notifications)
        .sort()
        .filter(e => !this.notifications.excluded.includes(e))
      keys.forEach(key => {
        total =
          total +
          Object.values(this.notifications.notifications[key]).reduce(add, 0)
      })
      this.notifications.total = total
    },
  },
}