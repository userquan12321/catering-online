import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'

export const useLoginModal = () => {
  const navigate = useNavigate()

  const showLoginModal = () => {
    Modal.confirm({
      title: 'Login Required',
      content: 'You need to login first.',
      onOk: () => navigate('/login'),
      okText: 'Login',
    })
  }

  return showLoginModal
}
