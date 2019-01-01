<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
    <div class="relative">
      <select
        class="block appearance-none form-control"
        @change="e => $emit('change', e.target.value)"
      >
        <option
          :key="option.value"
          v-for="option in selectOptions"
          :value="option.value"
          :selected="value === option.value"
        >{{ option.label }}</option>
      </select>
      <div class="pointer-events-none absolute pin-y pin-r flex items-center px-4 text-muted">
        <octicon name="chevron-down"/>
      </div>
    </div>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: 'ControlSelect',
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  components: {
    ControlLayout,
  },
  computed: {
    selectOptions() {
      let options = this.docfield.options
      if (typeof options === 'string') {
        options = options.split('\n').filter(Boolean)
      }
      options = ['', ...options];
      return options.map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          }
        }
        return option
      })
    },
  },
}
</script>
