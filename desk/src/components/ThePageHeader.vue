<template>
  <div class="border-b bg-white py-6" v-if="showPageHeader">
    <div class="container flex justify-between">
      <h1 class="font-medium">{{ title }}</h1>
      <div>
          <Button v-if="menuItems.length" class="mr-1">Menu</Button>
          <Button v-if="secondaryAction" class="mr-1">{{ secondaryActionLabel }}</Button>
          <Button v-if="primaryAction" type="primary">{{ primaryActionLabel }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapState } = createNamespacedHelpers('CurrentPage')

export default {
  name: 'ThePageHeader',
  computed: mapState([
    'showPageHeader',
    'title',
    'primaryActionLabel',
    'primaryAction',
    'secondaryActionLabel',
    'secondaryAction',
    'menuItems'
  ])
}
</script>
