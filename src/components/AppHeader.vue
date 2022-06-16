<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2"
  >
    <router-link to="/dc-heros">Dc Heros</router-link>
    <router-link to="/calendar">Calendar</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>
