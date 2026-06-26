<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Character } from '~/types/api'

const props = defineProps<{ item: Character, index: number }>()
const { prefersReducedMotion } = useReducedMotion()

const revealed = ref(false)
const tiltEl = ref<HTMLElement | null>(null)

function toggle() {
  revealed.value = !revealed.value
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault()
    toggle()
  }
}

function onMove(e: PointerEvent) {
  if (prefersReducedMotion.value || !tiltEl.value || e.pointerType !== 'mouse') return
  const r = tiltEl.value.getBoundingClientRect()
  const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 8
  tiltEl.value.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
}

function onLeave() {
  if (tiltEl.value) tiltEl.value.style.transform = ''
}

const status = computed(() => {
  const s = (props.item.status || 'unknown').toLowerCase()
  if (s === 'alive') return { label: 'Active', vitals: 'Vitals OK', tone: 'alive' as const }
  if (s === 'dead') return { label: 'Deceased', vitals: 'No vitals', tone: 'dead' as const }
  return { label: 'Status unknown', vitals: 'No data', tone: 'unknown' as const }
})

const fileNo = computed(() => `C-${String(props.item.id).padStart(3, '0')}`)

const rows = computed(() => [
  { label: 'Species', value: props.item.species || 'Unknown' },
  { label: 'Gender', value: props.item.gender || 'Unknown' },
  { label: 'Origin', value: props.item.origin?.name || 'Unknown' },
  { label: 'Last seen', value: props.item.location?.name || 'Unknown' },
])

const revealLabel = computed(() =>
  revealed.value
    ? `Hide portrait of ${props.item.name}`
    : `Reveal portrait of ${props.item.name}`,
)
</script>

<template>
  <article
    class="group file-rise"
    :style="prefersReducedMotion ? undefined : `animation-delay:${Math.min(index, 8) * 40}ms`"
  >
    <div
      ref="tiltEl"
      class="relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-[transform,border-color,box-shadow] duration-200 ease-out-expo will-change-transform hover:border-line-strong focus-within:rim-primary"
      @pointermove="onMove"
      @pointerleave="onLeave"
    >
      <!-- header strip -->
      <div class="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
        <span class="font-mono text-step--1 tracking-[0.12em] text-ink-muted">
          FILE NO. {{ fileNo }}
        </span>
        <span class="max-w-[48%] truncate font-mono text-step--1 uppercase tracking-[0.12em] text-ink-faint">
          {{ item.species }}
        </span>
      </div>

      <!-- portrait + declassify reveal (the signature) -->
      <div class="relative aspect-[4/3] overflow-hidden bg-bg-2">
        <img
          :src="item.image"
          :alt="`Portrait of ${item.name}`"
          loading="lazy"
          class="size-full object-cover transition duration-500 ease-out-expo"
          :class="revealed
            ? 'scale-100 brightness-100 saturate-100'
            : 'scale-[1.03] brightness-[0.6] saturate-[0.8] group-hover:scale-100 group-hover:brightness-100 group-hover:saturate-100'"
        >
        <div
          class="scanlines pointer-events-none absolute inset-0 transition-opacity duration-500"
          :class="revealed ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'"
        />

        <span
          class="pointer-events-none absolute right-2 top-2 z-10 rotate-6 rounded-sm border-2 px-2 py-0.5 font-mono text-step--1 font-bold uppercase tracking-[0.1em]"
          :class="{
            'border-alive text-alive': status.tone === 'alive',
            'border-dead text-dead': status.tone === 'dead',
            'border-unknown text-unknown': status.tone === 'unknown',
          }"
        >{{ status.label }}</span>

        <button
          type="button"
          :aria-pressed="revealed"
          :aria-label="revealLabel"
          class="absolute inset-0 z-20 flex items-center justify-center"
          @click="toggle"
          @keydown="onKey"
        >
          <span
            class="flex items-center gap-2.5 rounded-sm bg-bg-2 px-3 py-1.5 font-mono text-step--1 uppercase tracking-[0.22em] text-primary shadow-lg transition-all duration-300 ease-out-expo"
            :class="revealed
              ? 'pointer-events-none -translate-y-1.5 opacity-0'
              : 'opacity-100 group-hover:-translate-y-1.5 group-hover:opacity-0'"
          >
            <span class="h-2 w-7 bg-primary" />
            Classified
          </span>
        </button>
      </div>

      <!-- name plate + vitals -->
      <div class="flex items-start justify-between gap-3 px-3 pt-3">
        <h3 class="text-step-1 font-bold leading-tight text-ink">{{ item.name }}</h3>
        <span
          class="mt-0.5 inline-flex shrink-0 items-center gap-1.5 font-mono text-step--1 uppercase tracking-[0.08em]"
          :class="{
            'text-alive': status.tone === 'alive',
            'text-dead': status.tone === 'dead',
            'text-unknown': status.tone === 'unknown',
          }"
        >
          <span
            class="size-2 rounded-full"
            :class="{
              'bg-alive motion-safe:animate-[vitals-pulse_2.4s_ease-in-out_infinite]': status.tone === 'alive',
              'bg-dead': status.tone === 'dead',
              'bg-unknown': status.tone === 'unknown',
            }"
          />
          {{ status.vitals }}
        </span>
      </div>

      <!-- attribute table -->
      <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line px-3 py-3 font-mono text-step--1">
        <template v-for="attr in rows" :key="attr.label">
          <dt class="uppercase tracking-[0.08em] text-ink-faint">{{ attr.label }}</dt>
          <dd class="truncate text-right text-ink-muted">{{ attr.value }}</dd>
        </template>
      </dl>
    </div>
  </article>
</template>
