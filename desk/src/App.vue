<template>
  <div id="app" class="font-sans text-black">
    <template v-if="loggedIn">
      <header class="sticky pin-t z-50">
        <TheNavbar/>
      </header>
      <router-view></router-view>
    </template>
    <Login v-if="showLogin"/>
  </div>
</template>

<script>
import './style.css'
import TheNavbar from './components/TheNavbar'
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    TheNavbar,
    Login,
  },
  computed: {
    loggedIn() {
      return this.frappe.session.user
    },
    showLogin() {
      return !this.frappe.session.user && !this.frappe.session.fetchingUserInfo
    },
  },
  created() {
    this.frappe.fetchUserInfo()

    document.addEventListener('keydown', e => {
      let ctrlKey = e.ctrlKey || e.metaKey
      if (ctrlKey && e.keyCode === 71) {
        e.preventDefault()
        this.frappe.awesomebar.toggleFocus(true)
      }
    })
  },
}
</script>
<style>
html,
body {
  font-size: 12px;
}
</style>
