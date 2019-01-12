<template>
  <div class="flex flex-col items-center cursor-pointer" @click="navigate">
    <div class="w-24 h-24 rounded-3 flex items-center justify-center shadow" :style="{'background-color': icon.color}">
      <octicon v-if="iconName" :class="{'text-white': !icon.reverse}" :name="iconName" scale=2 />
    </div>
    <span class="text-white font-bold tracking-wide mt-4 text-shadow">{{ icon.label }}</span>
  </div>
</template>
<script>
export default {
  name: 'Icon',
  props: ['icon'],
  computed: {
    iconName() {
      const className = this.icon.icon
      if (!className || !className.startsWith('octicon ')) {
        return null
      }
      return className.slice('octicon octicon-'.length)
    },
  },
  methods: {
    navigate() {
      if (this.icon.link) {
        const parts = this.icon.link.split('/')
        this.$router.push(parts.slice(0, 2).join('/'))
      }
    },
  },
}
</script>
