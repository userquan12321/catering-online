import { Typography } from 'antd'

import { EVENTS } from '@/constants/data/events.constant'

const { Title, Paragraph } = Typography

const Events = () => {
  return (
    <div className="container">
      <div className="grid-3 section-no-bg">
        {EVENTS.map((item) => (
          <section key={item.id}>
            <Title level={5}>{item.title}</Title>
            <Paragraph>{item.description}</Paragraph>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Events