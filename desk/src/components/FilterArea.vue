<template>
  <div class="filter-area p-4 -mb-2 flex justify-between items-start">
    <div>
      <Popover
        class="mr-2 mb-2"
        v-for="(filter, index) in appliedFilters"
        :key="getFilterId(filter)"
      >
        <div class="flex">
          <Button size="small" rounded="left">{{ filter.field.label }} {{ filter.operator }} {{ filter.value }}</Button>
          <Button size="small" icon="x" rounded="right" @click="removeFilter(index)" />
        </div>
        <div slot="popover-content" class="w-64 bg-white border shadow-md rounded-b">
          <FilterSelector
            :doctype="doctype"
            :selectedField="filter.field"
            :operator="filter.operator"
            :filterValue="filter.value"
            @reset="resetFilter(index)"
            @selectField="field => updateField(index, field)"
            @selectValue="value => updateValue(index, value)"
            @selectOperator="operator => updateOperator(index, operator)"
          />
        </div>
      </Popover>

      <Popover class="mb-2">
        <Button size="small" class="text-muted">Add filter</Button>
        <div slot="popover-content" class="w-64 bg-white border shadow-md rounded-b">
          <FilterSelector
            :doctype="doctype"
            v-bind="newFilter"
            @selectField="field => newFilter.selectedField = field"
            @selectValue="value => newFilter.filterValue = value"
            @selectOperator="operator => newFilter.operator = operator"
            @addFilter="addNewFilter"
            @reset="resetNewFilter"
          />
        </div>
      </Popover>
    </div>

    <Button
      v-if="filtersDirty"
      class="whitespace-no-wrap"
      size="small"
      type="primary"
      @click="applyFilters"
    >
      Apply Filter
    </Button>
  </div>
</template>
<script>
import FilterSelector from './FilterSelector'

export default {
  name: 'FilterArea',
  props: ['doctype'],
  components: {
    FilterSelector,
  },
  data() {
    return {
      filtersDirty: false,
      appliedFilters: [],
      newFilter: {
        selectedField: null,
        operator: null,
        filterValue: null,
      },
    }
  },
  computed: {
    meta() {
      return this.$store.getters['Meta/getMeta'](this.doctype)
    },
  },
  methods: {
    applyFilters() {
      this.$store.dispatch('List/applyFilter', {
        doctype: this.doctype,
        filters: this.appliedFilters,
      })
      this.filtersDirty = false
    },
    addNewFilter() {
      this.appliedFilters.push({
        field: this.newFilter.selectedField,
        operator: this.newFilter.operator,
        value: this.newFilter.filterValue,
      })
      this.filtersDirty = true
      this.resetNewFilter()
    },
    removeFilter(index) {
      this.appliedFilters = this.appliedFilters.filter((f, i) => index !== i)
      this.filtersDirty = true
    },
    resetNewFilter() {
      this.newFilter = {
        selectedField: null,
        operator: null,
        filterValue: null,
      }
    },
    updateFilter(index, filter) {
      const oldFilters = this.appliedFilters.slice()
      oldFilters[index] = filter
      this.appliedFilters = oldFilters
    },
    updateField(index, field) {
      this.appliedFilters[index].field = field
      this.filtersDirty = true
    },
    updateValue(index, value) {
      this.appliedFilters[index].value = value
      this.filtersDirty = true
    },
    updateOperator(index, operator) {
      this.appliedFilters[index].operator = operator
      this.filtersDirty = true
    },
    resetFilter(index) {
      this.appliedFilters[index] = {
        field: null,
        value: null,
        operator: null,
      }
    },
    getFilterId(filter) {
      return filter.field.fieldname + filter.operator + filter.value
    },
  },
}
</script>
