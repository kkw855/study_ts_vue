<template>
  <div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl my-4">Markdown App</h1>
    <section class="flex m-auto w-10/12 h-screen">
      <article class="w-1/2 border">
        <textarea v-model="text" class="w-full h-full"></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100">
        {{ markedText }}
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { marked } from 'marked'

export default defineComponent({
  data() {
    return {
      text: '',
    }
  },
  computed: {
    markedText(): string {
      return marked(this.text)
    },
  },
})
</script>
