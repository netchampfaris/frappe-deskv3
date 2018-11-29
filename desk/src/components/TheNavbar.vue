<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light  sticky-top f1 py-1">
    <div class="container">
      <a class="navbar-brand f1 font-weight-bold" href="#/">Frappe</a>
      <ul class="navbar-nav">
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control form-control-sm mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </form>
        <TheNavbarLogin />
      </ul>
    </div>
  </nav>
</template>
<script>
import TheNavbarLogin from './TheNavbarLogin';

export default {
  name: 'TheNavbar',
  components: {
    TheNavbarLogin
  }
}
</script>
