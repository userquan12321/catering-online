import { Link } from 'react-router-dom'
import { GetProp, MenuProps } from 'antd'

type MenuItem = GetProp<MenuProps, 'items'>[number] & { title: string }

export const menuItems: MenuItem[] = [
  {
    key: '/admin/users/',
    label: <Link to="/admin/users/">List Users</Link>,
    title: 'List Users',
  },
  {
    key: '/admin/cuisine-types/',
    label: <Link to="/admin/cuisine-types/">Cuisine Types</Link>,
    title: 'Cuisine Types',
  },
  {
    key: '/admin/catering-items/',
    label: <Link to="/admin/catering-items/">Catering Items</Link>,
    title: 'Catering Items',
  },
  {
    key: '/admin/bookings/',
    label: <Link to="/admin/bookings/">Bookings</Link>,
    title: 'Bookings',
  },
  {
    key: '/admin/messages/',
    label: <Link to="/admin/messages/">Messages</Link>,
    title: 'Messages',
  },
]
