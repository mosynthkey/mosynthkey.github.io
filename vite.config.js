import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // Import vuetify plugin
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Enable automatic imports
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  ssr: {
    noExternal: ['vuetify'],
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    format: 'esm',
    includedRoutes: (paths) => {
      // Include all product pages
      return [
        '/',
        '/products/wavy',
        '/products/melissa',
        '/products/volcafm2-utility',
        '/products/modx-liveset-utility',
        '/products/fa-studioset-editor',
      ]
    },
  },
})
