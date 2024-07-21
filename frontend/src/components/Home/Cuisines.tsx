import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'
import { Image, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Cuisines = () => {
  const { data, isLoading } = useGetCuisinesQuery({ num: 3 })

  if (isLoading) return <div>Loading...</div>

  if (!data) {
    return null
  }
  // console.log(data)

  return (
    <div id="cuisines">
      <div className="container">
        <div className="grid-3 section-no-bg">
          {data.map((item) => (
            <section key={item.id}>
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
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cuisines
