export interface ApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface ApiList<T> {
  info: ApiInfo
  results: T[]
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: string
  image: string
  origin: { name: string, url: string }
  location: { name: string, url: string }
  episode: string[]
}

export interface RmLocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
}
