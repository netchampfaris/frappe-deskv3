<template>
  <form>
    <section
      class="p-8"
      :class="{'border-b': i !== layout().length - 1}"
      v-for="(section, i) in layout()"
      :key="section.config.fieldname"
    >
      <div
        class="uppercase text-muted tracking-wide pl-2 mb-6"
        v-if="section.config.label"
      >{{ section.config.label }}</div>
      <div class="flex -mx-2">
        <div
          class="flex-1"
          v-for="(column, i) in section.columns"
          :key="section.config.fieldname + i"
        >
          <Control
            class="mb-4 px-4"
            v-for="field in column"
            :key="field.fieldname"
            :docfield="field"
            :value="doc[field.fieldname]"
            @change="value => $emit('valueChange', field, value)"
          />
        </div>
      </div>
    </section>
  </form>
</template>
<script>
import Control from './Control'

export default {
  name: 'FormLayout',
  props: ['fields', 'doc'],
  components: {
    Control,
  },
  methods: {
    layout() {
      let sections = []
      let currentSection = null
      let currentColumn = null

      function resetCurrentSection(config = null) {
        currentSection = {
          config,
          columns: [],
        }
      }

      function resetCurrentColumn() {
        currentColumn = []
      }

      resetCurrentSection()
      resetCurrentColumn()

      for (let field of this.fields) {
        if (field.fieldtype === 'Column Break') {
          currentSection.columns.push(currentColumn)
          resetCurrentColumn()
          continue
        }
        if (field.fieldtype === 'Section Break') {
          if (currentColumn.length) {
            currentSection.columns.push(currentColumn)
            resetCurrentColumn()
          }
          sections.push(currentSection)
          resetCurrentSection(field)
          continue
        }
        currentColumn.push(field)
      }
      if (currentColumn.length) {
        currentSection.columns.push(currentColumn)
        resetCurrentColumn()
      }
      if (currentSection.columns.length) {
        sections.push(currentSection)
        resetCurrentSection()
      }

      return sections
        .filter(section => section.columns.length)
        .map((section, i) => {
          if (!section.config) {
            const id = 'Section ' + i
            section.config = {
              label: '',
              fieldname: id,
            }
          }
          return section
        })
    },
  },
}
</script>
