import Header from '@/components/Header/Header'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Link to={'/register'}>MainLayout</Link>
      <Outlet />
    </div>
  )
}

export default MainLayout
