import { useLoginMutation } from '@/apis/auth.api'
import { USER_TYPE } from '@/constants/global.constant'
import classes from '@/styles/pages/register.module.css'
import { LoginBody } from '@/types/auth.type'
import { loginValidation } from '@/validations/login.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row, Typography, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginBody>({
    resolver: yupResolver(loginValidation),
  })

  const onSubmit = async (data: LoginBody) => {
    try {
      const loginRes = await login({
        email: data.email,
        password: data.password,
      })

      if (loginRes.error && 'data' in loginRes.error) {
        messageApi.open({
          type: 'error',
          content: loginRes.error.data as string,
        })
      }

      if (loginRes.data) {
        if (loginRes.data.userType === USER_TYPE.CUSTOMER) {
          navigate('/')
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Title level={3} className={classes.registerTitle}>
        Login
      </Title>

      <Form.Item
        required
        label="Email"
        help={errors.email?.message}
        validateStatus={errors.email ? 'error' : ''}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        required
        label="Password"
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

      <Row justify="space-between">
        <Col>
          <Link to="/register">Not have account yet? Register now!</Link>
        </Col>
        <Col>
          <Row justify="end" gutter={8}>
            <Col>
              <Button type="default" htmlType="reset" onClick={() => reset()}>
                Reset
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Login
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )
}

export default LoginPage
