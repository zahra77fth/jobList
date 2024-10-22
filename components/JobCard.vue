<template>
  <div
      class="border px-4 rounded-lg bg-white flex items-start space-x-4 w-full h-full relative"
      role="article"
      aria-labelledby="job-title"
  >
    <!-- Use Nuxt's <NuxtImg> component with white border around the image -->
    <nuxt-img
        v-if="job.logo"
        :src="job.logo"
        :alt="`${job.company} logo`"
        :style="{ backgroundColor: job.logoBackground }"
        class="h-12 w-12 bg-white rounded object-scale-down absolute top-0 left-16 -mt-6 -ml-6"
        width="16"
        format="webp"
        height="16"
        loading="lazy"
    />

    <!-- Fallback if no logo -->
    <div v-else class="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center absolute top-0 left-0 -mt-6 -ml-6">
      <span class="text-gray-500">No Logo</span>
    </div>

    <!-- Job details -->
    <div class="ml-16 mt-8">
      <!-- Time and job type row -->
      <div class="flex items-center space-x-2 text-gray-500 text-sm">
        <span>{{ formatDate(job.postedAt) }}</span>
        <span>&bull;</span>
        <span>{{ job.contract }}</span>
      </div>

      <!-- Job title -->
      <h2 id="job-title" class="text-lg font-bold text-gray-800 mt-1">
        {{ job.position }}
      </h2>

      <!-- Company name -->
      <p class="text-gray-500">{{ job.company }}</p>

      <!-- Location in green -->
      <p class="text-green-500 font-semibold">{{ job.location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Job } from '@/types/Job'

const props = defineProps<{ job: Job }>()

const formatDate = (date: string) => {
  const parsedDate = new Date(date)
  return isNaN(parsedDate.getTime()) ? 'Invalid date' : parsedDate.toLocaleDateString()
}
</script>
