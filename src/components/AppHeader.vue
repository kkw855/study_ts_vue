<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2"
  >
    <router-link
      v-for="link in list"
      :key="link.path"
      class="mx-2"
      :to="link.to"
    >
      {{ link.title }}
    </router-link>
    <button @click="$emit('open-login-modal')">Login</button>
  </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['open-login-modal'],
  data() {
    return {
      list: [
        { title: 'Home', to: '/' },
        { title: 'Dc Heros', to: '/dc-heros' },
        { title: 'Calendar', to: '/calendar' },
        { title: 'Markdown', to: '/markdown' },
        { title: 'Slider Carousel', to: '/slider' },
      ],
    }
  },
})
</script>
