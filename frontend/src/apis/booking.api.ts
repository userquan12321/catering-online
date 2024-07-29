import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { BookingPayload } from '@/types/booking.type'

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
  endpoints: (builder) => ({
    bookCatering: builder.mutation<string, BookingPayload>({
      query: (payload) => ({
        url: 'booking',
        method: 'POST',
        body: payload,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
})

export const { useBookCateringMutation } = bookingApi
