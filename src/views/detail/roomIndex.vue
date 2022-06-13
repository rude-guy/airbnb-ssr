<script lang='ts'>
import { defineComponent, watch, watchEffect } from 'vue'
import RoomDetail from '@/views/detail/components/detail.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: { RoomDetail },
  setup () {
    const route = useRoute()
    const store = useStore()
    // todo 死循环
    // watchEffect(() => {
    //   store.dispatch('getRoomDetail', route.params)
    // })
    watch(() => route.params.id, (newId) => {
      if (newId) {
        store.dispatch('getRoomDetail', route.params)
      }
    }, {
      immediate: true
    })
  },
  asyncData ({ store, route }: any) {
    const { roomId } = store.state
    const { id } = route.value.params
    return store.dispatch('getRoomDetail', { id: roomId || id })
  }
})
</script>

<template>
 <room-detail />
</template>
