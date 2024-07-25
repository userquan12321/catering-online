import { useRef, useState } from 'react'
import { SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty, Input, InputRef, Space } from 'antd'

import { useGetMessagesQuery, useSendMessageMutation } from '@/apis/message.api'

interface MessageDetailProps {
  receiverId: any // replace 'any' with the actual type of the menu item
}
const MessageDetail = ({ receiverId }: MessageDetailProps) => {
  const inputRef = useRef<InputRef>(null)
  const { data, isLoading } = useGetMessagesQuery(+receiverId, {
    skip: !receiverId,
  })
  const [sendMessage, { isLoading: isSendLoading }] = useSendMessageMutation()
  const [inputMessage, setInputMessage] = useState('')

  if (isLoading || isSendLoading) return <div>Loading...</div>

  if (!data) {
    return (
      <Empty
        style={{ height: 'calc(100vh - 300px)', alignContent: 'center' }}
      />
    )
  }

  const handleMessage = () => {
    sendMessage({ receiverId: +receiverId, content: inputMessage })
    setInputMessage('')
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '10px',
        }}
      >
        <Avatar src={<img src={data.receiver.image} alt="avatar" />} />
        <p>{data.receiver.firstName + ' ' + data.receiver.lastName}</p>
      </div>
      <div
        style={{
          padding: '24px',
          borderTop: '1px solid rgba(5, 5, 5, 0.06)',
          overflowY: 'scroll',
          height: '300px',
          maxHeight: '300px',
        }}
      >
        {data.messages.map((message: any) =>
          message.isSender ? (
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexDirection: 'row-reverse',
              }}
              key={message.id}
            >
              <p
                style={{
                  padding: '8px',
                  borderRadius: '8px 0 0 8px',
                  border: '1px solid rgba(5, 5, 5, 0.06)',
                }}
              >
                {message.content}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '5px',
              }}
              key={message.id}
            >
              <Avatar src={<img src={data.receiver.image} alt="avatar" />} />
              <p
                style={{
                  padding: '8px',
                  borderRadius: '8px 0 0 8px',
                  border: '1px solid rgba(5, 5, 5, 0.06)',
                }}
              >
                {message.content}
              </p>
            </div>
          ),
        )}
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessage()
              e.preventDefault()
              inputRef.current?.focus()
            }
          }}
        />
        <Button
          type="primary"
          onClick={handleMessage}
          icon={<SendOutlined />}
        />
      </Space.Compact>
    </div>
  )
}

export default MessageDetail
