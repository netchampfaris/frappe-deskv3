import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default new Vue({
  methods: {
    when(timestamp) {
      return dayjs().to(dayjs(timestamp))
    },
  },
})
