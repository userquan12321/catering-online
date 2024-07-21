import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

export const useRefetch = (refetch: () => void, skipAccessToken = true) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const accessTokenRef = useRef(localStorage.getItem('accessToken'))

  useEffect(() => {
    const prevToken = accessTokenRef.current
    accessTokenRef.current = accessToken

    if (!accessToken && skipAccessToken) {
      return
    }

    if (prevToken !== accessTokenRef.current) {
      refetch()
    }
  }, [refetch, accessToken, skipAccessToken])
}
