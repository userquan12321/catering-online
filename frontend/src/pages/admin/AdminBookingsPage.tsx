import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { TableColumnsType } from 'antd'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Tag,
  Typography,
} from 'antd'

import { useGetBookingsManagementQuery } from '@/apis/booking.api'
import {
  useAddCuisineMutation,
  useDeleteCuisineMutation,
  useEditCuisineMutation,
} from '@/apis/cuisine-type.api'
import CustomTable from '@/components/common/CustomTable'
import Loading from '@/components/common/Loading'
import UploadWidget from '@/components/common/UploadWidget'
import { BOOKING_STATUSES, STATUS_COLOR } from '@/constants/booking.constant'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { BookingColumn } from '@/types/booking.type'
import { CuisineInput, CuisineType } from '@/types/cuisine.type'
import { formatDate } from '@/utils/formatDateTime'
import { cuisineTypeValidation } from '@/validations/cuisine-type.validation'

const AdminBookingsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(cuisineTypeValidation),
  })

  const { handleAlert, contextHolder } = useAlert()
  const { data: bookings, isLoading: isLoadingData } =
    useGetBookingsManagementQuery()

  const [addCuisine, { isLoading: addLoading }] = useAddCuisineMutation()
  const [editCuisine, { isLoading: editLoading }] = useEditCuisineMutation()
  const [deleteCuisine] = useDeleteCuisineMutation()

  console.table(bookings)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentCuisineId, setCurrentCuisineId] = useState<number | null>(null)

  const onSubmit = async (values: CuisineInput) => {
    try {
      if (currentCuisineId) {
        const res = await editCuisine({ id: currentCuisineId, ...values })
        handleAlert(res, () => {
          setOpenDrawer(false)
          setCurrentCuisineId(null)
          reset()
        })
        return
      }
      const res = await addCuisine(values)
      handleAlert(res, () => {
        setOpenDrawer(false)
        reset()
      })
    } catch (error) {
      message.error('Failed to add cuisine')
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
        <Tag color={STATUS_COLOR[record.bookingStatus]}>
          {BOOKING_STATUSES[record.bookingStatus]}
        </Tag>
      ),
    },
  ]

  const handleClose = () => {
    setOpenDrawer(false)
    setCurrentCuisineId(null)
    reset()
  }

  const handleAdd = () => {
    setOpenDrawer(true)
    reset()
  }

  const renderDrawerContent = () => (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Cuisine name"
        required
        help={errors.cuisineName?.message}
        validateStatus={errors.cuisineName ? 'error' : ''}
      >
        <Controller
          name="cuisineName"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        required
        help={errors.description?.message}
        validateStatus={errors.description ? 'error' : ''}
      >
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <Input.TextArea rows={3} {...field} />}
        />
      </Form.Item>

      <Form.Item label="Cuisine image">
        <Controller
          name="cuisineImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="upload-image">
              {field.value ? (
                <img className="w-full" src={field.value} alt="Cuisine Image" />
              ) : null}
              <UploadWidget onChange={field.onChange} />
            </div>
          )}
        />
      </Form.Item>

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="default" htmlType="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            disabled={addLoading || editLoading}
          >
            {currentCuisineId ? 'Edit' : 'Add'}
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )

  if (isLoadingData) return <Loading />

  return (
    <CustomTable
      openDrawer={openDrawer}
      onAdd={handleAdd}
      onClose={handleClose}
      name="Check Status"
      hasEdit={false}
      renderDrawerContent={renderDrawerContent}
      customColumns={columns}
      dataSource={bookings}
      rowKey={(record) => record.id}
    />
  )
}

export default AdminBookingsPage
