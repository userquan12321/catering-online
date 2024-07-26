import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd'
import dayjs from 'dayjs'

import { PAYMENT_METHODS } from '@/constants/booking.constant'
import { useLoginModal } from '@/hooks/auth/useLoginModal.hook'
import { RootState } from '@/redux/store'
import classes from '@/styles/components/caterer/booking-summary.module.css'
import { bookingValidation } from '@/validations/booking.validation'

const BookingSummary = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookingValidation) })

  const showLoginModal = useLoginModal()

  const userType = useSelector((state: RootState) => state.auth.userType)

  const onSubmit = async (data: any) => {
    if (userType === null) {
      showLoginModal()
      return
    }
    console.log(data)
  }

  return (
    <div className="relative">
      <section className={classes.bookingSummary}>
        <Typography.Title level={4}>Booking Summary</Typography.Title>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className={classes.changePasswordForm}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Number of guests"
                required
                help={errors.numberOfPeople?.message}
                validateStatus={errors.numberOfPeople ? 'error' : ''}
              >
                <Controller
                  name="numberOfPeople"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Occasion"
                required
                help={errors.occasion?.message}
                validateStatus={errors.occasion ? 'error' : ''}
              >
                <Controller
                  name="occasion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Venue"
            required
            help={errors.venue?.message}
            validateStatus={errors.venue ? 'error' : ''}
          >
            <Controller
              name="venue"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Event date"
            required
            help={errors.eventDate?.message}
            validateStatus={errors.eventDate ? 'error' : ''}
          >
            <Controller
              name="eventDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  className="w-full"
                  showTime
                  minDate={dayjs()}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Payment method"
            required
            help={errors.paymentMethod?.message}
            validateStatus={errors.paymentMethod ? 'error' : ''}
          >
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={PAYMENT_METHODS.map((method, index) => ({
                    label: method,
                    value: index,
                  }))}
                />
              )}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            // disabled={isLoading}
          >
            Book Catering
          </Button>

          {/* <>{contextHolder}</> */}
        </Form>
      </section>
    </div>
  )
}

export default BookingSummary
