import { Link } from 'react-router-dom'
import { Button, Image, Typography } from 'antd'

import { BANNER_URLS } from '@/constants/data/banners.constant'
import classes from '@/styles/components/home/intro.module.css'

const { Title, Paragraph } = Typography

const HeroIntro = () => {
  return (
    <section className="section">
      <div className="container">
        <Title className={classes.title}>
          Unforgettable Culinary Experiences with Premier Catering Services
        </Title>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          cumque doloremque, nisi eligendi dicta nostrum praesentium magni
          similique assumenda aut cum nam architecto, eveniet corrupti voluptate
          asperiores et, earum id.
        </Paragraph>
        <Button type="primary" size="large">
          <Link to="/caterers">Start planning!</Link>
        </Button>
        <div className="grid-3">
          {BANNER_URLS.map((item) => (
            <Image src={item} key={item} alt="Banner" height="100%" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroIntro
