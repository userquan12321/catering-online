import { Key, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Button, Drawer, Table, TableColumnsType, TableProps } from 'antd'

type Props<T> = TableProps<T> & {
  renderDrawerContent: () => JSX.Element | null
  openDrawer: boolean
  drawerTitle: string
  onView: (id: number) => void
  onClose: () => void
  customColumns: TableColumnsType<T>
}

const BookingTable = <T extends { id: number }>({
  openDrawer,
  drawerTitle,
  onView,
  onClose,
  renderDrawerContent,
  ...props
}: Props<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const columns: TableColumnsType<T> = [
    ...props.customColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => onView(record.id)}>
          <EditOutlined />
        </Button>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <>
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        {...props}
      />
      <Drawer
        title={drawerTitle}
        onClose={onClose}
        open={openDrawer}
        width={500}
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  )
}

export default BookingTable
