import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {
  authApi,
  catererApi,
  cateringItemApi,
  cuisineApi,
  favoriteApi,
  messageApi,
  profileApi,
} from '../apis'

import { authReducer } from './slices/auth.slice'
import { bookingReducer } from './slices/booking.slice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedReducer,
  booking: bookingReducer,
  [authApi.reducerPath]: authApi.reducer,
  [catererApi.reducerPath]: catererApi.reducer,
  [cateringItemApi.reducerPath]: cateringItemApi.reducer,
  [cuisineApi.reducerPath]: cuisineApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
})
