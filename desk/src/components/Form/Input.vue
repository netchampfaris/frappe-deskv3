<template>
  <input
    class="form-control"
    :type="type"
    :value="value"
    @change="e => emitChange(e)"
    @input="e => emitChange(e)"
    @keydown="e => debounceEmitChange(e)"
    v-bind="$attrs"
    v-on="$listeners"
    ref="input"
  >
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  name: 'Input',
  props: ['type', 'value', 'autofocus', 'disabled'],
  methods: {
    emitChange(e) {
      this.$emit('valueChange', e.target.value)
    },
    debounceEmitChange(e) {
      if (!this._debouncedEmit) {
        this._debouncedEmit = debounce(
          () => this.$emit('valueChange', e.target.value),
          300
        )
      }
      // this._debouncedEmit()
    },
  },
}
</script>
