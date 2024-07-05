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
        element: <HomePage />,
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
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <RegisterPage />,
      },
    ],
  },
])

export default router
