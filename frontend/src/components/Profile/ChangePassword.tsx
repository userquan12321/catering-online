import { changePasswordValidation } from '@/validations/change-password'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import classes from '@/styles/pages/profile.module.css'
import { ChangePasswordInput } from '@/types/profile.type'
import { useChangePasswordMutation } from '@/apis/profile.api'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
      }

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
