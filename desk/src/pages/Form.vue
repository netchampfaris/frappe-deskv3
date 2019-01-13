<template>
  <div class="form" v-if="doc && meta">
    <ThePageHeader v-bind="pageHeaderSettings"/>
    <div class="container">
      <div class="flex">
        <div class="w-1/6 border-r">
          <FormSidebar/>
        </div>
        <div class="w-5/6 border-r">
          <FormMain :doc="doc"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormSidebar from './FormSidebar'
import FormMain from './FormMain'

export default {
  name: 'Form',
  props: ['doctype', 'name'],
  components: {
    FormSidebar,
    FormMain,
  },
  created() {
    this.frappe.fetchDoc(this.doctype, this.name)
  },
  methods: {
    saveDoc() {
      this.frappe.saveDoc(this.doctype, this.name)
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
      return {
        showPageHeader: true,
        title: this.formTitle,
        indicatorColor: this.indicatorColor,
        indicatorText: this.indicatorText,
        menuItems: this.menuItems,
        primaryAction: this.saveDoc,
        primaryActionLabel: 'Save',
      }
    },
    formTitle() {
      if (!(this.doc && this.meta)) return ''
      const title_field = this.meta.title_field || 'name'
      return this.doc[title_field]
    },
    indicatorColor() {
      if (this.isDocDirty) {
        return 'orange'
      }
      return ''
    },
    indicatorText() {
      if (this.isDocDirty) {
        return 'Not Saved'
      }
      return ''
    },
    menuItems() {
      return [
        'Print',
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
