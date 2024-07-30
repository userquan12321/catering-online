import { useEffect, useRef, useState } from 'react'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, InputRef, Skeleton } from 'antd'

import { useGetMessagesQuery, useSendMessageMutation } from '@/apis/message.api'
import MessageDetail from '@/components/Messages/MessageDetail'
import { useCaterer } from '@/hooks/caterer/useCaterer.hook'
import classes from '@/styles/components/caterer/popup-message.module.css'

type Props = {
  onClose: () => void
}

const PopupMessage = ({ onClose }: Props) => {
  const { data } = useCaterer()
  const { data: messagesData, isLoading } = useGetMessagesQuery(
    data ? data.caterer.userId : 0,
    {
      skip: !data?.caterer.userId,
    },
  )
  const [sendMessage, { isLoading: isSendLoading }] = useSendMessageMutation()

  const inputRef = useRef<InputRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messagesData])

  const [inputMessage, setInputMessage] = useState('')

  const handleMessage = async () => {
    try {
      if (!data) return
      await sendMessage({
        receiverId: data.caterer.userId,
        content: inputMessage,
      })
      setInputMessage('')
      inputRef.current?.focus()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.popupMessage}>
      <div className={classes.popupMessageHeader}>
        {messagesData ? (
          <div className={classes.catererInfo}>
            <Avatar
              src={<img src={messagesData.receiver.image} alt="avatar" />}
            />
            <p>
              {`${messagesData.receiver.firstName} ${messagesData.receiver.lastName}`}
            </p>
          </div>
        ) : (
          <div className={classes.catererInfo}>
            <Skeleton.Avatar active />
            <Skeleton.Button
              active
              size="small"
              className={classes.skeletonName}
            />
          </div>
        )}
        <Button
          onClick={onClose}
          icon={<CloseOutlined />}
          className={classes.closeButton}
        />
      </div>
      <div
        className={[
          classes.popupMessageBody,
          `${isLoading || !messagesData?.messages.length ? classes.messageLoading : ''}`,
        ].join(' ')}
        ref={scrollRef}
      >
        <MessageDetail data={messagesData} loading={isLoading} />
      </div>
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
    </div>
  )
}

export default PopupMessage
