export default {
  data() {
    return {
      session: {
        user: null,
        userInfo: null,
      },
    }
  },
  methods: {
    async login(email, password) {
      await this.call('login', { usr: email, pwd: password })
      await this.fetchUserInfo()
    },
    async fetchUserInfo() {
      const userInfo = await this.call('frappe.utils.user.get_user_info')
      if (userInfo) {
        this.session.user = userInfo.name
        this.session.userInfo = userInfo
      }
    },
  },
}
