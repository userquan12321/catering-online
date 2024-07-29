import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CloseOutlined, WechatOutlined } from '@ant-design/icons'
import { Button, Empty, FloatButton } from 'antd'

import CatererDetailBody from '@/components/CatererDetail/CatererDetailBody'
import CatererInfo from '@/components/CatererDetail/CatererInfo'
import Loading from '@/components/common/Loading'
import MessageDetail from '@/components/Messages/MessageDetail'
import { useLoginModal } from '@/hooks/auth/useLoginModal.hook'
import { useCaterer } from '@/hooks/caterer/useCaterer.hook'
import { RootState } from '@/redux/store'

const CatererDetailPage = () => {
  const { data, isLoading } = useCaterer()
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const userType = useSelector((state: RootState) => state.auth.userType)
  const showLoginModal = useLoginModal()

  if (isLoading) return <Loading />

  if (!data) {
    return <Empty className="empty-full" />
  }

  const handleToggle = () => {
    if (userType === null) {
      showLoginModal()
      return
    }
    setIsCardVisible((openChat) => !openChat)
    setSelectedMenuItem(data.caterer.userId)
  }

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
            right: 100,
            width: 350,
          }}
        >
          <Button
            onClick={() => setIsCardVisible(false)}
            icon={<CloseOutlined />}
            style={{
              border: 'none',
              position: 'absolute',
              right: 3,
              top: 10,
            }}
          />
          <div
            style={{
              padding: '0 8px 8px 8px',
              borderRadius: '8px',
              border: '1px solid lightgrey',
              background: 'white',
            }}
          >
            <MessageDetail receiverId={selectedMenuItem} />
          </div>
        </div>
      )}
    </>
  )
}

export default CatererDetailPage
