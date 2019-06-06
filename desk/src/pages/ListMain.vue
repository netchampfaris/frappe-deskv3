<template>
  <div v-if="meta">
    <ListMainRowHead :doctype="doctype" :fieldsToShow="getFieldsToShow()" />
    <ListMainRow
      v-for="doc in listData"
      :key="doc.name"
      :doc="doc"
      :doctype="doctype"
      :fieldsToShow="getFieldsToShow()"
      @click.native="routeToForm(doc.name)"
    />
  </div>
</template>
<script>
import ListMainRowHead from './ListMainRowHead'
import ListMainRow from './ListMainRow'

export default {
  name: 'ListMain',
  props: ['doctype'],
  components: {
    ListMainRowHead,
    ListMainRow,
  },
  computed: {
    listData() {
      return this.fr.list.getData(this.doctype)
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
      return this.fr.list.getData(this.doctype)
    },
  },
  created() {
    this.fr.list.setSettings(this.doctype)
    this.fr.list.fetchData(this.doctype)
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
