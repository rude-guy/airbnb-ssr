import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
const home = () => import('@/views/home/homeIndex.vue')
const mine = () => import('@/views/mine/mineIndex.vue')
const login = () => import('@/views/login/loginIndex.vue')
const roomIndex = () => import('@/views/detail/roomIndex.vue')
const record = () => import('@/views/record/recordIndex.vue')

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '爱此迎-全球大型房屋租赁平台',
      keywords: '爱此迎，特价房源，品质房源，租赁平台',
      description: '爱此迎（Aircnb）是房屋租赁平台。爱此迎（Aircnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能。 ',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/roomDetail/:id',
    name: 'roomDetail',
    component: roomIndex,
    meta: {
      title: '爱此迎-',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/record',
    name: 'record',
    component: record,
    meta: {
      title: '爱此迎-',
      keywords: '',
      description: '',
      keepAlive: false
    }
  },
  {
    path: '/',
    redirect: { name: 'home' }
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
