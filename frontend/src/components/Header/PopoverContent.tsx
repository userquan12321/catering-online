import { useNavigate } from 'react-router-dom'
import { HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'

import { useLogoutMutation } from '@/apis/auth.api'

type Props = {
  onClose: () => void
}

type MenuItem = Required<MenuProps>['items'][number]

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

const PopoverContent = ({ onClose }: Props) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const onClick: MenuProps['onClick'] = async (e) => {
    onClose()

    if (e.key === '/logout') {
      try {
        await logout()
      } catch (error) {
        console.log(error)
      }
      return
    }
    navigate(e.key)
  }

  return <Menu onClick={onClick} mode="inline" items={items} />
}

export default PopoverContent
