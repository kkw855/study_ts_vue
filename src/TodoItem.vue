<template>
  <li>{{ todo.text }}</li>
</template>

<script lang="ts">
import { PropType } from 'vue'
interface Todo {
  id: number
  text: string
}
export default {
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
}
</script>

<style scoped></style>
