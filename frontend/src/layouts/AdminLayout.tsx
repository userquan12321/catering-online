import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import Header from '@/components/Header/Header'
import { menuItems } from '@/constants/admin.constant'
import classes from '@/styles/layouts/admin-layout.module.css'

const AdminLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider width={200}>
          <Menu theme="dark" defaultSelectedKeys={[menuItems[0].link]}>
            {menuItems.map((item) => (
              <Menu.Item key={item.link} className={classes.menuItem}>
                <Link to={item.link}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className={classes.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
