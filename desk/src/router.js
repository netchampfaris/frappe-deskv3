import VueRouter from 'vue-router'
import Desktop from './pages/Desktop';
import List from './pages/List';
import Form from './pages/Form';

const routes = [
  {
    path: '/',
    component: Desktop
  },
  {
    path: '/List/:doctype',
    component: List,
    props: true
  },
  {
    path: '/Form/:doctype/:name',
    component: Form,
    props: true
  },
]

export default new VueRouter({ routes });