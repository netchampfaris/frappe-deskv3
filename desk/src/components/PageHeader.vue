<template>
  <div class="border-b py-6">
    <div class="container flex justify-between">
      <h1 class="font-medium">{{ title }}</h1>
      <slot name="page-actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: ['title']
}
</script>
