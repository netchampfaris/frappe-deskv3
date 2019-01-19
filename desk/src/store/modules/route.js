import router from '../../router'

export default {
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
}
