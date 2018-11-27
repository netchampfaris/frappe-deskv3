import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import FeatherIcons from 'vue-feather-icons';
import './frappe-vue'

Vue.use(VueRouter);
Vue.use(FeatherIcons);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
