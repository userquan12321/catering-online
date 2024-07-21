import { useSearchParams } from 'react-router-dom'
import { Col, Empty, Pagination, Row } from 'antd'

import { useGetCaterersQuery } from '@/apis/caterers.api'
import { PAGE_SIZE } from '@/constants/global.constant'

import CatererCard from './CatererCard'

const CatererList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const getCurrentPage = () => {
    const page = searchParams.get('page')
    return page ? +page : 1
  }

  const { data, isLoading } = useGetCaterersQuery({
    page: getCurrentPage(),
  })

  const handleChange = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return <Empty />
  }

  return (
    <div className="section-no-bg">
      <Row gutter={16}>
        {data.caterers.map((caterer) => (
          <Col key={caterer.id} span={6} className="mb-4 flex">
            <CatererCard data={caterer} currentPage={getCurrentPage()} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={getCurrentPage()}
        pageSize={PAGE_SIZE}
        onChange={handleChange}
        total={data.total}
        showSizeChanger={false}
        className="pagination"
      />
    </div>
  )
}

export default CatererList
