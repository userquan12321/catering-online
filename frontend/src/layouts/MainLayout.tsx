import { Outlet } from 'react-router-dom'

import Header from '@/components/Header/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="margin-header main bg-primary">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
