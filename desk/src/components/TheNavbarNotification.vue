<template>
  <div class="p-2 text-center bg-red-light hover:bg-red-dark rounded">
    <span class="px-1 text-lg font-bold text-white">{{ count }}</span>
  </div>
</template>
<script>
export default {
  name: 'TheNavbarNotification',
  data() {
    return {
      count: 12,
    }
  },
}
</script>
