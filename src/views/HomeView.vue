<template>
  <div class="dock-shell">
    <div class="slides-viewport">
      <div class="slides-track" :style="trackStyle">
        <div v-for="(product, index) in products" :key="product.id" class="slide" :style="slideStyle">
          <div class="bg-image" :style="{ backgroundImage: `url(${product.screenshot})` }"></div>
          <div class="bg-gradient"></div>

          <div class="info-panel">
            <div class="platform-badge">{{ getPlatformsLabel(product) }}</div>
            <h1 class="product-name">{{ getProductName(product.id) }}</h1>
            <p class="product-description" :ref="(el) => setDescRef(el, index)">{{ getProductDescription(product.id) }}</p>
            <a
              v-if="getProductUrl(product)"
              class="cta-button"
              :href="getProductUrl(product)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ getCtaLabel(product) }} ↗
            </a>
          </div>
        </div>
      </div>
    </div>

    <nav class="top-nav">
      <div class="nav-brand">
        <router-link to="/" class="nav-logo-link" :aria-label="t('common.siteName')">
          {{ t('common.siteName') }}
        </router-link>
      </div>
      <button type="button" class="lang-toggle" @click="toggleLocale">
        <span class="mdi mdi-earth" aria-hidden="true"></span>
        {{ nextLocaleLabel }}
      </button>
    </nav>

    <span class="screen-copyright">&copy; {{ new Date().getFullYear() }} {{ t('common.copyright') }}</span>

    <div class="dock">
      <button
        v-for="(product, index) in products"
        :key="product.id"
        type="button"
        class="dock-item"
        :class="{ 'dock-item--selected': index === selected }"
        @click="selectProduct(index)"
        @mouseenter="hoverDock = index"
        @mouseleave="hoverDock = null"
      >
        <span v-if="hoverDock === index" class="dock-tooltip">{{ getProductName(product.id) }}</span>
        <span
          class="dock-icon"
          :class="{ 'dock-icon--hover': hoverDock === index }"
          :style="{ backgroundImage: `url(${product.screenshot})` }"
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { products } from '@/data/products.js'

const { locale, t } = useI18n()

const DESC_MAX_FONT_PX = 26
const DESC_MIN_FONT_PX = 13

const descRefs = ref([])
const setDescRef = (el, index) => {
  if (el) descRefs.value[index] = el
}

const fitDescription = (el) => {
  if (!el) return
  const viewportBasedMax = Math.min(DESC_MAX_FONT_PX, Math.max(DESC_MIN_FONT_PX, window.innerWidth * 0.022))
  let fontSize = viewportBasedMax
  el.style.fontSize = `${fontSize}px`
  while (el.scrollWidth > el.clientWidth && fontSize > DESC_MIN_FONT_PX) {
    fontSize -= 1
    el.style.fontSize = `${fontSize}px`
  }
}

const fitAllDescriptions = () => {
  if (typeof window === 'undefined') return
  descRefs.value.forEach(fitDescription)
}

const AUTOPLAY_INTERVAL_MS = 12000

const selected = ref(products.findIndex((p) => p.id === 'melissa'))
const hoverDock = ref(null)

const slideStyle = { width: `${100 / products.length}%` }
const trackStyle = computed(() => ({
  width: `${products.length * 100}%`,
  transform: `translateX(-${selected.value * (100 / products.length)}%)`
}))

let autoplayTimer = null

const startAutoplay = () => {
  if (typeof window === 'undefined') return
  clearInterval(autoplayTimer)
  autoplayTimer = window.setInterval(() => {
    selected.value = (selected.value + 1) % products.length
  }, AUTOPLAY_INTERVAL_MS)
}

const selectProduct = (index) => {
  selected.value = index
  startAutoplay()
}

const nextLocaleLabel = computed(() => (locale.value === 'ja' ? 'EN' : '日本語'))

const toggleLocale = () => {
  const newLocale = locale.value === 'ja' ? 'en' : 'ja'
  locale.value = newLocale
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', newLocale)
  }
}

const getProductWebsite = (product) => {
  return product.websiteByLocale?.[locale.value] || product.website
}

const getProductUrl = (product) => {
  return getProductWebsite(product) || product.appStore || product.github
}

