<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="mx-auto d-flex flex-column"
          hover
          :href="product.website"
          :target="product.website ? '_blank' : undefined"
          :to="product.website ? undefined : `/products/${product.id}`"
          height="440"
          flat
          :elevation="0"
        >
          <div style="height: 200px; flex-shrink: 0;">
            <v-img
              :src="product.screenshot"
              height="200px"
              width="100%"
              cover
            ></v-img>
          </div>

          <v-card-title>
            {{ getProductName(product.id) }}
          </v-card-title>

          <div class="platform-badges px-4 pb-2">
            <v-chip
              v-for="platform in product.platforms"
              :key="platform"
              size="small"
              variant="flat"
              :class="`platform-badge platform-badge--${platform}`"
            >
              {{ t(`platforms.${platform}`) }}
            </v-chip>
          </div>

          <v-card-text class="pb-4 flex-grow-1">
            {{ getProductDescription(product.id) }}
          </v-card-text>

          <v-card-actions class="mt-auto">
            <v-btn
              v-if="product.github"
              :href="product.github"
              target="_blank"
              @click.stop
              icon="mdi-github"
              variant="text"
            >
            </v-btn>
            <v-btn
              v-if="product.appStore"
              :href="product.appStore"
              target="_blank"
              @click.stop
              prepend-icon="mdi-apple"
            >
              {{ t('home.appStore') }}
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn v-if="!product.website" append-icon="mdi-arrow-right">{{ t('common.details') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { products } from '@/data/products.js'

const { t } = useI18n()

// Helper functions to get translated product info
const getProductName = (id) => {
  // Convert kebab-case to camelCase for translation keys
  // Special handling for fa-studioset-editor -> faStudioSetEditor
  let key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  if (key === 'faStudiosetEditor') {
    key = 'faStudioSetEditor'
  }
  return t(`products.${key}.name`)
}

const getProductDescription = (id) => {
  // Convert kebab-case to camelCase for translation keys
  // Special handling for fa-studioset-editor -> faStudioSetEditor
  let key = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  if (key === 'faStudiosetEditor') {
    key = 'faStudioSetEditor'
  }
  return t(`products.${key}.description`)
}
</script>

<style scoped>
.platform-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.platform-badge--web {
  background: #ddf5e8;
  color: #286348;
}

.platform-badge--windows {
  background: #e2efff;
  color: #315f96;
}

.platform-badge--macos {
  background: #eee7ff;
  color: #66518f;
}

.platform-badge--ios {
  background: #ffe7f0;
  color: #8b4964;
}
</style>
