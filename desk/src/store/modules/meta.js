import Vue from 'vue'

Vue.mixin({
  created() {
    if (this.doctype) {
      this.frappe.fetchMeta(this.doctype)
    }
  },
  computed: {
    meta() {
      if (this.doctype) {
        return this.frappe.getMeta(this.doctype)
      }
      return null
    },
  },
})

export default {
  methods: {
    async fetchMeta(doctype) {
      const meta = this.getDoc('DocType', doctype)
      if (!meta) {
        await this.fetchDoc('DocType', doctype)
      }
    },
    getMeta(doctype) {
      return this.getDoc('DocType', doctype)
    },
  },
}
