<template>
  <div
    class="py-6 px-4 rounded bg-white border hover:shadow cursor-pointer focus:shadow-none focus:border-blue focus:shadow-inner outline-none flex justify-between items-center"
    tabindex="0"
  >
    <div class="flex items-center">
      <FeatherIcon class="w-12 text-muted" :name="item.feather" :size="24" />
      <h3 class="text-dark font-normal">{{ item.label }}</h3>
    </div>
    <Dropdown v-if="item.links" :items="item.links" class="text-sm">
      <button class="flex focus:outline-none focus:border-blue">
        <FeatherIcon name="chevron-down" class="self-center" />
      </button>
    </Dropdown>
  </div>
</template>
<script>
export default {
  name: 'DesktopSectionCard',
  props: ['item'],
}
</script>
