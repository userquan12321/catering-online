import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { ChangePasswordArgs, TProfile } from '@/types/profile.type'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getProfile: build.query<TProfile, number>({
      query: (id) => ({
        url: `user/profile/${id}`,
      }),
    }),

    changePassword: build.mutation<string, ChangePasswordArgs>({
      query: ({ id, data }) => ({
        url: `user/change-password/${id}`,
        method: 'PUT',
        body: data,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
})

export const { useGetProfileQuery, useChangePasswordMutation } = profileApi
