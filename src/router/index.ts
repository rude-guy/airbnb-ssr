import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
const home = () => import('@/views/home/homeIndex.vue')
const mine = () => import('@/views/mine/mineIndex.vue')
const login = () => import('@/views/login/loginIndex.vue')
const roomIndex = () => import('@/views/detail/roomIndex.vue')

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: roomIndex,
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

export function createSSRRouter () {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition): void {
      window.scrollTo(0, 0)
    }
  })
}
export default createSSRRouter
