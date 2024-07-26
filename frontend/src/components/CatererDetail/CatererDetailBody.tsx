import BookingSummary from './BookingSummary'
import CateringTab from './CateringTab'

const CatererDetailBody = () => {
  return (
    <div className="container section flex gap-8">
      <CateringTab />
      <BookingSummary />
    </div>
  )
}

export default CatererDetailBody
