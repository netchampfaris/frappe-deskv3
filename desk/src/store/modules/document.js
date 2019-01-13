export default {
  data() {
    return {
      docs: {},
    }
  },
  methods: {
    async fetchDoc(doctype, name) {
      const doc = await this.call('frappe.client.get', {
        doctype,
        name,
      })
      this.setDoc(doctype, name, doc)
      return doc
    },
    async saveDoc(doctype, name) {
      let doc = this.getDoc(doctype, name)
      if (!doc) {
        console.warn('Document not found:', doctype, name)
        return
      }

      let data = await this.call('frappe.desk.form.save.savedocs', {
        doc: JSON.stringify(doc),
        action: 'Save',
      })

      for (let doc of data.docs) {
        console.log('Syncing doc:', doc.doctype, doc.name)
        this.setDoc(doc.doctype, doc.name, doc)
      }
    },
    setDoc(doctype, name, doc) {
      if (!this.docs[doctype]) {
        this.$set(this.docs, doctype, {})
      }
      this.$set(this.docs[doctype], name, doc)
    },
    getDoc(doctype, name) {
      if (!(doctype && name)) return null
      if (!this.docs[doctype]) return null
      return this.docs[doctype][name] || null
    },
    setValue(doctype, name, fieldname, value) {
      if (this.getDoc(doctype, name)) {
        this.docs[doctype][name][fieldname] = value
        this.$set(this.docs[doctype][name], '__dirty', true)
      }
    },
  },
}
