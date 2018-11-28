import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons'
import './frappe-vue'

Vue.component('octicon', Octicon)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
