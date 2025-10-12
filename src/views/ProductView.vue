<template>
    <div v-if="product">
        <v-app-bar color="primary" prominent>
            <v-btn icon to="/">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-app-bar-title>{{ product.name }}</v-app-bar-title>

            <v-spacer></v-spacer>

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

                    <!-- Wavy specific content -->
                    <template v-if="product.id === 'wavy'">

                        <section class="mb-8">
                            <h2 class="text-h4 mb-4">あなたの音楽を動画に載せて、もっと広めてみませんか？</h2>
                            <p class="text-body-1 mb-4">
                                Wavyは、<b>音源とジャケット画像から数タップで動画を作成できる</b>iOSアプリです。<br>
                                <b>波形／スペクトルビジュアライザーを搭載</b>し、音楽動画だけではなく、イベント告知動画やクロスフェード動画作成にも最適です！
                            </p>
                            <div class="video-container">
                                <iframe width="100%" height="500" src="https://www.youtube.com/embed/ikWfzrhWnB8"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-h4 mb-4">こんな方におすすめ</h2>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100 recommendation-card">
                                        <v-img src="/src/assets/images/Wavy/musician.png.png" height="300" cover>
                                            <div class="recommendation-overlay">
                                                <v-icon size="large" class="mb-2"
                                                    color="white">mdi-music-circle</v-icon>
                                                <h3 class="text-h6 mb-2 text-white">ミュージシャン・アーティスト</h3>
                                                <p class="text-white">自分の楽曲から動画を作り、魅力的な形でシェアしたい方</p>
                                            </div>
                                        </v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100 recommendation-card">
                                        <v-img src="/src/assets/images/Wavy/podcast.png.png" height="300" cover>
                                            <div class="recommendation-overlay">
                                                <v-icon size="large" class="mb-2" color="white">mdi-podcast</v-icon>
                                                <h3 class="text-h6 mb-2 text-white">ポッドキャスター</h3>
                                                <p class="text-white">音声コンテンツを動画形式でシェアしたい方</p>
                                            </div>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-h4 mb-4">使い方</h2>

                            <v-row class="mb-6">
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">1. 音楽とジャケットを選択</h3>
                                            <p class="text-body-2 mb-3">動画にしたい音楽ファイルとジャケット画像を選びます。</p>
                                            <v-img src="/src/assets/images/Wavy/1_select.png" class="rounded"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">2. レイアウトを決定</h3>
                                            <p class="text-body-2 mb-3">レイアウトタブから、動画のサイズなど、作りたい動画のフォーマットを選択します。</p>
                                            <v-img src="/src/assets/images/Wavy/2_layout.png" class="rounded"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row class="mb-6">
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">3. 背景を選択</h3>
                                            <p class="text-body-2 mb-3">
                                                背景を選択します。ジャケット画像からぼかし効果で自動生成したり、色を選択したり、別途背景画像も選択できます。</p>
                                            <v-img src="/src/assets/images/Wavy/3_background.png" class="rounded"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">4. 波形描画を選択</h3>
                                            <p class="text-body-2 mb-3">
                                                どのような波形/周波数スペクトラムを描画するかを選択できます。4種類の波形/スペクトラムを選択できます。</p>
                                            <v-img src="/src/assets/images/Wavy/4_waveform.png" class="rounded"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row class="mb-6">
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">5. テキストデータを入力</h3>
                                            <p class="text-body-2 mb-3">曲名やアーティスト名などの情報を入力します。シングルモードでは1曲の情報を入力します</p>
                                            <v-img src="/src/assets/images/Wavy/5_text.png" class="rounded"
                                                max-height="400"></v-img>
                                            <p class="text-body-2 mt-3">
                                                アルバム/コンピモードでは複数の曲/アーティスト名を入力でき、再生時間に応じてハイライトを切り替えることができます。</p>
                                            <v-img src="/src/assets/images/Wavy/5_text_album.png" class="rounded mt-2"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">6. フォントをアレンジ</h3>
                                            <p class="text-body-2 mb-3">フォントやサイズ、配置や文字色を選択し、動画の雰囲気に合ったデザインをすることができます</p>
                                            <v-img src="/src/assets/images/Wavy/6_font.png" class="rounded"
                                                max-height="400"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card class="h-100">
                                        <v-card-text>
                                            <h3 class="text-h6 mb-2">7. 完成！</h3>
                                            <p class="text-body-2 mb-3">デザインが完了したら、書き出しボタンをタップして動画を生成します。</p>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </section>
                    </template>

                    <!-- Generic content for other products -->
                    <template v-else>
                        <p>More details and information about <strong>{{ product.name }}</strong> will be available here
                            soon.</p>
                    </template>
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
import { products } from '@/data/products.js';

const route = useRoute();
const product = ref(null);

// Load product data immediately (works for both SSR and CSR)
const productId = route.params.id;
product.value = products.find(p => p.id === productId);

onMounted(() => {
  // Re-check in case route changed
  const productId = route.params.id;
  product.value = products.find(p => p.id === productId);
});

// Dynamic SEO meta tags
const pageTitle = computed(() => {
  if (!product.value) return 'Product Not Found';

  if (product.value.id === 'wavy') {
    return 'Wavy - Music Video Studio | 音楽動画作成アプリ';
  }
  return `${product.value.name} - Melissa Audio`;
});

const pageDescription = computed(() => {
  if (!product.value) return '';

  if (product.value.id === 'wavy') {
    return '音楽とアルバムアートワークから簡単に動画を作成できるiOSアプリ。波形や周波数スペクトル描画、エフェクトで映える動画を作成できます。ミュージシャン、ポッドキャスター、コンテンツクリエイターに最適。';
  }
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
    { name: 'keywords', content: computed(() => {
      if (product.value?.id === 'wavy') {
        return 'ミュージックビデオ作成,オーディオスペクトラム,オーディオビジュアライザー,音楽動画作成,ミュージックビデオ,波形動画,iOS,アプリ,Wavy,スペクトラム,波形描画';
      }
      return '';
    })},
    // Open Graph
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: pageImage },
    { property: 'og:site_name', content: 'Melissa Audio' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: pageImage },
    // App Store specific
    ...(product.value?.appStore ? [
      { name: 'apple-itunes-app', content: `app-id=${product.value.appStore.match(/id(\d+)/)?.[1] || ''}` }
    ] : [])
  ],
  link: [
    { rel: 'canonical', href: pageUrl }
  ],
  script: computed(() => {
    if (product.value?.id === 'wavy') {
      return [
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
            description: '音楽とアルバムアートワークから簡単に動画を作成できるiOSアプリ。波形や周波数スペクトル描画、エフェクトで映える動画を作成できます。ミュージシャン、ポッドキャスター、コンテンツクリエイターに最適。',
            screenshot: pageImage.value,
            downloadUrl: product.value.appStore,
            author: {
              '@type': 'Organization',
              name: 'Melissa Audio'
            },
              keywords: 'ミュージックビデオ作成,オーディオスペクトラム,オーディオビジュアライザー,音楽動画作成,ミュージックビデオ,波形動画,iOS,アプリ,Wavy,スペクトラム,波形描画'
          })
        }
      ];
    }
    return [];
  })
});
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
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
</style>
