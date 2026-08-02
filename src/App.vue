<template>
  <v-app>
    <v-app-bar v-if="!isProductPage" app>
      <v-app-bar-title>
        <router-link to="/" class="site-logo-link" :aria-label="t('common.siteName')">
          <img :src="melissaAudioLogo" :alt="t('common.siteName')" class="site-logo" />
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="language-select-wrapper">
        <v-select
          v-model="selectedLocale"
          :items="availableLocales"
          item-title="name"
          item-value="code"
          density="compact"
          variant="plain"
          hide-details
          style="max-width: 120px; min-width: 120px;"
          class="mr-4 align-center language-select"
          @update:model-value="changeLocale"
        >
          <template v-slot:prepend-inner>
            <v-icon size="small">mdi-translate</v-icon>
          </template>
        </v-select>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <div class="d-flex w-100 align-center">
        <span>&copy; {{ new Date().getFullYear() }} {{ t('common.copyright') }}</span>
        <v-spacer></v-spacer>
        <SocialShare
          v-if="showSocialShare"
          :url="currentPageUrl"
          :title="currentPageTitle"
          :description="currentPageDescription"
        />
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SocialShare from '@/components/SocialShare.vue'
import melissaAudioLogo from '@/assets/melissa-audio-logo.svg'

const route = useRoute()
const { locale, t } = useI18n()

const isProductPage = computed(() => route.name === 'product' || route.name === 'wavy-product')

const availableLocales = [
  { code: 'ja', name: '日本語' },
  { code: 'en', name: 'English' }
]

const selectedLocale = ref(locale.value)

const changeLocale = (newLocale) => {
  locale.value = newLocale
  selectedLocale.value = newLocale
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', newLocale)
  }
}

// Social share configuration
const showSocialShare = computed(() => true) // Always show social share

const currentPageUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return 'https://mosynthkey.github.io/'
})

const currentPageTitle = computed(() => {
  if (route.name === 'wavy-product') {
    return t('products.wavy.pageTitle')
  } else if (route.name === 'home') {
    return t('common.siteName')
  }
  return t('common.siteName')
})

const currentPageDescription = computed(() => {
  if (route.name === 'wavy-product') {
    return t('products.wavy.metaDescription')
  } else if (route.name === 'home') {
    return t('home.description')
  }
  return ''
})
</script>

<style>
/* You can add global styles here if needed */
body {
  background-color: #F5F5F5; /* Match the Vuetify background color */
}

a {
  color: inherit;
}

.site-logo-link {
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.site-logo {
  display: block;
  width: clamp(150px, 16vw, 190px);
  height: auto;
}

/* Language select padding adjustments */
.language-select-wrapper {
  display: flex;
  align-items: center;
}

.language-select-wrapper .language-select :deep(.v-field),
.language-select :deep(.v-field),
.v-app-bar .language-select :deep(.v-field) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.language-select-wrapper .language-select :deep(.v-field__input),
.language-select :deep(.v-field__input),
.v-app-bar .language-select :deep(.v-field__input) {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  min-height: 36px !important;
}

.language-select-wrapper .language-select :deep(.v-field__prepend-inner),
.language-select :deep(.v-field__prepend-inner),
.v-app-bar .language-select :deep(.v-field__prepend-inner) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  align-items: center !important;
  display: flex !important;
}

.language-select-wrapper .language-select :deep(.v-field__append-inner),
.language-select :deep(.v-field__append-inner),
.v-app-bar .language-select :deep(.v-field__append-inner) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  align-items: center !important;
  display: flex !important;
}
</style>
