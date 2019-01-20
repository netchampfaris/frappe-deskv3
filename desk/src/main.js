import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'
import './plugins/globalComponents'
import './plugins/outsideClickDirective'
import './store/frappe'

Vue.config.productionTip = false
Vue.use(PortalVue)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
