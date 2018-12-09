<template>
  <ControlLayout :docfield="docfield">
      <DatePicker
        class="text-lg"
        mode="single"
        :value="value"
        :input-props='{ class: "outline-none border rounded text-lg px-4 py-3 w-full" }'>
      >
      </DatePicker>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'
import { setupCalendar, DatePicker } from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css';

setupCalendar({
  firstDayOfWeek: 2,  // Monday
  popoverVisibility: 'focus'
});

export default {
  name: "ControlDate",
  props: ["docfield", "value"],
  components: {
    ControlLayout,
    DatePicker
  }
};
</script>
