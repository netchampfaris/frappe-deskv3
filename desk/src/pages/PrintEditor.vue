<template>
  <div class="print">
    <ThePageHeader v-bind="pageHeaderSettings"/>
    <div class="container">
      <div class="flex">
        <div class="w-1/6">
          <div ref="source">
            <div
              class="dropzone draggable-dropzone--occupied"
              v-for="component in components"
              :key="component.name"
            >
              <PrintEditorBlock>
                <component :is="component"/>
              </PrintEditorBlock>
            </div>
          </div>
        </div>
        <div class="w-5/6 border-l border-r">
          <div class="print-format border p-12 m-12 shadow-md" ref="target">
            <div class="dropzone border"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Droppable } from '@shopify/draggable'
import { Header, Field, Container, Column } from './PrintEditorComponents'
import PrintEditorBlock from './PrintEditorBlock'

export default {
  name: 'PrintEditor',
  props: ['doctype'],
  mounted() {
    this.droppable = new Droppable([this.$refs.source, this.$refs.target], {
      draggable: '.print-section',
      dropzone: '.dropzone',
    })

    this.droppable.on('droppable:dropped', () =>
      console.log('droppable:dropped')
    )
    this.droppable.on('droppable:returned', () =>
      console.log('droppable:returned')
    )
  },
  components: {
    PrintEditorBlock,
  },
  computed: {
    components() {
      return [Header, Field, Container, Column]
    },
    pageHeaderSettings() {
      return {
        showPageHeader: true,
        title: this.__('Edit Format'),
        menuItems: [],
        primaryAction: () => this.frappe.setRoute('List', this.doctype),
        primaryActionLabel: this.__('Save'),
      }
    },
  },
}
</script>
<style scoped lang="postcss">
.print-section {
  border-width: 1px;
  border-style: dotted;
  border-color: config('borderColors.default');
}
</style>
