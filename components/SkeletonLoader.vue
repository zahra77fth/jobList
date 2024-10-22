<!-- components/SkeletonLoader.vue -->
<template>
  <div
    class="px-4 rounded-lg bg-white flex items-start space-x-4 w-full h-full relative animate-pulse"
  >
    <!-- Skeleton for the logo -->
    <div
      class="h-12 w-12 bg-gray-200 rounded-full absolute top-0 left-16 -mt-6 -ml-6"
    ></div>

    <!-- Skeleton for job details -->
    <div class="mt-8">
      <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div class="h-4 bg-blue-200 rounded w-1/5"></div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
