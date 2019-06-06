import Vue from 'vue'
import fr from 'frappe'
import uniqBy from 'lodash/uniqBy'

export function makeList(doctype) {
  return new Vue({
    data() {
      return {
        doctype,
        columns: [],
        rows: [],
        fields: [],
        filters: [],
        orderBy: 'modified desc',
        start: 0,
        pageLength: 20,
      }
    },
    methods: {
      init() {
        const meta = fr.getMeta(doctype)
        this.fields = getFieldsToFetch(meta)
        this.columns = this.fields
          .map(f => {
            const df = meta.fields.find(df => df.fieldname === f[0])
            if (df) {
              return {
                title: df.label,
                id: df.fieldname,
                docfield: df,
              }
            }
          })
          .filter(Boolean)
        this.fetchData()
      },
      applyListFilters(filters) {
        this.filters = filters.map(filter => {
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
      async fetchData() {
        const fields = this.fields.map(f => f[0])
        const data = await fr.call('frappe.desk.reportview.get', {
          doctype,
          fields,
          filters: this.filters,
          start: this.start,
          page_length: this.pageLength,
          order_by: this.orderBy,
          with_comment_count: true,
        })

        if (data.values && data.values.length > 0) {
          this.rows = convertToKeyValue(data.keys, data.values)
        } else {
          this.rows = []
        }
      },
    },
  })

  function getFieldsToFetch(meta) {
    let doctype = meta.name
    let standardFields = ['name', '_comments', '_assign', '_seen']
    let fields = standardFields.map(f => [f, doctype])

    if (meta.title_field) {
      fields.push([meta.title_field, doctype])
    }

    let fieldsInListView = meta.fields.filter(df => df.in_list_view)
    fields.push(...fieldsInListView.map(df => [df.fieldname, doctype]))

    let mandatoryFields = meta.fields.filter(df => df.reqd)
    fields.push(...mandatoryFields.map(df => [df.fieldname, doctype]))

    return uniqBy(fields, f => f[0] + f[1]).filter(Boolean)
  }

  function convertToKeyValue(keys, values) {
    return values.map(row => {
      return row.reduce((acc, cell, i) => {
        acc[keys[i]] = cell
        return acc
      }, {})
    })
  }
}
