<template>
    <button class="focus:outline-none focus:shadow-outline px-4 py-3 rounded transition" :class="typeClass">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: ['type'],
    computed: {
        typeClass() {
            return {
                'bg-blue hover:bg-blue-dark text-white': this.type === 'primary',
                'bg-grey-lighter hover:bg-grey-light': this.type !== 'primary'
            }
        }
    }
}
</script>
