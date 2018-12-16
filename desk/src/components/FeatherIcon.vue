<template>
  <div class="inline-flex" v-on="$listeners" v-html="iconSVG"></div>
</template>
<script>
import feather from 'feather-icons'

const validIcons = Object.keys(feather.icons)

export default {
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        const valid = validIcons.includes(value)
        if (!valid) {
          console.warn(
            `[FeatherIcon] "${value}" is an invalid. It must be one of `,
            validIcons
          )
        }
        return valid
      },
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    iconSVG() {
      const icon = feather.icons[this.name]
      if (!icon) {
        return ''
      }
      return icon.toSvg({
        width: this.size,
        height: this.size,
      })
    },
  },
}
</script>
