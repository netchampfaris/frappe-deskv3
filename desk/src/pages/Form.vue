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
    <Modal
      v-if="isEmailModalShown"
      @hide="isEmailModalShown = false"
      :title="doctype + ': ' + frappe.getDocumentTitle(doctype, name)"
      primaryActionLabel="Send"
    >
      <template slot="body">
        <FormLayout
          :fields="[
            {
              label: 'To',
              fieldtype: 'Data',
              fieldname: 'email'
            },
            {
              fieldtype: 'Section Break',
              fieldname: 'section-1'
            },
            {
              label: 'Subject',
              fieldtype: 'Data',
              fieldname: 'subject'
            },
            {
              label: 'Message',
              fieldtype: 'Text Editor',
              fieldname: 'message'
            },
          ]"
          :doc="{}"
        />
      </template>
    </Modal>
  </div>
</template>
<script>
import FormSidebar from './FormSidebar'
import FormMain from './FormMain'
import FormTimeline from './FormTimeline'
import { getHandlers } from '../store/modules/form'
import form from '../store/modules/form'
import Vue from 'vue'

export default {
  name: 'Form',
  props: ['doctype', 'name'],
  components: {
    FormSidebar,
    FormMain,
    FormTimeline,
    FormLayout: () => import('../components/Form/FormLayout'),
  },
  data() {
    return {
      isEmailModalShown: false,
    }
  },
  created() {
    if (!this.doc) {
      this.frappe.fetchDoc(this.doctype, this.name)
    }
    this.frappe.$on('document:setValue', (doctype, name, fieldname) => {
      const handlers = getHandlers(doctype, fieldname)
      handlers.forEach(handler => {
        handler.call(this, form)
      })
    })

    this.form = new Vue({
      mixins: [form],
      propsData: {
        doctype: this.doctype,
        name: this.name,
      },
    })
  },
  beforeDestroy() {
    this.form.$destroy()
  },
  methods: {
    async saveDoc() {
      const doc = await this.frappe.saveDoc(this.doctype, this.name)
      if (doc.name !== this.name) {
        this.$router.replace(`/Form/${this.doctype}/${doc.name}`)
      }
    },
    showEmailModal() {
      this.isEmailModalShown = true
    },
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
        menuItems: this.menuItems,
        primaryAction: this.saveDoc,
        primaryActionLabel: 'Save',
      }
    },
    menuItems() {
      return [
        {
          label: this.__('Print'),
          action: () => this.frappe.setRoute('Print', this.doctype, this.name),
        },
        {
          label: this.__('Email'),
          action: () => this.showEmailModal(),
        },
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
