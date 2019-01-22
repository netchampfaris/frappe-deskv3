<template>
  <div v-if="meta">
    <DataTable :columns="columns" :data="data"/>
    <!-- <ListMainRowHead :doctype="doctype" :fieldsToShow="getFieldsToShow()"/>
    <ListMainRow
      v-for="doc in listData"
      :key="doc.name"
      :doc="doc"
      :doctype="doctype"
      :fieldsToShow="getFieldsToShow()"
      @click.native="routeToForm(doc.name)"
    />-->
  </div>
</template>
<script>
// import ListMainRowHead from './ListMainRowHead'
// import ListMainRow from './ListMainRow'
import DataTable from '../components/DataTable'

export default {
  name: 'ListMain',
  props: ['doctype'],
  components: {
    DataTable,
    // ListMainRowHead,
    // ListMainRow,
  },
  computed: {
    listData() {
      return this.frappe.getListData(this.doctype)
    },
    columns() {
      return this.meta.fields
        .filter(df => !df.fieldtype.includes('Break'))
        .map(df => {
          return {
            id: df.fieldname,
            title: df.label,
            docfield: df,
          }
        })
    },
    data() {
      return this.frappe.getListData(this.doctype)
    },
  },
  created() {
    this.frappe.setListSettings(this.doctype)
    this.frappe.fetchListData(this.doctype)
  },
  methods: {
    routeToForm(name) {
      this.$router.push(`/Form/${this.doctype}/${name}`)
    },
    getFieldsToShow() {
      let fields = []

      if (this.meta.title_field) {
        const titleField = this.meta.fields.find(
          df => df.fieldname === this.meta.title_field
        )
        fields.push(titleField)
      } else {
        fields.push({
          label: 'Name',
          fieldname: 'name',
        })
      }

      let fieldsInListView = this.meta.fields.filter(df => df.in_list_view)
      fields.push(...fieldsInListView)

      return fields.slice(0, 4)
    },
  },
}
</script>
