<script lang="ts" setup>
import type { Character } from '~/types/api'

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
} = usePaginatedResource<Character>('/character', ['name', 'status', 'gender'])

const statuses = [
  { label: 'Any', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
]

const genders = [
  { label: 'Any', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Unknown', value: 'unknown' },
]
</script>

<template>
  <div>
    <Banner
      title="The Rick and Morty Wiki"
      subtitle="Subject files pulled from across the central finite curve. Status, species, and last known location, on record."
    />

    <div
      class="mx-auto grid max-w-registry gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:gap-10 lg:px-8"
    >
      <FilterPanel :busy="pending" @apply="applyFilters" @clear="clearFilters">
        <UiInput id="name" v-model="draft.name" label="Name" placeholder="e.g. Rick Sanchez" />
        <UiRadioGroup v-model="draft.status" name="status" legend="Status" :options="statuses" />
        <UiRadioGroup v-model="draft.gender" name="gender" legend="Gender" :options="genders" />
      </FilterPanel>

      <section aria-label="Character dossiers" class="min-w-0">
        <UiStateLoading v-if="pending" :count="perPage" />
        <UiStateError v-else-if="isError" @retry="refresh" />
        <UiStateEmpty v-else-if="isEmpty" @clear="clearFilters" />
        <template v-else>
          <div
            ref="catalog"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <UiDossierCard
              v-for="(card, i) in data?.results || []"
              :key="card.id"
              :item="card"
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
