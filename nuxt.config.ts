
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
          
        },
      },
    },
  },
  
})
