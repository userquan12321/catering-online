import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi, cateringItemApi, cuisineApi, profileApi } from '../apis'

import { authReducer } from './slices/auth.slice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [cuisineApi.reducerPath]: cuisineApi.reducer,
  [cateringItemApi.reducerPath]: cateringItemApi.reducer,
})
