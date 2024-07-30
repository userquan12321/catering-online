import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

type Props = {
  fullscreen?: boolean
}

const Loading = ({ fullscreen = true }: Props) => {
  return (
    <Spin
      indicator={<LoadingOutlined className="loading-icon" spin />}
      fullscreen={fullscreen}
    />
  )
}

export default Loading
