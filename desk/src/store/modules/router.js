import Vue from 'vue'
import router from '../../router'

export default new Vue({
  data() {
    return {
      currentRoute: [],
    }
  },
  methods: {
    setRoute(...route) {
      route = route.join('/')

      if (!route.startsWith('/')) {
        route = '/' + route
      }
      router.push(route)

      this.currentRoute = route.split('/')
    },
    getRoute() {
      return this.currentRoute
    },
  },
})
