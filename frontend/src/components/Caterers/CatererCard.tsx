import { Link } from 'react-router-dom'
import { Image, Tag, Typography } from 'antd'

import fallBackImg from '@/assets/images/fallback-image.png'
import FavoriteBtn from '@/components/common/FavoriteBtn'
import classes from '@/styles/components/caterers/card.module.css'
import { Caterer } from '@/types/caterer.type'

type Props = {
  data: Caterer
  currentPage: number
}

const CatererCard = ({ data, currentPage }: Props) => {
  return (
    <div className="shadow relative flex-1">
      <Image
        src={data.image}
        alt={data.firstName}
        preview={false}
        fallback={fallBackImg}
        className="w-full aspect-video shadow-sm"
      />
      <FavoriteBtn
        catererId={data.id}
        isFavorite={data.isFavorite}
        currentPage={currentPage}
      />

      <Link to={`/caterers/${data.id}`} className={classes.catererCardBody}>
        <Typography.Title level={5}>
          {`${data.firstName} ${data.lastName}`}
        </Typography.Title>
        <Typography.Paragraph>{data.address}</Typography.Paragraph>
        {data.cuisineTypes.map((cuisine) => (
          <Tag key={cuisine} color="green" className="mb-2">
            {cuisine}
          </Tag>
        ))}
      </Link>
    </div>
  )
}

export default CatererCard
