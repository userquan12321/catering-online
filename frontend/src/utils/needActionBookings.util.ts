import { BookingColumn } from '@/types/booking.type'

export const needActionBookings = (bookings: BookingColumn[]) =>
  bookings.filter(
    (booking) => booking.bookingStatus === 0 || booking.bookingStatus === 3,
  )
