import { API_BASE_URL } from '@/constants/api.constant'
import { LoginBody, RegisterBody } from '@/types/auth.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LoginResponse = {
  userType: number
  firstName: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
