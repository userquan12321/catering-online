import React from 'react'
import { Select, Space, Table, TableProps } from 'antd'

interface DataType {
  key: number
  name: string
  age: number
  address: string
  description: string
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: () => (
      <>
        <Select
          defaultValue="pending"
          onChange={handleChange}
          options={[
            { value: 'pending', label: 'pending' },
            { value: 'ongoing', label: 'ongoing' },
            { value: 'complete', label: 'complete' },
          ]}
        />
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>Edit</a>
      </Space>
    ),
  },
]

const data: DataType[] = []
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  })
}

const defaultExpandable = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
}

const AdminBookingsPage: React.FC = () => {
  const tableProps: TableProps<DataType> = {
    size: 'large', // Keep size as large by default
    expandable: defaultExpandable, // Use default expandable config
    pagination: { position: ['bottomLeft'] }, // Set pagination to bottom left and right by default
    columns,
    dataSource: data,
  }

  return (
    <>
      <Table {...tableProps} />
    </>
  )
}

export default AdminBookingsPage
