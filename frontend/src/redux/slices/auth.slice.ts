import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/apis/index'

interface AuthState {
  userType: number | null
  firstName: string
  avatar: string
  accessToken: string
}

const initialState: AuthState = {
  userType: null,
  firstName: '',
  avatar: '',
  accessToken: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload
    },
    logout: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.userType = action.payload.userType
        state.firstName = action.payload.firstName
        state.avatar = action.payload.avatar
        state.accessToken = action.payload.accessToken
      },
    )
  },
})

export const { setAvatar, logout } = authSlice.actions
export const { reducer: authReducer } = authSlice
