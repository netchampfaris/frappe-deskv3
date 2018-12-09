<template>
  <form class="p-8">
    <Control
      :docfield="{
        fieldtype: 'Data',
        fieldname: 'firstName',
        label: 'First Name'
      }"
      :value="'Faris'"
    />
    <Control
      class="mt-5"
      :docfield="{
        fieldtype: 'Text',
        fieldname: 'description',
        label: 'Description'
      }"
      :value="'Anime. Javascript.'"
    />
    <Control
      class="mt-5"
      :docfield="{
        fieldtype: 'Date',
        fieldname: 'startDate',
        label: 'Start Date'
      }"
      :value="new Date('2018-09-12')"
    />
    <Control
      class="mt-5"
      :docfield="{
        fieldtype: 'Select',
        fieldname: 'status',
        label: 'Status',
        options: ['Open', 'Closed']
      }"
      :value="'Open'"
    />
  </form>
</template>
<script>
import Control from './Control'

export default {
  name: 'FormLayout',
  components: {
    Control
  }
};
</script>
