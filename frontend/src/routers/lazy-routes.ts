import { lazy } from 'react'

const AdminBookings = lazy(() => import('../pages/admin/AdminBookingsPage'))
const AdminCateringItems = lazy(
  () => import('../pages/admin/AdminCateringItemsPage'),
)
const AdminCuisineTypes = lazy(
  () => import('../pages/admin/AdminCuisineTypesPage'),
)
const AdminMessages = lazy(() => import('../pages/admin/AdminMessagesPage'))
const AdminUsers = lazy(() => import('../pages/admin/AdminUsersPage'))
const BookingHistoryPage = lazy(
  () => import('../pages/private/BookingHistoryPage'),
)
const CatererDetailPage = lazy(
  () => import('../pages/public/CatererDetailPage'),
)
const CaterersPage = lazy(() => import('../pages/public/CaterersPage'))
const FavoriteListPage = lazy(() => import('../pages/private/FavoriteListPage'))
const HomePage = lazy(() => import('../pages/public/HomePage'))
const LoginPage = lazy(() => import('../pages/public/LoginPage'))
const ProfilePage = lazy(() => import('../pages/private/ProfilePage'))
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'))

export {
  AdminBookings,
  AdminCateringItems,
  AdminCuisineTypes,
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
}
