<template>
  <span
    class="inline-block rounded-circle mr-2 indicator"
    :class="[color ? 'bg-' + color : 'bg-blue']"
  ></span>
</template>
<script>
export default {
  name: 'Indicator',
  props: ['color'],
}
</script>
<style>
.indicator {
  height: 8px;
  width: 8px;
}
</style>
