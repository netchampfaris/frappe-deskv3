<template>
  <div class="app-icon">
    <feather-icon name=""/>
    <span>{{ icon.label }}</span>
  </div>
</template>
<script>
export default {
  name: 'Icon',
  props: ['icon']
}
</script>
<style scoped>
.app-icon {
  width: 4.5rem;
  height: 4.5rem;
  padding: 1.25rem;
  display: inline-block;
  margin: auto;
  text-align: center;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
}
</style>
