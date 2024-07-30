import { Card, Image, Skeleton } from 'antd'

import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'
import classes from '@/styles/components/home/cuisine.module.css'

const Cuisines = () => {
  const { data, isLoading } = useGetCuisinesQuery({ num: 3 })

  if (isLoading)
    return (
      <div className="container grid-3 section">
        {[...Array(3)].map((_, index) => (
          <Skeleton.Input
            key={index}
            active
            className={classes.skeletonCuisine}
          />
        ))}
      </div>
    )

  if (!data) {
    return null
  }

  return (
    <div id="cuisines" className="container grid-3 section">
      {data.map((item) => (
        <Card
          key={item.id}
          cover={
            <Image
              className="aspect-video"
              src={item.cuisineImage}
              alt="Banner"
              preview={false}
            />
          }
        >
          <Card.Meta title={item.cuisineName} description={item.description} />
        </Card>
      ))}
    </div>
  )
}

export default Cuisines
