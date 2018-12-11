<template>
    <button
        class="focus:outline-none px-4 py-3 transition"
        :class="typeClass"
        v-bind="$attrs"
        v-on="$listeners"
        type="button"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: ['type', 'rounded'],
    computed: {
        typeClass() {
            return {
                'bg-blue hover:bg-blue-dark text-white focus:shadow-outline': this.type === 'primary',
                'bg-grey-lighter hover:bg-grey-light focus:shadow-outline-grey': this.type !== 'primary',
                'rounded': !this.rounded,
                'rounded-l': this.rounded === 'left',
                'rounded-r': this.rounded === 'right'
            }
        }
    }
}
</script>
