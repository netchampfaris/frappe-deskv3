<template>
  <div class="desktop">
    <div class="container">
      <div class="desktop-icons" v-if="icons.length">
        <Icon class="desktop-icon" v-for="icon in icons" :icon="icon" :key="icon.label" />
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
  background-color: #4B4C9D;
  height: calc(100vh - 3.6rem);
}
.desktop-icons {
  width: 80%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
}

.desktop-icon {
  padding: 2rem;
}
</style>
