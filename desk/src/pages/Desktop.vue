<template>
  <div class="desktop pt-8 bg-indigo-dark">
    <div class="container">
      <div class="w-4/5 mx-auto flex flex-wrap" v-if="icons.length">
        <Icon class="m-10" v-for="icon in icons" :icon="icon" :key="icon.label" />
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './DesktopIcon';

export default {
  name: 'Desktop',
  components: {
    Icon
  },
  data() {
    return {
      icons: []
    }
  },
  async created() {
    const userIcons = await this.fetchUserIcons();
    if (userIcons) {
      this.icons = userIcons.icons.filter(icon => !icon.hidden);
    }
  },
  methods: {
    async fetchUserIcons() {
      return await this.call('frappe.desk.doctype.desktop_icon.desktop_icon.get_module_icons', { user: 'Administrator' })
    }
  }
}
</script>

<style scoped>
.desktop {
  height: calc(100vh - 3.8rem);
}
</style>
