<template>
  <ol>
    <TodoItem v-for="todo in groceryList" :key="todo.id" :todo="todo">
    </TodoItem>
  </ol>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
  components: { TodoItem },
  data() {
    return {
      groceryList: [
        { id: 0, text: '야채' },
        { id: 1, text: '치즈' },
        { id: 2, text: '사람이 먹을수 있는거라면 뭐든지' },
      ],
    }
  },
}
</script>
