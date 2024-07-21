import CatererList from '@/components/Caterers/CatererList'
import FilterBar from '@/components/Caterers/FilterBar'

const CaterersPage = () => {
  return (
    <div className="container">
      <FilterBar />
      <CatererList />
    </div>
  )
}

export default CaterersPage
