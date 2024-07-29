export type BookingInput = {
  paymentMethod: number
  eventDate: string
  venue: string
  occasion: string
  numberOfPeople: number
}

export type BookingPayload = BookingInput & {
  catererId: number
  menuItems: { itemId: number; quantity: number }[]
}
