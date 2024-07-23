import { SendOutlined } from '@ant-design/icons'
import { Avatar, Card, Empty, Input } from 'antd'

import { useGetContactsQuery, useGetMessagesQuery } from '@/apis/message.api'
// import MessageContent from './MessageContent'

interface MessageDetailProps {
  selectedItem: any // replace 'any' with the actual type of the menu item
}
const MessageDetail = ({ selectedItem }: MessageDetailProps) => {
  const { data: contacts, isLoading: contactLoading } = useGetContactsQuery({})
  const { data: messages, isLoading: messageLoading } = useGetMessagesQuery(
    +selectedItem,
    { skip: !selectedItem },
  )

  if (contactLoading || messageLoading) return <div>Loading...</div>

  if (!contacts || !messages) {
    return null
  }

  const getContact = contacts.find((item: any) => item.userId == selectedItem)

  if (!getContact) {
    return (
      <Empty
        style={{ height: 'calc(100vh - 200px)', alignContent: 'center' }}
      />
    )
  }

  // console.log('Message', messages)

  return (
    <div>
      {getContact !== null && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '10px',
            }}
          >
            <Avatar src={<img src={getContact.image} alt="avatar" />} />
            <p>{getContact.firstName + ' ' + getContact.lastName}</p>
          </div>
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid rgba(5, 5, 5, 0.06)',
            }}
          >
            <div style={{ display: 'flex', gap: '5px' }}>
              <Avatar src={<img src={getContact.image} alt="avatar" />} />
              <Card>
                {messages.map((message: any) => (
                  <p>{message.content}</p>
                ))}
              </Card>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'row-reverse',
              }}
            >
              <Card>
                <p>Card content</p>
              </Card>
            </div>
          </div>
          <Input addonAfter={<SendOutlined />} />
        </div>
      )}
    </div>
  )
}

export default MessageDetail
