import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { TableColumnsType } from 'antd'
import { Button, Col, Form, Input, message, Row, Typography } from 'antd'

import { useAddCuisineMutation, useGetCuisinesQuery } from '@/apis/admin.api'
import CustomTable from '@/components/common/CustomTable'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { CuisineInput, CuisineType } from '@/types/cuisine.type'
import { cuisineTypeValidation } from '@/validations/cuisine-type.validation'

const AdminCuisineTypesPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cuisineTypeValidation),
  })

  const { handleAlert, contextHolder } = useAlert()

  const { data: cuisines = [], isLoading: isLoadingData } =
    useGetCuisinesQuery()

  const [addCuisine, { isLoading }] = useAddCuisineMutation()

  const [openDrawer, setOpenDrawer] = useState(false)

  const onSubmit = async (values: CuisineInput) => {
    try {
      const res = await addCuisine(values)
      handleAlert(res, () => {
        setOpenDrawer(false)
        reset()
      })
    } catch (error) {
      message.error('Failed to add cuisine')
    }
  }

  const columns: TableColumnsType<CuisineType> = [
    {
      title: 'Cuisine Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'cuisineName',
      render: (_, record) => (
        <Typography.Text className="text-nowrap">
          {record.cuisineName}
        </Typography.Text>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ]

  const handleEdit = (id: number) => {
    console.log('Edit', id)
  }

  const handleDelete = (id: number) => {
    console.log('Delete', id)
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

      <Row justify="end" gutter={8}>
        <Col>
          <Button type="default" htmlType="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Add
          </Button>
        </Col>
      </Row>

      <>{contextHolder}</>
    </Form>
  )

  if (isLoadingData) {
    return <p>Loading...</p>
  }

  return (
    <CustomTable
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      addText="Add Cuisine"
      renderDrawerContent={renderDrawerContent}
      customColumns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      dataSource={cuisines}
      rowKey={(record) => record.id}
    />
  )
}

export default AdminCuisineTypesPage
