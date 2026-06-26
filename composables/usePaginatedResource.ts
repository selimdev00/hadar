import { computed, nextTick, reactive, ref, watch } from 'vue'
import type { ApiList } from '~/types/api'

function pruneEmpty(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== '' && v !== undefined && v !== null) out[k] = String(v)
  }
  return out
}

/**
 * Shared list-page engine for the three registry sections. Owns 1-based paging,
 * draft/applied filter split, clean URL sync (replace, no history pollution),
 * and the 404-as-empty vs real-error classification the R&M API needs.
 */
export function usePaginatedResource<T>(path: string, filterKeys: string[] = []) {
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const { prefersReducedMotion } = useReducedMotion()
  const perPage = 20

  const page = ref(Number(route.query.page) || 1)

  const seed = () => {
    const f: Record<string, string> = {}
    for (const k of filterKeys) f[k] = (route.query[k] as string) || ''
    return f
  }
  // draft = bound to the form inputs; applied = what actually drives the fetch + URL.
  const draft = reactive(seed())
  const applied = reactive(seed())

  const query = computed(() => pruneEmpty({ page: page.value, ...applied }))

  const { data, error, pending, refresh } = useFetch<ApiList<T>>(
    () => `${config.public.BASE_URL}${path}`,
    { query, lazy: true },
  )

  // Reflect real state into the URL without reading it back (no self-retrigger, no push spam).
  watch([page, applied], () => {
    router.replace({ query: pruneEmpty({ page: page.value, ...applied }) })
  })

  const httpStatus = computed(() => {
    const e = error.value as { statusCode?: number, response?: { status?: number } } | null
    return e?.statusCode ?? e?.response?.status
  })
  // R&M returns 404 for "no matches" rather than an empty list.
  const isEmpty = computed(
    () => httpStatus.value === 404 || (!!data.value && (data.value.results?.length ?? 0) === 0),
  )
  const isError = computed(() => !!error.value && httpStatus.value !== 404)

  const total = computed(() => data.value?.info?.count ?? 0)
  const totalPages = computed(() => data.value?.info?.pages ?? 0)
  const from = computed(() => (total.value === 0 ? 0 : (page.value - 1) * perPage + 1))
  const to = computed(() => Math.min(page.value * perPage, total.value))

  const catalog = ref<HTMLElement | null>(null)

  function goToPage(p: number) {
    if (p < 1 || (totalPages.value && p > totalPages.value)) return
    page.value = p
    nextTick(() => {
      catalog.value?.scrollIntoView({
        behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  function applyFilters() {
    for (const k of filterKeys) applied[k] = draft[k]
    page.value = 1
  }

  function clearFilters() {
    for (const k of filterKeys) {
      draft[k] = ''
      applied[k] = ''
    }
    page.value = 1
  }

  return {
    page,
    perPage,
    draft,
    applied,
    data,
    error,
    pending,
    isError,
    isEmpty,
    total,
    totalPages,
    from,
    to,
    catalog,
    goToPage,
    applyFilters,
    clearFilters,
    refresh,
  }
}
