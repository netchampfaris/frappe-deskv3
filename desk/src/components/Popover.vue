<template>
    <div class="inline-block relative" v-on-outside-click="closePopover">
        <div @click="togglePopover">
            <slot ref="toggle" :togglePopover="togglePopover" :closePopover="closePopover"></slot>
        </div>
        <div v-show="isOpen" class="absolute mt-px" :class="alignClass">
            <slot name="popover-content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Popover',
    props: ['align'],
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        alignClass() {
            return [this.align === 'right' ? 'pin-r' : 'pin-l']
        }
    },
    methods: {
        togglePopover() {
            this.isOpen = !this.isOpen
        },
        closePopover() {
            this.isOpen = false
        }
    }
}
</script>
