<script setup lang='ts'>
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)

/* eslint-disable */
const emit = defineEmits<{(e: 'changePage', pageNo: number): void }>()

function changePage (pageNo: number) {
  emit('changePage', pageNo)
}

</script>

<template>
  <el-pagination
      v-model:currentPage="pageNo"
      :page-size="pageSize"
      :total="total"
      background
      layout="prev,pager,next"
      prev-text="<<"
      next-text=">>"
      @current-change="changePage"
  />
</template>
