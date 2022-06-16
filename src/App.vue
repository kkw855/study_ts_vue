<template>
  <AppHeader />
  <div class="w-full flex">
    <router-view></router-view>
    <Calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import Calendar from './components/MyCalendar.vue'

export default defineComponent({
  components: { Calendar, AppHeader },
})
</script>
