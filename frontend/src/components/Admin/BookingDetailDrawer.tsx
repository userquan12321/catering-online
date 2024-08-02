import { useEffect, useState } from 'react'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Flex, Modal, Select, Tag, Typography } from 'antd'

import { BOOKING_STATUSES, PAYMENT_METHODS } from '@/constants/booking.constant'
import classes from '@/styles/components/admin/booking-drawer.module.css'
import {
  BookingColumn,
  BookingCustomer,
  BookingStatusType,
} from '@/types/booking.type'
import { formatDate } from '@/utils/formatDateTime'

type BaseProps = {
  isClosed: boolean
}

type CatererProps = {
  mode: 'caterer'
  data: BookingColumn | undefined
  onChangeStatus: (bookingId: number, type: BookingStatusType) => void
}

type CustomerProps = {
  mode: 'customer'
  data: BookingCustomer | undefined
  onCancel: (bookingId: number) => void
}

type Props = BaseProps & (CatererProps | CustomerProps)
const BookingDetailDrawer = ({ data, isClosed, mode, ...props }: Props) => {
  const [edit, setEdit] = useState(false)
  const [status, setStatus] = useState<BookingStatusType>(() => {
    if (!data) return 'pending'
    return BOOKING_STATUSES[data.bookingStatus].slug
  })

  useEffect(() => {
    if (isClosed) {
      setEdit(false)
    }
  }, [isClosed])

  const handleSave = () => {
    if (!data) return
    if (mode === 'caterer') {
      const { onChangeStatus } = props as CatererProps
      onChangeStatus(data.id, status)
      setEdit(false)
    }
  }

  const handleCancel = () => {
    if (!data) return
    Modal.confirm({
      title: 'Are you sure to cancel this booking?',
      onOk: () => (props as CustomerProps).onCancel(data.id),
    })
  }

  if (!data) return null

  return (
    <>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          {'customer' in data ? 'Customer' : 'Caterer'}
        </Typography.Text>
        <p>
          {'customer' in data
            ? `${data.customer.firstName} ${data.customer.lastName}`
            : `${data.caterer.firstName} ${data.caterer.lastName}`}
        </p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Event date
        </Typography.Text>
        <p>{formatDate(data.eventDate)}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Occasion
        </Typography.Text>
        <p>{data.occasion}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Venue
        </Typography.Text>
        <p>{data.venue}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Guests
        </Typography.Text>
        <p>{data.numberOfPeople}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Created At
        </Typography.Text>
        <p>{formatDate(data.createdAt)}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Payment
        </Typography.Text>
        <p>{PAYMENT_METHODS[data.paymentMethod]}</p>
      </Flex>
      <Flex align="center" className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Status
        </Typography.Text>
        {edit ? (
          <>
            <Select
              className={classes.statusSelect}
              size="small"
              options={BOOKING_STATUSES.map((status) => ({
                label: status.label,
                value: status.slug,
              }))}
              value={status}
              onChange={setStatus}
            />
            <Button size="small" onClick={handleSave}>
              <SaveOutlined />
            </Button>
          </>
        ) : (
          <>
            <Tag color={BOOKING_STATUSES[data.bookingStatus].color}>
              {BOOKING_STATUSES[data.bookingStatus].label}
            </Tag>
            {'customer' in data ? (
              <Button size="small" onClick={() => setEdit(true)}>
                <EditOutlined />
              </Button>
            ) : BOOKING_STATUSES.findIndex((bs) => bs.slug === 'pending') ===
              data.bookingStatus ? (
              <Button size="small" type="primary" danger onClick={handleCancel}>
                Cancel
              </Button>
            ) : null}
          </>
        )}
      </Flex>

      <div className="mb-4">
        <Typography.Text strong className={classes.cardLabel}>
          Booking items
        </Typography.Text>
        {data.menuItems.map((bookingItem) => (
          <div className={classes.bookingListItem} key={bookingItem.itemId}>
            <p className="flex-1">
              {bookingItem.name} x {bookingItem.quantity}
            </p>
            <p>${bookingItem.price.toFixed(2)}</p>
          </div>
        ))}
        <Flex justify="space-between" className="mt-4">
          <Typography.Text strong className={classes.cardLabel}>
            Total
          </Typography.Text>
          <Typography.Title level={4} className="mt-0">
            ${data.totalPrice.toFixed(2)}
          </Typography.Title>
        </Flex>
      </div>
    </>
  )
}

export default BookingDetailDrawer
