import { Fragment } from 'react/jsx-runtime'
import { Empty } from 'antd'

import Loading from '@/components/common/Loading'
import classes from '@/styles/components/caterer/popup-message.module.css'
import { MessagesData } from '@/types/message.type'

interface MessageDetailProps {
  data: MessagesData | undefined
  loading: boolean
}
const MessageDetail = ({ data, loading }: MessageDetailProps) => {
  if (loading) return <Loading fullscreen={false} />

  if (!data?.messages.length) {
    return <Empty />
  }

  return (
    <Fragment>
      {data.messages.map((message) => (
        <div
          className={`flex ${message.isSender ? 'flex-row-reverse' : ''}`}
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
        </div>
      ))}
    </Fragment>
  )
}

export default MessageDetail
