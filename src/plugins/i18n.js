import { createI18n } from 'vue-i18n'

// Import translation files
import ja from '../locales/ja'
import en from '../locales/en'

// Get saved locale from localStorage or default to Japanese
const savedLocale = typeof window !== 'undefined'
  ? localStorage.getItem('locale') || 'ja'
  : 'ja'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: savedLocale,
  fallbackLocale: 'ja',
  messages: {
    ja,
    en
  },
  // Disable warnings about missing keys in development
  missingWarn: false,
  fallbackWarn: false
})

export default i18n
