import { memo, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'

import { useGetCaterersQuery } from '@/apis/caterers.api'
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/apis/favorite.api'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { RootState } from '@/redux/store'
import classes from '@/styles/components/caterers/card.module.css'

type Props = {
  catererId: number
  favoriteId: number
  currentPage: number
}

const FavoriteBtn = memo(({ catererId, favoriteId, currentPage }: Props) => {
  const { refetch } = useGetCaterersQuery({
    page: currentPage,
  })
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const userType = useSelector((state: RootState) => state.auth.userType)
  const navigate = useNavigate()

  const { contextHolder, handleAlert } = useAlert()

  const handleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (userType === null) {
      Modal.confirm({
        title: 'Login Required',
        content: 'You need to login to add this caterer to your favorite list.',
        onOk: () => navigate('/login'),
        okText: 'Login',
      })
      return
    }
    try {
      let res
      if (favoriteId > 0) {
        res = await deleteFavorite(favoriteId)
      } else {
        res = await addFavorite(catererId)
      }
      handleAlert(res, refetch)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <>{contextHolder}</>
      <Button className={classes.favoriteBtn} onClick={handleFavorite}>
        {favoriteId > 0 ? (
          <HeartFilled className={classes.favoriteIcon} />
        ) : (
          <HeartOutlined />
        )}
      </Button>
    </>
  )
})

export default FavoriteBtn
