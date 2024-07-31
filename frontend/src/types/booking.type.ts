import { BOOKING_STATUSES } from '@/constants/booking.constant'

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

export type BookingColumn = BookingInput & {
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

export type BookingsManagementRes = {
  bookings: BookingColumn[]
  needActionCount: number
}

export type ChangeStatusPayload = {
  bookingId: number
  bookingStatus: number
}

export type BookingStatusType = (typeof BOOKING_STATUSES)[number]['slug']
