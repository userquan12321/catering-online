import { useEffect } from 'react'
import '../styles/homepage.style.css'
import axios from 'axios'

const HomePage = () => {
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/v1/users')
  // }, [])

  return (
    <div className="test">
      <p>HomePage</p>
      <p>HomePage 2</p>
    </div>
  )
}

export default HomePage
