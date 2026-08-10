<template>
    <div v-if="product">
        <v-app-bar color="primary" prominent>
            <v-btn icon to="/">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-app-bar-title>{{ product.name }}</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="productWebsite" :href="productWebsite" target="_blank" prepend-icon="mdi-web"
                variant="outlined" class="mr-2">
                公式サイト
            </v-btn>
            <v-btn v-if="product.github" :href="product.github" target="_blank" prepend-icon="mdi-github"
                variant="outlined" class="mr-2">
                GitHub
            </v-btn>
            <v-btn v-if="product.appStore" :href="product.appStore" target="_blank" prepend-icon="mdi-apple"
                color="white">
                App Storeからダウンロード
            </v-btn>
        </v-app-bar>

        <v-container>
            <v-card>
                <v-img :src="product.detailImage || product.screenshot" class="align-end" height="400px" cover>
                </v-img>

                <v-card-text class="pa-6">
                    <p>More details and information about <strong>{{ product.name }}</strong> will be available here
                        soon.</p>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
    <v-container v-else>
        <v-alert type="error">Product not found.</v-alert>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { products } from '@/data/products.js';

const route = useRoute();
const { locale } = useI18n();
const product = ref(null);

const productId = route.params.id;
product.value = products.find(p => p.id === productId);

onMounted(() => {
  const productId = route.params.id;
  product.value = products.find(p => p.id === productId);
});

const pageTitle = computed(() => {
  if (!product.value) return 'Product Not Found';
  return `${product.value.name} - Melissa Audio`;
});

const productWebsite = computed(() => {
  if (!product.value) return null;
  return product.value.websiteByLocale?.[locale.value] || product.value.website;
});

const pageDescription = computed(() => {
  if (!product.value) return '';
  return product.value.description;
});

const pageUrl = computed(() => {
  if (!product.value) return 'https://mosynthkey.github.io/';
  return `https://mosynthkey.github.io/products/${product.value.id}`;
});

const pageImage = computed(() => {
  if (!product.value) return '';
  const imageToUse = product.value.detailImage || product.value.screenshot;
  return `https://mosynthkey.github.io${imageToUse}`;
});

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: pageImage },
    { property: 'og:site_name', content: 'Melissa Audio' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: pageImage },
    ...(product.value?.appStore ? [
      { name: 'apple-itunes-app', content: `app-id=${product.value.appStore.match(/id(\d+)/)?.[1] || ''}` }
    ] : [])
  ],
  link: [
    { rel: 'canonical', href: pageUrl }
  ]
});
</script>

<style scoped>
</style>
