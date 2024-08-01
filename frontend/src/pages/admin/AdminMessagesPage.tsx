import { useEffect, useRef, useState } from 'react'
import { SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, InputRef, Layout, Menu, theme } from 'antd'

import {
  useGetContactsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/apis/message.api'
import fallBackImg from '@/assets/images/fallback-image.png'
import Loading from '@/components/common/Loading'
import MessageDetail from '@/components/Messages/MessageDetail'
import classes from '@/styles/components/contacts.module.css'

const { Content, Sider } = Layout

const AdminMessagesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [inputMessage, setInputMessage] = useState('')

  const { data, isLoading } = useGetContactsQuery()
  const { data: messagesData, isLoading: loadingMessages } =
    useGetMessagesQuery(selectedUserId ?? 0, {
      skip: !selectedUserId,
    })
  const [sendMessage, { isLoading: isSendLoading }] = useSendMessageMutation()

  const inputRef = useRef<InputRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messagesData])

  const handleMessage = async () => {
    try {
      if (!selectedUserId) return
      await sendMessage({
        receiverId: selectedUserId,
        content: inputMessage,
      })
      setInputMessage('')
      inputRef.current?.focus()
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <Loading />

  if (!data) return null

  return (
    <Layout
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider
        style={{ background: colorBgContainer }}
        className={classes.sider}
        width={200}
      >
        <Menu
          mode="inline"
          items={data.map((item) => ({
            key: item.userId,
            icon: <Avatar src={item.image || fallBackImg} alt="avatar" />,
            label: item.firstName + ' ' + item.lastName,
          }))}
          onSelect={({ key }) => setSelectedUserId(+key)}
        />
      </Sider>
      <Content className="flex flex-col">
        <div
          className={[
            classes.messageBody,
            `${isLoading || !messagesData?.messages.length ? classes.messageLoading : ''}`,
            'flex-1',
          ].join(' ')}
          ref={scrollRef}
        >
          <MessageDetail data={messagesData} loading={loadingMessages} />
        </div>
        {selectedUserId && (
          <div className={classes.inputMessage}>
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  await handleMessage()
                }
              }}
            />
            <Button
              type="primary"
              onClick={handleMessage}
              disabled={isSendLoading}
              icon={<SendOutlined />}
            />
          </div>
        )}
      </Content>
    </Layout>
  )
}

export default AdminMessagesPage
