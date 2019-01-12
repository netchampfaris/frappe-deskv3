<template>
    <Popover align="right">
        <Button iconRight="chevron-down">
            <slot></slot>
        </Button>
        <ul slot="popover-content" class="list-reset cursor-pointer bg-white border w-64 shadow-md rounded-b">
            <li
                class="transition p-5 hover:bg-grey-lighter"
                v-for="item of items" :key="item"
            >
                {{ item }}
            </li>
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
}
</script>
