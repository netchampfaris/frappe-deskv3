<template>
  <div id="app" class="font-sans text-black">
    <header class="sticky pin-t z-50">
      <TheNavbar />
      <ThePageHeader />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import './style.css'
import TheNavbar from './components/TheNavbar'
import ThePageHeader from './components/ThePageHeader'

export default {
  name: 'app',
  components: {
    TheNavbar,
    ThePageHeader
  }
}
</script>
<style>
html, body {
  font-size: 12px;
}
</style>
