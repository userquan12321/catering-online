import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, message, Modal } from 'antd'

import { useAddCuisineMutation, useGetCuisinesQuery } from '@/apis/admin.api'
import { CuisineInput } from '@/types/cuisine.type'

const AdminCuisineTypesPage = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data: cuisines = [], refetch } = useGetCuisinesQuery()
  const [addCuisine, { isLoading }] = useAddCuisineMutation()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onFinish = async (values: CuisineInput) => {
    try {
      const res = await addCuisine(values)
      message.success(res.data as string)
      form.resetFields()
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      message.error('Failed to add cuisine')
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Cuisine
      </Button>
      <Modal
        title="Add Cuisine"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="cuisineName"
            label="Cuisine Name"
            rules={[{ required: true, message: 'Please enter cuisine name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add Cuisine
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <List
        dataSource={cuisines}
        renderItem={(cuisine) => (
          <List.Item key={cuisine.id}>{cuisine.cuisineName}</List.Item>
        )}
      />
    </>
  )
}

export default AdminCuisineTypesPage
