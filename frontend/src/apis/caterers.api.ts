import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { PAGE_SIZE } from '@/constants/global.constant'
import { RootState } from '@/redux/store'
import { CatererRes, QueryArgs } from '@/types/caterer.type'

export const catererApi = createApi({
  reducerPath: 'catererApi',
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
  tagTypes: ['Caterer'],
  endpoints: (builder) => ({
    getCaterers: builder.query<CatererRes, QueryArgs>({
      query: ({ page = 1, pageSize = PAGE_SIZE }) =>
        'caterers?page=' + page + '&pageSize=' + pageSize,
    }),
  }),
})

export const { useGetCaterersQuery } = catererApi
