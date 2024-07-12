import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { Card } from 'antd'

import { RootState } from '@/redux/store'
import classes from '@/styles/layouts/auth-layout.module.css'

const AuthLayout = () => {
  const userType = useSelector((state: RootState) => state.auth.userType)

  const isAuthenticated = userType !== null

  if (isAuthenticated) {
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
