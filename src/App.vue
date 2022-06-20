<template>
  <AppHeader @open-login-modal="isLoginOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <LoginModal v-if="isLoginOpen" @close-login-modal="isLoginOpen = false" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import LoginModal from './components/LoginModal.vue'

export default defineComponent({
  components: { LoginModal, AppHeader },
  data() {
    return {
      isLoginOpen: false,
    }
  },
})
</script>
