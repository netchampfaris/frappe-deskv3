<template>
    <div v-if="meta">
        <FormLayout />
    </div>
</template>
<script>
export default {
    name: 'FormMain',
    props: ['doctype', 'name'],
    computed: {
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        }
    },
}
</script>
