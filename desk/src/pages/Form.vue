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
    this.$store.dispatch('Meta/fetchMeta', { doctype: this.doctype })
    this.$store.dispatch('Form/fetchDoc', {
      doctype: this.doctype,
      name: this.name,
    })
  },
  methods: {
    saveDoc() {
      this.$store.dispatch('Form/saveDoc', {
        doctype: this.doctype,
        name: this.name,
      })
    },
  },
  computed: {
    meta() {
      return this.$store.getters['Meta/getMeta'](this.doctype)
    },
    doc() {
      return this.$store.getters['Form/getDoc'](this.doctype, this.name)
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
