import { useLoginMutation, useRegisterMutation } from '@/apis/auth/users.api'
import { USER_TYPE } from '@/constants/global.constant'
import classes from '@/styles/pages/register.module.css'
import { registerValidation } from '@/validations/register.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
} from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

type FormInput = {
  firstName: string
  lastName?: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  type: number
  address?: string
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [register, { isLoading }] = useRegisterMutation()
  const [login] = useLoginMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: yupResolver(registerValidation),
  })

  const onSubmit = async (data: FormInput) => {
    try {
      const res = await register({
        type: data.type,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName ?? '',
        phoneNumber: data.phoneNumber,
        address: data.address ?? '',
      })
      if (res.error) {
        messageApi.open({
          type: 'error',
          content: res.error as string,
        })
        return
      }

      messageApi.open({
        type: 'success',
        content: res.data,
      })

      const loginRes = await login({
        email: data.email,
        password: data.password,
      })

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
        Register
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            required
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="You are: ">
            <Controller
              name="type"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 0, label: 'Customer' },
                    { value: 1, label: 'Caterer' },
                  ]}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            required
            label="Confirm password"
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
        </Col>
      </Row>

      <Form.Item label="Address">
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <Row justify="space-between">
        <Col>
          <Link to="/login">Already have account? Login</Link>
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
                Register
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )
}

export default RegisterPage
