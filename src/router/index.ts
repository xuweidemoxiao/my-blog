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
      path: '/file',
      name: 'file',
      component: () => import('../views/File.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Article.vue')
    },
  ],
})

export default router
