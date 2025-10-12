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
          class="mx-auto" 
          hover 
          :href="product.website" 
          :target="product.website ? '_blank' : undefined"
          :to="product.website ? undefined : `/products/${product.id}`"
        >
          <v-img
            :src="product.screenshot"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="pb-4">
            {{ product.description }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              v-if="product.github"
              :href="product.github"
              target="_blank"
              @click.stop
              prepend-icon="mdi-github"
            >
              View on GitHub
            </v-btn>
            <v-btn
              v-if="product.appStore"
              :href="product.appStore"
              target="_blank"
              @click.stop
              prepend-icon="mdi-apple"
            >
              App Store
            </v-btn>
             <v-spacer></v-spacer>
            <v-btn v-if="!product.website" append-icon="mdi-arrow-right">Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { products } from '@/data/products.js';
</script>