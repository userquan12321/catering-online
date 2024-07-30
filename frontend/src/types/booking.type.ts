export type BookingInput = {
  paymentMethod: number
  eventDate: string
  venue: string
  occasion: string
  numberOfPeople: number
}

export type BookingPayload = BookingInput & {
  catererId: number
  menuItems: Omit<MenuItem, 'name' | 'price'>[]
}

type MenuItem = {
  itemId: number
  name: string
  price: number
  quantity: number
}

export type BookingsManagementRes = BookingInput & {
  id: number
  customer: Customer
  bookingStatus: number
  createdAt: string
  updatedAt: string
  menuItems: MenuItem[]
  totalPrice: number
}

type Customer = {
  customerId: number
  firstName: string
  lastName: string
}

export type BookingColumn = {
  id: number
  eventDate: string
  numberOfPeople: number
  bookingStatus: number
  customer: Customer
  totalPrice: number
}
