import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row } from 'antd'

import { useChangePasswordMutation } from '@/apis/profile.api'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import classes from '@/styles/pages/profile.module.css'
import { ChangePasswordInput } from '@/types/profile.type'
import { changePasswordValidation } from '@/validations/change-password.validation'

const ChangePassword = () => {
  const { handleAlert, contextHolder } = useAlert()
  const [changePassword, { isLoading }] = useChangePasswordMutation()

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
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })

      handleAlert(res, reset)
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
        help={errors.newPassword?.message}
        validateStatus={errors.newPassword ? 'error' : ''}
      >
        <Controller
          name="newPassword"
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
