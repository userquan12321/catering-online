import { useParams } from 'react-router-dom'

import { useGetCatererDetailQuery } from '@/apis/caterers.api'
import { parseToNumber } from '@/utils/parseToNumber'

export const useCaterer = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useGetCatererDetailQuery(
    parseToNumber(id),
    {
      skip: !id,
    },
  )

  return { data, isLoading, isError }
}
