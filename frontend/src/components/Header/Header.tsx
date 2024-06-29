import '@/styles/components/header.style.css'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import HeaderRight from './HeaderRight'
import HeaderNav from './HeaderNav'

const Header = () => {
  return (
    <Layout.Header>
      <nav id="navbar">
        <Link to="/" className="logo">
          Catering
        </Link>
        <HeaderNav />
        <HeaderRight />
      </nav>
    </Layout.Header>
  )
}

export default Header
