import Vue from 'vue'
import { makeDoc } from './document'

export default new Vue({
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
      this.$set(this.docs[doctype], name, this.makeDoc(doc))
    },
    makeDoc(doc) {
      return makeDoc(doc)
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
      const doc = this.getDoc(doctype, name)
      if (doc) {
        doc.setValue(fieldname, value)
        doc.dirty()
        this.$emit('document:setValue', doctype, name, fieldname, value)
      }
    },
    setDirty(doctype, name) {
      const doc = this.getDoc(doctype, name)
      if (doc) {
        doc.dirty()
      }
    },
    newDoc(doctype) {
      const doc = {
        docstatus: 0,
        doctype: doctype,
        name: this.getNewName(doctype),
        owner: this.fr.session.user,
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
      const meta = this.fr.getMeta(doctype)
      const doc = this.getDoc(doctype, name)
      if (!doc || !meta) return null

      if (meta.title_field) {
        return doc[meta.title_field]
      }
      return doc.name
    },
    getIndicator(doctype, name) {
      const doc = this.getDoc(doctype, name)
      if (doc && doc.isDirty) {
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
    getStandardFields() {
      return [
        'name',
        'owner',
        'creation',
        'modified',
        'modified_by',
        '_user_tags',
        '_comments',
        '_assign',
        '_liked_by',
        'docstatus',
        'parent',
        'parenttype',
        'parentfield',
        'idx',
      ]
    },
  },
})
