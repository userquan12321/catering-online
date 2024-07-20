export type CuisineType = {
  id: number
  cuisineName: string
  description: string
  cuisineImage: string
}

export type CuisineInput = Omit<CuisineType, 'id'>
