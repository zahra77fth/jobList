<template>
  <div class="flex flex-col justify-between md:h-[60vh] h-[55vh] min-h-[40vh]">
    <div
      class="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mx-4"
    >
      <div
        v-if="isLoading"
        v-for="index in 10"
        :key="index"
        class="bg-white rounded shadow-md flex items-center mt-8 h-[170px]"
      >
        <SkeletonLoader class="m-2" />
      </div>

      <div
        v-else
        v-for="job in jobs"
        :key="job.id"
        class="bg-white rounded shadow-md flex items-center mt-8 h-[170px]"
      >
        <LazyJobCard :job="job" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Job } from '@/types/Job';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import LazyJobCard from '~/components/lazyWrapper/LazyJobCard.vue';

const props = defineProps<{ jobs: Job[] }>();

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);
</script>
