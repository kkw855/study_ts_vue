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
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineComponent({
  components: { LoginModal, AppHeader },
  data() {
    return {
      isLoginOpen: false,
      authUser: {},
      isLoggedIn: false,
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user)
        this.authUser = user
        this.isLoggedIn = true
      } else {
        // User is signed out
        console.log('No User')
        this.isLoggedIn = false
      }
    })
  },
})
</script>
