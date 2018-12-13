<template>
    <button
        class="focus:outline-none transition inline-flex items-center"
        :class="typeClass"
        v-bind="$attrs"
        v-on="$listeners"
        type="button"
    >
        <slot></slot>
        <FeatherIcon class="ml-2" :name="iconRight" v-if="iconRight" :size="12" />
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: ['type', 'rounded', 'iconRight', 'size'],
    computed: {
        typeClass() {
            return {
                'bg-blue hover:bg-blue-dark text-white focus:shadow-outline': this.type === 'primary',
                'bg-grey-lighter hover:bg-grey-light focus:shadow-outline-grey': this.type !== 'primary',
                'rounded': !this.rounded,
                'rounded-l': this.rounded === 'left',
                'rounded-r': this.rounded === 'right',
                'px-4 py-3': this.size !== 'small',
                'px-3 py-2 text-sm': this.size === 'small'
            }
        }
    }
}
</script>
