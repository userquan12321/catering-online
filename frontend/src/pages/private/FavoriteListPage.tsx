import { useSearchParams } from 'react-router-dom'
import { Col, Pagination, Row } from 'antd'

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

  const { data, isLoading, refetch } = useGetFavoriteListQuery(getCurrentPage())
  console.log(data);

  useRefetch(() => refetch(), false as any)

  const handleChange = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return null
  }

  return (
    <div className="section-no-bg">
      <Row gutter={16}>
        {data.map((caterer) => (
          <Col key={caterer.id} span={6} className="mb-4 flex">
            <CatererCard data={caterer} currentPage={getCurrentPage()} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={getCurrentPage()}
        pageSize={PAGE_SIZE}
        onChange={handleChange}
        // total={data.total}
        showSizeChanger={false}
        className="pagination"
      />
    </div>
  )
}

export default FavoriteListPage
