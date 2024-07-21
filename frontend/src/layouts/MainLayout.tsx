import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="margin-header main">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
