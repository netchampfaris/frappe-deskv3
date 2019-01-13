import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/globalComponents'
import './plugins/outsideClickDirective'
import './store/frappe'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
