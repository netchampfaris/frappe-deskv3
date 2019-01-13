export default {
  data() {
    return {
      session: {
        user: null,
        userInfo: null,
        fetchingUserInfo: false,
      },
    }
  },
  methods: {
    async login(email, password) {
      await this.call('login', { usr: email, pwd: password })
      await this.fetchUserInfo()
    },
    async logout() {
      await this.call('logout')
      this.session.user = null
      this.session.userInfo = null
    },
    async fetchUserInfo() {
      this.fetchingUserInfo = true
      const userInfo = await this.call('frappe.utils.user.get_user_info')
      this.fetchingUserInfo = false
      if (userInfo) {
        this.session.user = userInfo.name
        this.session.userInfo = userInfo
      }
    },
  },
}
