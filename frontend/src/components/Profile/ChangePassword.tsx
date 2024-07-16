import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, message, Row } from 'antd'

import { useChangePasswordMutation } from '@/apis/profile.api'
import { RootState } from '@/redux/store'
import classes from '@/styles/pages/profile.module.css'
import { ChangePasswordInput } from '@/types/profile.type'
import { changePasswordValidation } from '@/validations/change-password'

const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const userId = useSelector((state: RootState) => state.auth.userId)

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordValidation),
  })

  const onSubmit = async (data: ChangePasswordInput) => {
    try {
      const res = await changePassword({
        id: userId,
        data: {
          oldPassword: data.oldPassword,
          password: data.password,
        },
      })

      if (res.error && 'data' in res.error) {
        messageApi.open({
          type: 'error',
          content: res.error.data as string,
        })
        return
      }

      messageApi.open({
        type: 'success',
        content: res.data as string,
      })

      reset()

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
      className={classes.changePasswordForm}
    >
      <Form.Item
        label="Current password"
        required
        help={errors.oldPassword?.message}
        validateStatus={errors.oldPassword ? 'error' : ''}
      >
        <Controller
          name="oldPassword"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="New password"
        required
        help={errors.password?.message}
        validateStatus={errors.password ? 'error' : ''}
      >
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        required
        help={errors.confirmPassword?.message}
        validateStatus={errors.confirmPassword ? 'error' : ''}
      >
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="default" htmlType="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Change Password
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )
}

export default ChangePassword
