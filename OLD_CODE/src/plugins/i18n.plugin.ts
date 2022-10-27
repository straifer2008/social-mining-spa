import { createI18n } from 'vue-i18n'

import ru from '../locales/ru'
import en from '../locales/en'

const i18n = createI18n({
  locale: sessionStorage.getItem('grand_lang') || 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: { en, ru } // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})

export default i18n
