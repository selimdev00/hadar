<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    type?: 'button' | 'submit'
    block?: boolean
    busy?: boolean
  }>(),
  { variant: 'primary', type: 'button', block: false, busy: false },
)
</script>

<template>
  <button
    :type="type"
    :aria-busy="busy || undefined"
    class="inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 font-mono text-step--1 uppercase tracking-[0.12em] transition-colors duration-200 ease-out-expo"
    :class="[
      block ? 'w-full' : '',
      variant === 'primary'
        ? 'bg-primary text-primary-ink hover:bg-primary-hover'
        : 'border border-line text-ink-muted hover:border-line-strong hover:text-ink',
    ]"
  >
    <slot />
  </button>
</template>
