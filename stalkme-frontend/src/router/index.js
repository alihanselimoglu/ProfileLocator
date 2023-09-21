import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search/li/:name',
      name: 'linkedin',
      component: () => import('../views/LinkedinView.vue'),
    },
    {
      path: '/search/in/:name',
      name: 'instagram',
      component: () => import('../views/InstagramView.vue'),
    }
  ]
})

export default router
