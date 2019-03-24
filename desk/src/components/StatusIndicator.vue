<template>
  <span>
    <Indicator :color="color" />
    <span>{{ status }}</span>
  </span>
</template>
<script>
export default {
  name: 'StatusIndicator',
  props: ['doc'],
  computed: {
    status() {
      if (!this.doc) {
        return ''
      }
      if (this.doc && this.doc.isDirty) {
        return this.__('Not Saved')
      }
      return this.doc.status
    },
    color() {
      if (!this.doc) {
        return 'grey'
      }
      if (this.doc && this.doc.isDirty) {
        return 'orange'
      }

      const colorMap = {
        Open: 'red',
        Closed: 'green',
        Pending: 'orange',
      }
      return colorMap[this.doc.status]
    },
  },
}
</script>
