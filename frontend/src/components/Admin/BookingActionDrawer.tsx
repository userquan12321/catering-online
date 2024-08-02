import { Button, Card, Flex, Typography } from 'antd'

import classes from '@/styles/components/admin/booking-drawer.module.css'
import { BookingColumn, BookingStatusType } from '@/types/booking.type'
import { formatDate } from '@/utils/formatDateTime'

type Props = {
  data: BookingColumn[]
  onChangeStatus: (bookingId: number, type: BookingStatusType) => void
}

const BookingActionDrawer = ({ data, onChangeStatus }: Props) => {
  return (
    <>
      {data.map((booking) => (
        <Card
          key={booking.id}
          title={`Booking #${booking.id}`}
          className="mb-4"
        >
          <Flex>
            <Typography.Text strong className={classes.cardLabel}>
              Customer
            </Typography.Text>
            <p>{`${booking.customer.firstName} ${booking.customer.lastName}`}</p>
          </Flex>
          <Flex>
            <Typography.Text strong className={classes.cardLabel}>
              Event date
            </Typography.Text>
            <p>{formatDate(booking.eventDate)}</p>
          </Flex>
          <Flex>
            <Typography.Text strong className={classes.cardLabel}>
              Occasion
            </Typography.Text>
            <p>{booking.occasion}</p>
          </Flex>

          <div className="mb-4">
            <Typography.Text strong className={classes.cardLabel}>
              Booking items
            </Typography.Text>
            {booking.menuItems.map((bookingItem) => (
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
                ${booking.totalPrice.toFixed(2)}
              </Typography.Title>
            </Flex>
          </div>

          <Flex gap={8} justify="flex-end">
            <Button
              danger
              type="primary"
              onClick={() => onChangeStatus(booking.id, 'reject')}
            >
              Reject
            </Button>
            <Button
              type="primary"
              onClick={() => onChangeStatus(booking.id, 'approve')}
            >
              Approve
            </Button>
          </Flex>
        </Card>
      ))}
    </>
  )
}

export default BookingActionDrawer
