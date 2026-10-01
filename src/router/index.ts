import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/overview',
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/Overview.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ],
})

export default router
