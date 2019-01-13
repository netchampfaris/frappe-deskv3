<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
    <input
      class="form-control"
      type="password"
      :value="value"
      @change="e => $emit('change', e.target.value)"
      :disabled="disabled"
    >
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: 'ControlData',
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  components: {
    ControlLayout,
  },
}
</script>
