<template>
  <div class="desktop pt-8 bg-indigo-dark">
    <div class="container">
      <div class="w-4/5 mx-auto flex flex-wrap" v-if="visibleIcons.length">
        <Icon class="m-10" v-for="icon in visibleIcons" :icon="icon" :key="icon.label" />
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Icon from './DesktopIcon'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('Desktop')

export default {
  name: 'Desktop',
  components: {
    Icon
  },
  async created() {
    this.$store.commit('CurrentPage/hidePageHeader')
    this.fetchUserIcons();
  },
  methods: mapActions([
    'fetchUserIcons'
  ]),
  computed: mapGetters([
    'visibleIcons'
  ])
}
</script>

<style scoped>
.desktop {
  height: calc(100vh - 3.8rem);
}
</style>
