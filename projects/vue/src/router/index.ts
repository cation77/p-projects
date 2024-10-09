import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'homePage',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/chat',
    name: 'chatPage',
    component: () => import('../pages/chat/index.vue')
  },
  {
    path: '/masonry/list',
    name: 'masonry-list',
    component: () => import('../pages/masonry/index.vue')
  },
  {
    path: '/masonry/columns',
    name: 'masonry-columns',
    component: () => import('../pages/masonry/columns.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
