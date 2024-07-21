import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

export const useAuthorized = (role?: 'caterer' | 'admin') => {
  const userType = useSelector((state: RootState) => state.auth.userType)

  switch (role) {
    case 'admin':
      return userType === 2
    case 'caterer':
      return userType === 1
    default:
      return userType !== null && userType !== 0
  }
}
