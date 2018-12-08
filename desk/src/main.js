import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/call'
import './plugins/globalComponents'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
