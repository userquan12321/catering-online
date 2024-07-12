import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RootState } from '@/redux/store'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const userType = useSelector((state: RootState) => state.auth.userType)

  const isAuthenticated = userType !== null

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
