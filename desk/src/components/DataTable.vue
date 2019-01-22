<template>
  <div class="overflow-auto">
    <div class="header text-muted row" :style="gridTemplateColumns">
      <div
        class="w-64 p-4 bg-grey-lighter border-b border-r"
        v-for="column in columns"
        :key="column.id"
      >{{ column.title }}</div>
    </div>
    <div class="body">
      <div class="row" v-for="(row, i) in data" :key="i" :style="gridTemplateColumns">
        <div :key="column.id" v-for="column in columns">
          <div class="cell w-64 editing" v-if="isEditingCell(column, i)">
            <Control :docfield="column.docfield" :value="row[column.id]" :onlyInput="true"/>
          </div>
          <div
            v-else
            class="cell w-64 p-4"
            :class="{'focused': isFocusedCell(column, i)}"
            @click="focusCell(column, i)"
            @dblclick="editCell(column, i)"
          >{{ row[column.id] || '&nbsp;' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: ['columns', 'data'],
  data() {
    return {
      focusedCell: {
        columnId: null,
        rowIndex: null,
      },
      editingCell: {
        columnId: null,
        rowIndex: null,
      },
    }
  },
  computed: {
    gridTemplateColumns() {
      return {
        'grid-template-columns': `repeat(${this.columns.length}, 1fr)`,
      }
    },
  },
  methods: {
    editCell(column, i) {
      this.editingCell.columnId = column.id
      this.editingCell.rowIndex = i
    },
    isEditingCell(column, i) {
      return (
        column.id === this.editingCell.columnId &&
        i === this.editingCell.rowIndex
      )
    },
    focusCell(column, i) {
      this.focusedCell.columnId = column.id
      this.focusedCell.rowIndex = i
    },
    isFocusedCell(column, i) {
      return (
        column.id === this.focusedCell.columnId &&
        i === this.focusedCell.rowIndex
      )
    },
  },
}
</script>
<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr;
}

.cell {
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid config('borderColors.default');
  border-bottom: 1px solid config('borderColors.default');
}

.cell.focused {
  border-color: config('borderColors.blue');
}

.cell.editing >>> .form-control {
  border: none;
}
</style>
