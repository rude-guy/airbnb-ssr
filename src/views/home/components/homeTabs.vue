<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { IRoomListParams } from '@/api/interface'

const store = useStore()
const { t } = useI18n()
const cityId = ref(store.state.cityId)
const cityArr = computed(() => store.state.cities)

function cityClick (tab: any) {
  const { name } = tab.props
  cityId.value = name
  store.dispatch('getRoomList', { pageNo: 1, cityId: name } as IRoomListParams)
}
</script>

<template>
  <!-- 城市筛选 -->
  <el-tabs v-model="cityId"
           @tab-click="cityClick"
           type="card"
  >
    <el-tab-pane
        v-for="(item, index) in cityArr"
        :key="index"
        :label="t(`home.city['${item.cityCode}']`)"
        :name="item._id"
    ></el-tab-pane>
  </el-tabs>
</template>
