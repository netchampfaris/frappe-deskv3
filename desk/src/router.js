import VueRouter from 'vue-router'
import Desktop from './pages/Desktop/index';

const routes = [
  {
    path: '/',
    component: Desktop
  }
]

export default new VueRouter({ routes });