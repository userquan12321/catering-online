import { Key, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType, TableProps } from 'antd'
import { Button, Flex, Form, Input, message, Modal, Table } from 'antd'

import { useAddCuisineMutation, useGetCuisinesQuery } from '@/apis/admin.api'
import { CuisineInput, CuisineType } from '@/types/cuisine.type'

type TableRowSelection<T> = TableProps<T>['rowSelection']

const AdminCuisineTypesPage = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data: cuisines = [], refetch } = useGetCuisinesQuery()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const [addCuisine, { isLoading }] = useAddCuisineMutation()

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    form.resetFields();
  };

  const onFinish = async (values: CuisineInput) => {
    try {
      const res = await addCuisine(values);
      message.success(res.data as string);
      form.resetFields();
      setIsDrawerVisible(false);
      refetch();
    } catch (error) {
      message.error('Failed to add cuisine');
    }
  };

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<CuisineType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const columns: TableColumnsType<CuisineType> = [
    {
      title: 'Cuisine Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'cuisineName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Flex gap={8}>
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
    },
  ]

  const handleEdit = (id: number) => {
    console.log('Edit', id)
  }

  const handleDelete = (id: number) => {
    console.log('Delete', id)
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Cuisine
      </Button>
      <Drawer
        title="Add Cuisine"
        onClose={onClose}
        open={isDrawerVisible}
        width={300}
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
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cuisines}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default AdminCuisineTypesPage;
