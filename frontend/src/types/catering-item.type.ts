export type CateringItem = {
  id: number
  cuisineId: number
  cuisineName: string
  name: string
  price: number
  servesCount: number
  description: string
  image: string
}

export type CateringItemInput = Omit<CateringItem, 'id' | 'cuisineName'>

export type DeleteCateringItemInput = {
  id: number
  catererId: number
}
