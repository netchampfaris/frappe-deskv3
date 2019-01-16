<template>
  <div
    class="inline-block relative"
    :class="{'w-full': this.fullwidth}"
    v-on-outside-click="closePopover"
  >
    <div @click="togglePopover">
      <slot :togglePopover="togglePopover" :closePopover="closePopover"></slot>
    </div>
    <div v-show="isOpen" class="absolute mt-px z-20" :class="popoverClasses">
      <slot name="popover-content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Popover',
  props: {
    align: {
      default: 'left',
    },
    fullwidth: {
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    popoverClasses() {
      return {
        'pin-r': this.align === 'right',
        'pin-l': this.align === 'left',
        'w-full': this.fullwidth === true,
      }
    },
  },
  methods: {
    togglePopover() {
      this.isOpen = !this.isOpen
    },
    closePopover() {
      this.isOpen = false
    },
  },
}
</script>
