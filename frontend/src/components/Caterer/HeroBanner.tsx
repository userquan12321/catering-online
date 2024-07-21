import { Avatar, Image } from 'antd'

import fallBackImg from '@/assets/images/fallback-image.png'
import classes from '@/styles/components/caterer/banner.module.css'

const HeroBanner = () => {
  return (
    <div className="relative">
      <Image
        src="https://www.above-beyond.com/images/SSU.jpg"
        alt="Banner"
        className={classes.heroBanner}
        preview={false}
      />
      <Avatar
        src={fallBackImg}
        size={200}
        className={`shadow ${classes.avatar}`}
      />
    </div>
  )
}

export default HeroBanner
