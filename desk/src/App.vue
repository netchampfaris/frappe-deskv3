<template>
  <div id="app" class="font-sans text-black">
    <header class="sticky pin-t z-50">
      <TheNavbar />
    </header>
    <router-view v-if="loggedIn"></router-view>
  </div>
</template>

<script>
import './style.css'
import TheNavbar from './components/TheNavbar'
import ThePageHeader from './components/ThePageHeader'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    TheNavbar,
    ThePageHeader
  },
  computed: mapState([
    'loggedIn'
  ]),
  created() {
    document.addEventListener('keydown', (e) => {
      let ctrlKey = e.ctrlKey || e.metaKey
      if (ctrlKey && e.keyCode === 71) {
        e.preventDefault();
        this.$store.commit('TheAwesomeBar/setFocus', { isFocused: true })
      }
    })
  }
}
</script>
<style>
html, body {
  font-size: 12px;
}
</style>
