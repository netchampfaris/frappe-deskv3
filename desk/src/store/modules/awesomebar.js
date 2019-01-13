export default {
  data() {
    return {
      isFocused: false,
    }
  },
  methods: {
    toggleFocus(flag) {
      if (flag !== undefined) {
        this.isFocused = flag
      } else {
        this.isFocused = !this.isFocused
      }
    },
  },
}
