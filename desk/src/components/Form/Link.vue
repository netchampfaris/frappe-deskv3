<template>
  <ControlLayout :docfield="docfield" :inputOnly="inputOnly">
    <input
      class="form-control"
      type="text"
      :value="value"
      @change="e => $emit('change', e.target.value)"
    >
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: 'ControlLink',
  props: ['docfield', 'value', 'inputOnly', 'disabled'],
  components: {
    ControlLayout,
  },
}
</script>
