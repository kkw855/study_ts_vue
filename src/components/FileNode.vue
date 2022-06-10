<script setup lang="ts">
  import {defineProps} from "vue";

  defineProps<{
    label: string
    description: string
  }>()
</script>

<template>
  <div>{{ label }}</div>
</template>

<style scoped>

</style>
