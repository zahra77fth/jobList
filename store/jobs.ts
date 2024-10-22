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
    async fetchJobs(page = 1) {
      this.isLoading = true;
      const { $api } = useNuxtApp();

      try {
        const response = await $api.get(`jobs?page=${page}`);
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
        this.error = 'Failed to load jobList';
      } finally {
        this.isLoading = false;
      }
    },

    async applyFilters(
      searchTerm: string,
      location: string,
      isRemote: boolean
    ) {
      this.isLoading = true;
      this.jobs = [];
      this.currentPage = 1;
      this.hasMore = true;
      const { $api } = useNuxtApp();

      try {
        while (this.hasMore) {
          console.log(`Fetching page ${this.currentPage}`);
          const response = await $api.get(`jobs?page=${this.currentPage}`);
          const { items, meta } = response.data.result;

          const filteredJobs = items.filter((job: Job) => {
            const positionOrCompanyMatch =
              job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
              job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const locationMatch = job.location
              .toLowerCase()
              .includes(location.toLowerCase());
            const remoteMatch = !isRemote || job.contract === 'Part Time';

            return positionOrCompanyMatch && locationMatch && remoteMatch;
          });

          console.log(filteredJobs, 'before');
          console.log(filteredJobs);

          this.currentPage++;
          this.hasMore =
            this.currentPage <= Math.ceil(meta.total / meta.pageSize);

          if (!this.hasMore) {
            this.jobs.push(...filteredJobs);
            break;
          }
        }
      } catch (error) {
        this.error = 'Failed to apply filters';
      } finally {
        this.isLoading = false;
      }
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
