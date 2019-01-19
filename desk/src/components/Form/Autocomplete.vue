<script>
import controlMixin from './controlMixin'
import Popover from '../Popover'

export default {
  name: 'ControlAutocomplete',
  mixins: [controlMixin],
  data() {
    return {
      filterText: null,
      highlightedItem: -1,
      popoverOpen: false,
    }
  },
  methods: {
    renderInput() {
      const originalInput = controlMixin.methods.renderInput.call(this)

      return (
        <Popover fullwidth={true}>
          {originalInput}
          <div slot="popover-content">
            <ul
              class="bg-white list-reset rounded border shadow cursor-pointer overflow-auto max-h-dropdown"
              {...{ class: this.popoverOpen ? '' : 'hidden' }}
              ref="dropdown-menu"
              onMouseover={() => (this.highlightedItem = -1)}
            >
              {this.renderSuggestionList()}
            </ul>
          </div>
        </Popover>
      )
    },
    renderSuggestionList() {
      return this.filteredOptions.map((option, i) => {
        const attrs = {
          class: [this.highlightedItem === i ? 'bg-grey-lighter' : ''],
        }
        return (
          <li
            class="p-4 hover:bg-grey-lighter"
            {...attrs}
            key={option.value}
            ref={i}
            onClick={() => this.selectOption(option)}
          >
            {option.label}
          </li>
        )
      })
    },

    handleKeydown(e) {
      if (e.keyCode === 38) {
        // up
        this.highlightItem(-1)
        this.popoverOpen = true
      } else if (e.keyCode === 40) {
        // down
        this.highlightItem(1)
        this.popoverOpen = true
      } else if (e.keyCode === 13) {
        if (this.highlightedItem > -1) {
          this.$nextTick(() => {
            this.selectOption(this.filteredOptions[this.highlightedItem])
          })
        }
      }
    },

    handleInput(e) {
      this.$nextTick(() => {
        this.filterText = e.target.value
      })
      this.popoverOpen = true
    },

    handleFocus() {
      this.popoverOpen = true
    },

    selectOption(option) {
      if (this.docfield.onOptionSelect) {
        this.docfield.onOptionSelect(option)
      } else {
        this.handleChange(option.value)
      }
      this.popoverOpen = false
      this.filterText = null
      this.highlightedItem = -1
    },

    highlightItem(value) {
      this.highlightedItem += value
      if (this.highlightedItem < 0) {
        this.highlightedItem = 0
      }
      if (this.highlightedItem > this.filteredOptions.length - 1) {
        this.highlightedItem = this.filteredOptions.length - 1
      }
      this.scrollToItem(this.highlightedItem)
    },

    scrollToItem(i) {
      const scrollTo = this.$refs[i].offsetTop - 5
      this.$refs['dropdown-menu'].scrollTop = scrollTo
    },
  },
  computed: {
    filteredOptions() {
      if (!this.filterText) return this.options
      return this.options.filter(option => {
        const label = option.label.toLowerCase()
        const value = option.value.toLowerCase()
        const filterText = this.filterText.toLowerCase()
        return label.includes(filterText) || value.includes(filterText)
      })
    },
    options() {
      if (this.docfield.getOptions) {
        return this.docfield.getOptions(this.filterText)
      }
      return (this.docfield.options || []).map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          }
        }
        if (!option.value) {
          throw new Error(
            `Field of type ${
              this.docfield.fieldtype
            } must have options with value`
          )
        }
        if (option.label) {
          option.label = option.value
        }
        return option
      })
    },
  },
}
</script>
