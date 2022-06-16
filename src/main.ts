import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  // .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
