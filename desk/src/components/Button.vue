<template>
  <button
    class="focus:outline-none transition"
    :class="typeClass"
    :disabled="isLoading"
    v-bind="$attrs"
    v-on="$listeners"
    type="button"
  >
    <span v-if="renderSlot" class="inline-flex items-center" :class="padding">
      <slot></slot>
      <FeatherIcon class="ml-2" :name="iconRight" v-if="iconRight" :size="12"/>
      <FeatherIcon :name="icon" v-if="icon" :size="12"/>
    </span>
    <LoadingSpinner v-if="isLoading" :type="loadingType" class="py-2"/>
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
      type: String,
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
