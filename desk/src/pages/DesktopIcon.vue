<template>
  <div class="app-icon" @click="navigate">
    <div class="app-icon-background" :style="{'background-color': icon.color}">
      <octicon v-if="iconName" :class="{'text-white': !icon.reverse}" :name="iconName" scale=2 />
    </div>
    <span class="app-icon-label text-truncate">{{ icon.label }}</span>
  </div>
</template>
<script>
export default {
  name: 'Icon',
  props: ['icon'],
  computed: {
    iconName() {
      const className = this.icon.icon;
      if (!className || !className.startsWith('octicon ')) {
        return null;
      }
      return className.slice('octicon octicon-'.length);
    }
  },
  methods: {
    navigate() {
      if (this.icon.link) {
        const parts = this.icon.link.split('/');
        this.$router.push(parts.slice(0, 2).join('/'));
      }
    }
  }
}
</script>
<style scoped>
.app-icon {
  text-align: center;
  width: 10rem;
}
.app-icon-background {
  width: 5rem;
  height: 5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.app-icon-label {
  color: #fff;
  font-weight: bold;
  font-size: 0.85rem;
}
</style>
