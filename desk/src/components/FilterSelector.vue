<template>
  <div>
    <div class="step-1" v-show="!selectedField">
      <div class="text-muted p-4 border-b">Select field</div>
      <ul class="list-reset h-64 overflow-auto">
        <li
          class="p-4 hover:bg-grey-lighter"
          v-for="field of filterableFields"
          :key="field.fieldname"
          :fieldname="field.fieldname"
          @click="$emit('selectField', field)"
        >{{ field.label }}</li>
      </ul>
    </div>
    <div class="step-2" v-if="selectedField">
      <div class="p-4 flex items-center border-b">
        <FeatherIcon
          name="chevron-left"
          class="mr-2 cursor-pointer hover:text-muted"
          @click="reset"
        />
        <span>{{ selectedField.label }}</span>
      </div>
      <div class="p-4">
        <Control
          class="mb-2"
          :docfield="operatorField"
          :value="operator"
          @change="value => $emit('selectOperator', value)"
          :onlyInput="true"
        />
        <Control
          :docfield="valueField"
          :value="filterValue"
          @change="value => $emit('selectValue', value)"
          :onlyInput="true"
        />
        <div class="flex justify-end">
          <Button class="mt-4 pin-r" size="small" @click="applyFilter">Add Filter</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Control from './Form/Control'

export default {
  name: 'FilterSelector',
  props: ['doctype', 'selectedField', 'operator', 'filterValue'],
  components: {
    Control,
  },
  computed: {
    filterableFields() {
      const layoutFields = ['Section Break', 'Column Break']
      return this.meta.fields.filter(df => {
        return !layoutFields.includes(df.fieldtype)
      })
    },
    operatorField() {
      return {
        fieldtype: 'Select',
        label: 'Operator',
        options: [
          { label: 'Contains', value: 'like' },
          { label: 'Does not contain', value: 'not like' },
          { label: 'Equal To', value: '=' },
          { label: 'Not Equal To', value: '!=' },
          { label: 'Greater Than', value: '>' },
          { label: 'Less Than', value: '<' },
          { label: 'Between', value: 'between' },
          { label: 'Greater Than or Equal To', value: '>=' },
          { label: 'Less Than or Equal To', value: '<=' },
          { label: 'Is Empty', value: 'null' },
          { label: 'Not Empty', value: 'notnull' },
          { label: 'Starts with', value: 'startswith' },
          { label: 'Ends with', value: 'endswith' },
        ],
      }
    },
    valueField() {
      if (['like', 'not like'].includes(this.operator)) {
        return {
          fieldtype: 'Data',
        }
      }
      return this.selectedField
    },
    meta() {
      return this.$store.getters['Meta/getMeta'](this.doctype)
    },
  },
  methods: {
    reset() {
      this.$emit('reset')
    },
    applyFilter() {
      this.$emit('addFilter')
    },
  },
}
</script>
