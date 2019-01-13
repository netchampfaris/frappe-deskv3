import Vue from 'vue'
import call from './modules/call'
import session from './modules/session'
import translate from './modules/translate'
import desktop from './modules/desktop'
import document from './modules/document'
import meta from './modules/meta'
import list from './modules/list'
import awesomebar from './modules/awesomebar'

const frappe = new Vue({
  mixins: [call, session, translate, desktop, document, meta, list],
  data() {
    return {}
  },
})

frappe.awesomebar = new Vue(awesomebar)

Vue.prototype.frappe = frappe
window.frappe = frappe
export default frappe
