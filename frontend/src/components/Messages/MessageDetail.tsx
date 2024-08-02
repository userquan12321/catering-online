import { Fragment } from 'react/jsx-runtime'
import { DeleteOutlined } from '@ant-design/icons'
import { Empty, Modal } from 'antd'

import { useDeleteMessageMutation } from '@/apis/message.api'
import Loading from '@/components/common/Loading'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import classes from '@/styles/components/caterer/popup-message.module.css'
import { MessagesData } from '@/types/message.type'

interface MessageDetailProps {
  data: MessagesData | undefined
  loading: boolean
}
const MessageDetail = ({ data, loading }: MessageDetailProps) => {
  const { contextHolder, handleAlert } = useAlert()
  const [deleteMessage] = useDeleteMessageMutation()

  const handleDeleteMessage = (id: number) => {
    try {
      Modal.error({
        title: 'Delete Message',
        content: 'Are you sure you want to delete this message?',
        onOk: async () => {
          const res = await deleteMessage(id)
          handleAlert(res)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <Loading fullscreen={false} />

  if (!data?.messages.length) {
    return <Empty />
  }

  return (
    <Fragment>
      <>{contextHolder}</>
      {data.messages.map((message) => (
        <div
          className={`${classes.messageContainer} ${message.isSender ? 'flex-row-reverse' : ''}`}
          key={message.id}
        >
          <p
            className={[
              classes.messageItem,
              message.isSender ? classes.isSender : '',
            ].join(' ')}
          >
            {message.content}
          </p>
          {message.isSender && (
            <DeleteOutlined
              className={classes.deleteIcon}
              onClick={() => handleDeleteMessage(message.id)}
            />
          )}
        </div>
      ))}
    </Fragment>
  )
}

export default MessageDetail
