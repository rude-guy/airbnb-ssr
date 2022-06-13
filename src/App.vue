<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import HeaderCommon from '@/components/layout/commonHeader.vue'
import FooterCommon from '@/components/layout/commonFooter.vue'
import { onMounted } from 'vue'

const route = useRoute()
const store = useStore()

onMounted(() => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
    store.commit('setUserInfo', userInfo)
    store.commit('setUserStatus', userInfo ? 1 : 0)
  } catch (e) {
    store.commit('setUserStatus', 0)
  }
})

</script>

<template>
  <el-config-provider :locale='store.state.locale'>
    <header-common v-show='route.fullPath.indexOf("login") === -1'/>
    <!-- 主体 -->
    <div class='container'>
      <router-view/>
    </div>
    <footer-common v-show='route.fullPath.indexOf("login") === -1'/>
  </el-config-provider>
</template>

<style lang='scss'>
.wrap {
}
</style>
