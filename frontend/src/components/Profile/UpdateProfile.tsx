import { useGetProfileQuery } from '@/apis/profile.api'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const UpdateProfile = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { data, error, isLoading } = useGetProfileQuery(userId)

  console.log(data)
  return <div>UpdateProfile</div>
}

export default UpdateProfile
