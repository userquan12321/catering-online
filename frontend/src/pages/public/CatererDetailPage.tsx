import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CloseOutlined, WechatOutlined } from '@ant-design/icons'
import { Button, Empty, FloatButton, Modal } from 'antd'

import { useGetCatererDetailQuery } from '@/apis/caterers.api'
import CatererDetailBody from '@/components/CatererDetail/CatererDetailBody'
import CatererInfo from '@/components/CatererDetail/CatererInfo'
import MessageDetail from '@/components/Messages/MessageDetail'
import { RootState } from '@/redux/store'
import { parseToNumber } from '@/utils/parseToNumber'

const CatererDetailPage = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetCatererDetailQuery(parseToNumber(id), {
    skip: !id,
  })
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0)
  const userType = useSelector((state: RootState) => state.auth.userType)
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return (
      <Empty
        style={{ height: 'calc(100vh - 300px)', alignContent: 'center' }}
      />
    )
  }

  const handleToggle = () => {
    if (userType === null) {
      Modal.confirm({
        title: 'Login Required',
        content: 'You need to login to add this caterer to your favorite list.',
        onOk: () => navigate('/login'),
        okText: 'Login',
      })
      return
    } else {
      setIsCardVisible((openChat) => !openChat)
      setSelectedMenuItem(data.caterer.userId)
    }
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
            bottom: 50,
            right: 100,
            width: 350,
            height: 400,
          }}
        >
            <Button
              onClick={handleToggle}
              icon={<CloseOutlined />}
              style={{
                border: 'none',
                position: 'absolute',
                right: 3,
                top: 10,
              }}
            ></Button>
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
