<template>
  <div class="font-semibold">
    <a
      class="no-underline text-grey-dark hover:text-grey-darker"
      href="#"
      role="button"
      v-if="!session.user"
      @click="login('faris@erpnext.com', 'qwe')"
    >{{ __('Login') }}</a>
    <div class="flex items-center" v-else>
      <UserAvatar class="mr-2" :user="session.user"/>
      <a
        class="no-underline text-grey-dark hover:text-grey-darker"
        href="#"
        role="button"
      >{{ session.userInfo.first_name }} {{ session.userInfo.last_name }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheNavbarLogin',
  computed: {
    session() {
      return this.frappe.session
    },
  },
  created() {
    this.frappe.fetchUserInfo()
  },
  methods: {
    async login(email = 'Administrator', password = 'qwe') {
      this.frappe.login(email, password)
    },
  },
}
</script>
