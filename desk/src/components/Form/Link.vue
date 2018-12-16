<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
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
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  components: {
    ControlLayout,
  },
}
</script>
