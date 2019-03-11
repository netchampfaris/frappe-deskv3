<template>
  <Popover :align="align">
    <slot></slot>
    <ul
      slot="popover-content"
      class="list-reset cursor-pointer bg-white border w-64 shadow-md rounded-b"
    >
      <li
        class="transition p-5 hover:bg-grey-lighter"
        v-for="item of dropdownItems"
        :key="item.label"
        @click="item.action"
      >{{ item.label }}</li>
    </ul>
  </Popover>
</template>
<script>
export default {
  name: 'Dropdown',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: 'Dropdown',
    },
    align: {
      type: String,
      default: 'right',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    dropdownItems() {
      return (this.items || []).map(item => {
        if (typeof item === 'string') {
          return {
            label: item,
            action: console.log,
          }
        }
        if (!item.action && item.route) {
          item.action = this.setRoute.bind(this, item.route)
        }
        return item
      })
    },
  },
  methods: {
    setRoute(route) {
      this.$router.push(route)
    },
  },
}
</script>
