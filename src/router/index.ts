import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition  // 浏览器前进/后退时恢复到之前的位置
    }
    return { top: 0 }  // 点击导航时回到顶部
  },
  routes: [
    {
      path: '/',
      component: () => import('../layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/overview'
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
        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('../views/Gallery.vue')
        },
        {
          path: '/diary',
          name: 'diary',
          component: () => import('../views/Diary.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../views/Setting.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('../views/Test.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layout/BlankLayout.vue'),
      children: [
        { 
          path: 'article/create', 
          name: 'articleCreate', 
          component: () => import('../views/ArticleCreate.vue') 
        },
        { 
          path: 'gallery/create', 
          name: 'galleryCreate', 
          component: () => import('../views/GalleryCreate.vue') 
        },
      ]
    }
  ],
})

export default router
