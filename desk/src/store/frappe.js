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
import notification from './modules/notification'
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
    notification,
  ],
  data() {
    return {}
  },
})

frappe.awesomebar = new Vue(awesomebar)
frappe.list = list
setupFormChangeHandler(frappe)

Vue.prototype.frappe = frappe
Vue.prototype.fr = frappe
window.frappe = frappe
window.fr = frappe

export default frappe
