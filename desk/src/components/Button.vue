<template>
  <button
    class="focus:outline-none transition inline-flex items-center"
    :class="typeClass"
    v-bind="$attrs"
    v-on="$listeners"
    type="button"
  >
    <slot></slot>
    <FeatherIcon class="ml-2" :name="iconRight" v-if="iconRight" :size="12"/>
    <FeatherIcon :name="icon" v-if="icon" :size="12"/>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: ['type', 'rounded', 'iconRight', 'size', 'icon'],
  computed: {
    typeClass() {
      const onlyIcon = Boolean(this.icon)
      return {
        'bg-blue hover:bg-blue-dark text-white focus:shadow-outline':
          this.type === 'primary',
        'bg-grey-lighter hover:bg-grey-light focus:shadow-outline-grey':
          this.type !== 'primary',
        rounded: !this.rounded,
        'rounded-l': this.rounded === 'left',
        'rounded-r': this.rounded === 'right',
        'px-4 py-3': this.size !== 'small' && !onlyIcon,
        'px-3 py-2': this.size === 'small' && !onlyIcon,
        'text-sm': this.size === 'small',
        'p-2': onlyIcon,
      }
    },
  },
}
</script>
