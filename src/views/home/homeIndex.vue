<script lang="ts">
import { defineComponent } from 'vue'
import HomeList from '@/views/home/components/homeList.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { HomeList },
  setup () {
    const { t } = useI18n()
    return { t }
  },
  asyncData ({ store, route }: any) {
    return store.dispatch('getRoomList', { pageNo: store.state.pageNo })
  }
})
</script>

<template>
  <div class='home-page'>
    <!--banner-->
    <div class='banner'></div>
    <!--房屋列表-->
    <div class='main-wrapper'>
      <h2 class='title'>{{t('home.h2Title')}}</h2>
      <p class='sub-title'>{{t('home.subTitle')}}</p>
      <!--首页列表-->
      <home-list/>
    </div>
  </div>
</template>

<style lang='scss'>
@import "src/assets/scss/home/index";
</style>
