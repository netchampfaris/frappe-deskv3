import Vue from 'vue'
import request from './modules/request'
import session from './modules/session'
import translate from './modules/translate'
import desktop from './modules/desktop'
import model from './modules/model'
import meta from './modules/meta'
import list from './modules/list'
import format from './modules/format'
import awesomebar from './modules/awesomebar'
import router from './modules/router'
import notification from './modules/notification'
import { setupFormChangeHandler } from './modules/form'

const frappe = new Vue({
  mixins: [meta],
  data() {
    return {}
  },
})

// append modules to frappe object
frappe.awesomebar = awesomebar
frappe.desktop = desktop
frappe.format = format
frappe.list = list
frappe.model = model
frappe.notification = notification
frappe.request = request
frappe.router = router
frappe.session = session
frappe.translate = translate

// convenience method shortcuts
frappe.call = frappe.request.call
frappe._ = frappe.translate._

setupFormChangeHandler(frappe)

Vue.prototype.frappe = frappe
Vue.prototype.fr = frappe
window.frappe = frappe
window.fr = frappe

export default frappe
