export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.API_BASE_URL ||
        'https://devjobs-api-eight.vercel.app/api/v1',
    },
  },
  app: {
    baseURL: '/jobList/',
    head: {
      title: 'TapsiFood Task',
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image'],
  plugins: ['~/plugins/pinia.ts'],
  devtools: { enabled: true },
});
