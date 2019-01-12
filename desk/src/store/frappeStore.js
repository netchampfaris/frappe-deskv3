import Vue from 'vue'
import call from './modules/call'
import session from './modules/session'
import translate from './modules/translate'
import desktop from './modules/desktop'

const frappe = new Vue({
  mixins: [call, session, translate, desktop],
  data() {
    return {
      docs: {},
    }
  },
})

Vue.prototype.frappe = frappe
window.frappe = frappe
export default frappe
