export default {
  methods: {
    async fetchMeta(doctype) {
      const meta = this.getCachedDoc('DocType', doctype)
      if (!meta) {
        await this.getDoc('DocType', doctype)
      }
    },
    getMeta(doctype) {
      return this.getCachedDoc('DocType', doctype)
    },
  },
}
