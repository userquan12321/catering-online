import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { PAGE_SIZE } from '@/constants/global.constant'
import { RootState } from '@/redux/store'
import { CatererDetail, CaterersRes, QueryArgs } from '@/types/caterer.type'

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
  endpoints: (builder) => ({
    getCaterers: builder.query<CaterersRes, QueryArgs>({
      query: ({ page = 1, pageSize = PAGE_SIZE }) =>
        'caterers?page=' + page + '&pageSize=' + pageSize,
    }),
    getCatererDetail: builder.query<CatererDetail, number>({
      query: (id) => `caterers/${id}`,
    }),
  }),
})

export const { useGetCaterersQuery, useGetCatererDetailQuery } = catererApi
