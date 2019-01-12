export default {
  data() {
    return {
      docs: {},
    }
  },
  methods: {
    async getDoc(doctype, name) {
      const doc = await this.call('frappe.client.get', {
        doctype,
        name,
      })

      if (!this.docs[doctype]) {
        this.$set(this.docs, doctype, {})
      }
      this.$set(this.docs[doctype], name, doc)

      return doc
    },
    getCachedDoc(doctype, name) {
      if (!this.docs[doctype]) return null
      return this.docs[doctype][name] || null
    },
  },
}
