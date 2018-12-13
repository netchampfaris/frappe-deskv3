<template>
  <div class="border-b bg-white py-6" v-if="showPageHeader">
    <div class="container flex justify-between">
      <div class="flex items-center">
        <h1 class="font-medium">{{ title }}</h1>
        <Indicator class="ml-4" :color="indicatorColor" v-if="indicatorColor" />
        <span class="font-bold text-muted" v-if="indicatorText">{{ indicatorText }}</span>
      </div>
      <div>

          <Dropdown v-if="menuItems.length" class="mr-2" :items="menuItems">Menu</Dropdown>
          <Button v-if="secondaryAction" class="mr-1">{{ secondaryActionLabel }}</Button>
          <Button v-if="primaryAction" type="primary" @click="primaryAction">
            {{ primaryActionLabel }}
          </Button>
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
    'menuItems',
    'indicatorColor',
    'indicatorText'
  ])
}
</script>
