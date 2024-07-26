import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CloseOutlined, WechatOutlined } from '@ant-design/icons'
import { Button, Empty, FloatButton } from 'antd'

import { useGetCatererDetailQuery } from '@/apis/caterers.api'
import CatererDetailBody from '@/components/CatererDetail/CatererDetailBody'
import CatererInfo from '@/components/CatererDetail/CatererInfo'
import MessageDetail from '@/components/Messages/MessageDetail'
import { useLoginModal } from '@/hooks/auth/useLoginModal.hook'
import { RootState } from '@/redux/store'
import { parseToNumber } from '@/utils/parseToNumber'

const CatererDetailPage = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetCatererDetailQuery(parseToNumber(id), {
    skip: !id,
  })
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const userType = useSelector((state: RootState) => state.auth.userType)
  const showLoginModal = useLoginModal()

  if (isLoading) return <div>Loading...</div>

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
