<template>
  <div class="overflow-auto relative" @mousemove="duringColumnResize">
    <div class="header text-muted row" :style="gridTemplateColumns">
      <div
        class="col-header p-4 bg-grey-lighter border-b border-r relative"
        v-for="column in columns"
        :key="column.id"
        @mousedown.stop="startColumnResize"
        @mouseup="endColumnResize"
      >
        <div>{{ column.title }}</div>
        <div
          class="column-resize-handle absolute pin-r w-2 pin-y bg-red cursor-col-resize"
        ></div>
      </div>
    </div>
    <div class="body" @keydown.esc="disableEditing">
      <div
        class="row"
        v-for="(row, i) in data"
        :key="i"
        :style="gridTemplateColumns"
      >
        <div :key="column.id" v-for="(column, j) in columns">
          <div
            ref="cells"
            class="cell p-4 outline-none"
            :class="[
              'col-' + column.id,
              'rowIndex-' + i,
              focusBorder.display !== 'none' ? 'focus:shadow-outline' : '',
            ]"
            @click="e => focusCell(column, i, e.target)"
            @dblclick="e => editCell(column, i, e.target)"
            @keydown.enter="e => editCell(column, i, e.target)"
            @focus="e => focusCell(column, i, e.target)"
            @keydown.up="e => focusCell(column, i - 1)"
            @keydown.down="e => focusCell(column, i + 1)"
            @keydown.left="e => focusCell(columns[j - 1], i)"
            @keydown.right="e => focusCell(columns[j + 1], i)"
            tabindex="0"
          >
            {{ row[column.id] || '&nbsp;' }}
          </div>
        </div>
      </div>
    </div>
    <div class="popovers absolute pin-l pin-t pin-b">
      <div
        class="focus-border p-4 border-blue border pointer-events-none"
        :style="focusBorder"
      ></div>
      <div
        class="editing-area p-2 shadow-md border border-blue shadow-outline bg-white"
        :style="editingArea"
      >
        <div class="editing" v-if="editingCell.columnId">
          <Control
            :docfield="editingCell.docfield"
            :value="data[editingCell.rowIndex][editingCell.docfield.fieldname]"
            :inputOnly="true"
          />
        </div>
      </div>
      <div
        class="column-resize-track border-l border-grey-light border-dashed fixed pin-y"
        :style="columnResizeTrack"
      ></div>
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
        docfield: null,
      },
      focusBorder: {
        top: null,
        left: null,
        width: null,
        height: null,
        position: 'absolute',
        display: 'none',
      },
      editingArea: {
        top: null,
        left: null,
        minWidth: null,
        position: 'absolute',
        display: 'none',
      },
      columnResizeTrack: {
        top: null,
        left: null,
        display: 'none',
      },
      isDragging: false,
      resizingColumn: null,
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
    editCell(column, i, el) {
      this.editingCell.columnId = column.id
      this.editingCell.docfield = column.docfield
      this.editingCell.rowIndex = i

      this.editingArea.display = ''
      this.editingArea.top = el.offsetTop + 'px'
      this.editingArea.left = el.offsetLeft + 'px'
      this.editingArea.minWidth = el.offsetWidth + 'px'

      this.disableFocus()
    },
    disableEditing() {
      this.editingCell.columnId = null
      this.editingCell.rowIndex = null
      this.editingArea.display = 'none'
    },
    disableFocus() {
      this.focusedCell.columnId = null
      this.focusedCell.rowIndex = null
      this.focusBorder.display = 'none'
    },
    isEditingCell(column, i) {
      return (
        column.id === this.editingCell.columnId &&
        i === this.editingCell.rowIndex
      )
    },
    focusCell(column, i, el) {
      if (!column) return
      if (i > this.data.length - 1 || i < 0) return

      this.focusedCell.columnId = column.id
      this.focusedCell.rowIndex = i

      this.disableEditing()

      if (!el) {
        el = this.$el.querySelector(`.col-${column.id}.rowIndex-${i}`)
        el.focus()
      }

      if (el) {
        this.focusBorder.display = ''
        this.focusBorder.top = el.offsetTop + 'px'
        this.focusBorder.left = el.offsetLeft + 'px'
        this.focusBorder.height = el.offsetHeight + 'px'
        this.focusBorder.width = el.offsetWidth + 'px'
      }
    },
    isFocusedCell(column, i) {
      return (
        column.id === this.focusedCell.columnId &&
        i === this.focusedCell.rowIndex
      )
    },
    startColumnResize(e) {
      // e.preventDefault()
      if (e.target.matches('.column-resize-handle')) {
        this.isDragging = true
        this.resizingColumn = e.target.parentElement
      }
    },
    duringColumnResize(e) {
      if (!this.isDragging) return
      this.columnResizeTrack.display = ''
      // this.columnResizeTrack.top = e.screen
      this.columnResizeTrack.left = e.screenX + 'px'
      // e.offsetX + this.resizingColumn.offsetWidth + 'px'
    },
    endColumnResize() {
      console.log('end resize')
      this.isDragging = false
      this.resizingColumn = null
      this.columnResizeTrack.display = 'none'
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
  height: 40px;
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
