import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LockOutlined } from '@ant-design/icons'
import { GetProp, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import Header from '@/components/Header/Header'
import { useAuthorized } from '@/hooks/auth/useAuthorized.hook'
import classes from '@/styles/layouts/admin-layout.module.css'

type MenuItem = GetProp<MenuProps, 'items'>[number] & { title: string }

const AdminLayout = () => {
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState(pathname)
  const isAuthorized = useAuthorized()
  const isAdmin = useAuthorized('admin')
  const isCaterer = useAuthorized('caterer')

  const menuItems: MenuItem[] = [
    {
      key: '/admin/users/',
      label: <Link to="/admin/users/">List Users</Link>,
      title: 'List Users',
      icon: isCaterer ? <LockOutlined /> : undefined,
      disabled: isCaterer,
      className: isCaterer ? 'pe-none' : '',
    },
    {
      key: '/admin/cuisine-types/',
      label: <Link to="/admin/cuisine-types/">Cuisine Types</Link>,
      title: 'Cuisine Types',
      icon: isCaterer ? <LockOutlined /> : undefined,
      disabled: isCaterer,
      className: isCaterer ? 'pe-none' : '',
    },
    {
      key: '/admin/catering-items/',
      label: <Link to="/admin/catering-items/">Catering Items</Link>,
      title: 'Catering Items',
    },
    {
      key: '/admin/bookings/',
      label: <Link to="/admin/bookings/">Bookings</Link>,
      title: 'Bookings',
    },
    {
      key: '/admin/messages/',
      label: <Link to="/admin/messages/">Messages</Link>,
      title: 'Messages',
      icon: isAdmin ? <LockOutlined /> : undefined,
      disabled: isAdmin,
      className: isAdmin ? 'pe-none' : '',
    },
  ]

  const title = menuItems.find((item) => item?.key === pathname)?.title

  if (!isAuthorized) {
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
