
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  app: {
    head: {
      title: "TapsiFood Task",
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image'],
  plugins: [
    '~/plugins/pinia.ts',
  ],
  devtools: { enabled: true }
})