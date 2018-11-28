import VueRouter from 'vue-router'
import Desktop from './pages/Desktop';
import List from './pages/List';

const routes = [
  {
    path: '/',
    component: Desktop
  },
  {
    path: '/List/:doctype',
    component: List,
    props: true
  }
]

export default new VueRouter({ routes });