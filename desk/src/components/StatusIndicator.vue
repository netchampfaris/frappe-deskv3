<template>
  <span>
    <Indicator :color="color" />
    <span>{{ status }}</span>
  </span>
</template>
<script>
export default {
  name: 'StatusIndicator',
  props: ['doctype', 'name'],
  async created() {
    if (!this.doc) {
      this.doc = await this.frappe.fetchDoc(this.doctype, this.name)
    }
  },
  computed: {
    status() {
      const doc = this.frappe.getDoc(this.doctype, this.name)
      if (!doc) {
        return ''
      }
      if (doc && doc.__dirty) {
        return this.__('Not Saved')
      }
      return doc.status
    },
    color() {
      const doc = this.frappe.getDoc(this.doctype, this.name)
      if (!doc) {
        return 'grey'
      }
      if (doc && doc.__dirty) {
        return 'orange'
      }

      const colorMap = {
        Open: 'red',
        Closed: 'green',
        Pending: 'orange',
      }
      return colorMap[doc.status]
    },
  },
}
</script>
