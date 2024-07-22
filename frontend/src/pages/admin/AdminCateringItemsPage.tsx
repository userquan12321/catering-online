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
  Select,
  Typography,
} from 'antd'

import {
  useAddCateringItemMutation,
  useGetCateringItemsQuery,
  useEditCateringItemMutation,
  useDeleteCateringItemMutation,
} from '@/apis/catering-item.api'
import {
  useGetCuisinesQuery,
} from '@/apis/cuisine-type.api'
import CustomTable from '@/components/common/CustomTable'
import UploadWidget from '@/components/common/UploadWidget'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { CateringItem, CateringItemInput } from '@/types/catering-item.type'
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
  const { data: cuisines = [], isLoading: isLoadingCuisine } =
    useGetCuisinesQuery({})

  const [addCatering, { isLoading: addLoading }] = useAddCateringItemMutation()
  const [editCatering, { isLoading: editLoading }] = useEditCateringItemMutation()
  const [deleteCatering] = useDeleteCateringItemMutation()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [currentCateringId, setCurrentCateringId] = useState<number | null>(null)

  const onSubmit = async (values: CateringItemInput) => {
    try {
      if (currentCateringId) {
        const res = await editCatering({ id: currentCateringId, ...values })
        handleAlert(res, () => {
          setOpenDrawer(false)
          setCurrentCateringId(null)
          reset()
        })
        return
      }
      const res = await addCatering(values)
      handleAlert(res, () => {
        setOpenDrawer(false)
        reset()
      })
    } catch (error) {
      message.error('Failed to add catering item')
    }
  }

  const columns: TableColumnsType<CateringItem> = [
    {
      title: 'Item Id',
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
      render: (_, record) => '$' + record.price.toFixed(2),
    },
    {
      title: 'Serves Count',
      dataIndex: 'servesCount',
    },
  ]

  const handleClose = () => {
    setOpenDrawer(false)
    reset()
  }

  const handleAdd = () => {
    setOpenDrawer(true)
    reset()
  }

  const handleEdit = (id: number) => {
    setOpenDrawer(true)
    setCurrentCateringId(id)
    const cateringToEdit = cateringItems.find((catering) => catering.id === id)
    if (cateringToEdit) {
      setValue('name', cateringToEdit.name)
      setValue('cuisineId', cateringToEdit.cuisineId)
      setValue('servesCount', cateringToEdit.servesCount)
      setValue('price', cateringToEdit.price)
      setValue('description', cateringToEdit.description)
      setValue('image', cateringToEdit.image)
    }
  }

  const handleDelete = (id: number) => {
    const cateringToDelete = cateringItems.find((catering) => catering.id === id)
    if (!cateringToDelete) {
      message.error('Catering item not found!')
      return
    }
    Modal.confirm({
      title: `Are you sure you want to delete "${cateringToDelete.name}"?`,
      onOk: async () => {
        try {
          const res = await deleteCatering(id)
          handleAlert(res)
        } catch (error) {
          message.error('Failed to delete catering item!')
        }
      },
    })
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

      <Form.Item
        label="Cuisine name"
        required
        help={errors.cuisineId?.message}
        validateStatus={errors.cuisineId ? 'error' : ''}
      >
        <Controller
          name="cuisineId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={cuisines.map((cuisine) => ({
                label: cuisine.cuisineName,
                value: cuisine.id,
              }))}
              disabled={isLoadingCuisine}
            />
          )}
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
        label="Catering image"
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

      <Row justify="end" gutter={8} className="action-drawer-btns">
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
            {currentCateringId ? 'Edit' : 'Add'}
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
      isEditing={!!currentCateringId}
      dataSource={cateringItems}
      rowKey={(record) => record.id}
    />
  )
}

export default AdminCateringItemsPage
