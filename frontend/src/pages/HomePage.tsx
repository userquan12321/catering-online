import { useSelector } from 'react-redux'
import '../styles/homepage.style.css'
import type { RootState } from '@/redux/store'

const HomePage = () => {
  const userType = useSelector((state: RootState) => state.auth.userType)

  console.log(userType, 'userType')

  return (
    <div className="test">
      <p>HomePage</p>
      <p>HomePage 2</p>
    </div>
  )
}

export default HomePage
