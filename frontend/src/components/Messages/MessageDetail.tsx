import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Input } from 'antd'

// import MessageContent from './MessageContent'

interface MessageDetailProps {
  selectedItem: any // replace 'any' with the actual type of the menu item
}
const MessageDetail = ({ selectedItem }: MessageDetailProps) => {
  console.log(selectedItem)

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '10px',
        }}
      >
        <Avatar icon={<UserOutlined />} />
        <p>{selectedItem}</p>
      </div>
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
      <Input addonAfter={<SendOutlined />} />
    </>
  )
}

export default MessageDetail
