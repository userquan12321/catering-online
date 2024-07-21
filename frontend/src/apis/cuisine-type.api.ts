import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { CuisineInput, CuisineType } from '@/types/cuisine.type'

export const cuisineApi = createApi({
  reducerPath: 'cuisineApi',
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
  tagTypes: ['Cuisine'],
  endpoints: (builder) => ({
    getCuisines: builder.query<CuisineType[], void>({
      query: () => 'cuisines',
      providesTags: ['Cuisine'],
    }),

    addCuisine: builder.mutation<string, CuisineInput>({
      query: (newCuisine) => ({
        url: 'cuisines',
        method: 'POST',
        body: newCuisine,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Cuisine'],
    }),

    editCuisine: builder.mutation<string, { id: number } & CuisineInput>({
      query: ({ id, ...updatedCuisine }) => ({
        url: `cuisines/${id}`,
        method: 'PUT',
        body: updatedCuisine,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Cuisine'],
    }),

    deleteCuisine: builder.mutation<string, number>({
      query: (id) => ({
        url: `cuisines/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Cuisine'],
    }),
  }),
})

export const {
  useGetCuisinesQuery,
  useAddCuisineMutation,
  useEditCuisineMutation,
  useDeleteCuisineMutation,
} = cuisineApi
