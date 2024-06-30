import { authApi } from '@/apis/auth/users.api'
import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
})
