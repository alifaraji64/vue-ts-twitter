import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:uid?',
    name: 'Home',
    component: Home
  },
  {
    path: '/login-register',
    name: 'LoginRegister',
    component: () => import('../views/LoginRegister.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
