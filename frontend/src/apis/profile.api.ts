import { API_BASE_URL } from '@/constants/api.constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getProfile: build.query<unknown, number>({
      query: (id) => ({
        url: `user/profile/${id}`,
      }),
    }),

    // logout: build.mutation<string, void>({
    //   query: () => ({
    //     url: 'auth/logout',
    //     method: 'POST',
    //     responseHandler: (response) => response.text(),
    //   }),
    // }),
  }),
})

export const { useGetProfileQuery } = profileApi
