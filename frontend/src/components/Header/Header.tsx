import { Link } from 'react-router-dom'
import { Layout } from 'antd'

import HeaderNav from './HeaderNav'
import HeaderRight from './HeaderRight'

import '@/styles/components/header.style.css'

const Header = () => {
  return (
    <Layout.Header id="header">
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
