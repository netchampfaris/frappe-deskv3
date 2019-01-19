import Input from './Input'
import ControlLayout from './ControlLayout'

export default {
  props: {
    docfield: Object,
    value: {
      type: [String, Number],
      required: true,
    },
    onlyInput: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    inputClass: [String, Array, Object],
  },
  data() {
    return {
      type: 'text',
      class: '',
    }
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <ControlLayout docfield={this.docfield} onlyInput={this.onlyInput}>
        {this.renderInput()}
      </ControlLayout>
    )
  },
  methods: {
    renderInput() {
      return (
        <Input
          type={this.type}
          class={[this.class, this.inputClass]}
          value={this.format(this.value)}
          disabled={this.disabled}
          autofocus={this.autofocus}
          placeholder={this.docfield.placeholder}
          onValueChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeydown={this.handleKeydown}
          onInput={this.handleInput}
          ref="input"
        />
      )
    },
    handleChange(value) {
      const parsedValue = this.parse(value)
      this.$emit('change', parsedValue)
    },
    handleFocus() {},
    handleKeydown() {},
    handleInput() {},
    parse(inputValue) {
      // parse user input and convert it into storable format for the database
      return inputValue
    },
    format(value) {
      // format input coming from the server into user presentable format
      return value
    },
    getInput() {
      return this.$refs.input.$refs.input
    },
  },
}
