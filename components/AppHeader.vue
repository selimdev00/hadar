<script setup lang="ts">
const nav = [
  { label: 'Characters', to: '/' },
  { label: 'Locations', to: '/locations' },
  { label: 'Episodes', to: '/episodes' },
]

const route = useRoute()
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-line bg-[color-mix(in_oklch,var(--c-bg)_88%,transparent)] backdrop-blur">
    <div
      class="mx-auto flex max-w-registry items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 text-primary transition-opacity hover:opacity-80"
      >
        <Logo class="h-7 w-7" />
        <span class="flex flex-col leading-none">
          <span class="font-mono text-step--1 uppercase tracking-[0.18em] text-ink-muted">
            Field Registry
          </span>
          <span class="text-step-0 font-bold text-ink">Rick &amp; Morty</span>
        </span>
      </NuxtLink>

      <nav aria-label="Primary" class="no-scrollbar -mx-1 overflow-x-auto">
        <ul class="flex items-center gap-1">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative block whitespace-nowrap rounded-sm px-3 py-2 font-mono text-step--1 uppercase tracking-[0.12em] transition-colors duration-200"
              :class="route.path === item.to ? 'text-primary' : 'text-ink-muted hover:text-ink'"
            >
              {{ item.label }}
              <span
                v-if="route.path === item.to"
                class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
              />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
