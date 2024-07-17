import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row, Typography } from 'antd'

import { useEditProfileMutation, useGetProfileQuery } from '@/apis/profile.api'
import { USER_TYPE_ARRAY } from '@/constants/global.constant'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { RootState } from '@/redux/store'
import classes from '@/styles/pages/profile.module.css'
import { profileValidation } from '@/validations/profile.validation'

import UploadWidget from '../common/UploadWidget'

const { Text } = Typography

const UpdateProfile = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)
  const { data: profile, isLoading, error } = useGetProfileQuery(userId)
  const [imageUrl, setImageUrl] = useState('')
  const { handleAlert, contextHolder } = useAlert()
  const [editProfile, { isLoading: isEditLoading }] = useEditProfileMutation()

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
      setImageUrl(profile.image)
    }
  }, [profile, reset])

  const onSubmit = async (data: any) => {
    try {
      const editRes = await editProfile({
        id: userId,
        data: {
          ...data,
          image: imageUrl,
        },
      })

      handleAlert(editRes)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading || isEditLoading) {
    return <p>Loading...</p>
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
          <div className={classes.spacingRow}>
            <p>Email</p>
            <Text strong>{profile.email}</Text>
          </div>

          <div className={classes.spacingRow}>
            <p>Type</p>
            <Text strong>{USER_TYPE_ARRAY[profile.type]}</Text>
          </div>

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

          <Form.Item label="Address">
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => <Input.TextArea {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <p className={classes.label}>Avatar (should be 200px x 200px)</p>
          <UploadWidget imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </Col>
      </Row>

      <Row justify="end" gutter={8}>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading || isEditLoading}
          >
            Update Profile
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )
}

export default UpdateProfile
