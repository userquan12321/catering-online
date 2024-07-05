import { useGetProfileQuery } from '@/apis/profile.api'
import { USER_TYPE_ARRAY } from '@/constants/global.constant'
import { RootState } from '@/redux/store'
import { profileValidation } from '@/validations/profile.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row, message, Typography } from 'antd'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import classes from '@/styles/pages/profile.module.css'

const { Text } = Typography

const UpdateProfile = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { data: profile, isLoading, error } = useGetProfileQuery(userId)

  const [messageApi, contextHolder] = message.useMessage()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileValidation),
  })

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
      })
    }
  }, [profile, reset])

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return <p>Failed to load profile. Please try again later.</p>
  }

  if (!profile) {
    return null
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={16} className={classes.spacingRow}>
        <Col span={12}>
          <p>Email</p>
          <Text strong>{profile.email}</Text>
        </Col>

        <Col span={12}>
          <p>Type</p>
          <Text strong>{USER_TYPE_ARRAY[profile.type]}</Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First name"
            help={errors.firstName?.message}
            validateStatus={errors.firstName ? 'error' : ''}
          >
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Last name"
            help={errors.lastName?.message}
            validateStatus={errors.lastName ? 'error' : ''}
          >
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Phone number"
            help={errors.phoneNumber?.message}
            validateStatus={errors.phoneNumber ? 'error' : ''}
          >
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>

      <Form.Item label="Address">
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Update Profile
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )
}

export default UpdateProfile
