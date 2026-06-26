<script setup lang="ts">
defineEmits<{ clear: [] }>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-5 rounded-md border border-dashed border-line bg-[color-mix(in_oklch,var(--c-surface)_45%,transparent)] px-6 py-16 text-center"
  >
    <span
      class="-rotate-6 rounded-sm border-2 border-accent px-4 py-1.5 font-mono text-step-1 font-bold uppercase tracking-[0.15em] text-accent"
    >
      No records match
    </span>
    <p class="max-w-sm text-pretty text-ink-muted">
      Nothing in the archive fits those filters. Loosen a filter and try again.
    </p>
    <UiButton variant="ghost" @click="$emit('clear')">Clear filters</UiButton>
  </div>
</template>
