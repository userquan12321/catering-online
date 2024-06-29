import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { rootReducer } from './rootReducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@/apis/auth/users.api'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

console.log(store.getState(), 's')

setupListeners(store.dispatch)
