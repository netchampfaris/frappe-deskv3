<template>
  <div class="form" v-if="doc && meta">
    <ThePageHeader v-bind="pageHeaderSettings"/>
    <div class="container">
      <div class="flex">
        <div class="w-1/6">
          <FormSidebar/>
        </div>
        <div class="w-5/6">
          <FormMain class="border-l border-r" :doc="doc"/>
          <FormTimeline :doctype="doctype" :name="name"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormSidebar from './FormSidebar'
import FormMain from './FormMain'
import FormTimeline from './FormTimeline'

export default {
  name: 'Form',
  props: ['doctype', 'name'],
  components: {
    FormSidebar,
    FormMain,
    FormTimeline,
  },
  created() {
    if (!this.doc) {
      this.frappe.fetchDoc(this.doctype, this.name)
    }
  },
  methods: {
    async saveDoc() {
      const doc = await this.frappe.saveDoc(this.doctype, this.name)
      if (doc.name !== this.name) {
        this.$router.replace(`/Form/${this.doctype}/${doc.name}`)
      }
    },
  },
  computed: {
    doc() {
      return this.frappe.getDoc(this.doctype, this.name)
    },
    isDocDirty() {
      return this.doc && this.doc.__dirty
    },
    pageHeaderSettings() {
      const indicator = this.frappe.getIndicator(this.doctype, this.name)
      return {
        showPageHeader: true,
        title: this.frappe.getDocumentTitle(this.doctype, this.name),
        indicatorColor: indicator.color,
        indicatorText: indicator.text,
        menuItems: this.menuItems,
        primaryAction: this.saveDoc,
        primaryActionLabel: 'Save',
      }
    },
    indicatorColor() {
      if (this.isDocDirty) {
        return 'orange'
      }
      return ''
    },
    indicatorText() {
      if (this.isDocDirty) {
        return this.__('Not Saved')
      }
      return ''
    },
    menuItems() {
      return [
        {
          label: this.__('Print'),
          action: () => this.frappe.setRoute('Print', this.doctype, this.name),
        },
        'Email',
        'Links',
        'Duplicate',
        'Reload',
        'Delete',
        'Customize',
        `New ${this.doctype} (Ctrl + B)`,
      ]
    },
  },
}
</script>
