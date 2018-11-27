<template>
  <div class="desktop h-100">
    <div class="container">
      <div class="icons">
       <Icon v-for="icon in icons" :icon="icon" :key="icon.label" />
      </div>
    </div>
  </div>
</template>
<script>
import Icon from './Icon';

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
    this.icons = (await this.fetchUserIcons()).icons;
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
}
</style>
