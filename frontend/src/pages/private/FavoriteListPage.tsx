import { useSearchParams } from 'react-router-dom'
import { Col, Empty, Pagination, Row } from 'antd'

import { useGetFavoriteListQuery } from '@/apis/favorite.api'
import CatererCard from '@/components/Caterers/CatererCard'
import { PAGE_SIZE } from '@/constants/global.constant'
import { useRefetch } from '@/hooks/globals/useRefetch.hook'

const FavoriteListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const getCurrentPage = () => {
    const page = searchParams.get('page')
    return page ? +page : 1
  }

  const { data, isLoading, refetch } = useGetFavoriteListQuery({
    page: getCurrentPage(),
  })

  useRefetch(() => refetch(), false)

  const handleChange = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return null
  }

  if (data.caterers.length === 0) {
    return <Empty className="empty-full" />
  }

  return (
    <div className="section container">
      <Row gutter={16}>
        {data.caterers.map((caterer) => (
          <Col key={caterer.id} span={6} className="mb-4 flex">
            <CatererCard data={caterer} currentPage={getCurrentPage()} />
          </Col>
        ))}
      </Row>
      {data?.caterers.length > 0 && (
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

export default FavoriteListPage
