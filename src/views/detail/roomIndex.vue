<script lang='ts'>
import { defineComponent } from 'vue'
import RoomDetail from '@/views/detail/components/detail.vue'

export default defineComponent({
  components: { RoomDetail },
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

<style lang='scss'>
@import "src/assets/scss/detail/index.scss";
//@import "src/assets/scss/detail/index.scss";
@import "src/assets/scss/common/toast.scss";
</style>
