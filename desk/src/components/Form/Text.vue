<template>
  <ControlLayout :docfield="docfield">
      <textarea
        class="outline-none border rounded text-lg px-4 py-3 w-full h-48"
        type="text"
        :value="value"
      >
      </textarea>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: "ControlText",
  props: ["docfield", "value"],
  components: {
      ControlLayout
  }
};
</script>
