<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ busy?: boolean }>()
defineEmits<{ apply: [], clear: [] }>()

const open = ref(false)
</script>

<template>
  <section aria-label="Filters" class="lg:sticky lg:top-20">
    <div class="flex items-center justify-between gap-2 border-b border-line pb-3">
      <h2 class="font-mono text-step--1 font-bold uppercase tracking-[0.14em] text-ink">
        Filters
      </h2>
      <button
        type="button"
        class="font-mono text-step--1 uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink lg:hidden"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ open ? 'Hide' : 'Show' }}
      </button>
    </div>

    <form
      class="mt-4 space-y-5"
      :class="open ? 'block' : 'hidden lg:block'"
      @submit.prevent="$emit('apply')"
    >
      <slot />

      <div class="flex flex-col gap-2 pt-1">
        <UiButton type="submit" block :busy="busy">
          {{ busy ? 'Searching the archive...' : 'Apply filters' }}
        </UiButton>
        <UiButton type="button" variant="ghost" block @click="$emit('clear')">
          Clear filters
        </UiButton>
      </div>
    </form>
  </section>
</template>
