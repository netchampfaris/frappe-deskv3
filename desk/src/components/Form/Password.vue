<script>
import controlMixin from './controlMixin'

export default {
  name: 'ControlPassword',
  mixins: [controlMixin],
  data() {
    return {
      type: 'password',
    }
  },
}
</script>
