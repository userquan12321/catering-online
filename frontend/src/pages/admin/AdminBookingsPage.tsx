import { useState } from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Button, Empty, message, Tag, Typography } from 'antd'

import {
  useChangeStatusMutation,
  useGetBookingsManagementQuery,
} from '@/apis/booking.api'
import BookingActionDrawer from '@/components/Admin/BookingActionDrawer'
import BookingDetailDrawer from '@/components/Admin/BookingDetailDrawer'
import BookingTable from '@/components/Admin/BookingTable'
import Loading from '@/components/common/Loading'
import { BOOKING_STATUSES } from '@/constants/booking.constant'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { BookingColumn, BookingStatusType } from '@/types/booking.type'
import { formatDate } from '@/utils/formatDateTime'
import { needActionBookings } from '@/utils/needActionBookings.util'

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
    title: 'Phone Number',
    dataIndex: 'customer',
    render: (_, record) => (
      <Typography.Text className="text-nowrap">
        {record.customer.phoneNumber}
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

const AdminBookingsPage = () => {
  const { handleAlert, contextHolder } = useAlert()
  const { data, isLoading: isLoadingData } = useGetBookingsManagementQuery()
  const [changeStatus] = useChangeStatusMutation()

  const [openDrawer, setOpenDrawer] = useState<'' | 'action' | 'detail'>('')
  const [detailId, setDetailId] = useState<number | null>(null)

  const handleView = (id: number) => {
    setDetailId(id)
    setOpenDrawer('detail')
  }

  const handleClose = () => {
    setOpenDrawer('')
    setDetailId(null)
  }

  const handleChangeStatus = async (
    bookingId: number,
    type: BookingStatusType,
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

  const renderDrawerContent = () => {
    if (!data) return null

    if (openDrawer === 'action')
      return (
        <BookingActionDrawer
          data={needActionBookings(data.bookings)}
          onChangeStatus={handleChangeStatus}
        />
      )

    return (
      <BookingDetailDrawer
        mode="caterer"
        data={data.bookings.find((booking) => booking.id === detailId)}
        isClosed={openDrawer === ''}
        onChangeStatus={handleChangeStatus}
      />
    )
  }

  if (isLoadingData) return <Loading />

  if (!data) return <Empty description="No bookings found" />

  return (
    <>
      {contextHolder}
      <Badge count={data.needActionCount}>
        <Button type="primary" onClick={() => setOpenDrawer('action')}>
          Check Status
        </Button>
      </Badge>

      <BookingTable
        openDrawer={!!openDrawer}
        onClose={handleClose}
        drawerTitle={detailId ? `Booking #${detailId}` : 'Bookings'}
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
