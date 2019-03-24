import Vue from 'vue'

export function makeDoc(doc) {
  if (doc instanceof Vue) {
    return doc
  }

  return new Vue({
    data() {
      return {
        ...doc,
        __dirty: false, // eslint-disable-line
      }
    },
    methods: {
      dirty() {
        this.__dirty = true
      },
    },
    computed: {
      isDirty() {
        return this.__dirty
      },
    },
  })
}
