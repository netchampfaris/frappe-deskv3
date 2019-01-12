<template>
    <div v-if="meta">
        <FormLayout
            :fields="meta.fields"
            :doc="doc"
            @valueChange="setValue"
        />
    </div>
</template>
<script>
export default {
  name: 'FormMain',
  props: ['doc'],
  computed: {
    meta() {
      return this.$store.getters['Meta/getMeta'](this.doc.doctype)
    },
  },
  methods: {
    setValue(field, value) {
      this.$store.commit('Form/setValue', {
        doctype: this.doc.doctype,
        name: this.doc.name,
        fieldname: field.fieldname,
        value,
      })
    },
  },
}
</script>
