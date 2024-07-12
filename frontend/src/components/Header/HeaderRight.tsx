import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, Flex, Popover, Typography } from 'antd'

import { RootState } from '@/redux/store'

import PopoverContent from './PopoverContent'

import '@/styles/components/header.style.css'

const { Text } = Typography

const HeaderRight = () => {
  const firstName = useSelector((state: RootState) => state.auth.firstName)
  const [open, setOpen] = useState(false)

  if (firstName) {
    return (
      <Flex gap={8} align="center">
        <Text className="welcome-text">{`Welcome ${firstName}`}</Text>
        <Popover
          trigger="click"
          placement="bottomRight"
          content={<PopoverContent onClose={() => setOpen(false)} />}
          open={open}
          onOpenChange={setOpen}
        >
          <Avatar className="icon">{firstName[0].toUpperCase()}</Avatar>
        </Popover>
      </Flex>
    )
  }

  return (
    <Flex gap={8} align="center">
      <Link to="/login" className="primary-btn">
        Login
      </Link>
      <Link to="/register" className="secondary-btn">
        Register
      </Link>
    </Flex>
  )
}

export default HeaderRight
