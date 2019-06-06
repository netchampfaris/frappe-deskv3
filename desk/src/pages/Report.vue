<template>
  <div class="report" v-if="meta">
    <ThePageHeader v-bind="pageHeaderSettings" />
    <div class="container">
      <div class="flex">
        <div class="w-1/6 border-r"></div>
        <div class="w-5/6 border-r">
          <DataTable
            :columns="store.columns"
            :data="store.rows"
            v-if="meta && store"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from '../components/DataTable'
import { makeList } from 'frappe/reportBuilder'

export default {
  name: 'Report',
  props: ['doctype'],
  components: {
    DataTable,
  },
  computed: {
    store() {
      if (this.meta) {
        let store = makeList(this.doctype)
        store.init()
        return store
      }
      return null
    },
    pageHeaderSettings() {
      return {
        showPageHeader: true,
        title: 'Report: ' + this.doctype,
        secondaryActionLabel: 'Refresh',
        secondaryAction: console.log,
        menuItems: ['Test'],
      }
    },
  },
}
</script>
