import { Menu } from 'antd'

import { MenuItem } from '@/types/menu.type'

const items: MenuItem[] = [
  {
    label: 'Service',
    key: 'service',
  },
  {
    label: 'Cuisines',
    key: 'cuisines',
  },
  {
    label: 'Our Recent Events',
    key: 'recent-events',
  },
  {
    label: 'About Us',
    key: 'about-us',
  },
]

const HeaderNav = () => {
  return <Menu className="header-nav" mode="horizontal" items={items} />
}

export default HeaderNav
