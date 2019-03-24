<template>
  <div id="app" class="h-screen font-sans text-black">
    <template v-if="loggedIn">
      <header class="sticky pin-t z-50">
        <TheNavbar />
        <portal-target name="page-header"></portal-target>
      </header>
      <router-view></router-view>
      <portal-target name="modals"></portal-target>
    </template>
    <Login v-if="showLogin" />
  </div>
</template>

<script>
import './style.css'
import TheNavbar from './components/TheNavbar'
import Login from './pages/Login'

export default {
  name: 'app',
  components: {
    TheNavbar,
    Login,
  },
  computed: {
    loggedIn() {
      return this.fr.session.user
    },
    showLogin() {
      return !this.fr.session.user && !this.fr.session.fetchingUserInfo
    },
  },
  created() {
    this.fr.session.fetchUserInfo()

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
