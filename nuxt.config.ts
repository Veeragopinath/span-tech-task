// nuxt.config.ts
// import { defineNuxtConfig } from 'nuxt'
import VuetifyPlugin from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [
      VuetifyPlugin({
        autoImport: true,
      }),
    ],
    vue: {
      template: {
        transformAssetUrls: {
          // Add any custom asset URLs here
        },
      },
    },
  },
  // css: ['@/assets/styles/main.scss'] // Uncomment this if you have global styles
})
