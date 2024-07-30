import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="margin-header flex-1 bg-primary">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
