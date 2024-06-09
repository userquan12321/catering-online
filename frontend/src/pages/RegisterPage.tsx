import { registerValidation } from '@/validations/register.validation'
import { Button, Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const RegisterPage = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(registerValidation),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Username">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Password">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterPage
