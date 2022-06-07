<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const count = ref(0)
const orderData = reactive([])
function fetchApi () {
  return new Promise((resolve) => {
    count.value = 6
    resolve(true)
  })
}
await fetchApi()
</script>

<template>
  <ul v-if='orderData.length === 0'>
    <li v-for="(item, index) in count" :key="index" @click="toDetail(item)">
      <img :src="item.pictureUrl" :alt='index'/>
      <div class="mess">
        <p class="title">{{ `item.title` }}</p>
        <p
            class="info"
        >¥{{ `item.price` }}/{{ t('detail.night') }} · {{ `item.personNumber` }}{{ t('detail.person') }}</p>
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
