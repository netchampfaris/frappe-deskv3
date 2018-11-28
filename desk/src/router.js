import VueRouter from 'vue-router'
import Desktop from './pages/Desktop';

const routes = [
  {
    path: '/',
    component: Desktop
  }
]

export default new VueRouter({ routes });