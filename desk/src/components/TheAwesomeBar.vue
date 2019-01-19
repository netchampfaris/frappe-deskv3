<template>
  <Control
    class="w-128"
    inputClass="bg-grey-lighter focus:bg-white"
    :docfield="{
      label: __('Search'),
      fieldtype: 'Autocomplete',
      placeholder: __('Search or type a command (Ctrl + G)'),
      options: frappe.awesomebar.suggestions,
      onOptionSelect: frappe.awesomebar.onSelection
    }"
    :value="frappe.awesomebar.keyword"
    @change="value => frappe.awesomebar.keyword = value"
    :onlyInput="true"
    @blur="blur"
  />
  <!-- <input
    class="py-3 px-4 bg-grey-lighter focus:bg-white focus:outline-none border border-transparent focus:border-grey-light rounded w-128 transition"
    type="search"
    :placeholder="__('Search or type a command (Ctrl + G)')"
    :aria-label="__('Search')"
    @blur="blur"
  >-->
</template>
<script>
export default {
  name: 'TheAwesomeBar',
  watch: {
    'frappe.awesomebar.isFocused'(newValue) {
      if (newValue) {
        this.$el.focus()
      }
    },
  },
  methods: {
    blur() {
      this.frappe.awesomebar.toggleFocus(false)
    },
  },
}
</script>
