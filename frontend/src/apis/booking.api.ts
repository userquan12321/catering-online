import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import {
  BookingPayload,
  BookingsManagementRes,
  ChangeStatusPayload,
} from '@/types/booking.type'

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
    getBookingsManagement: builder.query<BookingsManagementRes, void>({
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
    changeStatus: builder.mutation<string, ChangeStatusPayload>({
      query: ({ bookingId, bookingStatus }) => ({
        url: `booking/change-booking-status/${bookingId}`,
        method: 'PUT',
        body: { bookingStatus },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
})

export const {
  useBookCateringMutation,
  useGetBookingsManagementQuery,
  useChangeStatusMutation,
} = bookingApi
