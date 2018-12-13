<template>
    <div class="inline-block relative">
        <Button ref="button" @click="isOpen = !isOpen" iconRight="chevron-down">
            <slot></slot>
        </Button>
        <ul v-show="isOpen" class="list-reset cursor-pointer bg-white absolute mt-px border w-64 shadow-md pin-r rounded-b">
            <li
                class="transition p-5 hover:bg-grey-lighter"
                v-for="item of items" :key="item"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Dropdown',
    props: ['items'],
    data() {
        return {
            isOpen: false
        }
    },
    created() {
        document.addEventListener('click', this.closeDropdown)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown)
    },
    methods: {
        closeDropdown(e) {
            if (e.target === this.$refs.button.$el) return;
            if (this.isOpen) {
                this.isOpen = false
            }
        }
    }
}
</script>
