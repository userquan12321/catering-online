import { Button, Image, Typography } from 'antd'

import classes from '@/styles/components/home/intro.module.css'

const { Title, Paragraph } = Typography

const BANNER_URLS = [
  'https://c1.wallpaperflare.com/preview/43/130/490/buffet-dining-dinner-lunch.jpg',
  'https://t4.ftcdn.net/jpg/02/75/39/31/360_F_275393147_SA3KtHDTUMoEn6hBbhNiTPeO92gHYgyr.jpg',
  'https://media.istockphoto.com/id/1054862736/photo/waiter-carrying-plates-with-meat-dish.jpg?s=612x612&w=0&k=20&c=sAPvulfoGCwWvH26kd3dh7WtfMSnYdEB2eqNu3hSMt4=',
]

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
          BOOKING NOW!
        </Button>
        <div className={classes.bannerContainer}>
          {BANNER_URLS.map((item) => (
            <Image src={item} key={item} alt="Banner" height="100%" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroIntro
