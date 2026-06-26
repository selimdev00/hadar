<script lang="ts" setup>
import type { Episode } from '~/types/api'

const {
  page,
  perPage,
  draft,
  data,
  pending,
  isError,
  isEmpty,
  total,
  from,
  to,
  catalog,
  goToPage,
  applyFilters,
  clearFilters,
  refresh,
} = usePaginatedResource<Episode>('/episode', ['name'])

function fmtDate(s: string) {
  const d = new Date(s)
  return Number.isNaN(+d)
    ? s
    : new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(d)
}

function rows(ep: Episode) {
  return [
    { label: 'Air date', value: fmtDate(ep.air_date) },
    { label: 'Cast', value: `${ep.characters?.length ?? 0} characters` },
  ]
}
</script>

<template>
  <div>
    <Banner
      title="Episode Logs"
      subtitle="Broadcast records by air date and episode code, straight from the archive."
    />

    <div
      class="mx-auto grid max-w-registry gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-10 lg:px-8"
    >
      <FilterPanel :busy="pending" @apply="applyFilters" @clear="clearFilters">
        <UiInput id="name" v-model="draft.name" label="Name" placeholder="e.g. Pilot" />
      </FilterPanel>

      <section aria-label="Episode logs" class="min-w-0">
        <UiStateLoading v-if="pending" :count="perPage" />
        <UiStateError v-else-if="isError" @retry="refresh" />
        <UiStateEmpty v-else-if="isEmpty" @clear="clearFilters" />
        <template v-else>
          <div
            ref="catalog"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <UiRecordCard
              v-for="(ep, i) in data?.results || []"
              :key="ep.id"
              :code="`EP-${String(ep.id).padStart(3, '0')}`"
              :title="ep.name"
              :tag="ep.episode"
              :rows="rows(ep)"
              :index="i"
            />
          </div>
          <UiPaginator
            :page="page"
            :total="total"
            :per-page="perPage"
            :from="from"
            :to="to"
            @change="goToPage"
          />
        </template>
      </section>
    </div>
  </div>
</template>
