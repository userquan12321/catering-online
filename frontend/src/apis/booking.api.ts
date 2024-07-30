import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { BookingPayload, BookingsManagementRes } from '@/types/booking.type'

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookingsManagement: builder.query<BookingsManagementRes[], void>({
      query: () => 'booking/bookings-management',
      providesTags: ['Booking'],
    }),
    bookCatering: builder.mutation<string, BookingPayload>({
      query: (payload) => ({
        url: 'booking',
        method: 'POST',
        body: payload,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
})

export const { useBookCateringMutation, useGetBookingsManagementQuery } =
  bookingApi
