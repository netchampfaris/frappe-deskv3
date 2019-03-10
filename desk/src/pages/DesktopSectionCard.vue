<template>
  <div
    class="py-6 px-4 rounded bg-white border hover:shadow cursor-pointer focus:shadow-none focus:border-blue focus:shadow-inner outline-none flex justify-between items-center"
    tabindex="0"
  >
    <a
      class="flex items-center no-underline focus:underline focus:outline-none hover:underline"
      :href="link"
    >
      <FeatherIcon class="w-12 text-muted" :name="item.feather" :size="24" />
      <h3 class="text-dark text-xl font-medium">{{ item.label }}</h3>
    </a>
    <Dropdown v-if="item.links" :items="item.links" class="text-sm">
      <button
        class="flex hover:bg-grey-lighter focus:bg-grey-lighter p-1 rounded-full focus:outline-none focus:border-blue"
      >
        <FeatherIcon name="chevron-down" class="self-center" />
      </button>
    </Dropdown>
  </div>
</template>
<script>
export default {
  name: 'DesktopSectionCard',
  props: ['item'],
  computed: {
    link() {
      return this.item.type === 'module'
        ? '#modules/' + this.item.label
        : this.item.link
    },
  },
}
</script>
