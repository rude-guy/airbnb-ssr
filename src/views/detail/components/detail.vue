<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { saveOrderApi } from '@/api/order/order'
import useToast from '@/composables/common/useToast'
import { saveRecordApi } from '@/api/record'

const { t } = useI18n()
const store = useStore()
const route = useRoute()
const router = useRouter()

const roomDetail = computed(() => store.state.roomDetail)

const orderForm = reactive({
  personNumber: 1
})

const ruleForm = ref()

const { proxy }: any = getCurrentInstance()

const { visible: toastVisible, showToast } = useToast()

onMounted(() => {
  saveRecord()
})

function submitForm () {
  if (store.state.userStatus === 1) {
    saveOrder()
  } else {
    const pathname = route.path
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
}

function saveOrder () {
  const { id: recordId } = route.params
  const { title, price, imgs } = roomDetail.value
  const { personNumber } = orderForm
  const params = {
    recordId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveOrderApi(params).then((res:any) => {
    const { success, message } = res
    if (success) {
      showToast(1500)
    } else {
      proxy.$message.error(message)
    }
  })
}

// 保存历史足迹
function saveRecord () {
  const { id: recordId } = route.params
  const {
    title,
    price,
    imgs,
    personNumber
  } = roomDetail.value
  const params = {
    recordId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveRecordApi(params).then((res) => {
    // console.log(res)
    // const { success, message } = res
    // if (!success) {
    //   proxy.$message.error(message)
    // }
  })
}
</script>

<template>
  <!-- Toast -->
  <Teleport to="#app" v-if="toastVisible">
    <el-alert :title="t('detail.reservated')" type="success" :closable="false"></el-alert>
  </Teleport>
  <div v-if="roomDetail && roomDetail.info && roomDetail.owner">
    <!--照片墙-->
    <el-carousel
        v-if="roomDetail.imgs && roomDetail.imgs.length > 0"
        trigger='click'
        height='380px'
        class="imgs-wall"
        :interval='3000'
        indicator-position='none'
        type='card'
    >
      <el-carousel-item v-for='(img, index) in roomDetail.imgs' :key='index'>
        <img :src='img' :alt='index'>
      </el-carousel-item>
    </el-carousel>
    <div class='main-wapper'>
      <!--房屋详情信息-->
      <div class='room-detail'>
        <div class='detail-part'>
          <h2>{{roomDetail.title}}</h2>
          <div class='info'>
            <span class="room">{{ roomDetail.info.room }} {{ t('detail.rooms') }}</span>
            <span class="bed">{{ roomDetail.info.bed }} {{ t('detail.beds') }}</span>
            <span class="toilet">{{ roomDetail.info.toilet }} {{ t('detail.bathrooms') }}</span>
            <span
                class="live-number"
            >{{ t('detail.living') }} {{ roomDetail.info.liveNumber }} {{ t('detail.personNumber') }}</span>
          </div>
          <div class="tags">
            <el-tag size="small">{{ roomDetail.info.remarks }} {{ t('detail.remarks') }}</el-tag>
            <el-tag
                size="small"
                class="ml-10"
                type="danger"
                v-if="roomDetail.info.metro"
            >{{ t('detail.nearSubway') }}</el-tag>
            <el-tag
                size="small"
                class="ml-10"
                type="warning"
                v-if="roomDetail.info.parking"
            >{{ t('detail.freeParking') }}</el-tag>
            <el-tag
                size="small"
                class="ml-10"
                type="success"
                v-if="roomDetail.info.luggage"
            >{{ t('detail.luggage') }}</el-tag>
          </div>
          <hr />
          <div class='owner-detail'>
            <img :src='roomDetail.owner.avatar' alt=''>
            <div class='info'>
              <p>{{ t('detail.landlord') }}：{{ roomDetail.owner.name }}</p>
              <p>
                <span v-if="roomDetail.owner.certify">{{ t('detail.authenticated') }}</span>
                <span v-if="roomDetail.info.goodOwner">{{ t('detail.greatlandlord') }}</span>
              </p>
            </div>
          </div>
          <!--基本介绍-->
          <div class="introduce">{{ roomDetail.owner.introduce }}</div>
        </div>
        <div class='form-part'>
          <p class="price">
            <span>¥{{ roomDetail.price }}</span>
            / {{ t('detail.night') }}
          </p>
          <!-- 表单组件 -->
          <el-form ref="ruleForm" :model="orderForm" label-position="top" class="order-ruleForm">
            <el-form-item prop="personNumber" :label="t('detail.personNumber')">
              <select v-model="orderForm.personNumber">
                <option v-for="item in 3" :value="item" :key="item">{{ item }}</option>
              </select>
            </el-form-item>
            <el-form-item>
              <el-button
                  class="btn-primary"
                  type="primary"
                  @click="submitForm"
              >{{ t('detail.order') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import "src/assets/scss/detail/index.scss";
@import "src/assets/scss/common/toast.scss";
</style>
