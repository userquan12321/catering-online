import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { RootState } from '@/redux/store'
import {
  ChangePasswordArgs,
  TProfile,
  TProfileArgs,
} from '@/types/profile.type'

export const profileApi = createApi({
  reducerPath: 'profileApi',
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
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    getProfile: build.query<TProfile, void>({
      query: () => ({
        url: 'user/profile',
      }),
      providesTags: ['Profile'],
    }),

    changePassword: build.mutation<string, ChangePasswordArgs>({
      query: (data) => ({
        url: 'user/change-password',
        method: 'PUT',
        body: data,
        responseHandler: (response) => response.text(),
      }),
    }),
    editProfile: build.mutation<string, TProfileArgs>({
      query: (data) => ({
        url: 'user/update-profile',
        method: 'PUT',
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useChangePasswordMutation,
  useEditProfileMutation,
} = profileApi
