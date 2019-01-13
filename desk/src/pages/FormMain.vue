<template>
  <div v-if="meta">
    <FormLayout :fields="meta.fields" :doc="doc" @valueChange="setValue"/>
  </div>
</template>
<script>
export default {
  name: 'FormMain',
  props: ['doc'],
  computed: {
    doctype() {
      return this.doc.doctype
    },
  },
  methods: {
    setValue(field, value) {
      this.frappe.setValue(
        this.doc.doctype,
        this.doc.name,
        field.fieldname,
        value
      )
    },
  },
}
</script>
