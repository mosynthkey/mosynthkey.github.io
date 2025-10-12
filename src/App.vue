<template>
  <v-app>
    <v-app-bar v-if="!isProductPage" app density="compact">
      <v-app-bar-title class="text-h6">{{ t('common.siteName') }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-select
        v-model="selectedLocale"
        :items="availableLocales"
        item-title="name"
        item-value="code"
        density="compact"
        variant="outlined"
        hide-details
        style="max-width: 150px;"
        class="mr-4"
        @update:model-value="changeLocale"
      >
        <template v-slot:prepend-inner>
          <v-icon size="small">mdi-translate</v-icon>
        </template>
      </v-select>
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
</style>