import React, { useState } from 'react'
import { Avatar, Layout, Menu, MenuProps, theme } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import MessageDetail from '@/components/Messages/MessageDetail'

const { Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation One',
  },
  {
    key: '2',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 2',
  },
  {
    key: '3',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 3',
  },
  {
    type: 'divider',
  },
  {
    key: '4',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 4',
  },
  {
    key: '5',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 5',
  },
  {
    key: '6',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 6',
  },
  {
    key: '7',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 7',
  },
  {
    key: '8',
    icon: <Avatar icon={<UserOutlined />} />,
    label: 'Navigation 8',
  },
]

const AdminMessagesPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuSelect = (items:any) => {
    setSelectedMenuItem(items.key);
  };

  return (
    <Layout
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider style={{ background: colorBgContainer }} width={200}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px',
            borderRight: '1px solid rgba(5, 5, 5, 0.06)',
            borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          }}
        >
          <Avatar icon={<UserOutlined />} />
          <p>Duy</p>
        </div>
        <Menu
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={items}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Content style={{ background: colorBgContainer }}>
        <MessageDetail selectedItem={selectedMenuItem}/>
      </Content>
    </Layout>
  )
}

export default AdminMessagesPage
