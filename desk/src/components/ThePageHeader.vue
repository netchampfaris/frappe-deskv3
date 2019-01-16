<template>
  <div class="page-header border-b bg-white py-6 sticky z-10" v-if="showPageHeader">
    <div class="container flex justify-between">
      <div class="flex items-center">
        <h1 class="font-medium">{{ title }}</h1>
        <Indicator class="ml-4" :color="indicatorColor" v-if="indicatorColor"/>
        <span class="font-bold text-muted" v-if="indicatorText">{{ indicatorText }}</span>
      </div>
      <div>
        <Dropdown v-if="menuItems && menuItems.length" class="mr-1" :items="menuItems">
          <Button iconRight="chevron-down">{{ __('Menu') }}</Button>
        </Dropdown>
        <Button v-if="secondaryAction" class="mr-1">{{ secondaryActionLabel }}</Button>
        <Button v-if="primaryAction" type="primary" @click="primaryAction">{{ primaryActionLabel }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ThePageHeader',
  props: [
    'showPageHeader',
    'title',
    'primaryActionLabel',
    'primaryAction',
    'secondaryActionLabel',
    'secondaryAction',
    'menuItems',
    'indicatorColor',
    'indicatorText',
  ],
}
</script>
<style>
.page-header {
  top: 46px;
}
</style>
