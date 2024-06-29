import { authApi } from '@/apis/auth/users.api'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  userType: number | null
  firstName: string
}

const initialState: AuthState = {
  userType: null,
  firstName: '',
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
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      Object.assign(state, initialState)
    })
  },
})

export const { reducer: authReducer } = authSlice
