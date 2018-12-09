<template>
  <ControlLayout :docfield="docfield">
      <div class="relative">
        <select
        class="block bg-white appearance-none outline-none border rounded text-lg px-4 py-3 w-full"
        >
            <option
                :key="option.value"
                v-for="option in selectOptions"
                :value="option.value"
                :selected="value === option.value"
            >
                {{ option.label }}
            </option>
        </select>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-4 text-muted">
            <octicon name="chevron-down" />
        </div>
      </div>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'

export default {
  name: "ControlSelect",
  props: ["docfield", "value"],
  components: {
    ControlLayout
  },
  computed: {
      selectOptions() {
          return this.docfield.options.map(option => {
              if (typeof option === 'string') {
                  return {
                      label: option,
                      value: option
                  }
              }
              return option
          })
      }
  }
};
</script>
