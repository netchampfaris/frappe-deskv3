<script>
import controlMixin from './controlMixin'
import Input from './Input'

export default {
  name: 'ControlData',
  mixins: [controlMixin],
  data() {
    return {
      type: 'checkbox',
      class: 'absolute -ml-6',
    }
  },
  render() {
    return (
      <div>
        <div class="relative pl-6">
          <Input
            id={this._uid}
            type={this.type}
            value={this.format(this.value)}
            class={this.class}
            disabled={this.disabled}
            autofocus={this.autofocus}
            onValueChange={this.handleChange}
            onFocus={this.handleFocus}
            onKeydown={this.handleKeydown}
            onInput={this.handleInput}
            ref="input"
          />
          <label for={this._uid}>{this.docfield.label}</label>
        </div>
        {this.docfield.description && !this.onlyInput ? (
          <div class="mt-2">
            <p class="text-muted">{this.docfield.description}</p>
          </div>
        ) : null}
      </div>
    )
  },
}
</script>
