import { Tabs, TabsProps } from 'antd'

import ChangePassword from '@/components/Profile/ChangePassword'
import UpdateProfile from '@/components/Profile/UpdateProfile'
import classes from '@/styles/layouts/profile-layout.module.css'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Update Profile',
    children: <UpdateProfile />,
  },
  {
    key: '2',
    label: 'Change Password',
    children: <ChangePassword />,
  },
]

const ProfilePage = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      tabPosition="left"
      className={classes.profileTabs}
    />
  )
}

export default ProfilePage
