import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'

import { useGetCaterersQuery } from '@/apis/caterers.api'
import { useAddFavoriteMutation } from '@/apis/favorite.api'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { RootState } from '@/redux/store'
import classes from '@/styles/components/caterers/card.module.css'

type Props = {
  catererId: number
  isFavorite: boolean
  currentPage: number
}

const FavoriteBtn = memo(({ catererId, isFavorite, currentPage }: Props) => {
  const { refetch } = useGetCaterersQuery({
    page: currentPage,
  })
  const [addFavorite] = useAddFavoriteMutation()
  const userType = useSelector((state: RootState) => state.auth.userType)
  const navigate = useNavigate()

  const { contextHolder, handleAlert } = useAlert()

  const handleFavorite = async () => {
    if (userType === null) {
      Modal.confirm({
        title: 'Login Required',
        content: 'You need to login to add this caterer to your favorite list.',
        onOk: () => navigate('/login'),
      })
      return
    }
    try {
      const res = await addFavorite(catererId)
      handleAlert(res, refetch)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <>{contextHolder}</>
      <Button className={classes.favoriteBtn} onClick={handleFavorite}>
        {isFavorite ? (
          <HeartFilled className={classes.favoriteIcon} />
        ) : (
          <HeartOutlined />
        )}
      </Button>
    </>
  )
})

export default FavoriteBtn
