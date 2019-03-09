<template>
  <ControlLayout :docfield="docfield" :inputOnly="inputOnly">
    <div class="rounded border">
      <!-- header row -->
      <div class="flex text-muted border-b bg-grey-lightest">
        <!-- idx column -->
        <div class="w-24 border-r">
          <div class="p-4">&nbsp;</div>
        </div>

        <!-- field columns -->
        <div class="w-full flex">
          <div
            class="flex-1 p-4 border-r"
            v-for="field in visibleFields"
            :key="field.fieldname"
          >{{ field.label }}</div>
        </div>

        <!-- last column -->
        <div class="w-12">&nbsp;</div>
      </div>

      <!-- no data row -->
      <div class="flex text-center" v-if="value.length === 0">
        <div class="w-full flex text-muted">
          <div class="w-full p-4">{{ __('No Data') }}</div>
        </div>
      </div>

      <!-- rows -->
      <div class="relative" v-for="row in value" :key="row.idx">
        <div class="flex" :class="{'border-b': row.idx < value.length }">
          <!-- idx column -->
          <div class="w-24 border-r">
            <div class="p-4 text-right">{{ row.idx }}</div>
          </div>

          <!-- field columns -->
          <div class="w-full flex">
            <div
              class="flex-1 p-4 border-r"
              v-for="field in visibleFields"
              :key="field.fieldname"
            >{{ row[field.fieldname] }}</div>
          </div>

          <!-- last column -->
          <div class="w-12 flex items-center justify-center">
            <Button icon="maximize-2" @click="activateEditing(row.idx)"></Button>
          </div>
        </div>
        <div class="absolute pin-y pin-x z-10" v-if="editingRow === row.idx">
          <!-- editing container -->
          <div class="bg-white border shadow-lg">
            <!-- editing header -->
            <div class="flex items-center justify-between p-4 border-b">
              <div>{{ __('Editing Row {0}', '#' + row.idx) }}</div>
              <div class="flex items-center">
                <Button
                  size="small"
                  class="mr-2 text-red"
                  icon="trash-2"
                  @click="deleteRow(row.idx)"
                ></Button>
                <Button
                  size="small"
                  class="mr-2"
                  @click="addRow('above', row.idx)"
                >{{__('Insert Above')}}</Button>
                <Button
                  size="small"
                  class="mr-2"
                  @click="addRow('below', row.idx)"
                >{{__('Insert Below')}}</Button>
                <Button size="small" icon="minimize-2" @click="disableEditing"></Button>
              </div>
            </div>

            <!-- form -->
            <FormLayout
              :fields="childMeta.fields"
              :doc="row"
              @valueChange="(field, value) => setValue(row, field, value)"
            />
          </div>
        </div>
      </div>

      <!-- actions row -->
      <div class="flex text-muted border-t">
        <div class="w-full flex text-muted">
          <div class="w-full px-4 py-2">
            <Button size="small" @click="addRow('below', value.length)">{{ __('Add Row') }}</Button>
          </div>
        </div>
      </div>
    </div>
  </ControlLayout>
</template>

<script>
import controlMixin from './controlMixin'
import ControlLayout from './ControlLayout'

export default {
  name: 'ControlTable',
  props: controlMixin.props,
  components: {
    ControlLayout,
    FormLayout: () => import('./FormLayout'),
  },
  data() {
    return {
      editingRow: -1,
    }
  },
  methods: {
    activateEditing(idx) {
      this.editingRow = idx
    },
    disableEditing() {
      this.editingRow = -1
    },
    setValue(row, field, value) {
      const updatedRows = this.value.map(r => {
        const newRow = Object.assign({}, r)
        if (newRow.idx === row.idx) {
          newRow[field.fieldname] = value
        }
        return newRow
      })
      this.$emit('change', updatedRows)
    },
    addRow(where, idx) {
      const newRow = {
        idx: null,
      }
      const rows = this.value.slice()
      const index = where === 'below' ? idx : idx - 1
      rows.splice(index, 0, newRow)
      rows.map((row, i) => (row.idx = i + 1))
      this.$emit('change', rows)
    },
    deleteRow(idx) {
      const rows = this.value
        .filter(row => row.idx !== idx)
        .map((row, i) => {
          row.idx = i + 1
          return row
        })
      this.disableEditing()
      this.$emit('change', rows)
    },
  },
  computed: {
    visibleFields() {
      return this.childMeta.fields.filter(df => df.in_list_view)
    },
    childDoctype() {
      return this.docfield.options
    },
    childMeta() {
      return this.frappe.getMeta(this.childDoctype)
    },
  },
}
</script>
