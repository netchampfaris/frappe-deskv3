import Vue from 'vue'

export default new Vue({
  data() {
    return {
      listSettings: {
        DocType: {
          filters: [],
          orderBy: 'modified desc',
          start: 0,
          pageLength: 20,
        },
      },
      listData: {
        DocType: {
          data: [],
        },
      },
    }
  },
  methods: {
    setSettings(doctype) {
      this.$set(this.listSettings, doctype, {
        filters: [],
        orderBy: 'modified desc',
        start: 0,
        pageLength: 20,
      })
      this.$set(this.listData, doctype, {
        data: [],
      })
    },
    getSettings(doctype) {
      return this.listSettings[doctype]
    },
    setData(doctype, data) {
      this.listData[doctype].data = data
    },
    getData(doctype) {
      return this.listData[doctype].data
    },
    applyListFilters(doctype, filters) {
      this.listSettings[doctype].filters = filters.map(filter => {
        let { field, operator, value } = filter
        if (
          operator.includes('like') &&
          !(value.startsWith('%') || value.endsWith('%'))
        ) {
          value = '%' + value + '%'
        }
        return [field.fieldname, operator, value]
      })
      this.fetchData(doctype)
    },
    async fetchData(doctype) {
      const listSettings = this.listSettings[doctype]
      const meta = this.fr.getMeta(doctype)
      const fields = getFieldsToFetch(meta)
      const data = await this.fr.call('frappe.desk.reportview.get', {
        doctype,
        fields,
        filters: listSettings.filters,
        start: listSettings.start,
        page_length: listSettings.pageLength,
        order_by: listSettings.orderBy,
        with_comment_count: true,
      })

      if (data.values && data.values.length > 0) {
        this.setData(doctype, convertToKeyValue(data.keys, data.values))
      } else {
        this.setData(doctype, [])
      }
    },
  },
})

function getFieldsToFetch(meta) {
  let fields = ['name', '_comments', '_assign', '_seen']
  fields.push(meta.title_field)

  let fieldsInListView = meta.fields.filter(df => df.in_list_view)
  fields.push(...fieldsInListView.map(df => df.fieldname))

  return fields.filter(Boolean)
}

function convertToKeyValue(keys, values) {
  return values.map(row => {
    return row.reduce((acc, cell, i) => {
      acc[keys[i]] = cell
      return acc
    }, {})
  })
}
