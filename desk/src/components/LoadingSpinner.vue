<template>
  <div class="spinner">
    <div class="spinner-animation">
      <svg
        class="block"
        :width="size"
        :height="size"
        stroke-width="16.00"
        viewBox="-3.00 -3.00 106.00 106.00"
      >
        <path class="spinner-track" d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"></path>
        <path
          class="spinner-head stroke-current"
          :class="trackColor"
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          pathLength="280"
          stroke-dasharray="280 280"
          stroke-dashoffset="210"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      default: 'dark',
    },
    size: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    trackColor() {
      return {
        'text-grey-lighter': this.type === 'light',
        'text-grey-dark': this.type === 'dark',
      }
    },
  },
}
</script>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  vertical-align: middle;
}

.spinner-animation {
  animation: spinner-animation 0.5s linear infinite;
}

path {
  fill-opacity: 0;
}

.spinner-track {
  stroke: rgba(92, 112, 128, 0.2);
}

.spinner-head {
  transform-origin: center;
  transition: stroke-dashoffset 0.2s cubic-bezier(0.4, 1, 0.75, 0.9);
  stroke-linecap: round;
}

@keyframes spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
