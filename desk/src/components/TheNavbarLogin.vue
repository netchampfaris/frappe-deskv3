<template>
  <Dropdown :items="userItems">
    <div class="font-semibold py-3 px-3 hover:bg-grey-lighter cursor-pointer">
      <div class="flex items-center">
        <UserAvatar class="mr-2" :user="fr.session.user" />
        <a class="no-underline text-grey-dark" href="#" role="button"
          >{{ fr.session.userInfo.first_name }}
          {{ fr.session.userInfo.last_name }}</a
        >
      </div>
    </div>
  </Dropdown>
</template>
<script>
export default {
  name: 'TheNavbarLogin',
  computed: {
    userItems() {
      return [
        {
          label: this.__('Logout'),
          action: () => this.fr.session(),
        },
      ]
    },
  },
}
</script>
