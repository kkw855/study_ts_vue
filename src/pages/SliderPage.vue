<template>
  <div class="flex w-full flex-wrap">
    <div v-for="(color, index) in sliders" :key="color" class="absolute w-full">
      <transition name="fade">
        <div v-if="currentSlide === index" class="h-[350px]" :class="color" />
      </transition>
    </div>
    <div class="absolute w-full" style="height: 340px">
      <div class="absolute bottom-0 w-full flex justify-center">
        <div
          v-for="(color, index) in sliders"
          :key="color"
          class="w-4 h-4 mx-2 border rounded-full bg-black cursor-pointer shadow-md"
          :class="currentSlide === index ? 'bg-gray-700' : 'bg-gray-300'"
          @click="makeActive(index)"
        />
      </div>
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
      isTitleShowing: false,
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
  methods: {
    makeActive(index: number) {
      this.currentSlide = index
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
