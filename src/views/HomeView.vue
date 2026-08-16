<template>
  <div class="dock-shell">
    <div class="slides-viewport">
      <div class="slides-track" :style="trackStyle">
        <div v-for="(product, index) in products" :key="product.id" class="slide" :style="slideStyle">
          <div class="bg-image" :style="{ backgroundImage: `url(${product.screenshot})` }"></div>
          <div class="bg-gradient"></div>

          <div class="info-panel">
            <div class="platform-badge">{{ getPlatformsLabel(product) }}</div>
            <div class="product-header">
              <img
                v-if="product.icon"
                class="product-icon"
                :src="product.icon"
                :alt="getProductName(product.id)"
              />
              <div class="product-header-text">
                <h1 class="product-name">{{ getProductName(product.id) }}</h1>
                <p class="product-description">{{ getProductDescription(product.id) }}</p>
                <div v-if="getProductUrl(product)" class="cta-row">
                  <a
                    class="cta-button"
                    :href="getProductUrl(product)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ getCtaLabel(product) }}
                    <span class="mdi mdi-arrow-top-right" aria-hidden="true"></span>
                  </a>
                  <a
                    v-if="showGithubLink(product)"
                    class="github-button"
                    :href="product.github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="mdi mdi-github" aria-hidden="true"></span>
                    {{ t('home.viewOnGitHub') }}
                  </a>
                </div>
              </div>
            </div>
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
        @mouseenter="onDockEnter(index)"
        @mouseleave="hoverDock = null"
      >
        <span v-if="hoverDock === index" class="dock-tooltip">{{ getProductName(product.id) }}</span>
        <span
          class="dock-icon"
          :class="{ 'dock-icon--hover': hoverDock === index }"
          :style="{ backgroundImage: `url(${product.icon || product.screenshot})` }"
        ></span>
        <span class="dock-dot" :class="{ 'dock-dot--active': index === selected }"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { products } from '@/data/products.js'

const { locale, t } = useI18n()

const canHoverDock = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

const onDockEnter = (index) => {
  if (canHoverDock()) hoverDock.value = index
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

const showGithubLink = (product) => {
  return !!product.github && product.github !== getProductUrl(product)
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

onMounted(() => {
  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  startAutoplay()
})

onUnmounted(() => {
  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow
  clearInterval(autoplayTimer)
})
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

.product-header {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.product-icon {
  flex-shrink: 0;
  width: 132px;
  height: 132px;
  object-fit: contain;
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.45));
}

.product-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  min-width: 0;
  flex: 1;
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
  white-space: pre-line;
  overflow-wrap: break-word;
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

.cta-button .mdi {
  font-size: 16px;
  line-height: 1;
}

.cta-button:hover {
  background: #b0cbf0;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(130, 171, 227, 0.35);
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.cta-row .cta-button {
  margin-top: 0;
}

.github-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 26px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #F2F2ED;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.github-button .mdi-github {
  font-size: 18px;
  line-height: 1;
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
  height: 62px;
  padding: 12px 18px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(24px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  box-sizing: content-box;
  transition: gap 0.2s ease;
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
  clip-path: polygon(100.00% 50.00%, 99.88% 65.65%, 99.52% 72.08%, 98.91% 76.94%, 98.06% 80.93%, 96.96% 84.33%, 95.59% 87.27%, 93.96% 89.82%, 92.04% 92.04%, 89.82% 93.96%, 87.27% 95.59%, 84.33% 96.96%, 80.93% 98.06%, 76.94% 98.91%, 72.08% 99.52%, 65.65% 99.88%, 50.00% 100.00%, 34.35% 99.88%, 27.92% 99.52%, 23.06% 98.91%, 19.07% 98.06%, 15.67% 96.96%, 12.73% 95.59%, 10.18% 93.96%, 7.96% 92.04%, 6.04% 89.82%, 4.41% 87.27%, 3.04% 84.33%, 1.94% 80.93%, 1.09% 76.94%, 0.48% 72.08%, 0.12% 65.65%, 0.00% 50.00%, 0.12% 34.35%, 0.48% 27.92%, 1.09% 23.06%, 1.94% 19.07%, 3.04% 15.67%, 4.41% 12.73%, 6.04% 10.18%, 7.96% 7.96%, 10.18% 6.04%, 12.73% 4.41%, 15.67% 3.04%, 19.07% 1.94%, 23.06% 1.09%, 27.92% 0.48%, 34.35% 0.12%, 50.00% 0.00%, 65.65% 0.12%, 72.08% 0.48%, 76.94% 1.09%, 80.93% 1.94%, 84.33% 3.04%, 87.27% 4.41%, 89.82% 6.04%, 92.04% 7.96%, 93.96% 10.18%, 95.59% 12.73%, 96.96% 15.67%, 98.06% 19.07%, 98.91% 23.06%, 99.52% 27.92%, 99.88% 34.35%);
  background-size: cover;
  background-position: center;
  transition: width 0.2s ease, height 0.2s ease;
}

.dock-icon--hover {
  width: 104px;
  height: 104px;
}

.dock-dot {
  display: block;
  width: 5px;
  height: 5px;
  margin-top: 5px;
  border-radius: 50%;
  background: transparent;
}

.dock-dot--active {
  background: #F2F2ED;
  box-shadow: 0 0 6px rgba(242, 242, 237, 0.6);
}

@media (max-width: 768px), (max-height: 640px) {
  .top-nav {
    padding: max(16px, env(safe-area-inset-top, 0px)) 20px 16px;
  }

  .screen-copyright {
    display: none;
  }

  .bg-gradient {
    background: linear-gradient(
      180deg,
      rgba(10, 10, 13, 0.88) 0%,
      rgba(10, 10, 13, 0.42) 36%,
      rgba(10, 10, 13, 0.2) 58%,
      rgba(10, 10, 13, 0.82) 100%
    );
  }

  .info-panel {
    top: 0;
    bottom: auto;
    align-items: center;
    padding: calc(68px + env(safe-area-inset-top, 0px)) 20px 20px;
    gap: 12px;
    text-align: center;
  }

  .product-header {
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .product-icon {
    width: 64px;
    height: 64px;
  }

  .product-header-text {
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .product-name {
    font-size: clamp(26px, 7vw, 36px);
  }

  .product-description {
    font-size: 15px;
    line-height: 1.45;
    text-align: center;
  }

  .cta-row {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2px;
  }

  .cta-button,
  .github-button {
    padding: 12px 18px;
    font-size: 14px;
  }

  .dock {
    gap: 8px;
    height: 52px;
    padding: 10px 12px;
    bottom: max(16px, env(safe-area-inset-bottom, 0px));
  }

  .dock-icon,
  .dock-icon--hover {
    width: 42px;
    height: 42px;
  }

  .dock-tooltip {
    display: none;
  }
}
</style>
