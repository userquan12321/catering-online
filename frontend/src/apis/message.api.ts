import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { MessagesData } from '@/types/message.type'

export const messageApi = createApi({
  reducerPath: 'messageApi',
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
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getContacts: builder.query<any, any>({
      query: () => 'message/contacts',
      providesTags: ['Message'],
    }),
    getMessages: builder.query<MessagesData, number>({
      query: (id) => `message/${id}`,
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation<string, any>({
      query: (body) => ({
        url: 'message',
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messageApi
