import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: `${useRuntimeConfig().public.apiBaseUrl}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('API call error:', error);
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
