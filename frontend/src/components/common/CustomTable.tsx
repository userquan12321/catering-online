import { Key, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, Table, TableColumnsType, TableProps } from 'antd'

type BaseProps<T> = TableProps<T> & {
  renderDrawerContent: () => JSX.Element
  openDrawer: boolean
  onAdd: () => void
  onClose: () => void
  customColumns: TableColumnsType<T>
  name: string
}

type EditableProps<T> = BaseProps<T> & {
  hasEdit?: true
  isEditing: boolean
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

type NonEditableProps<T> = BaseProps<T> & {
  hasEdit: false
}

type Props<T> = EditableProps<T> | NonEditableProps<T>

const CustomTable = <T extends { id: number }>({
  openDrawer,
  onAdd,
  onClose,
  name,
  renderDrawerContent,
  hasEdit = true,
  ...props
}: Props<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const columns: TableColumnsType<T> = !hasEdit
    ? props.customColumns
    : [
        ...props.customColumns,
        {
          title: 'Action',
          dataIndex: 'action',
          render: (_, record) => (
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => (props as EditableProps<T>).onEdit(record.id)}
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => (props as EditableProps<T>).onDelete(record.id)}
              >
                <DeleteOutlined />
              </Button>
            </Flex>
          ),
        },
      ]

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <>
      {name && (
        <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
          {`Add ${name}`}
        </Button>
      )}
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        {...props}
      />
      <Drawer
        title={`${hasEdit && (props as EditableProps<T>).isEditing ? 'Edit' : 'Add'} ${name}`}
        onClose={onClose}
        open={openDrawer}
        width={500}
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  )
}

export default CustomTable
