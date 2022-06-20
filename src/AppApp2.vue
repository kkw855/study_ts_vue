<template>
  <div id="demo">
    <button @click="show = !show">Toggle</button>

    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      show: true,
    }
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
