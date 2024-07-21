export type Caterer = {
  id: number
  firstName: string
  lastName: string
  image: string
  address: string
  cuisineTypes: string[]
  favoriteId: number
}

export type CatererRes = {
  caterers: Caterer[]
  total: number
}

export type QueryArgs = {
  page: number
  pageSize?: number
}
