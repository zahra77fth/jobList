<template>
  <div class="h-dvh flex flex-col justify-between">
    <Header />
    <main class="h-[calc(100%-100px)] overflow-auto py-5">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>