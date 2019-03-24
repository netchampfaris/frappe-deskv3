<template>
  <div class="print" v-if="doc && meta">
    <ThePageHeader v-bind="pageHeaderSettings" />
    <div class="container">
      <div class="flex">
        <div class="w-1/6"></div>
        <div class="w-5/6"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Print',
  props: ['doctype', 'name'],
  created() {
    if (!this.doc) {
      this.frappe.fetchDoc(this.doctype, this.name)
    }
  },
  computed: {
    doc() {
      return this.frappe.getDoc(this.doctype, this.name)
    },
    pageHeaderSettings() {
      const indicator = this.frappe.getIndicator(this.doctype, this.name)
      return {
        showPageHeader: true,
        title: this.frappe.getDocumentTitle(this.doctype, this.name),
        indicatorColor: indicator.color,
        indicatorText: indicator.text,
        menuItems: [],
        primaryAction: () =>
          this.fr.router.setRoute('Form', this.doctype, this.name),
        primaryActionLabel: this.__('Edit'),
      }
    },
  },
}
</script>
