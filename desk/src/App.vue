<template>
  <div id="app">
    <TheNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'app',
  components: {
    TheNavbar,
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";

html, body {
  font-size: 14px;
}

h1 {
  font-size: 1.7rem;
}

.f1 {
  font-size: 0.85rem;
}
.f2 {
  font-size: 1rem;
}
.f3 {
  font-size: 1.2rem;
}
</style>
