import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

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
          path: 'article/:id', 
          name: 'articleDetail', 
          component: () => import('../views/ArticleDetail.vue') 
        },
        { 
          path: 'gallery/create', 
          name: 'galleryCreate', 
          component: () => import('../views/GalleryCreate.vue') 
        },
        {
          path: 'gallery/:id', 
          name: 'galleryDetail', 
          component: () => import('../views/GalleryDetail.vue') 
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Login.vue'),
          meta: { public: true },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/Register.vue'),
          meta: { public: true },
        },
      ]
    }
  ],
})

// 全局路由守卫：未登录访问受保护页面 → 重定向到登录页，并记录原目标
router.beforeEach((to) => {
  const userStore = useUserStore();
  const isPublic = to.meta.public === true;

  if (!isPublic && !userStore.isLogin) {
    return {
      name: 'login',
      query: to.fullPath !== '/' ? { redirect: to.fullPath } : {},
    };
  }

  // 已登录用户访问登录/注册页 → 重定向回首页
  if (isPublic && userStore.isLogin) {
    return { path: '/' };
  }

  return true;
});

export default router
