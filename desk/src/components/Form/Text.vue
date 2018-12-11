<template>
  <ControlLayout :docfield="docfield">
      <textarea
        class="form-control h-48"
        :value="value"
        @change="e => $emit('change', e.target.value)"
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
