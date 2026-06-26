import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * SSR-safe reactive `prefers-reduced-motion`. Stays `false` on the server and
 * before mount, then tracks the media query on the client.
 */
export function useReducedMotion() {
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mq.matches
    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches
    }
    mq.addEventListener('change', onChange)
    onBeforeUnmount(() => mq.removeEventListener('change', onChange))
  })

  return { prefersReducedMotion }
}
