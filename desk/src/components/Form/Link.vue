<template>
  <ControlLayout :docfield="docfield">
      <input
        class="outline-none border rounded text-lg px-4 py-3 w-full"
        type="text"
        :value="value"
      >
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: "ControlLink",
  props: ["docfield", "value"],
  components: {
    ControlLayout
  }
};
</script>
