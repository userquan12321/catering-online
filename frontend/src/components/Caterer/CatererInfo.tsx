import { useParams } from 'react-router-dom'
import { Avatar, Image } from 'antd'

import { useGetCatererDetailQuery } from '@/apis/caterers.api'
import fallBackImg from '@/assets/images/fallback-image.png'
import classes from '@/styles/components/caterer/banner.module.css'
import { parseToNumber } from '@/utils/parseToNumber'

const CatererInfo = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetCatererDetailQuery(parseToNumber(id), {
    skip: !id,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

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

export default CatererInfo
