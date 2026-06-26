<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  page: number
  total: number
  perPage: number
  from: number
  to: number
}>()

const emit = defineEmits<{ change: [number] }>()

const pages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
</script>

<template>
  <nav
    aria-label="Pagination"
    class="sticky bottom-0 z-20 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-t-md border-t border-line bg-[color-mix(in_oklch,var(--c-surface)_94%,transparent)] px-4 py-3 backdrop-blur"
  >
    <p class="font-mono text-step--1 uppercase tracking-[0.12em] text-ink-muted" aria-live="polite">
      Records {{ from }}-{{ to }} of {{ total }}
    </p>

    <div class="flex items-center gap-1.5">
      <button
        type="button"
        class="rounded-sm border border-line px-3 py-1.5 font-mono text-step--1 uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-line-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
        :disabled="page <= 1"
        @click="emit('change', page - 1)"
      >
        Prev
      </button>
      <span class="px-2 font-mono text-step--1 text-ink-faint">
        Page <span class="text-primary">{{ page }}</span> of {{ pages }}
      </span>
      <button
        type="button"
        class="rounded-sm border border-line px-3 py-1.5 font-mono text-step--1 uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-line-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
        :disabled="page >= pages"
        @click="emit('change', page + 1)"
      >
        Next
      </button>
    </div>
  </nav>
</template>
