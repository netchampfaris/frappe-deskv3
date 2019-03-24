import Vue from 'vue'
import fr from 'frappe'

export function makeDoc(doc) {
  if (doc instanceof Vue) {
    return doc
  }

  return new Vue({
    data() {
      const meta = fr.getMeta(doc.doctype)

      let data = {}
      if (meta) {
        meta.fields.forEach(df => {
          data[df.fieldname] = ''
        })
      }
      Object.assign(data, doc, {
        __dirty: false,
      })

      return data
    },
    methods: {
      dirty() {
        this.__dirty = true
      },
      setValue(fieldname, value) {
        this[fieldname] = value
        this.runFormValidate()
      },
      update(obj) {
        Object.assign(this.$data, obj)
      },
      async runFormValidate() {
        const doc = await this.fr.call('run_controller_method', {
          method: 'form_validate',
          doc: this.asDict(),
        })
        this.update(doc)
        this.dirty()
      },
      asDict() {
        let fields = this.meta.fields
          .filter(
            df => !['Section Break', 'Column Break'].includes(df.fieldtype)
          )
          .map(df => df.fieldname)
          .concat(this.fr.model.getStandardFields())

        let rawDoc = fields.reduce((doc, fieldname) => {
          doc[fieldname] = this[fieldname] || null
          return doc
        }, {})

        rawDoc.doctype = this.doctype
        rawDoc.name = this.name
        return rawDoc
      },
    },
    computed: {
      isDirty() {
        return this.__dirty
      },
      indicator() {
        if (this.__dirty) {
          return {
            text: this.__('Not Saved'),
            color: 'orange',
          }
        }
        return {
          text: '',
          color: null,
        }
      },
    },
  })
}
