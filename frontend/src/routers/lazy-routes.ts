import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/public/HomePage'))
const FavoriteListPage = lazy(() => import('../pages/private/FavoriteListPage'))
const LoginPage = lazy(() => import('../pages/public/LoginPage'))
const ProfilePage = lazy(() => import('../pages/private/ProfilePage'))
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'))
const AdminDashBoard = lazy(() => import('../pages/admin/AdminDashBoardPage'))
const AdminUsers = lazy(() => import('../pages/admin/AdminUsersPage'))
const AdminBookings = lazy(() => import('../pages/admin/AdminBookingsPage'))
const AdminCateringItems = lazy(
  () => import('../pages/admin/AdminCateringItemsPage'),
)
const AdminCuisineTypes = lazy(
  () => import('../pages/admin/AdminCuisineTypesPage'),
)

export {
  AdminBookings,
  AdminCateringItems,
  AdminCuisineTypes,
  AdminDashBoard,
  AdminUsers,
  FavoriteListPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
}
