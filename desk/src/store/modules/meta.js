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
      let meta = this.getMeta(doctype)
      if (!meta) {
        const data = await this.fr.call('frappe.desk.form.load.getdoctype', {
          doctype,
          with_parent: 1,
        })
        this.syncDocs(data.docs)
        this.syncDocinfo('DocType', doctype, data.docinfo)
        meta = this.getMeta(doctype)
      }
      return meta
    },
    getMeta(doctype) {
      return this.getDoc('DocType', doctype)
    },
  },
}
