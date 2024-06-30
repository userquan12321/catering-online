import { authApi } from '@/apis/index'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  userType: number | null
  firstName: string
  userId: number
}

const initialState: AuthState = {
  userType: null,
  firstName: '',
  userId: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.userType = action.payload.userType
        state.firstName = action.payload.firstName
        state.userId = action.payload.userId
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      Object.assign(state, initialState)
    })
  },
})

export const { reducer: authReducer } = authSlice
