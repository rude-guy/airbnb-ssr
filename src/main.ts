import { createSSRApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createSSRRouter } from './router'
import { key, createSSRStore } from '@/store'
import 'element-plus/dist/index.css'
import createSSRI18n from '@/language/i18n'

export function createApp () {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()
  sync(store, router)
  app.config.globalProperties.$message = ElMessage
  app.use(store, key)
  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)
  return { app, router, store }
}

export function asyncDataFilter (actived: any, store: any, route: any) {
  return Promise.all(actived.map((Component: any) => {
    return Component.asyncData?.({
      store,
      route
    })
  }))
}
