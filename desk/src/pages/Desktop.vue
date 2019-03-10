<template>
  <div class="container h-screen">
    <DesktopSection
      v-for="module in Object.keys(frappe.desktopModules)"
      :key="module"
      :moduleName="module"
      :moduleData="frappe.desktopModules[module]"
    />
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
      modules: [
        { label: 'Getting Started', icon: 'play' },
        { label: 'Accounting', icon: 'book' },
        { label: 'Buying', icon: 'package' },
        { label: 'Selling', icon: 'shopping-cart' },
      ],
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
