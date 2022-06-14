import 'normalize.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

// const router = createRouter({
//   // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//   history: createWebHashHistory(),// short for `routes: routes`
//   {}
// })
//
// createApp(App)
// .component('font-awesome-icon', FontAwesomeIcon)
// .use(router)
// .mount('#app')

createApp(App).mount('#app')
