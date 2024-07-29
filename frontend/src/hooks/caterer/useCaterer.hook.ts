import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode, JwtPayload } from 'jwt-decode'

import { useGetCatererDetailQuery } from '@/apis/caterers.api'
import { RootState } from '@/redux/store'
import { parseToNumber } from '@/utils/parseToNumber'

type CustomJwtPayload = JwtPayload & { CatererId: string }

export const useCaterer = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const decodedToken = accessToken
    ? jwtDecode<CustomJwtPayload>(accessToken)
    : null

  const shouldSkip = decodedToken !== null && id === decodedToken.CatererId

  useEffect(() => {
    if (shouldSkip) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data, isLoading, isError } = useGetCatererDetailQuery(
    parseToNumber(id),
    {
      skip: !id || shouldSkip,
    },
  )

  return { data, isLoading, isError }
}
