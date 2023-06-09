<script setup lang='ts'>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchOrderApi } from '@/api/order/order'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const store = useStore()
const route = useRoute()
const orderData = ref<any[]>([])
const { proxy }: any = getCurrentInstance()
const router = useRouter()

// 房屋订单中心列表
function fetchOrder () {
  return fetchOrderApi().then((res) => {
    const {
      result,
      success,
      message
    } = res
    if (success) {
      orderData.value = result
    } else {
      proxy.$message.error(message)
    }
  }).catch(err => {
    if (err.response?.status === 401) {
      proxy.$message.warning(t('login.loginExpired'))
      localStorage.clear()
      const pathname = route.path
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: pathname
          }
        })
      }, 200)
    }
  })
}

onMounted(async () => {
  if (store.state.userStatus) {
    await fetchOrder()
  } else {
    const pathname = route.path
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
    closeMask()
  }
})

// 关闭遮罩 popover
function closeMask () {
  store.commit('setOrderVisible', false)
}

function toDetail (item: any) {
  const { roomId: id } = item
  router.push({ path: `/roomDetail/${id}` })
  store.commit('setRoomId', id)
}

</script>

<template>
  <Teleport to="#app">
    <div class="mask" @click="closeMask"></div>
  </Teleport>
  <ul v-if="orderData.length > 0">
    <li v-for="(item, index) in orderData" :key="index" @click="toDetail(item)">
      <img :src="item.pictureUrl"/>
      <div class="mess">
        <p class="title">{{ item.title }}</p>
        <p
            class="info"
        >¥{{ item.price }}/{{ t('detail.night') }} · {{ item.personNumber }}{{ t('detail.person') }}</p>
      </div>
    </li>
  </ul>
  <div v-else class="loading-block">{{ t('common.empty') }}</div>
</template>

<style scoped lang='scss'>
ul {
  @include placeholder-order;
}

li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }

  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;

    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }

    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }

    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
