import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import {
  authApi,
  catererApi,
  cateringItemApi,
  cuisineApi,
  favoriteApi,
  messageApi,
  profileApi,
} from '../apis'

import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: { profileApi },
      },
    }).concat(
      authApi.middleware,
      catererApi.middleware,
      cateringItemApi.middleware,
      cuisineApi.middleware,
      favoriteApi.middleware,
      profileApi.middleware,
      messageApi.middleware,
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

setupListeners(store.dispatch)
