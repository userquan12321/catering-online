import { useState } from 'react'
import { CloseOutlined, WechatOutlined } from '@ant-design/icons'
import { Badge, Button, FloatButton } from 'antd'

import CatererDetailBody from '@/components/CatererDetail/CatererDetailBody'
import CatererInfo from '@/components/CatererDetail/CatererInfo'
import MessageDetail from '@/components/Messages/MessageDetail'

const CatererDetailPage = () => {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const handleToggle = () => {
    setIsCardVisible((openChat) => !openChat)
    setSelectedMenuItem(3)
  }
  console.log('selectedMenuItem', selectedMenuItem)

  return (
    <>
      <CatererInfo />
      <CatererDetailBody />
      <FloatButton
        icon={<WechatOutlined />}
        type="default"
        onClick={handleToggle}
      />
      {isCardVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 300,
            height: 400,
          }}
        >
          <Badge
            size="default"
            count={
              <Button
                onClick={handleToggle}
                shape="circle"
                icon={<CloseOutlined />}
              ></Button>
            }
          >
            <div
              style={{
                padding: '8px',
                borderRadius: '8px 0 0 8px',
                border: '1px solid lightgrey',
                background: 'white',
              }}
            >
              <MessageDetail receiverId={selectedMenuItem} />
            </div>
          </Badge>
        </div>
      )}
    </>
  )
}

export default CatererDetailPage
