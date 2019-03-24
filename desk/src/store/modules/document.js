export default {
  data() {
    return {
      docs: {},
      docinfo: {},
      localDocsCount: {},
    }
  },
  methods: {
    async fetchDoc(doctype, name) {
      const data = await this.fr.call('frappe.desk.form.load.getdoc', {
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

      let data = await this.fr.call('frappe.desk.form.save.savedocs', {
        doc: JSON.stringify(doc),
        action: 'Save',
      })

      this.syncDocs(data.docs)
      // the name of the document might change after save
      const updatedName = (data.docs.find(doc => doc.doctype === doctype) || {})
        .name
      return this.getDoc(doctype, updatedName || name)
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
        this.$emit('document:setValue', doctype, name, fieldname, value)
        this.runFormValidate(doctype, name)
      }
    },
    async runFormValidate(doctype, name) {
      const doc = await this.fr.call('run_controller_method', {
        method: 'form_validate',
        doctype,
        name,
        doc: this.getDoc(doctype, name),
      })
      this.setDoc(doctype, name, doc)
      this.setDirty(doctype, name)
    },
    setDirty(doctype, name) {
      const doc = this.getDoc(doctype, name)
      if (doc) {
        doc.__dirty = true
      }
    },
    newDoc(doctype) {
      const doc = {
        docstatus: 0,
        doctype: doctype,
        name: this.getNewName(doctype),
        owner: this.frappe.session.user,
        __islocal: 1,
        __unsaved: 1,
      }
      return doc
    },
    getNewName(doctype) {
      if (!this.localDocsCount[doctype]) {
        this.localDocsCount[doctype] = 0
      }
      this.localDocsCount[doctype] += 1
      return this.__(
        'New {0} {1}',
        this.__(doctype),
        this.localDocsCount[doctype]
      )
    },
    getDocumentTitle(doctype, name) {
      const meta = this.getMeta(doctype)
      const doc = this.getDoc(doctype, name)
      if (!doc || !meta) return null

      if (meta.title_field) {
        return doc[meta.title_field]
      }
      return doc.name
    },
    getIndicator(doctype, name) {
      const doc = this.getDoc(doctype, name)
      if (doc && doc.__dirty) {
        return {
          text: this.__('Not Saved'),
          color: 'orange',
        }
      }
      return {
        text: '',
        color: null,
      }
    },
  },
}
