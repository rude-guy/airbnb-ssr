<script setup lang='ts'>
import { useStore } from '@/store'
import Pagination from '@/components/common/pagination.vue'
import HomeTabs from '@/views/home/components/homeTabs.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

function toDetail (item: any) {
  const { id } = item
  store.commit('setRoomId', id)
  router.push({ path: `/roomDetail/${id}` })
}

function changePage (pageNo: number) {
  store.dispatch('getRoomList', { pageNo })
}
</script>

<template>
  <!--城市筛选-->
  <home-tabs />
  <!--城市筛选-->
  <div class='home-list'>
    <div class='item'
         v-for='item in store.state.roomList'
         :key='item.id'
         @click='toDetail(item)'
    >
      <img :src='item.pictureUrl' alt=''>
      <div class='title'>{{ item.title }}</div>
      <div class='price'>{{ item.price }}</div>
    </div>
  </div>
  <!--分页-->
  <Pagination @changePage='changePage'/>
</template>

<style scoped>

</style>
