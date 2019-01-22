import Vue from 'vue'
import call from './modules/call'
import session from './modules/session'
import translate from './modules/translate'
import desktop from './modules/desktop'
import document from './modules/document'
import meta from './modules/meta'
import list from './modules/list'
import format from './modules/format'
import awesomebar from './modules/awesomebar'
import route from './modules/route'
import { setupFormChangeHandler } from './modules/form'

const frappe = new Vue({
  mixins: [
    call,
    session,
    translate,
    desktop,
    document,
    meta,
    list,
    format,
    route,
  ],
  data() {
    return {}
  },
})

frappe.awesomebar = new Vue(awesomebar)
setupFormChangeHandler(frappe)

Vue.prototype.frappe = frappe
window.frappe = frappe
export default frappe
