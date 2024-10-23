<template>
  <div class="mx-auto flex flex-col justify-between my-auto">
    <div class="flex flex-col md:flex-row justify-between items-center mx-4 md:py-4 space-x-4">
      <input
          v-model="sanitizedSearchTerm"
          type="text"
          placeholder="Company or job title"
          class="border p-2 rounded w-full hover:border-secondary outline-primary"
          @keyup.enter="applyFilters"
      />
      <input
          v-model="sanitizedLocation"
          type="text"
          placeholder="Location"
          class="border p-2 rounded hidden md:block w-full hover:border-secondary outline-primary"
          @keyup.enter="applyFilters"
      />
      <CheckBox
          class-name="hidden md:flex"
          v-model="fullTimeOnly"
          label="Only Full Time"
          @click="applyFilters"
      />
      <div class="flex gap-2 my-1">
        <BaseButton @click="applyFilters" label="Search" />
        <BaseButton @click="resetFilters" label="Reset Filters" variant="secondary" />
      </div>
    </div>

    <div v-if="jobs.length">
      <JobList :jobs="jobs" />
      <div v-if="hasMore" class="text-center my-4">
        <button @click="loadMore" class="px-4 py-2 bg-blue-500 text-white rounded">
          Load More
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center my-4">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="!isLoading && !jobs.length" class="text-center mt-16 text-gray-500">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useJobsStore } from '@/store/jobs';
import JobList from '@/components/JobList.vue';
import BaseButton from '~/components/utills/Button.vue';
import BaseSpinner from '~/components/utills/Spinner.vue';
import CheckBox from '@/components/utills/CheckBox.vue';

const router = useRouter();
const route = useRoute();
const jobsStore = useJobsStore();
const { jobs, isLoading, error, hasMore } = storeToRefs(jobsStore);

const searchTerm = ref('');
const location = ref('');
const fullTimeOnly = ref(false);

const sanitizedSearchTerm = computed({
  get: () => searchTerm.value,
  set: (value) => {
    searchTerm.value = value.replace(/\s+/g, ' ').trim();
  },
});

const sanitizedLocation = computed({
  get: () => location.value,
  set: (value) => {
    location.value = value.replace(/\s+/g, ' ').trim();
  },
});

onMounted(() => {
  const query = route.query;

  sanitizedSearchTerm.value = Array.isArray(query.searchTerm) ? query.searchTerm[0] || '' : (query.keyword ?? '').toString();
  sanitizedLocation.value = Array.isArray(query.location) ? query.location[0] || '' : (query.location ?? '').toString();
  fullTimeOnly.value = query.fullTime === 'true';

  jobsStore.fetchJobs(1, sanitizedSearchTerm.value, sanitizedLocation.value, fullTimeOnly.value);
});

const applyFilters = () => {
  router.push({
    query: {
      keyword: sanitizedSearchTerm.value || undefined,
      location: sanitizedLocation.value || undefined,
      fullTime: fullTimeOnly.value ? 'true' : undefined,
    },
  });

  jobsStore.applyFilters(sanitizedSearchTerm.value, sanitizedLocation.value, fullTimeOnly.value);
};

const resetFilters = () => {
  searchTerm.value = '';
  location.value = '';
  fullTimeOnly.value = false;
  router.push({ query: {} });

  jobsStore.resetFilters();
};

const loadMore = () => {
  jobsStore.loadMoreJobs();
};

watch(route, (newRoute) => {
  const query = newRoute.query;

  sanitizedSearchTerm.value = Array.isArray(query.keyword) ? query.keyword[0] || '' : (query.keyword ?? '').toString();
  sanitizedLocation.value = Array.isArray(query.location) ? query.location[0] || '' : (query.location ?? '').toString();
  fullTimeOnly.value = query.fullTime === 'true';

  jobsStore.applyFilters(sanitizedSearchTerm.value, sanitizedLocation.value, fullTimeOnly.value);
});
</script>
