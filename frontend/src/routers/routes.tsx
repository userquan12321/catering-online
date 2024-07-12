import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  AdminDashBoard,
  AdminUsers,
  AdminCuisineTypes,
  AdminCateringItems,
  AdminBookings,
} from './lazy-routes'

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
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminDashBoard />,
        index: true,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'cuisine-types',
        element: <AdminCuisineTypes />,
      },
      {
        path: 'catering-items',
        element: <AdminCateringItems />,
      },
      {
        path: 'bookings',
        element: <AdminBookings />,
      },
    ],
  },
])

export default router
