<template>
  <div class="progress-card">
    <svg>
      <circle
        :cx="size"
        :cy="size"
        :r="rad"
        :style="{
          strokeDashoffset: strokeFill,
          strokeDasharray: strokeVal + ' ' + strokeVal
        }"
      ></circle>
    </svg>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="aniamted fadeOut"
      :duration="300"
      mode="out-in"
    >
      <div :key="rate" class="percent-number">{{ rate }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rad: 33,
      size: 35,
      strokeFill: this.strokeVal
    };
  },
  computed: {
    strokeVal() {
      return 2 * Math.PI * this.rad;
    }
  },
  watch: {
    rate() {
      this.strokeFill = this.strokeVal;
      const val = this.rate * 10;
      let percent = this.strokeVal - (val / 100) * this.strokeVal;
      let interval = setInterval(() => {
        if (this.strokeFill > percent) {
          this.strokeFill -= 1;
        } else {
          clearInterval(interval);
        }
      }, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-card {
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(41, 37, 98, 1) 0%,
    rgba(84, 84, 168, 1) 46%,
    rgba(47, 47, 120, 1) 100%
  );
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 70px;
    width: 70px;
    circle {
      fill: transparent;
      stroke: green;
      stroke-width: 4;
      transform-origin: center;
      transform: rotate(-90deg);
    }
  }
  .percent-number {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: wheat;
  }
}
.fillCircle-enter-active {
  transition-delay: 0.8s;
  transition: stroke-dashoffset ease-out;
}
</style>
