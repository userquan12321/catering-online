import { useState } from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Button, Card, Empty, message, Tag, Typography } from 'antd'

import {
  useChangeStatusMutation,
  useGetBookingsManagementQuery,
} from '@/apis/booking.api'
import BookingTable from '@/components/Admin/BookingTable'
import Loading from '@/components/common/Loading'
import { BOOKING_STATUSES } from '@/constants/booking.constant'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { BookingColumn } from '@/types/booking.type'
import { formatDate } from '@/utils/formatDateTime'
import { needActionBookings } from '@/utils/needActionBookings.util'

const AdminBookingsPage = () => {
  const { handleAlert, contextHolder } = useAlert()
  const { data, isLoading: isLoadingData } = useGetBookingsManagementQuery()
  const [changeStatus] = useChangeStatusMutation()

  const [openDrawer, setOpenDrawer] = useState(false)

  const handleChangeStatus = async (
    bookingId: number,
    type: 'reject' | 'approve',
  ) => {
    try {
      const bookingStatus = BOOKING_STATUSES.findIndex(
        (status) => status.slug === type,
      )

      if (bookingStatus === -1) {
        message.error('Invalid booking status')
        return
      }

      const res = await changeStatus({ bookingId, bookingStatus })
      handleAlert(res)
    } catch (error) {
      message.error('Failed to change status')
    }
  }

  const columns: TableColumnsType<BookingColumn> = [
    {
      title: 'Booking Id',
      dataIndex: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (_, record) => (
        <Typography.Text className="text-nowrap">
          {record.customer.firstName} {record.customer.lastName}
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

  const handleView = () => {
    setOpenDrawer(true)
  }

  const handleCheckStatus = () => {
    setOpenDrawer(true)
  }

  const renderDrawerContent = () => {
    if (!data) return null

    return (
      <>
        {needActionBookings(data.bookings).map((booking) => (
          <Card
            key={booking.id}
            title={`Booking #${booking.id}`}
            actions={[
              <Button
                danger
                onClick={() => handleChangeStatus(booking.id, 'reject')}
              >
                Reject
              </Button>,
              <Button onClick={() => handleChangeStatus(booking.id, 'approve')}>
                Approve
              </Button>,
            ]}
          >
            {booking.id}
          </Card>
        ))}
      </>
    )
  }

  if (isLoadingData) return <Loading />

  if (!data) return <Empty description="No bookings found" />

  return (
    <>
      {contextHolder}
      <Badge count={data.needActionCount}>
        <Button type="primary" onClick={handleCheckStatus}>
          Check Status
        </Button>
      </Badge>

      <BookingTable
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
        drawerTitle="Bookings"
        onView={handleView}
        renderDrawerContent={renderDrawerContent}
        customColumns={columns}
        dataSource={data.bookings}
        rowKey={(record) => record.id}
      />
    </>
  )
}

export default AdminBookingsPage
