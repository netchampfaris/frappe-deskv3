import Vue from 'vue'
import debounce from 'lodash/debounce'

export default new Vue({
  data() {
    return {
      isFocused: false,
      keyword: '',
      suggestions: [],
    }
  },
  watch: {
    keyword(newValue, oldValue) {
      if (newValue === oldValue) return
      const suggestions = this.getSuggestions(newValue, oldValue)
      if (suggestions !== false) {
        this.suggestions = suggestions
      }
    },
  },
  methods: {
    getSuggestions: debounce(function(keyword, oldKeyword) {
      keyword = keyword.toLowerCase()
      let suggestions = []

      suggestions = suggestions.concat(this.getRoutables(keyword, oldKeyword))

      if (keyword.startsWith('new')) {
        suggestions = suggestions.concat(
          this.getCreatables(keyword, oldKeyword)
        )
      }

      return suggestions
    }, 300),

    getCreatables(keyword, oldKeyword) {
      if (oldKeyword.startsWith('new')) return []

      const userInfo = this.frappe.session.userInfo
      return userInfo.can_create.map(doctype => {
        return {
          label: this.__('New {0}', doctype),
          value: this.__('New {0}', doctype),
          type: 'create',
          doctype: doctype,
        }
      })
    },

    getRoutables() {
      const userInfo = this.frappe.session.userInfo
      return userInfo.can_read.map(doctype => {
        return {
          label: this.__(doctype),
          value: this.__(doctype),
          type: 'route',
          doctype,
        }
      })
    },

    onSelection(item) {
      if (item.type === 'create') {
        console.log('Create new', item.doctype)
      } else if (item.type === 'route') {
        this.frappe.fetchMeta(item.doctype).then(meta => {
          if (meta.issingle) {
            this.frappe.setRoute('Form', item.doctype, item.doctype)
          } else {
            this.frappe.setRoute('List', item.doctype)
          }
        })
        console.log('Routing to', item.route)
      }

      this.keyword = ''
    },
    toggleFocus(flag) {
      if (flag !== undefined) {
        this.isFocused = flag
      } else {
        this.isFocused = !this.isFocused
      }
    },
  },
})
