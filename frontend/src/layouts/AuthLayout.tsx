import { Link, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <Link to={'/login'}>AuthLayout</Link>
      <Outlet />
    </div>
  )
}

export default AuthLayout
