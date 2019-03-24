import Vue from 'vue'

export default new Vue({
  data() {
    return {
      user: null,
      userInfo: null,
      fetchingUserInfo: false,
    }
  },
  methods: {
    async login(email, password) {
      await this.fr.call('login', { usr: email, pwd: password })
      await this.fetchUserInfo()
    },
    async logout() {
      await this.fr.call('logout')
      this.user = null
      this.userInfo = null
    },
    async fetchUserInfo() {
      this.fetchingUserInfo = true
      const userInfo = await this.fr.call('frappe.utils.user.get_user_info')
      this.fetchingUserInfo = false
      if (userInfo) {
        this.user = userInfo.name
        this.userInfo = userInfo
      }
    },
  },
})
