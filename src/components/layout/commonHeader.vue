<script setup lang='ts'>
import { computed, defineAsyncComponent, getCurrentInstance, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import en from 'element-plus/lib/locale/lang/en.js'
import { fetchLanguageApi } from '@/api/layout'

const OrderPopover = defineAsyncComponent(() => import('@/views/order/components/orderPopover.vue'))

const {
  t,
  locale: localeLanguage
} = useI18n()
const router = useRouter()
const { proxy }: any = getCurrentInstance()
const activeIndex = ref(0)
const store = useStore()

const userInfo = computed(() => store.state.userInfo)

function handleSelect (e: any) {
  if (e === 'zh') {
    store.dispatch('saveLanguage', zhCn)
    localeLanguage.value = e
  } else if (e === 'en') {
    store.dispatch('saveLanguage', en)
    localeLanguage.value = e
  } else if (e === 'login') {
    router.push({ name: 'login' })
  } else if (e === 'logout') {
    useLogout()
  } else if (e === 'orders') {
    store.commit('setOrderVisible', true)
  } else if (e === 'records') {
    router.push({ name: 'record' })
  }
}

// Mock 接口：获取当前语言包
function getLanguage () {
  fetchLanguageApi().then((res: any) => {
    const {
      success,
      result
    } = res
    const { name } = result
    if (success) {
      if (name === 'zh') {
        store.dispatch('saveLanguage', zhCn)
      } else if (name === 'en') {
        store.dispatch('saveLanguage', en)
      }
    }
  })
}

// 登出接口
function useLogout () {
  localStorage.clear()
  proxy.$message.success('退出成功')
  router.push({ name: 'login' })
  store.commit('setUserStatus', 0)
}

</script>
<template>
  <div class="header-common">
    <img
        @click="() => { router.push({ name: 'home' }) }"
        class="logo"
        src="@/assets/images/layout/logo.png"
        alt="爱此迎"
    />
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="orders">
        {{ t('header.orders') }}
        <template v-if="store.state.orderVisible">
          <suspense>
            <template #default>
              <OrderPopover/>
            </template>
            <template #fallback>
              <div class="loading-block">{{ t('common.loading') }}</div>
            </template>
          </suspense>
        </template>
      </el-menu-item>
      <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t('header.language') }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index='avatar' v-if="userInfo?.avatar_url">
        <template #title>
          <img class='avatar' :src='userInfo.avatar_url' alt='个人中心'>
        </template>
        <el-menu-item index='logout'>退出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-else>{{ t('login.loginTab') }}/{{ t('login.signTab') }}</el-menu-item>
    </el-menu>
  </div>
</template>
<style lang='scss'>
@import "src/assets/scss/layout/commonHeader.scss";
</style>
