<template>
  <div class="container">
    <div v-for="module in modulesCategories" :key="module">
      <DesktopSection
        v-if="fr.desktop.desktopModules[module]"
        :moduleName="module"
        :moduleData="fr.desktop.desktopModules[module]"
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
    this.fr.desktop.fetchDesktopModules()
  },
}
</script>

<style scoped>
.desktop {
  height: calc(100vh - 3.8rem);
}
</style>
