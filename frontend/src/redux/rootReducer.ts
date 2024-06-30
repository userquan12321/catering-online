import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { authApi, profileApi } from '../apis'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
})
