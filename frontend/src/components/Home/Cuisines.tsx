import { Image, Typography } from 'antd'

import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'

const { Title, Paragraph } = Typography

const Cuisines = () => {
  const { data, isLoading } = useGetCuisinesQuery({ num: 3 })

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return null
  }

  return (
    <div id="cuisines" className="container">
      <div className="grid-3 section-no-bg">
        {data.map((item) => (
          <div key={item.id}>
            <Image
              className="aspect-video"
              src={item.cuisineImage}
              alt="Banner"
              preview={false}
            />
            <Title style={{ marginTop: '0.5em' }} level={5}>
              {item.cuisineName}
            </Title>
            <Paragraph>{item.description}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cuisines
