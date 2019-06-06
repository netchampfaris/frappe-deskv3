import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./pages/Desktop'),
  },
  {
    path: '/List/:doctype',
    component: () => import('./pages/List'),
    props: true,
  },
  {
    path: '/Report/:doctype',
    component: () => import('./pages/Report'),
    props: true,
  },
  {
    path: '/Form/:doctype/:name',
    component: () => import('./pages/Form'),
    props: true,
  },
  {
    path: '/Print/:doctype/:name',
    component: () => import('./pages/Print'),
    props: true,
  },
  {
    path: '/PrintEditor/:doctype',
    component: () => import('./pages/PrintEditor'),
    props: true,
  },
  {
    path: '/playground',
    component: () => import('./pages/Playground'),
    props: true,
  },
]

export default new VueRouter({ routes })
