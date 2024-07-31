import { useSearchParams } from 'react-router-dom'
import { Col, Empty, Pagination, Row } from 'antd'

import { useGetCaterersQuery } from '@/apis/caterers.api'
import Loading from '@/components/common/Loading'
import { PAGE_SIZE } from '@/constants/global.constant'
import { useRefetch } from '@/hooks/globals/useRefetch.hook'

import CatererCard from './CatererCard'

const CatererList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const getCurrentPage = () => {
    const page = searchParams.get('page')
    return page ? +page : 1
  }

  const { data, isLoading, refetch } = useGetCaterersQuery({
    cuisineName: searchParams.get('cuisineName') ?? '',
    catererName: searchParams.get('catererName') ?? '',
    page: getCurrentPage(),
  })

  useRefetch(refetch, false)

  const handleChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Empty />
  }

  return (
    <div className="section">
      <Row gutter={16}>
        {data.caterers.map((caterer) => (
          <Col key={caterer.id} span={6} className="mb-4 flex">
            <CatererCard data={caterer} currentPage={getCurrentPage()} />
          </Col>
        ))}
      </Row>
      {data.total / PAGE_SIZE > 1 && (
        <Pagination
          current={getCurrentPage()}
          pageSize={PAGE_SIZE}
          onChange={handleChange}
          total={data.total}
          showSizeChanger={false}
          className="pagination"
        />
      )}
    </div>
  )
}

export default CatererList
