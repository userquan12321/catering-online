import LoadingFallback from '@/components/LoadingFallback'
import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import { HomePage, LoginPage, ProfilePage, RegisterPage } from './lazy-routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <LoadingFallback>
            <HomePage />
          </LoadingFallback>
        ),
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <LoadingFallback>
            <ProfilePage />
          </LoadingFallback>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: (
          <LoadingFallback>
            <LoginPage />
          </LoadingFallback>
        ),
      },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: (
          <LoadingFallback>
            <RegisterPage />
          </LoadingFallback>
        ),
      },
    ],
  },
])

export default router
