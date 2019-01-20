<template>
  <portal to="modals">
    <div class="modal fixed pin-y pin-x z-50">
      <transition name="fade">
        <div v-if="showModal" class="backdrop absolute h-full w-full" @click="hide"></div>
      </transition>
      <transition name="slide-in" @after-leave="afterTransitionEnd">
        <div
          class="content bg-white relative m-auto mt-10 w-1/2 rounded shadow-lg"
          v-if="showModal"
        >
          <slot name="header">
            <div class="flex items-center justify-between px-5 py-3 border-b">
              <h3>{{ title }}</h3>
              <div>
                <Button class="mr-2" @click="hide">{{ secondaryActionLabel }}</Button>
                <Button type="primary">{{ primaryActionLabel }}</Button>
              </div>
            </div>
          </slot>
          <slot name="body">
            <div class="p-4"></div>
          </slot>
        </div>
      </transition>
    </div>
  </portal>
</template>

<script>
import frappe from '../store/frappe'

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: frappe._('Modal Title'),
    },
    primaryAction: {
      type: Function,
    },
    primaryActionLabel: {
      type: String,
      default: frappe._('Submit'),
    },
    secondaryActionLabel: {
      type: String,
      default: frappe._('Close'),
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  mounted() {
    this.showModal = true
  },
  methods: {
    hide() {
      this.showModal = false
    },
    afterTransitionEnd() {
      this.$emit('hide')
    },
  },
}
</script>
<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition-property: transform opacity;
  transition-duration: 300ms;
}
.slide-in-enter {
  transform: translateY(-50%);
}
.slide-in-enter-to,
.slide-in-leave {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
