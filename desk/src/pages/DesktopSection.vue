<template>
  <div class="py-8">
    <div class="text text-muted tracking-wide uppercase">{{ moduleName }}</div>
    <div class="flex flex-wrap -mx-3">
      <div class="w-1/3" v-for="module in moduleData" :key="module.label">
        <DesktopSectionCard class="m-3" :item="module"/>
      </div>
    </div>
  </div>
</template>
<script>
import DesktopSectionCard from './DesktopSectionCard'
export default {
  name: 'Desktop Section',
  props: ['moduleName', 'moduleData'],
  components: {
    DesktopSectionCard,
  },
}
</script>
