<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
    <DatePicker
      class="text-lg"
      mode="single"
      :value="value"
      :input-props="dateInputProps"
      @input="value => $emit('change', value)"
      :disabled="disabled"
    ></DatePicker>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'
import { setupCalendar, DatePicker } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

setupCalendar({
  firstDayOfWeek: 2, // Monday
  popoverVisibility: 'focus',
})

export default {
  name: 'ControlDate',
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  computed: {
    dateInputProps() {
      return { class: 'form-control', placeholder: '' }
    },
  },
  components: {
    ControlLayout,
    DatePicker,
  },
}
</script>
