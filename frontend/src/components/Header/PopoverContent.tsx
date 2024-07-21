import { useNavigate } from 'react-router-dom'
import {
  AppstoreOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'

import { useAuthorized } from '@/hooks/globals/useAuthorized.hook'
import { logout } from '@/redux/slices/auth.slice'
import { useAppDispatch } from '@/redux/store'
import { MenuItem } from '@/types/menu.type'

type Props = {
  onClose: () => void
}

const items: MenuItem[] = [
  {
    label: 'Profile',
    key: '/profile',
    icon: <UserOutlined />,
  },
  {
    label: 'Favorite List',
    key: '/favorite-list',
    icon: <HeartOutlined />,
  },
  {
    label: 'Logout',
    key: '/logout',
    danger: true,
    icon: <LogoutOutlined />,
  },
]

const authorizedItem: MenuItem = {
  label: 'Management',
  key: '/admin',
  icon: <AppstoreOutlined />,
}

const PopoverContent = ({ onClose }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthorized = useAuthorized()

  const onClick: MenuProps['onClick'] = (e) => {
    onClose()

    if (e.key === '/logout') {
      try {
        dispatch(logout())
      } catch (error) {
        console.log(error)
      }
      return
    }
    navigate(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      items={isAuthorized ? [authorizedItem, ...items] : items}
    />
  )
}

export default PopoverContent
