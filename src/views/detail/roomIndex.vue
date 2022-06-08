<script lang='ts'>
import { defineComponent, watchEffect } from 'vue'
import RoomDetail from '@/views/detail/components/detail.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: { RoomDetail },
  setup () {
    const route = useRoute()
    const store = useStore()
    watchEffect(() => store.dispatch('getRoomDetail', route.params))
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
