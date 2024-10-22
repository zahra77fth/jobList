<template>
  <button :class="buttonClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
  variant: { type: String, default: 'primary' }
});

const buttonClass = computed(() => {
  return props.variant === 'primary' ? 'px-4 py-2 bg-blue-500 text-white rounded' : 'px-4 py-2 bg-gray-300 text-black rounded';
});
</script>
