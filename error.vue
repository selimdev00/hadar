<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const code = computed(() => props.error?.statusCode ?? 500)

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg text-ink">
    <main
      class="flex flex-1 items-center justify-center px-4 py-16"
    >
      <div
        class="scanlines relative flex max-w-md flex-col items-center gap-6 overflow-hidden rounded-md border border-line bg-surface px-8 py-12 text-center"
      >
        <span class="font-mono text-step--1 uppercase tracking-[0.16em] text-ink-faint">
          Registry error {{ code }}
        </span>
        <span
          class="-rotate-6 rounded-sm border-2 border-accent px-4 py-1.5 font-mono text-step-1 font-bold uppercase tracking-[0.15em] text-accent"
        >
          File not found
        </span>
        <p class="text-pretty text-ink-muted">
          Record voided or never existed. This page is not in the registry.
        </p>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 font-mono text-step--1 uppercase tracking-[0.12em] text-primary-ink transition-colors duration-200 hover:bg-primary-hover"
          @click="handleError"
        >
          Return to the registry
        </button>
      </div>
    </main>
  </div>
</template>
