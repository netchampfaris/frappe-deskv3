<template>
  <div id="app">
    <Navbar />
    <PageContainer>
      <router-view></router-view>
    </PageContainer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import PageContainer from './components/PageContainer'

export default {
  name: 'app',
  components: {
    Navbar,
    PageContainer
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
