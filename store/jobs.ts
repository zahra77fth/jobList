import { defineStore } from 'pinia';
import { type Job } from '@/types/Job';
import { useNuxtApp } from '#app';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [] as Job[],
    allJobs: [] as Job[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    hasMore: true,
    totalJobs: 0,
  }),
  actions: {
    async fetchJobs(page = 1, searchTerm = '', location = '', fullTimeOnly = false) {
      this.isLoading = true;
      const { $api } = useNuxtApp();

      try {
        const searchParams = new URLSearchParams();
        searchParams.append('page', page.toString());
        if (searchTerm) searchParams.append('keyword', searchTerm);
        if (location) searchParams.append('location', location);
        if (fullTimeOnly) searchParams.append('fullTimeOnly', 'true'); // Change to match API

        const response = await $api.get(`jobs?${searchParams.toString()}`);
        const { items, meta } = response.data.result;

        if (page === 1) {
          this.allJobs = items;
          this.jobs = items;
          this.totalJobs = meta.total;
        } else {
          this.allJobs.push(...items);
          this.jobs.push(...items);
        }

        this.currentPage = meta.page;
        this.hasMore = this.currentPage * meta.pageSize < meta.total;
      } catch (error) {
        this.error = 'Failed to load job list';
      } finally {
        this.isLoading = false;
      }
    },

    async applyFilters(searchTerm: string, location: string, fullTimeOnly: boolean) {
      this.jobs = [];
      this.currentPage = 1;
      this.hasMore = true;
      await this.fetchJobs(1, searchTerm, location, fullTimeOnly);
    },

    resetFilters() {
      this.jobs = [];
      this.allJobs = [];
      this.currentPage = 1;
      this.fetchJobs(this.currentPage);
    },

    loadMoreJobs() {
      if (this.hasMore && !this.isLoading) {
        this.fetchJobs(this.currentPage + 1);
      }
    },
  },
});
