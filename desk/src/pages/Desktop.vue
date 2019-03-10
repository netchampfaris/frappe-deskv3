<template>
  <div class="container">
    <div v-for="module in modulesCategories" :key="module">
      <DesktopSection
        v-if="frappe.desktopModules[module]"
        :moduleName="module"
        :moduleData="frappe.desktopModules[module]"
      />
    </div>
  </div>
</template>
<script>
import DesktopSection from './DesktopSection'

export default {
  name: 'Desktop',
  components: {
    DesktopSection,
  },
  data() {
    return {
      modulesCategories: ['Modules', 'Domains', 'Places', 'Administration'],
    }
  },
  async created() {
    this.frappe.fetchDesktopModules()
  },
}
</script>

<style scoped>
.desktop {
  height: calc(100vh - 3.8rem);
}
</style>
