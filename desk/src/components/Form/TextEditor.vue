<template>
  <ControlLayout :docfield="docfield" :onlyInput="onlyInput">
    <EditorMenuBar :editor="editor">
      <div class="flex items-center" slot-scope="{ commands, isActive }">
        <Button
          class="h-12"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          rounded="left"
        >
          <FeatherIcon name="bold"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          rounded="none"
        >
          <FeatherIcon name="italic"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
          rounded="none"
        >
          <FeatherIcon name="git-commit"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
          rounded="none"
        >
          <FeatherIcon name="underline"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
          rounded="none"
        >
          <FeatherIcon name="code"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
          rounded="none"
        >P</Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          rounded="none"
        >H1</Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          rounded="none"
        >H2</Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          rounded="none"
        >H3</Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          rounded="none"
        >
          <FeatherIcon name="list"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          rounded="none"
        >1.</Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          rounded="none"
        >
          <FeatherIcon name="chevrons-left"/>
        </Button>

        <Button
          class="h-12"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
          rounded="right"
        >
          <FeatherIcon name="terminal"/>
        </Button>
      </div>
    </EditorMenuBar>
    <EditorContent class="editor-content mt-1" :editor="editor"/>
  </ControlLayout>
</template>
<script>
import ControlLayout from './ControlLayout'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  name: 'ControlTextEditor',
  props: ['docfield', 'value', 'onlyInput', 'disabled'],
  components: {
    ControlLayout,
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      onUpdate: ({ getHTML }) => {
        this.$emit('change', getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style scoped>
.editor-content >>> .ProseMirror {
  outline: none;
  min-height: 12rem;
  max-height: 24rem;
  @apply .outline-none .border .rounded .text-lg .px-4 .py-3 .w-full .text-grey;
}
</style>
