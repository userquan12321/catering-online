import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import { CatererRes, QueryArgs } from '@/types/caterer.type'

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
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
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    getFavoriteList: builder.query<CatererRes, QueryArgs>({
      query: () => 'favoriteList',
      providesTags: ['Favorite'],
    }),
    addFavorite: builder.mutation<string, number>({
      query: (catererId) => ({
        url: 'favoriteList',
        method: 'POST',
        body: { catererId },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Favorite'],
    }),
    deleteFavorite: builder.mutation<string, number>({
      query: (id) => ({
        url: `favoriteList/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
})

export const {
  useGetFavoriteListQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoriteApi
