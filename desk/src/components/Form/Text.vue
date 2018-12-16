<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
    <textarea
      class="form-control h-48"
      :value="value"
      @change="e => $emit('change', e.target.value)"
    ></textarea>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: 'ControlText',
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  components: {
    ControlLayout,
  },
}
</script>
