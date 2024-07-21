import { Link, useLocation } from 'react-router-dom'
import { Layout } from 'antd'

import HeaderNav from './HeaderNav'
import HeaderRight from './HeaderRight'

import '@/styles/components/header.style.css'

type Props = {
  isAdmin?: boolean
}

const Header = ({ isAdmin }: Props) => {
  const { pathname } = useLocation()

  return (
    <Layout.Header id="header">
      <nav id="navbar">
        <Link to="/" className="logo">
          Catering
        </Link>
        {!isAdmin && pathname === '/' && <HeaderNav />}
        <HeaderRight />
      </nav>
    </Layout.Header>
  )
}

export default Header
