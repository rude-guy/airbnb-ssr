import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

export function createSSRI18n () {
  return createI18n({
    legacy: false,
    locale: 'zh',
    messages: {
      zh,
      en
    }
  })
}

export default createSSRI18n
