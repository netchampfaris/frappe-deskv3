<template>
  <button
    class="focus:outline-none transition inline-flex items-center"
    :class="typeClass"
    :disabled="isLoading"
    v-bind="$attrs"
    v-on="$listeners"
    type="button"
  >
    <span v-if="renderSlot" class="inline-block" :class="padding">
      <slot></slot>
    </span>
    <LoadingSpinner v-if="isLoading" :type="loadingType" class="py-2"/>
    <FeatherIcon class="ml-2" :name="iconRight" v-if="iconRight" :size="12"/>
    <FeatherIcon :name="icon" v-if="icon" :size="12"/>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    type: {
      default: 'secondary',
    },
    rounded: {
      default: 'all',
    },
    iconRight: {
      type: String,
    },
    size: {
      type: Number,
    },
    icon: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeClass() {
      const onlyIcon = Boolean(this.icon)
      let classes = []
      if (this.type === 'primary') {
        classes.push('text-white focus:shadow-outline')

        if (this.isLoading) {
          classes.push('bg-blue-lighter')
        } else {
          classes.push('bg-blue hover:bg-blue-dark')
        }
      }

      if (this.type === 'secondary') {
        classes.push('bg-grey-lighter focus:shadow-outline-grey')
        if (!this.isLoading) {
          classes.push('hover:bg-grey-light')
        }
      }

      if (this.rounded === 'all') {
        classes.push('rounded')
      } else if (this.rounded === 'left') {
        classes.push('rounded-l')
      } else if (this.rounded === 'right') {
        classes.push('rounded-r')
      }

      // if (onlyIcon) {
      //   classes.push('p-2')
      // } else {
      //   classes.push(this.size === 'small' ? 'px-3 py-2' : 'px-4 py-3')
      // }

      if (this.size === 'small') {
        classes.push('text-sm')
      }

      classes.push(this.isLoading ? 'cursor-not-allowed' : 'cursor-pointer')

      return classes
    },
    padding() {
      let classes = []
      if (this.icon) {
        classes.push('p-2')
      } else {
        classes.push(this.size === 'small' ? 'px-3 py-2' : 'px-4 py-3')
      }
      return classes
    },
    renderSlot() {
      return !this.isLoading || this.icon
    },
    loadingType() {
      return this.type === 'primary' ? 'light' : 'dark'
    },
  },
}
</script>
