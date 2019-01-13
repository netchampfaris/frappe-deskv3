export default {
  data() {
    return {
      docs: {},
      docinfo: {},
    }
  },
  methods: {
    async fetchDoc(doctype, name) {
      const data = await this.call('frappe.desk.form.load.getdoc', {
        doctype,
        name,
      })

      this.syncDocs(data.docs)
      this.syncDocinfo(doctype, name, data.docinfo)
      return this.getDoc(doctype, name)
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

      this.syncDocs(data.docs)
    },
    syncDocs(docs) {
      for (let doc of docs) {
        console.log('Syncing doc:', doc.doctype, doc.name)
        this.setDoc(doc.doctype, doc.name, doc)
      }
    },
    syncDocinfo(doctype, name, docinfo) {
      if (!this.docinfo[doctype]) {
        this.$set(this.docinfo, doctype, {})
      }
      this.$set(this.docinfo[doctype], name, docinfo)
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
    getDocinfo(doctype, name) {
      if (!(doctype && name)) return null
      if (!this.docinfo[doctype]) return null
      return this.docinfo[doctype][name] || null
    },
    setValue(doctype, name, fieldname, value) {
      if (this.getDoc(doctype, name)) {
        this.docs[doctype][name][fieldname] = value
        this.$set(this.docs[doctype][name], '__dirty', true)
      }
    },
  },
}
