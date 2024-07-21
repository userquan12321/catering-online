import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { TableColumnsType } from 'antd'
import { Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd'

import { useGetCateringItemsQuery } from '@/apis/catering-item.api'
import {
  useAddCuisineMutation,
  useDeleteCuisineMutation,
  useEditCuisineMutation,
} from '@/apis/cuisine-type.api'
import CustomTable from '@/components/common/CustomTable'
import UploadWidget from '@/components/common/UploadWidget'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { CateringItem } from '@/types/catering-item.type'
import { cateringValidation } from '@/validations/catering.validation'

const AdminCateringItemsPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(cateringValidation),
  })

  const { handleAlert, contextHolder } = useAlert()
  const { data: cateringItems = [], isLoading: isLoadingData } =
    useGetCateringItemsQuery()

  const [addCuisine, { isLoading: addLoading }] = useAddCuisineMutation()
  const [editCuisine, { isLoading: editLoading }] = useEditCuisineMutation()
  const [deleteCuisine] = useDeleteCuisineMutation()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentCuisineId, setCurrentCuisineId] = useState<number | null>(null)

  const onSubmit = async (values: any) => {
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

  const columns: TableColumnsType<CateringItem> = [
    {
      title: 'Catering Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <Typography.Text className="text-nowrap">{record.name}</Typography.Text>
      ),
    },
    {
      title: 'Cuisine Name',
      dataIndex: 'cuisineName',
      render: (_, record) => (
        <Typography.Text className="text-nowrap">
          {record.cuisineName}
        </Typography.Text>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, record) => '$' + record.price,
    },
    {
      title: 'Serves Count',
      dataIndex: 'servesCount',
    },
  ]

  const handleClose = () => {
    setOpenDrawer(false)
    setCurrentCuisineId(null)
  }

  const handleAdd = () => {
    setOpenDrawer(true)
    reset()
  }

  const handleEdit = (id: number) => {
    // setOpenDrawer(true)
    // setCurrentCuisineId(id)
    // const cuisineToEdit = cuisines.find((cuisine) => cuisine.id === id)
    // if (cuisineToEdit) {
    //   setValue('cuisineName', cuisineToEdit.cuisineName)
    //   setValue('description', cuisineToEdit.description)
    //   setValue('cuisineImage', cuisineToEdit.cuisineImage)
    // }
  }

  const handleDelete = (id: number) => {
    // const cuisineToDelete = cuisines.find((cuisine) => cuisine.id === id)
    // if (!cuisineToDelete) {
    //   message.error('Cuisine not found!')
    //   return
    // }
    // Modal.confirm({
    //   title: `Are you sure you want to delete "${cuisineToDelete.cuisineName}"?`,
    //   onOk: async () => {
    //     try {
    //       const res = await deleteCuisine(id)
    //       handleAlert(res)
    //     } catch (error) {
    //       message.error('Failed to delete cuisine!')
    //     }
    //   },
    // })
  }

  const renderDrawerContent = () => (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Catering name"
        required
        help={errors.name?.message}
        validateStatus={errors.name ? 'error' : ''}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Serves count"
            required
            help={errors.servesCount?.message}
            validateStatus={errors.servesCount ? 'error' : ''}
          >
            <Controller
              name="servesCount"
              control={control}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Price"
            required
            help={errors.price?.message}
            validateStatus={errors.price ? 'error' : ''}
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => <Input type="number" {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

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

      <Form.Item
        label="Cuisine image"
        required
        help={errors.image?.message}
        validateStatus={errors.image ? 'error' : ''}
      >
        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="upload-image">
              {field.value ? (
                <img
                  className="w-full"
                  src={field.value}
                  alt="Catering Image"
                />
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

  if (isLoadingData) {
    return <p>Loading...</p>
  }

  return (
    <CustomTable
      openDrawer={openDrawer}
      onAdd={handleAdd}
      onClose={handleClose}
      name="Catering Item"
      renderDrawerContent={renderDrawerContent}
      customColumns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      isEditing={!!currentCuisineId}
      dataSource={cateringItems}
      rowKey={(record) => record.id}
    />
  )
}

export default AdminCateringItemsPage
