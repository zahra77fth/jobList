<template>
  <div class="container mx-auto p-4">
    <!-- Loader or error handling -->
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Job list component -->
    <div v-else>
      <JobList :jobs="jobs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/store/jobs'
import JobList from '@/components/JobList.vue'

const jobsStore = useJobsStore()

const { jobs, isLoading, error } = storeToRefs(jobsStore)

onMounted(() => {
  jobsStore.fetchJobs()
})
</script>
