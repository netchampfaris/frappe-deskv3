<script>
import controlMixin from './controlMixin'

export default {
  name: 'ControlInt',
  mixins: [controlMixin],
  data() {
    return {
      class: 'text-right',
    }
  },
  methods: {
    handleFocus() {
      this.getInput().select()
    },
  },
}
</script>
