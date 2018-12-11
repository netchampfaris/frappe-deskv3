<template>
    <input
        class="py-3 px-4 bg-grey-lighter focus:bg-white focus:outline-none border border-transparent focus:border-grey-light rounded w-128 transition"
        type="search"
        placeholder="Search or type a command (Ctrl + G)"
        aria-label="Search"
        @blur="deFocus"
    >
</template>
<script>
export default {
    name: 'TheAwesomeBar',
    watch: {
        isFocused(newValue, oldValue) {
            if (newValue) {
                this.$el.focus()
            }
        }
    },
    methods: {
        deFocus() {
            this.$store.commit('TheAwesomeBar/setFocus', { isFocused: false })
        }
    },
    computed: {
        isFocused() {
            return this.$store.state['TheAwesomeBar'].isFocused
        }
    }
}
</script>
