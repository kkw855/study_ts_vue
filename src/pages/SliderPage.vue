<template>
  <div class="flex w-full flex-wrap">
    <div v-for="(color, index) in sliders" :key="color">
      <div
        v-if="currentSlide === index"
        class="absolute w-full h-[350px]"
        :class="color"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      currentSlide: 0,
      interval: '' as unknown,
      sliders: ['bg-blue-600', 'bg-yellow-600', 'bg-teal-600'],
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide = this.currentSlide === 2 ? 0 : ++this.currentSlide
    }, 2000)
  },
  unmounted() {
    clearInterval(this.interval as ReturnType<typeof setInterval>)
  },
})
</script>
