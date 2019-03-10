<template>
  <Dropdown :items="notificationItems">
    <div class="my-2 hover:bg-grey-lighter cursor-pointer">
      <div class="p-2 text-center bg-red-light hover:bg-red rounded">
        <span class="px-1 text-lg font-bold text-white">
          {{ frappe.notifications.total }}
        </span>
      </div>
    </div>
  </Dropdown>
</template>
<script>
export default {
  name: 'TheNavbarNotification',
  mounted() {
    this.getNotifications()
  },
  methods: {
    async getNotifications() {
      await this.frappe.getNotifications()
    },
  },
  computed: {
    notificationItems() {
      return Object.keys(this.frappe.notifications.notifications)
    },
  },
}
</script>
