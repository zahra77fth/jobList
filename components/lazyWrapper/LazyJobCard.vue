<template>
  <component :is="jobCard" v-bind="jobProps" v-if="jobCard" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineAsyncComponent } from 'vue';
import { type Job } from '@/types/Job';

const props = defineProps<{ job: Job }>();
const jobProps = { job: props.job };

const jobCard = ref(defineAsyncComponent(() => import('../JobCard.vue')));
</script>
