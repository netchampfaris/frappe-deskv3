<template>
  <div class="page-header border-bottom py-3">
    <div class="container">
      <h1 class="m-0">{{ title }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: ['title']
}
</script>
