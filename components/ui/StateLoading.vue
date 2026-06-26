<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 12 })
</script>

<template>
  <div role="status" aria-live="polite" class="space-y-6">
    <p class="mono-label text-center text-primary">Decrypting dossiers...</p>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in count"
        :key="i"
        class="overflow-hidden rounded-md border border-line bg-surface"
      >
        <div class="flex items-center justify-between border-b border-line px-3 py-2.5">
          <UiSkeleton class="h-3 w-24" />
          <UiSkeleton class="h-3 w-12" />
        </div>
        <UiSkeleton class="aspect-[4/3] w-full rounded-none" />
        <div class="space-y-2.5 p-4">
          <UiSkeleton class="h-4 w-2/3" />
          <UiSkeleton class="h-3 w-1/2" />
          <UiSkeleton class="h-3 w-3/5" />
        </div>
      </div>
    </div>
  </div>
</template>
