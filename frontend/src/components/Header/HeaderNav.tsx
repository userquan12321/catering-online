import { Menu } from 'antd'

import { MenuItem } from '@/types/menu.type'

const items: MenuItem[] = [
  {
    label: <a href="#service">Service</a>,
    key: 'service',
  },
  {
    label: <a href="#cuisines">Cuisines</a>,
    key: 'cuisines',
  },
  {
    label: <a href="#recent-events">Our Recent Events</a>,
    key: 'recent-events',
  },
  {
    label: <a href="#about-us">About Us</a>,
    key: 'about-us',
  },
]

const HeaderNav = () => {
  return <Menu className="header-nav" mode="horizontal" items={items} />
}

export default HeaderNav
