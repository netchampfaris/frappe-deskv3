<template>
  <div>
    <div class="border rounded overflow-hidden">
      <div
        class="px-5 p-2 bg-grey-lightest flex justify-between items-center border-b border-light text-muted"
      >
        <span>{{ __('Add a comment') }}</span>
        <Button size="small">{{ __('Comment') }}</Button>
      </div>
      <Control
        class="px-5 py-4"
        :docfield="{
          fieldtype: 'Text',
          description: __('Ctrl + Enter to add comment'),
        }"
      />
    </div>
    <div class="relative pb-32">
      <div class="absolute border-l timeline-tick pin-l pin-t h-full"></div>
      <div
        class="pl-12 py-6 flex items-center"
        v-for="item in timelineItems"
        :key="item.label"
      >
        <div class="w-3 h-3 bg-grey-light rounded-circle mr-8"></div>
        <FeatherIcon :name="item.icon" :size="14" class="mr-2 text-muted" />
        <div class="text-muted" v-html="item.label"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormTimeline',
  props: ['doctype', 'name'],
  computed: {
    timelineItems() {
      // const docinfo = this.frappe.getDocinfo(this.doctype, this.name)
      // docinfo.versions.map(version => {
      //   return {
      //     // label:
      //   }
      // })
      const doc = this.frappe.getDoc(this.doctype, this.name)
      const fullname =
        this.fr.session.user === doc.owner ? this.__('You') : doc.owner

      const who = `<span class="font-bold text-dark">${fullname}</span>`
      const when = this.fr.format.when(doc.creation)

      return [
        {
          label: this.__('{0} created – {1}', [who, when]),
          icon: 'plus',
          timestamp: doc.creation,
        },
      ]
    },
  },
}
</script>
<style scoped>
.timeline-tick {
  margin-left: 3.4rem;
}
</style>
