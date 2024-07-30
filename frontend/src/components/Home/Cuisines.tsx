import { Card, Image } from 'antd'

import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'

const Cuisines = () => {
  const { data, isLoading } = useGetCuisinesQuery({ num: 3 })

  if (isLoading) return <p>Loading...</p>

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
