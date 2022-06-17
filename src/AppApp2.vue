<template>Counter: {{ counter }}</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      counter: 0,
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  },
})
</script>

<style scoped></style>
