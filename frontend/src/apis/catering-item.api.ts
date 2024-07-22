import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { CateringItem, CateringItemInput } from '@/types/catering-item.type'

export const cateringItemApi = createApi({
  reducerPath: 'cateringItemApi',
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

  tagTypes: ['Item'],
  endpoints: (builder) => ({
    getCateringItems: builder.query<CateringItem[], void>({
      query: () => 'cateringItem',
      providesTags: ['Item'],
    }),

    addCateringItem: builder.mutation<string, CateringItemInput>({
      query: (newItem) => ({
        url: 'cateringItem',
        method: 'POST',
        body: newItem,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Item'],
    }),

    editCateringItem: builder.mutation<
      string,
      { id: number } & CateringItemInput
    >({
      query: ({ id, ...updatedItem }) => ({
        url: `cateringItem/${id}`,
        method: 'PUT',
        body: updatedItem,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Item'],
    }),

    deleteCateringItem: builder.mutation<string, number>({
      query: (id) => ({
        url: `cateringItem/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Item'],
    }),
  }),
})

export const {
  useGetCateringItemsQuery,
  useAddCateringItemMutation,
  useEditCateringItemMutation,
  useDeleteCateringItemMutation,
} = cateringItemApi
