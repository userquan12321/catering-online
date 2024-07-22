import { SendOutlined,UserOutlined } from '@ant-design/icons'
import { Avatar, Input } from 'antd'

import MessageContent from './MessageContent'

interface MessageDetailProps {
  selectedItem: any // replace 'any' with the actual type of the menu item
}
const MessageDetail = ({ selectedItem }: MessageDetailProps) => {
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
      <MessageContent />
      <Input addonAfter={<SendOutlined />} />
    </>
  )
}

export default MessageDetail
