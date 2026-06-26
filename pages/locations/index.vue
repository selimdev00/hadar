<script lang="ts" setup>
import type { RmLocation } from '~/types/api'

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
} = usePaginatedResource<RmLocation>('/location', ['name'])

function rows(loc: RmLocation) {
  return [
    { label: 'Type', value: loc.type || 'Unknown' },
    { label: 'Dimension', value: loc.dimension || 'Unknown' },
    { label: 'Residents', value: `${loc.residents?.length ?? 0}` },
  ]
}
</script>

<template>
  <div>
    <Banner
      title="Locations Registry"
      subtitle="Catalogued dimensions, planets, and microverses. Type and resident counts on file."
    />

    <div
      class="mx-auto grid max-w-registry gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-10 lg:px-8"
    >
      <FilterPanel :busy="pending" @apply="applyFilters" @clear="clearFilters">
        <UiInput id="name" v-model="draft.name" label="Name" placeholder="e.g. Earth" />
      </FilterPanel>

      <section aria-label="Location records" class="min-w-0">
        <UiStateLoading v-if="pending" :count="perPage" />
        <UiStateError v-else-if="isError" @retry="refresh" />
        <UiStateEmpty v-else-if="isEmpty" @clear="clearFilters" />
        <template v-else>
          <div
            ref="catalog"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <UiRecordCard
              v-for="(loc, i) in data?.results || []"
              :key="loc.id"
              :code="`LOC-${String(loc.id).padStart(3, '0')}`"
              :title="loc.name"
              :tag="loc.type"
              :rows="rows(loc)"
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
