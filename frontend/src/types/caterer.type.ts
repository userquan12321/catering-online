export type Caterer = {
  id: number
  firstName: string
  lastName: string
  image: string
  address: string
  cuisineTypes: string[]
  isFavorite: boolean
}

export type CatererRes = {
  caterers: Caterer[]
  total: number
}

export type QueryArgs = {
  page: number
  pageSize?: number
}