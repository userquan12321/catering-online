import { useState } from 'react'
import { Empty, message, TableColumnsType, Tag, Typography } from 'antd'

import {
  useCancelBookingMutation,
  useGetCustomerBookingQuery,
} from '@/apis/booking.api'
import BookingDetailDrawer from '@/components/Admin/BookingDetailDrawer'
import BookingTable from '@/components/Admin/BookingTable'
import Loading from '@/components/common/Loading'
import { BOOKING_STATUSES } from '@/constants/booking.constant'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { BookingCustomer } from '@/types/booking.type'
import { formatDate } from '@/utils/formatDateTime'

const columns: TableColumnsType<BookingCustomer> = [
  {
    title: 'Booking Id',
    dataIndex: 'id',
  },
  {
    title: 'Caterer',
    dataIndex: 'caterer',
    render: (_, record) => (
      <Typography.Text className="text-nowrap">
        {record.caterer.firstName} {record.caterer.lastName}
      </Typography.Text>
    ),
  },
  {
    title: 'Phone Number',
    dataIndex: 'caterer',
    render: (_, record) => (
      <Typography.Text className="text-nowrap">
        {record.caterer.phoneNumber}
      </Typography.Text>
    ),
  },
  {
    title: 'Event Date',
    dataIndex: 'eventDate',
    render: (_, record) => (
      <Typography.Text className="text-nowrap">
        {formatDate(record.eventDate)}
      </Typography.Text>
    ),
  },
  {
    title: 'Occasion',
    dataIndex: 'occasion',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    render: (_, record) => (
      <Typography.Text className="text-nowrap">
        ${record.totalPrice.toFixed(2)}
      </Typography.Text>
    ),
  },
  {
    title: 'Booking Status',
    dataIndex: 'bookingStatus',
    render: (_, record) => (
      <Tag color={BOOKING_STATUSES[record.bookingStatus].color}>
        {BOOKING_STATUSES[record.bookingStatus].label}
      </Tag>
    ),
  },
]

const BookingHistoryPage = () => {
  const { handleAlert, contextHolder } = useAlert()

  const { data, isLoading } = useGetCustomerBookingQuery()
  const [cancelBooking] = useCancelBookingMutation()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [detailId, setDetailId] = useState<number | null>(null)

  const handleView = (id: number) => {
    setDetailId(id)
    setOpenDrawer(true)
  }

  const handleClose = () => {
    setOpenDrawer(false)
    setDetailId(null)
  }

  const handleCancel = async (bookingId: number) => {
    try {
      const res = await cancelBooking(bookingId)
      handleAlert(res, () => {
        setOpenDrawer(false)
      })
    } catch (error) {
      message.error('Failed to cancel booking')
    }
  }

  if (isLoading) return <Loading />

  const renderDrawerContent = () => {
    if (!data) return null

    return (
      <BookingDetailDrawer
        mode="customer"
        data={data.find((booking) => booking.id === detailId)}
        isClosed={!openDrawer}
        onCancel={handleCancel}
      />
    )
  }

  const renderBody = () => {
    if (!data) return <Empty description="No booking history" />

    return (
      <BookingTable
        openDrawer={openDrawer}
        onClose={handleClose}
        drawerTitle={detailId ? `Booking #${detailId}` : 'Bookings'}
        onView={handleView}
        renderDrawerContent={renderDrawerContent}
        customColumns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
    )
  }

  return (
    <section className="container section">
      <>{contextHolder}</>
      <Typography.Title level={3}>Booking History</Typography.Title>
      {renderBody()}
    </section>
  )
}

export default BookingHistoryPage
