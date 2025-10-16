<template>
    <div v-if="product">
        <v-app-bar color="primary">
            <v-btn icon to="/">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-app-bar-title>{{ t('products.wavy.name') }}</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="product.github" :href="product.github" target="_blank" prepend-icon="mdi-github"
                variant="outlined" size="small" class="mr-2">
                GitHub
            </v-btn>
            <v-btn v-if="product.appStore" :href="product.appStore" target="_blank" prepend-icon="mdi-apple"
                color="white" size="small" class="mr-2">
                {{ t('products.wavy.downloadButton') }}
            </v-btn>

            <v-select
                v-model="selectedLocale"
                :items="availableLocales"
                item-title="name"
                item-value="code"
                density="compact"
                variant="plain"
                hide-details
                style="max-width: 120px; min-width: 120px;"
                class="mr-2 align-center language-select"
                @update:model-value="changeLocale"
            >
                <template v-slot:prepend-inner>
                    <v-icon size="small">mdi-translate</v-icon>
                </template>
            </v-select>
        </v-app-bar>

        <v-container>
            <v-card>
                <v-img :src="product.detailImage || product.screenshot" class="align-end" height="400px" cover>
                </v-img>

                <v-card-text class="pa-6">
                    <section class="mb-8">
                        <h2 class="text-h4 mb-4">{{ t('products.wavy.heroTitle') }}</h2>
                        <p class="text-body-1 mb-4">
                            {{ t('products.wavy.heroDescription1') }}<b>{{ t('products.wavy.heroDescriptionBold1') }}</b>{{ t('products.wavy.heroDescription2') }}<br>
                            <b>{{ t('products.wavy.heroDescriptionBold2') }}</b>{{ t('products.wavy.heroDescription3') }}
                        </p>

                        <div class="video-container">
                            <iframe width="100%" height="500" src="https://www.youtube.com/embed/ikWfzrhWnB8"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen></iframe>
                        </div>
                    </section>

                    <section class="mb-8">
                        <h2 class="text-h4 mb-4">{{ t('products.wavy.recommendationTitle') }}</h2>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card class="h-100 recommendation-card">
                                    <v-img :src="musicianImage" height="300" cover>
                                        <div class="recommendation-overlay">
                                            <v-icon size="large" class="mb-2" color="white">mdi-music-circle</v-icon>
                                            <h3 class="text-h6 mb-2 text-white">{{ t('products.wavy.musicianTitle') }}</h3>
                                            <p class="text-white">{{ t('products.wavy.musicianDescription') }}</p>
                                        </div>
                                    </v-img>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card class="h-100 recommendation-card">
                                    <v-img :src="podcastImage" height="300" cover>
                                        <div class="recommendation-overlay">
                                            <v-icon size="large" class="mb-2" color="white">mdi-podcast</v-icon>
                                            <h3 class="text-h6 mb-2 text-white">{{ t('products.wavy.podcasterTitle') }}</h3>
                                            <p class="text-white">{{ t('products.wavy.podcasterDescription') }}</p>
                                        </div>
                                    </v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </section>

                    <section class="mb-8">
                        <h2 class="text-h4 mb-4">{{ t('products.wavy.usageTitle') }}</h2>

                        <v-row class="mb-6">
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step1Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step1Description') }}</p>
                                        <v-img :src="selectImage" class="rounded" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step2Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step2Description') }}</p>
                                        <v-img :src="layoutImage" class="rounded" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row class="mb-6">
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step3Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step3Description') }}</p>
                                        <v-img :src="backgroundImage" class="rounded" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step4Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step4Description') }}</p>
                                        <v-img :src="waveformImage" class="rounded" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row class="mb-6">
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step5Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step5Description') }}</p>
                                        <v-img :src="textImage" class="rounded" max-height="400"></v-img>
                                        <p class="text-body-2 mt-3">{{ t('products.wavy.step5DescriptionExtra') }}</p>
                                        <v-img :src="textAlbumImage" class="rounded mt-2" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step6Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step6Description') }}</p>
                                        <v-img :src="fontImage" class="rounded" max-height="400"></v-img>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card class="h-100">
                                    <v-card-text>
                                        <h3 class="text-h6 mb-2">{{ t('products.wavy.step7Title') }}</h3>
                                        <p class="text-body-2 mb-3">{{ t('products.wavy.step7Description') }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </section>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
    <v-container v-else>
        <v-alert type="error">{{ t('products.notFound') }}</v-alert>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { products } from '@/data/products.js'

import musicianImage from '@/assets/images/Wavy/musician.png'
import podcastImage from '@/assets/images/Wavy/podcast.png'
import selectImage from '@/assets/images/Wavy/1_select.png'
import layoutImage from '@/assets/images/Wavy/2_layout.png'
import backgroundImage from '@/assets/images/Wavy/3_background.png'
import waveformImage from '@/assets/images/Wavy/4_waveform.png'
import textImage from '@/assets/images/Wavy/5_text.png'
import textAlbumImage from '@/assets/images/Wavy/5_text_album.png'
import fontImage from '@/assets/images/Wavy/6_font.png'

const { locale, t } = useI18n()

const product = ref(null)

product.value = products.find(p => p.id === 'wavy')

onMounted(() => {
  product.value = products.find(p => p.id === 'wavy')
})

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

const pageTitle = computed(() => {
  if (!product.value) return 'Product Not Found'
  return t('products.wavy.pageTitle')
})

const pageDescription = computed(() => {
  if (!product.value) return ''
  return t('products.wavy.metaDescription')
})

const pageKeywords = computed(() => {
  return t('products.wavy.metaKeywords')
})

const pageUrl = computed(() => {
  if (!product.value) return 'https://mosynthkey.github.io/'
  return `https://mosynthkey.github.io/products/${product.value.id}`
})

const pageImage = computed(() => {
  if (!product.value) return ''
  const imageToUse = product.value.detailImage || product.value.screenshot
  return `https://mosynthkey.github.io${imageToUse}`
})

// Update head with i18n support
const headData = computed(() => ({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value },
    { name: 'keywords', content: pageKeywords.value },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: pageDescription.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl.value },
    { property: 'og:image', content: pageImage.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: pageDescription.value },
    { name: 'twitter:image', content: pageImage.value },
    ...(product.value?.appStore ? [
      { name: 'apple-itunes-app', content: `app-id=${product.value.appStore.match(/id(\d+)/)?.[1] || ''}` }
    ] : [])
  ],
  link: [
    { rel: 'canonical', href: pageUrl.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Wavy - Music Video Studio',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'iOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '1'
        },
        description: pageDescription.value,
        screenshot: pageImage.value,
        downloadUrl: product.value?.appStore,
        keywords: pageKeywords.value
      })
    }
  ]
}))

useHead(headData)
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.recommendation-card {
  position: relative;
}

.recommendation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.language-select :deep(.v-field) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.language-select :deep(.v-field__input) {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  min-height: 36px !important;
}

.language-select :deep(.v-field__prepend-inner) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  align-items: center !important;
}

.language-select :deep(.v-field__append-inner) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  align-items: center !important;
}
</style>

