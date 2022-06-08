import { asyncDataFilter, createApp } from '@/main'
import airbnb from '@/db'
import { ElLoading } from 'element-plus'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore,
    ...airbnb.orderObjectStore,
    ...airbnb.recordObjectStore
  }).then((res: any) => {
    next()
  })
})
router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    const toComponents = router.resolve(to).matched.flatMap(record =>
      Object.values(record.components)
    )
    const fromComponents = router.resolve(from).matched.flatMap(record =>
      Object.values(record.components)
    )

    const actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c
    })

    if (!actived.length) {
      return next()
    }
    const loading = ElLoading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.1)'
    })
    asyncDataFilter(actived, store, router.currentRoute).then(() => {
      loading.close()
      next()
    })
  })
  app.mount('#app')
})

router.beforeEach((to, from, next) => {
  const { roomDetail } = store.state
  const { title: roomTitle = '', owner = {} } = roomDetail || {}
  const { introduce = '' } = owner
  const { meta } = to
  const { title = '', keywords = '', description = '' } = meta
  document.title = `${title}${roomTitle}`
  const keywordsMeta: HTMLMetaElement | null = document.querySelector('meta[name="keywords"]')
  const descriptionMeta: HTMLMetaElement | null = document.querySelector('meta[name="description"]')
  keywordsMeta?.setAttribute('content', `${keywords}${introduce}`)
  descriptionMeta?.setAttribute('content', `${description}${introduce}`)
  next()
})
