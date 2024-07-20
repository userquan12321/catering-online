export type CateringItem = {
  id: number
  cuisineId: number
  cuisineName: string
  name: string
  price: number
  servesCount: number
  image: string
}

export type CateringItemInput = Omit<CateringItem, 'id'> & {
  catererId: number
}

export type DeleteCateringItemInput = {
  id: number
  catererId: number
}
