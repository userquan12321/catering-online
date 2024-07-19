import { Flex, Typography } from 'antd'

const { Title, Paragraph } = Typography

const AboutUs = () => {
  return (
    <section className="section">
      <div className="container">
        <Title level={4}>About Us</Title>
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
          <div></div>
        </Flex>
      </div>
    </section>
  )
}

export default AboutUs
