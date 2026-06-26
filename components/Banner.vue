<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle: string
  }>(),
  {
    eyebrow: 'Interdimensional registry // Access: granted',
  },
)
</script>

<template>
  <section class="relative overflow-hidden border-b border-line bg-bg-2">
    <div class="scanlines pointer-events-none absolute inset-0">
      <img
        src="/banner.jpg"
        alt=""
        aria-hidden="true"
        class="size-full object-cover object-center opacity-20"
      >
      <div
        class="absolute inset-0 bg-gradient-to-t from-bg to-transparent"
        style="background-image: linear-gradient(
          to top,
          var(--c-bg),
          color-mix(in oklch, var(--c-bg) 72%, transparent),
          color-mix(in oklch, var(--c-bg) 28%, transparent)
        );"
      />
    </div>

    <div
      class="relative mx-auto flex max-w-registry flex-col justify-end gap-3 px-4 py-12 sm:px-6 lg:px-8"
      style="min-height: clamp(13rem, 30vh, 20rem)"
    >
      <p class="mono-label text-primary">
        {{ eyebrow }}
      </p>
      <h1 class="max-w-3xl text-balance text-step-3 font-bold text-ink sm:text-step-4">
        {{ title }}
      </h1>
      <p class="max-w-xl text-pretty text-ink-muted">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
