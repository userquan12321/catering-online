export type Caterer = {
  id: number
  firstName: string
  lastName: string
  image: string
  address: string
  cuisineTypes: string[]
  favoriteId: number
}

export type CaterersRes = {
  caterers: Caterer[]
  total: number
}

export type QueryArgs = {
  page: number
  pageSize?: number
}

export type Catering = {
  id: number
  name: string
  image: string
  description: string
  price: number
  servesCount: number
}

export type CateringGroup = {
  itemType: number
  items: Catering[]
}

export type CatererDetail = {
  caterer: Omit<Caterer, 'favoriteId' | 'id'> & {
    userId: number
    email: string
    phoneNumber: string
  }
  caterings: CateringGroup[]
}
