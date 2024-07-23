import { Link } from 'react-router-dom'
import { Card, Image, Tag } from 'antd'

import fallBackImg from '@/assets/images/fallback-image.png'
import FavoriteBtn from '@/components/common/FavoriteBtn'
import { Caterer } from '@/types/caterer.type'

type Props = {
  data: Caterer
  currentPage: number
}

const CatererCard = ({ data, currentPage }: Props) => {
  return (
    <Link to={`/caterers/${data.id}`} className="flex relative">
      <Card
        hoverable
        cover={
          <Image
            src={data.image}
            alt={data.firstName}
            preview={false}
            fallback={fallBackImg}
          />
        }
      >
        <Card.Meta
          title={`${data.firstName} ${data.lastName}`}
          description={data.address}
        />
        {data.cuisineTypes.map((cuisine) => (
          <Tag key={cuisine} color="green" className="mt-4">
            {cuisine}
          </Tag>
        ))}
      </Card>

      <FavoriteBtn
        catererId={data.id}
        favoriteId={data.favoriteId}
        currentPage={currentPage}
      />
    </Link>
  )
}

export default CatererCard
