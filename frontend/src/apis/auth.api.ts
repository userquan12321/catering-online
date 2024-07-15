import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL } from '@/constants/api.constant'
import { LoginBody, RegisterBody } from '@/types/auth.type'

type LoginResponse = {
  userType: number
  firstName: string
  userId: number
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    register: build.mutation<string, RegisterBody>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
        responseHandler: (response) => response.text(),
      }),
    }),
    login: build.mutation<LoginResponse, LoginBody>({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: build.mutation<string, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi
