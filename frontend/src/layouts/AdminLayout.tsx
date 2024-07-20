import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import Header from '@/components/Header/Header'
import { menuItems } from '@/constants/admin.constant'
import { RootState } from '@/redux/store'
import classes from '@/styles/layouts/admin-layout.module.css'

const AdminLayout = () => {
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState(pathname)

  const title = menuItems.find((item) => item?.key === pathname)?.title

  const userType = useSelector((state: RootState) => state.auth.userType)

  const isAuthenticated = userType !== null && userType !== 0

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <Layout>
      <Header isAdmin />
      <Layout>
        <Sider width={200} className="margin-header">
          <Menu
            theme="dark"
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
            items={menuItems}
          />
        </Sider>
        <Content className={`${classes.content} margin-header`}>
          <Typography.Title level={4}>{title}</Typography.Title>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
