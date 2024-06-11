import classes from '@/styles/pages/register.module.css'
import { loginValidation } from '@/validations/login.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Form, Input, Row, Typography, message } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const { Title } = Typography

type FormInput = {
  email: string
  password: string
}

const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: yupResolver(loginValidation),
  })

  const onSubmit = (data: FormInput) => {
    messageApi.open({
      type: 'success',
      content: 'Login success!',
    })
    console.log(data)
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
              <Button type="primary" htmlType="submit">
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
