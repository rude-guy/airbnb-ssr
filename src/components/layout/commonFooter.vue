<script setup lang='ts'>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const footerMenu = reactive(
  [
    {
      title: 'airbnb',
      menus: [
        {
          name: 'careers',
          link: '#careers'
        },
        {
          name: 'news',
          link: '#news'
        },
        {
          name: 'topic',
          link: '#topic'
        },
        {
          name: 'diversity',
          link: '#diversity'
        },
        {
          name: 'accessibility',
          link: '#accessibility'
        }
      ]
    },
    {
      title: 'discovery',
      menus: [
        {
          name: 'trustAndSafe',
          link: '#trustAndSafe'
        },
        {
          name: 'invite',
          link: '#invite'
        },
        {
          name: 'evection',
          link: '#evection'
        },
        {
          name: 'magzine',
          link: '#magzine'
        },
        {
          name: 'airbnborg',
          link: '#airbnborg'
        }
      ]
    },
    {
      title: 'rent',
      menus: [
        {
          name: 'whyRent',
          link: '#whyRent'
        },
        {
          name: 'hospitality',
          link: '#hospitality'
        },
        {
          name: 'responsibleHosting',
          link: '#responsibleHosting'
        },
        {
          name: 'experiences',
          link: '#experiences'
        },
        {
          name: 'resources',
          link: '#resources'
        }
      ]
    },
    {
      title: 'service',
      menus: [
        {
          name: 'help',
          link: '#help'
        },
        {
          name: 'neighbors',
          link: '#neighbors'
        }
      ]
    }
  ])

</script>
<template>
  <div class="footer-common">
    <div class="inner-footer">
      <ul>
        <li v-for="(item, index) in footerMenu" :key="index">
          <h3>{{ t(`footer.${item.title}`) }}</h3>
          <a
              target="_blank"
              :href="itemInner.link"
              v-for="(itemInner, indexInner) in item.menus"
              :key="indexInner"
          >{{ t(`footer.${itemInner.name}`) }}</a>
        </li>
      </ul>
      <div class="copy-right">@ 2022 Harry, Inc . All rights reserved.</div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
@import "src/assets/scss/layout/commonFooter";
</style>
