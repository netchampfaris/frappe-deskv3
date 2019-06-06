import Vue from 'vue'
import router from '../../router'

export default new Vue({
  methods: {
    setRoute(...route) {
      route = route.join('/')

      if (!route.startsWith('/')) {
        route = '/' + route
      }
      router.push(route)
    },
    getRoute() {
      return this.currentRouteStr
    },
  },
  computed: {
    currentRouteStr() {
      return router.currentRoute.fullPath
    },
  },
})
