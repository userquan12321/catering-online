import { RootState } from '@/redux/store'
import '@/styles/components/header.style.css'
import { Avatar, Flex, Layout } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const firstName = useSelector((state: RootState) => state.auth.firstName)

  return (
    <Layout.Header>
      <nav id="navbar">
        <h3>Catering</h3>
        {firstName ? (
          <Avatar className="icon">{firstName[0].toUpperCase()}</Avatar>
        ) : (
          <Flex gap={8} align="center">
            <Link to="/login" className="primary-btn">
              Login
            </Link>
            <Link to="/register" className="secondary-btn">
              Register
            </Link>
          </Flex>
        )}
      </nav>
    </Layout.Header>
  )
}

export default Header
