import { Avatar, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const MessageContent = () => {
  return (
    <>
      <div
        style={{ padding: '24px', borderTop: '1px solid rgba(5, 5, 5, 0.06)' }}
      >
        <div style={{ display: 'flex', gap: '5px' }}>
          <Avatar icon={<UserOutlined />} />
          <Card>
            <p>Card content</p>
          </Card>
        </div>
        <div
          style={{ display: 'flex', gap: '5px', flexDirection: 'row-reverse' }}
        >
          <Avatar icon={<UserOutlined />} />
          <Card>
            <p>Card content</p>
          </Card>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Avatar icon={<UserOutlined />} />
          <Card>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </>
  )
}

export default MessageContent
