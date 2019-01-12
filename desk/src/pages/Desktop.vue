<template>
  <div class="desktop pt-8 bg-indigo-dark">
    <div class="container">
      <div class="w-4/5 mx-auto flex flex-wrap" v-if="desktopIcons.length">
        <Icon class="m-10" v-for="icon in desktopIcons" :icon="icon" :key="icon.label"/>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './DesktopIcon'

export default {
  name: 'Desktop',
  components: {
    Icon,
  },
  async created() {
    this.frappe.fetchUserIcons()
  },
  computed: {
    desktopIcons() {
      return this.frappe.desktopIcons
    },
  },
}
</script>

<style scoped>
.desktop {
  height: calc(100vh - 3.8rem);
}
</style>
