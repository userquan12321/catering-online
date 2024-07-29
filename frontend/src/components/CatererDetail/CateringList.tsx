import { useSelector } from 'react-redux'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Card, Empty, Image } from 'antd'

import fallBackImg from '@/assets/images/fallback-image.png'
import { addItem, removeItem } from '@/redux/slices/booking.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import classes from '@/styles/components/caterer/catering-card.module.css'
import { CateringGroup } from '@/types/caterer.type'

type Props = {
  data: CateringGroup | undefined
}

const CateringList = ({ data }: Props) => {
  const dispatch = useAppDispatch()

  const bookingItemList = useSelector(
    (state: RootState) => state.booking.bookingItemList,
  )

  if (!data) {
    return <Empty style={{ padding: '2rem 0', background: 'white' }} />
  }

  return (
    <div id="catering-list" className={classes.cateringList}>
      {data.items.map((item) => (
        <Card
          key={item.id}
          className={classes.cateringCard}
          hoverable
          cover={
            <Image
              className="aspect-hd object-cover h-full"
              src={item.image || fallBackImg}
              alt={item.name}
            />
          }
        >
          <Card.Meta title={item.name} description={item.description} />

          <div className={classes.cateringCardFooter}>
            <p>{`Price: ${item.price.toFixed(2)}$ (${item.servesCount} pax)`}</p>
            <div className={classes.quantitySelector}>
              <MinusOutlined
                onClick={() =>
                  dispatch(
                    removeItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    }),
                  )
                }
                className="p-2"
              />
              {bookingItemList.find((bookingItem) => bookingItem.id === item.id)
                ?.quantity ?? 0}
              <PlusOutlined
                onClick={() =>
                  dispatch(
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    }),
                  )
                }
                className="p-2"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default CateringList
