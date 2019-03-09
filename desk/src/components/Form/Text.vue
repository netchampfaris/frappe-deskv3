<template>
  <ControlLayout :docfield="docfield" :inputOnly="inputOnly">
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
  props: ['docfield', 'value', 'inputOnly', 'disabled'],
  components: {
    ControlLayout,
  },
}
</script>
