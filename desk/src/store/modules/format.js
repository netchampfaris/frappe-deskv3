import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  methods: {
    formatWhen(timestamp) {
      return dayjs().to(dayjs(timestamp))
    },
  },
}
