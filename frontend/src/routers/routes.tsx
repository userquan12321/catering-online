import { createBrowserRouter } from 'react-router-dom'

import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

import {
  AdminBookings,
  AdminCateringItems,
  AdminCuisineTypes,
  AdminDashBoard,
  AdminMessages,
  AdminUsers,
  BookingHistoryPage,
  CatererDetailPage,
  CaterersPage,
  FavoriteListPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from './lazy-routes'
import ProtectedRoute from './ProtectedRoute'

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
    path: '/caterers',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <CaterersPage />,
      },
      {
        path: '/caterers/:id',
        element: <CatererDetailPage />,
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
    path: '/favorite-list',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <FavoriteListPage />,
      },
    ],
  },
  {
    path: '/booking-history',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <BookingHistoryPage />,
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
      {
        path: 'messages',
        element: <AdminMessages />,
      },
    ],
  },
])

export default router
