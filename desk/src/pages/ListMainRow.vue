<template>
  <div class="px-4 py-3 hover:bg-grey-lightest cursor-pointer border-b">
    <div class="flex">
      <div class="w-4/5 flex items-center">
        <div class="w-2/5">
          {{ doc[titleField] | stripHTML }}
        </div>
        <div
          class="w-1/5 text-muted"
          v-for="fieldname in otherFields"
          :key="fieldname"
        >
          <StatusIndicator v-if="fieldname === 'status'" :doc="doc" />
          <span v-else>{{ doc[fieldname] | stripHTML }}</span>
        </div>
      </div>
      <div class="w-1/5 flex justify-end items-center">
        <UserAvatar :user="assignedTo" class="mr-3" />
        <div
          class="inline-flex items-center"
          :class="[doc._comment_count ? 'text-grey-dark' : 'text-grey-light']"
        >
          <FeatherIcon name="message-square" class="mr-2" />
          <span>{{ doc._comment_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListMainRow',
  props: ['doc', 'doctype', 'fieldsToShow'],
  computed: {
    titleField() {
      return this.fieldsToShow[0].fieldname
    },
    otherFields() {
      return this.fieldsToShow.slice(1).map(df => df.fieldname)
    },
    assignedTo() {
      const assignees = JSON.parse(this.doc._assign)
      return assignees && assignees.length
        ? assignees[assignees.length - 1]
        : null
    },
  },
  filters: {
    stripHTML(value) {
      if (!value) return ''
      return value.replace(/(<([^>]+)>)/gi, '')
    },
  },
}
</script>
