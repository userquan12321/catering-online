import { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, theme } from 'antd'

import { useGetContactsQuery } from '@/apis/message.api'
import MessageDetail from '@/components/Messages/MessageDetail'

const { Content, Sider } = Layout

const AdminMessagesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [selectedMenuItem, setSelectedMenuItem] = useState(null)

  const { data, isLoading } = useGetContactsQuery({})

  const handleMenuSelect = ({ key }: { key: any }) => {
    setSelectedMenuItem(key)
  }

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return null
  }

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
          items={data.map((item: any) => ({
            key: item.userId,
            icon: <Avatar src={<img src={item.image} alt="avatar" />} />,
            label: item.firstName + ' ' + item.lastName,
          }))}
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
