import classes from '@/styles/layouts/auth-layout.module.css'
import { Card } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = () => {
    return false
  }

  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
    <div className={classes.layout}>
      <Card className={classes.formWrapper}>
        <Outlet />
      </Card>
    </div>
  )
}

export default AuthLayout
