<template>
  <div class="list" v-if="meta">
    <ThePageHeader v-bind="pageHeaderSettings" />
    <div class="container">
      <div class="flex">
        <div class="w-1/6 border-r">
          <ListSidebar :doctype="doctype" />
        </div>
        <div class="w-5/6 border-r">
          <FilterArea :doctype="doctype" />
          <ListMain class="border-t" :doctype="doctype" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListSidebar from './ListSidebar'
import ListMain from './ListMain'
import FilterArea from '../components/FilterArea'

export default {
  name: 'List',
  props: ['doctype'],
  components: {
    ListSidebar,
    ListMain,
    FilterArea,
  },
  methods: {
    newForm() {
      const doc = this.frappe.newDoc(this.doctype)
      this.frappe.setDoc(this.doctype, doc.name, doc)
      this.fr.router.setRoute('Form', this.doctype, doc.name)
    },
  },
  computed: {
    pageHeaderSettings() {
      return {
        showPageHeader: true,
        title: this.doctype,
        primaryActionLabel: 'New',
        primaryAction: this.newForm,
        secondaryActionLabel: 'Refresh',
        secondaryAction: console.log,
        menuItems: ['Test'],
      }
    },
  },
}
</script>
