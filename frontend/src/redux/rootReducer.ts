import { authApi } from '@/apis/auth/users.api'
import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
})
