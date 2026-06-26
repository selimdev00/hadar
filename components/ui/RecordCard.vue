<script setup lang="ts">
defineProps<{
  code: string
  title: string
  tag?: string
  rows: { label: string, value: string }[]
  index: number
}>()

const { prefersReducedMotion } = useReducedMotion()
</script>

<template>
  <article
    class="file-rise"
    :style="prefersReducedMotion ? undefined : `animation-delay:${Math.min(index, 8) * 40}ms`"
  >
    <div
      class="flex h-full flex-col rounded-md border border-line bg-surface transition-colors duration-200 hover:border-line-strong"
    >
      <div class="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5">
        <span class="font-mono text-step--1 tracking-[0.12em] text-ink-muted">{{ code }}</span>
        <span
          v-if="tag"
          class="max-w-[55%] truncate font-mono text-step--1 tracking-[0.1em] text-primary"
        >{{ tag }}</span>
      </div>

      <div class="flex flex-1 flex-col gap-4 p-4">
        <h3 class="text-balance text-step-1 font-bold leading-tight text-ink">{{ title }}</h3>
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 font-mono text-step--1">
          <template v-for="row in rows" :key="row.label">
            <dt class="uppercase tracking-[0.08em] text-ink-faint">{{ row.label }}</dt>
            <dd class="text-right text-ink-muted">{{ row.value }}</dd>
          </template>
        </dl>
      </div>
    </div>
  </article>
</template>
