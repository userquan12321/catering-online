import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { TableColumnsType } from 'antd'
import { Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd'

import {
  useAddCuisineMutation,
  useDeleteCuisineMutation,
  useEditCuisineMutation,
  useGetCuisinesQuery,
} from '@/apis/cuisine-type.api'
import CustomTable from '@/components/common/CustomTable'
import Loading from '@/components/common/Loading'
import UploadWidget from '@/components/common/UploadWidget'
import { useAlert } from '@/hooks/globals/useAlert.hook'
import { CuisineInput, CuisineType } from '@/types/cuisine.type'
import { cuisineTypeValidation } from '@/validations/cuisine-type.validation'

const AdminCuisineTypesPage = () => {
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
  const { data: cuisines = [], isLoading: isLoadingData } = useGetCuisinesQuery(
    {},
  )

  const [addCuisine, { isLoading: addLoading }] = useAddCuisineMutation()
  const [editCuisine, { isLoading: editLoading }] = useEditCuisineMutation()
  const [deleteCuisine] = useDeleteCuisineMutation()

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

  const handleClose = () => {
    setOpenDrawer(false)
    setCurrentCuisineId(null)
    reset()
  }

  const handleAdd = () => {
    setOpenDrawer(true)
    reset()
  }

  const handleEdit = (id: number) => {
    setOpenDrawer(true)
    setCurrentCuisineId(id)

    const cuisineToEdit = cuisines.find((cuisine) => cuisine.id === id)

    if (cuisineToEdit) {
      setValue('cuisineName', cuisineToEdit.cuisineName)
      setValue('description', cuisineToEdit.description)
      setValue('cuisineImage', cuisineToEdit.cuisineImage)
    }
  }

  const handleDelete = (id: number) => {
    const cuisineToDelete = cuisines.find((cuisine) => cuisine.id === id)
    if (!cuisineToDelete) {
      message.error('Cuisine not found!')
      return
    }
    Modal.warning({
      title: `Are you sure you want to delete "${cuisineToDelete.cuisineName}"?`,
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const res = await deleteCuisine(id)
          handleAlert(res)
        } catch (error) {
          message.error('Failed to delete cuisine!')
        }
      },
    })
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
      name="Cuisine Type"
      renderDrawerContent={renderDrawerContent}
      customColumns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      isEditing={!!currentCuisineId}
      dataSource={cuisines}
      rowKey={(record) => record.id}
    />
  )
}

export default AdminCuisineTypesPage
