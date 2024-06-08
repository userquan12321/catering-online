import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <Link to={'/register'}>MainLayout</Link>
      <Outlet />
    </div>
  )
}

export default MainLayout