const getCtaLabel = (product) => {
  if (!getProductWebsite(product) && product.appStore) {
    return t('common.openAppStore')
  }
  if (product.platforms.length === 1 && product.platforms[0] === 'web') {
    return t('common.openWebApp')
  }
  return t('common.openSite')
}

const getPlatformsLabel = (product) => {
  return product.platforms.map((platform) => t(`platforms.${platform}`)).join(' / ')
}

// Convert kebab-case product id to camelCase translation key
// Special handling for fa-studioset-editor -> faStudioSetEditor
const toTranslationKey = (id) => {
  let key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  if (key === 'faStudiosetEditor') {
    key = 'faStudioSetEditor'
  }
  return key
}

const getProductName = (id) => t(`products.${toTranslationKey(id)}.name`)
const getProductDescription = (id) => t(`products.${toTranslationKey(id)}.description`)

useHead({
  title: t('common.siteName'),
  meta: [
    { name: 'description', content: t('home.description') }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap'
    }
  ]
})

let previousHtmlOverflow
let previousBodyOverflow
let resizeHandler

onMounted(() => {
  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  startAutoplay()

  nextTick(fitAllDescriptions)
  document.fonts?.ready.then(fitAllDescriptions)
  resizeHandler = () => fitAllDescriptions()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow
  clearInterval(autoplayTimer)
  window.removeEventListener('resize', resizeHandler)
})

watch(locale, () => nextTick(fitAllDescriptions))
</script>

<style scoped>
.dock-shell {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #0a0a0d;
  font-family: 'Manrope', sans-serif;
  color: #F2F2ED;
}

.slides-viewport {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.slides-track {
  display: flex;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}

.slide {
  position: relative;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(10, 10, 13, 0.25) 0%, rgba(10, 10, 13, 0.55) 55%, rgba(10, 10, 13, 0.97) 100%);
}

.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 22px 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  background: rgba(10, 10, 13, 0.35);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-logo-link {
  display: inline-flex;
  align-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: -0.01em;
  color: #F2F2ED;
  text-decoration: none;
}

.screen-copyright {
  position: absolute;
  left: 30px;
  bottom: 26px;
  z-index: 55;
  color: #7C7C84;
  font-size: 12px;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #F2F2ED;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  padding: 9px 18px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lang-toggle .mdi {
  font-size: 16px;
}

.lang-toggle:hover {
  background: rgba(255, 255, 255, 0.16);
}

.info-panel {
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 60px 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}

.platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 20px;
  background: rgba(10, 10, 13, 0.6);
  border: 1px solid rgba(130, 171, 227, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #a8c7ee;
  width: fit-content;
}

.product-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 5.2vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
  color: #F2F2ED;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
}

.product-description {
  font-size: clamp(16px, 2.2vw, 26px);
  font-weight: 500;
  line-height: 1.5;
  color: #E4E4E8;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  margin: 0;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #82ABE3;
  color: #0a0a0d;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 15px 26px;
  border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(130, 171, 227, 0.25);
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  margin-top: 6px;
}

.cta-button:hover {
  background: #b0cbf0;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(130, 171, 227, 0.35);
}

.dock {
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  align-items: flex-end;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(24px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.dock-tooltip {
  position: absolute;
  bottom: 116px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 20, 24, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #F2F2ED;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
}

.dock-icon {
  display: block;
  width: 52px;
  height: 52px;
  border-radius: 13px;
  background-size: cover;
  background-position: center;
  box-shadow: none;
  transition: width 0.2s ease, height 0.2s ease, box-shadow 0.15s ease;
}

.dock-icon--hover {
  width: 104px;
  height: 104px;
  border-radius: 20px;
}

.dock-item--selected .dock-icon {
  box-shadow: 0 0 0 2px #82ABE3;
}

@media (max-width: 600px) {
  .top-nav {
    padding: 16px 20px;
  }

  .screen-copyright {
    left: 20px;
    bottom: 20px;
    font-size: 10px;
  }

  .info-panel {
    padding: 0 24px 130px;
  }

  .product-description {
    line-height: 1.4;
  }

  .dock {
    gap: 8px;
    padding: 10px 12px;
  }

  .dock-icon {
    width: 42px;
    height: 42px;
  }

  .dock-icon--hover {
    width: 84px;
    height: 84px;
    border-radius: 18px;
  }

  .dock-tooltip {
    bottom: 96px;
  }
}
</style>
