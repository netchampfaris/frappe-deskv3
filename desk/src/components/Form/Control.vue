<template>
  <component
    :is="component"
    :docfield="docfield"
    :value="value"
    :onlyInput="onlyInput"
    :disabled="isDisabled"
    :autofocus="autofocus"
    @change="value => $emit('change', value)"
  />
</template>
<script>
// import Base from './Base';
import Autocomplete from './Autocomplete'
import Check from './Check'
// import Code from './Code';
// import Currency from './Currency';
import Data from './Data'
import Date from './Date'
// import DynamicLink from './DynamicLink';
// import File from './File';
// import Float from './Float';
import Int from './Int'
import Link from './Link'
import Password from './Password'
import Select from './Select'
// import Table from './Table';
import Text from './Text'
import TextEditor from './TextEditor'
// import Time from './Time';

export default {
  props: ['docfield', 'value', 'onlyInput', 'doc', 'autofocus'],
  computed: {
    component() {
      const fieldtype = this.docfield.fieldtype.replace(/ /g, '')
      return (
        {
          Autocomplete,
          Check,
          // Code,
          // Currency,
          Data,
          Date,
          // DynamicLink,
          // File,
          // Float,
          Int,
          Link,
          Password,
          Select,
          // Table,
          Text,
          TextEditor,
          // Time
        }[fieldtype] || Data
      )
    },
    isDisabled() {
      let disabled = this.docfield.disabled

      if (this.doc && this.doc.submitted) {
        disabled = true
      }

      return Boolean(disabled)
    },
  },
  //   provide() {
  //     return {
  //       dynamicLinkTarget: reference => {
  //         return this.doc[reference];
  //       }
  //     };
  //   },
}
</script>
<style scoped>
.form-group {
  position: relative;
}
</style>
