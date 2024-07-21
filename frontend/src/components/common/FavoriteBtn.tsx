import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'

import { RootState } from '@/redux/store'
import classes from '@/styles/components/caterers/card.module.css'

type Props = {
  catererId: number
}

const FavoriteBtn = memo(({ catererId }: Props) => {
  const userType = useSelector((state: RootState) => state.auth.userType)
  const navigate = useNavigate()

  const handleFavorite = () => {
    if (userType === null) {
      Modal.confirm({
        title: 'Login Required',
        content: 'You need to login to add this caterer to your favorite list.',
        onOk: () => navigate('/login'),
      })
      return
    }
  }

  return (
    <Button className={classes.favoriteBtn} onClick={handleFavorite}>
      <HeartOutlined />
    </Button>
  )
})

export default FavoriteBtn
