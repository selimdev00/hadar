<script setup lang="ts">
defineProps<{
  legend: string
  name: string
  modelValue: string
  options: { label: string, value: string }[]
}>()

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <fieldset>
    <legend class="mono-label mb-1.5">{{ legend }}</legend>
    <div class="flex flex-col">
      <label
        v-for="opt in options"
        :key="opt.value"
        class="flex cursor-pointer items-center gap-3 py-2 text-step-0 text-ink-muted transition-colors hover:text-ink"
      >
        <input
          type="radio"
          :name="name"
          :value="opt.value"
          :checked="modelValue === opt.value"
          class="peer sr-only"
          @change="$emit('update:modelValue', opt.value)"
        >
        <span
          class="grid size-[18px] shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus"
          :class="modelValue === opt.value ? 'border-primary' : 'border-line-strong'"
        >
          <span
            class="size-2.5 rounded-full bg-primary transition-transform duration-200 ease-out-expo"
            :class="modelValue === opt.value ? 'scale-100' : 'scale-0'"
          />
        </span>
        <span>{{ opt.label }}</span>
      </label>
    </div>
  </fieldset>
</template>
