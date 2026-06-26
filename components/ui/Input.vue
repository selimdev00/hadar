<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  placeholder?: string
}>()

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="mono-label">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      class="rounded-sm border border-line bg-bg-2 px-3 py-2.5 text-step-0 text-ink transition-colors placeholder:text-ink-faint hover:border-line-strong focus:border-primary"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
