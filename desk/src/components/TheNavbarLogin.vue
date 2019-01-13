<template>
  <Dropdown :items="userItems">
    <div class="font-semibold py-3 px-3 hover:bg-grey-lighter cursor-pointer">
      <div class="flex items-center">
        <UserAvatar class="mr-2" :user="session.user"/>
        <a
          class="no-underline text-grey-dark"
          href="#"
          role="button"
        >{{ session.userInfo.first_name }} {{ session.userInfo.last_name }}</a>
      </div>
    </div>
  </Dropdown>
</template>
<script>
export default {
  name: 'TheNavbarLogin',
  computed: {
    session() {
      return this.frappe.session
    },
    userItems() {
      return [
        {
          label: this.__('Logout'),
          action: () => this.frappe.logout(),
        },
      ]
    },
  },
}
</script>
