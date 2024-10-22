<template>
  <div :class="`${className} items-center`">
    <input
        type="checkbox"
        v-bind="$attrs"
        v-model="checkboxValue"
        id="checkbox"
        class="h-5 w-5 accent-primary cursor-pointer"
    />
    <label for="checkbox" class="ml-2 cursor-pointer text-gray-700 text-nowrap">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const checkboxValue = defineModel();
const props = defineProps<{
  modelValue: boolean;
  label: string;
  className?: string;
}>();

defineOptions({ inheritAttrs: false });
</script>
