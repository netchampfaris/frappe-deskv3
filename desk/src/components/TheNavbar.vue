<template>
  <nav class="border-b border-grey-light bg-white">
    <div class="container flex items-center justify-between">
      <a
        class="font-semibold text-grey-dark hover:text-grey-darker no-underline"
        href="#/"
        >Home</a
      >
      <div class="flex items-center">
        <TheAwesomeBar class="mr-8" />
        <TheNavbarLogin class="mr-4" />
        <TheNavbarNotification />
      </div>
    </div>
  </nav>
</template>
<script>
import TheAwesomeBar from './TheAwesomeBar'
import TheNavbarLogin from './TheNavbarLogin'
import TheNavbarNotification from './TheNavbarNotification'

export default {
  name: 'TheNavbar',
  components: {
    TheAwesomeBar,
    TheNavbarLogin,
    TheNavbarNotification,
  },
}
</script>
