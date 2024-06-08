import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = (): boolean => {
    return false
  }

  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
