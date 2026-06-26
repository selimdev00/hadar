<script setup lang="ts">
defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-5 rounded-md border border-line bg-surface px-6 py-16 text-center"
  >
    <span class="mono-label text-accent">Signal // 0x4C-OST</span>
    <h2 class="text-step-2 font-bold text-ink">Transmission lost</h2>
    <p class="max-w-sm text-pretty text-ink-muted">
      The archive did not respond. Check your connection and pull the file again.
    </p>
    <UiButton @click="$emit('retry')">Retry</UiButton>
  </div>
</template>
