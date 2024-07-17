import { Select, Space, Table, TableProps, Tag } from 'antd'

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
    title: 'ID',
    dataIndex: 'key',
  },
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
        <Tag color="red">cancelled</Tag>
        <Tag color="green">complete</Tag>
        <Tag color="yellow">pending</Tag>
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

const AdminBookingsPage = () => {
  return (
    <>
      <Table
        expandable={defaultExpandable}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default AdminBookingsPage
