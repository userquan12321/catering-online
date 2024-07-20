import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import {
  CateringItem,
  CateringItemInput,
  DeleteCateringItemInput,
} from '@/types/catering-item.type'

export const cateringItemApi = createApi({
  reducerPath: 'cateringItemApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    getCateringItems: builder.query<CateringItem[], void>({
      query: (id) => `cateringItem/${id}`,
      providesTags: ['Item'],
    }),

    addCateringItem: builder.mutation<string, CateringItemInput>({
      query: ({ catererId, ...newItem }) => ({
        url: `cateringItem/${catererId}`,
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
      query: ({ id, catererId, ...updatedItem }) => ({
        url: `cateringItem/${catererId}/${id}`,
        method: 'PUT',
        body: updatedItem,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Item'],
    }),

    deleteCateringItem: builder.mutation<string, DeleteCateringItemInput>({
      query: ({ catererId, id }) => ({
        url: `cateringItem/${catererId}/${id}`,
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
