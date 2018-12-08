import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import './plugins/call'
import './plugins/globalComponents'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
