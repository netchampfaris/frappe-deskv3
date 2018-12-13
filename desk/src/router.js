import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./pages/Desktop')
  },
  {
    path: '/List/:doctype',
    component: () => import('./pages/List'),
    props: true
  },
  {
    path: '/Form/:doctype/:name',
    component: () => import('./pages/Form'),
    props: true
  },
]

export default new VueRouter({ routes });