import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
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
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
}
