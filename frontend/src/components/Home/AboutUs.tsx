import { Flex, Typography } from 'antd'

import { aboutUsData } from '@/constants/data/about-us.constant'
import classes from '@/styles/components/home/about-us.module.css'

const { Title, Paragraph, Text } = Typography

const AboutUs = () => {
  return (
    <section className="section" id="about-us">
      <div className="container">
        <Title level={3}>About Us</Title>
        <Flex justify="space-between" gap={50}>
          <Paragraph>
            We create unforgettable dining experiences for any occasion with
            diverse menus tailored to your tastes. Our chefs use the finest
            ingredients to blend traditional and contemporary flavors, offering
            everything from elegant hors d'oeuvres to sumptuous main courses and
            decadent desserts. With outstanding service from our professional
            staff, you can relax and enjoy your event. Whether you crave Turkish
            cuisine, Italian elegance, or innovative fusion dishes, we have you
            covered.
          </Paragraph>
          <div className={classes.achievements}>
            {aboutUsData.map((item) => (
              <div className={classes.achievement} key={item.id}>
                <img
                  className={classes.icon}
                  src={item.icon}
                  alt={item.label}
                />
                <div>
                  <Text strong className={classes.achievementValue}>
                    {item.value}
                  </Text>
                  <Text>{item.label}</Text>
                </div>
              </div>
            ))}
          </div>
        </Flex>
      </div>
    </section>
  )
}

export default AboutUs
