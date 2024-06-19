import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))

export { HomePage, LoginPage, ProfilePage, RegisterPage }
