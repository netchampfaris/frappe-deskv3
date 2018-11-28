<template>
  <div id="app">
    <TheNavbar />
    <PageContainer>
      <router-view></router-view>
    </PageContainer>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import PageContainer from './components/PageContainer'

export default {
  name: 'app',
  components: {
    TheNavbar,
    PageContainer
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";

html, body {
  font-size: 14px;
}
</style>
