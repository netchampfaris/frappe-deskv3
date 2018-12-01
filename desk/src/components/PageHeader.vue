<template>
  <div class="border-b py-6">
    <div class="container">
      <h1 class="font-medium">{{ title }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: ['title']
}
</script>
