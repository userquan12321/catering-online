import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/apis/index'

interface AuthState {
  userType: number | null
  firstName: string
  userId: number
  avatar: string
}

const initialState: AuthState = {
  userType: null,
  firstName: '',
  userId: 0,
  avatar: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.userType = action.payload.userType
        state.firstName = action.payload.firstName
        state.userId = action.payload.userId
        state.avatar = action.payload.avatar
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      Object.assign(state, initialState)
    })
  },
})

export const { setAvatar } = authSlice.actions
export const { reducer: authReducer } = authSlice
