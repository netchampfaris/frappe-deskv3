export default {
  props: ['doctype', 'name'],
  methods: {
    add_custom_button() {
      console.log('add custom button')
    },
  },
  computed: {
    doc() {
      return this.frappe.getDoc(this.doctype, this.name)
    },
  },
}

let handlers = {}

function addHandler(doctype, fieldname, handler) {
  handlers[doctype] = handlers[doctype] || {}
  handlers[doctype][fieldname] = handlers[doctype][fieldname] || []
  handlers[doctype][fieldname].push(handler)
}

function getHandlers(doctype, fieldname) {
  if (handlers[doctype]) {
    return handlers[doctype][fieldname]
  }
  return []
}

function setupFormChangeHandler(frappe) {
  frappe.ui = {}
  frappe.ui.form = {}
  frappe.ui.form.on = function formChangeHandler(doctype, handler_obj) {
    for (let fieldname in handler_obj) {
      const handler = handler_obj[fieldname]
      addHandler(doctype, fieldname, handler)
    }
  }
}

export { setupFormChangeHandler, getHandlers }
