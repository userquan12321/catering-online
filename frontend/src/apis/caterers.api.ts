import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { PAGE_SIZE } from '@/constants/global.constant'
import { CatererRes, QueryArgs } from '@/types/caterer.type'

export const catererApi = createApi({
  reducerPath: 'catererApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCaterers: builder.query<CatererRes, QueryArgs>({
      query: ({ page = 1, pageSize = PAGE_SIZE }) =>
        'caterers?page=' + page + '&pageSize=' + pageSize,
    }),
  }),
})

export const { useGetCaterersQuery } = catererApi
