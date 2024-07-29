import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd'
import dayjs from 'dayjs'

import { useBookCateringMutation } from '@/apis/booking.api'
import { PAYMENT_METHODS } from '@/constants/booking.constant'
import { useLoginModal } from '@/hooks/auth/useLoginModal.hook'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { deleteBookingItem, resetBooking } from '@/redux/slices/booking.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import classes from '@/styles/components/caterer/booking-summary.module.css'
import { BookingInput } from '@/types/booking.type'
import { parseToNumber } from '@/utils/parseToNumber'
import { bookingValidation } from '@/validations/booking.validation'

const BookingSummary = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookingValidation) })
  const [bookCatering, { isLoading }] = useBookCateringMutation()
  const { contextHolder, handleAlert } = useAlert()
  const showLoginModal = useLoginModal()

  const userType = useSelector((state: RootState) => state.auth.userType)
  const bookingItemList = useSelector(
    (state: RootState) => state.booking.bookingItemList,
  )

  const onSubmit = async (data: BookingInput) => {
    if (userType === null) {
      showLoginModal()
      return
    }

    if (!bookingItemList.length) {
      Modal.error({
        title: 'No catering items selected',
        content: 'Please select catering items to book',
      })
      return
    }

    try {
      const res = await bookCatering({
        ...data,
        eventDate: new Date(data.eventDate).toISOString(),
        catererId: parseToNumber(id),
        menuItems: bookingItemList.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
      })

      handleAlert(res, () => {
        reset()
        dispatch(resetBooking())
      })
    } catch (error) {
      console.error(error)
    }
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
                  minDate={dayjs().add(7, 'day')}
                />
              )}
            />
          </Form.Item>

          {bookingItemList.length > 0 && (
            <div className="mb-4">
              {bookingItemList.map((item) => (
                <div className={classes.bookingListItem} key={item.id}>
                  <p className="flex-1">{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <DeleteOutlined
                    className={classes.deleteIcon}
                    onClick={() => dispatch(deleteBookingItem(item.id))}
                  />
                </div>
              ))}
              <div className={classes.totalPrice}>
                <p>Total</p>
                <p>
                  $
                  {bookingItemList
                    .reduce((acc, bi) => acc + bi.price * bi.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          )}

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

          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Book Catering
          </Button>

          <>{contextHolder}</>
        </Form>
      </section>
    </div>
  )
}

export default BookingSummary
