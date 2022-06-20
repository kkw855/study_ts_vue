<template>
  <section
    class="fixed top-0 z-20 w-screen h-screen bg-gray-50 opacity-50"
    @click="$emit('close-login-modal')"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
        <div class="p-2 border">
          <h1 class="text-xl text-center">Login</h1>
          <form class="p-2 my-2">
            <div class="my-4">
              <label>Email or Username</label>
              <input class="rounded shadow p-2 w-full" />
            </div>
            <div class="my-4">
              <label>Password</label>
              <input class="rounded shadow p-2 w-full" type="password" />
            </div>
            <div class="my-4">
              <button
                class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close-login-modal'],
  data() {
    return {
      isOpen: true,
    }
  },
})
</script>

<style scoped></style>
