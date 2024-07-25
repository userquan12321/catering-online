import { useParams } from 'react-router-dom'
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  StarFilled,
} from '@ant-design/icons'
import { Avatar, Empty, Image, Typography } from 'antd'

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

  if (!data) {
    return <Empty />
  }

  return (
    <>
      <Image
        src="https://www.above-beyond.com/images/SSU.jpg"
        alt="Banner"
        className={classes.heroBanner}
        preview={false}
      />
      <div className={[classes.infoContainer, 'container'].join(' ')}>
        <div className="flex flex-col items-center gap-4">
          <Avatar
            src={data.caterer.image || fallBackImg}
            size={150}
            className="shadow"
          />
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <StarFilled key={index} className={classes.rating} />
            ))}
          </div>
        </div>
        <div className={classes.info}>
          <Typography.Title
            level={3}
          >{`${data.caterer.firstName} ${data.caterer.lastName}`}</Typography.Title>
          <div className="flex gap-2">
            <PhoneOutlined />
            <p>{data.caterer.phoneNumber}</p>
          </div>
          <div className="flex gap-2">
            <MailOutlined />
            <a href={`mailto:${data.caterer.email}`}>{data.caterer.email}</a>
          </div>
          {data.caterer.address && (
            <div className="flex gap-2">
              <HomeOutlined />
              <p>{data.caterer.address}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CatererInfo