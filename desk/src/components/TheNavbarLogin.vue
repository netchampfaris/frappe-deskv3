<template>
  <div class="font-semibold">
    <a
      class="no-underline text-grey-dark hover:text-grey-darker"
      href="#"
      role="button"
      v-if="!user"
      @click="login('faris@erpnext.com', 'qwe')"
    >Login</a>
    <div class="flex items-center" v-else>
      <UserAvatar class="mr-2" :user="user.email"/>
      <a
        class="no-underline text-grey-dark hover:text-grey-darker"
        href="#"
        role="button"
      >{{ user.first_name }} {{ user.last_name }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheNavbarLogin',
  computed: {
    user() {
      return this.$store.state.CurrentUser.user;
    }
  },
  created() {
    this.$store.dispatch('CurrentUser/fetchUserInfo');
  },
  methods: {
    async login(email = 'Administrator', password = 'qwe') {
      this.$store.dispatch('CurrentUser/login', { email, password });
    }
  }
};
</script>
