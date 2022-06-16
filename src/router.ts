import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/HomePage.vue'
import DcHeros from './pages/DcHerosPage.vue'
import Calendar from './pages/CalendarPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dc-heros', component: DcHeros },
  { path: '/calendar', component: Calendar },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
