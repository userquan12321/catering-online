export type CateringItem = {
  id: number
  cuisineId: number
  cuisineName: string
  name: string
  price: number
  itemType: number
  description?: string
  servesCount: number
  image?: string
}

export type CateringItemInput = Omit<CateringItem, 'id' | 'cuisineName'>

export type DeleteCateringItemInput = {
  id: number
  catererId: number
}
