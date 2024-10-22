<template>
  <div class="mx-auto flex flex-col justify-between my-auto">
    <div class="flex flex-col md:flex-row justify-between items-center mx-4 md:py-4 space-x-4">
      <input
          v-model="searchTerm"
          type="text"
          placeholder="Company or job title"
          class="border p-2 rounded w-full hover:border-secondary outline-primary"
          @keyup.enter="applyFilters"
      />
      <input
          v-model="location"
          type="text"
          placeholder="Location"
          class="border p-2 rounded hidden md:block w-full hover:border-secondary outline-primary"
          @keyup.enter="applyFilters"
      />
      <CheckBox
          class-name="hidden md:flex"
          v-model="isRemote"
          label="Only Part Time"
      />
      <div class="flex gap-2 my-1">
        <BaseButton @click="applyFilters" label="Search" />
        <BaseButton
            @click="resetFilters"
            label="Reset Filters"
            variant="secondary"
        />
      </div>
    </div>

    <div v-if="jobs.length">
      <JobList :jobs="jobs" />
      <div v-if="hasMore" class="text-center my-4">
        <button
            @click="loadMore"
            class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center my-4">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/store/jobs';
import { useRouter } from 'vue-router';
import JobList from '@/components/JobList.vue';
import BaseButton from '~/components/utills/Button.vue';
import BaseSpinner from '~/components/utills/Spinner.vue';
import CheckBox from '@/components/utills/CheckBox.vue';

const router = useRouter();
const jobsStore = useJobsStore();
const { jobs, isLoading, error, hasMore } = storeToRefs(jobsStore);

const searchTerm = ref('');
const location = ref('');
const isRemote = ref(false);

onMounted(() => {
  const query = router.currentRoute.value.query;

  searchTerm.value = query.search || '';
  location.value = query.location || '';
  isRemote.value = query.remote === 'true'; // Parse as boolean

  jobsStore.fetchJobs();
});

const applyFilters = () => {
  router.push({
    query: {
      search: searchTerm.value,
      location: location.value,
      remote: isRemote.value ? 'true' : 'false',
    },
  });

  jobsStore.applyFilters(searchTerm.value, location.value, isRemote.value);
};

const resetFilters = () => {
  searchTerm.value = '';
  location.value = '';
  isRemote.value = false;
  jobsStore.resetFilters();
};

const loadMore = () => {
  jobsStore.loadMoreJobs();
};
</script>
