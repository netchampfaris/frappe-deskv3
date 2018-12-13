<template>
    <div class="inline-block relative">
        <slot ref="toggle" :togglePopover="togglePopover" :closePopover="closePopover"></slot>
        <div v-show="isOpen" class="bg-white absolute mt-px border shadow-md">
            <slot name="popover-content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Popover',
    props: ['items'],
    data() {
        return {
            isOpen: false
        }
    },
    created() {
        // document.addEventListener('click', this.closePopover)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closePopover)
    },
    methods: {
        togglePopover() {
            this.isOpen = !this.isOpen
        },
        closePopover(e) {
            if (e.target === this.$refs.toggle) return;
            if (this.isOpen) {
                this.isOpen = false
            }
        }
    }
}
</script>
