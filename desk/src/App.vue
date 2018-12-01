<template>
  <div id="app" class="font-sans">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import './style.css'
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'app',
  components: {
    TheNavbar,
  }
}
</script>
<style>
html, body {
  font-size: 12px;
}
</style>
