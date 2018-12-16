<template>
  <div class="filter-area p-4 -mb-2">
    <Button
      class="mr-2 mb-2"
      size="small"
      v-for="filter in appliedFilters"
      :key="filter.field.fieldname"
    >{{ filter.field.label }} {{ filter.operator }} {{ filter.value }}</Button>
    <Popover>
      <Button size="small" class="text-muted">Add filter</Button>
      <div slot="popover-content" class="w-64 bg-white border shadow-md rounded-b">
        <FilterSelector :doctype="doctype" @addFilter="filter => appliedFilters.push(filter)"/>
      </div>
    </Popover>
  </div>
</template>
<script>
import Control from './Form/Control'
import FilterSelector from './FilterSelector'

export default {
  name: 'FilterArea',
  props: ['doctype'],
  components: {
    Control,
    FilterSelector,
  },
  data() {
    return {
      appliedFilters: [],
    }
  },
  computed: {
    meta() {
      return this.$store.getters['Meta/getMeta'](this.doctype)
    },
  },
}
</script>
