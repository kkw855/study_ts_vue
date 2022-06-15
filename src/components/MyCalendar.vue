<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center my-2">Vue Calendar</h1>
    <section class="flex mx-2 justify-between">
      <h2 class="font-bold">{{ currentMonthName }}</h2>
      <h2 class="font-bold mx-2">{{ currentYear }}</h2>
    </section>
    <section class="flex">
      <p v-for="day in days" :key="day" class="w-[14.28%] text-center">
        {{ day }}
      </p>
    </section>
    <section class="flex flex-wrap my-2">
      <div :style="blank"></div>
      <p
        v-for="num in getLastDayInMonth(currentYear, currentMonth)"
        :key="num"
        class="w-[14.28%] text-center"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between mt-4">
      <button class="px-2 border rounded">Prev</button>
      <button class="px-2 border rounded">Next</button>
    </section>
  </div>
</template>

<script lang="ts">
import { getLastDayInMonth, getStartDayInMonth } from '../lib/lib'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      currentMonthName: new Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(new Date()),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }
  },
  computed: {
    blank(): string {
      const width =
        getStartDayInMonth(this.currentYear, this.currentMonth) * 14.28
      return 'width: ' + width + '%;'
    },
  },
  methods: {
    getLastDayInMonth,
  },
})
</script>
