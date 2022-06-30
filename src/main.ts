import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import initializeFirebase from './utilities/firebase'

initializeFirebase()

createApp(App)
  // .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
