import { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, MenuProps, theme } from 'antd'

import { useGetContactsQuery } from '@/apis/message.api'
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
]

const AdminMessagesPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [selectedMenuItem, setSelectedMenuItem] = useState(null)

  const handleMenuSelect = (items: any) => {
    setSelectedMenuItem(items.key)
  }

  const { data, isLoading} = useGetContactsQuery({})

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return null
  }
  console.log(data);

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
        <MessageDetail selectedItem={selectedMenuItem} />
      </Content>
    </Layout>
  )
}

export default AdminMessagesPage
