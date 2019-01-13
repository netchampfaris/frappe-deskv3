<template>
  <Popover align="right">
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
  props: ['items', 'label'],
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
        return item
      })
    },
  },
}
</script>
