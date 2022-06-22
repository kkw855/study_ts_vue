<template>
  <div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl my-4">Markdown App</h1>
    <section class="flex m-auto w-10/12 h-screen">
      <article class="w-1/2 border">
        <textarea class="w-full h-full" @input="update"></textarea>
      </article>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { marked } from 'marked'
import debounce from '../utilities/mixins/debounce'

export default defineComponent({
  mixins: [debounce],
  data() {
    return {
      text: '',
      timeout: '' as unknown,
    }
  },
  computed: {
    markedText(): string {
      return marked(this.text)
    },
  },
  methods: {
    update(e: Event) {
      const task = () => (this.text = (e.target as HTMLInputElement).value)
      this.debounce(task, 500)
    },
  },
})
</script>
