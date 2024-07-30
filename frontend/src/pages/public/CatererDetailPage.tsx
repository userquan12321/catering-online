import { useState } from 'react'
import { useSelector } from 'react-redux'
import { WechatOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'

import CatererDetailBody from '@/components/CatererDetail/CatererDetailBody'
import CatererInfo from '@/components/CatererDetail/CatererInfo'
import PopupMessage from '@/components/CatererDetail/PopupMessage'
import { useLoginModal } from '@/hooks/auth/useLoginModal.hook'
import { RootState } from '@/redux/store'

const CatererDetailPage = () => {
  const [isCardVisible, setIsCardVisible] = useState(false)
  const userType = useSelector((state: RootState) => state.auth.userType)
  const showLoginModal = useLoginModal()

  const handleToggle = () => {
    if (userType === null) {
      showLoginModal()
      return
    }
    setIsCardVisible((openChat) => !openChat)
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
        <PopupMessage onClose={() => setIsCardVisible(false)} />
      )}
    </>
  )
}

export default CatererDetailPage
