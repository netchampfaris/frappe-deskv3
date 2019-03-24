import Vue from 'vue'

export default new Vue({
  data() {
    return {
      translations: {},
    }
  },
  created() {
    Vue.prototype.__ = this._
  },
  methods: {
    _(text, ...values) {
      if (!text) return text
      if (typeof text !== 'string') return text
      if (Array.isArray(values[0])) {
        values = values[0]
      }
      let translated = this.translations[text.replace(/\n/g, '')] || text
      values.forEach((value, i) => {
        const regexp = new RegExp(`\\{${i}\\}`, 'g')
        translated = translated.replace(regexp, value)
      })
      return translated
    },
  },
})
