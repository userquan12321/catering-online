import { Dispatch, Key, SetStateAction, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, Table, TableColumnsType, TableProps } from 'antd'

type BaseProps<T> = TableProps<T> & {
  renderDrawerContent: () => JSX.Element
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  customColumns: TableColumnsType<T>
  addText?: string
}

type EditableProps<T> = BaseProps<T> & {
  hasEdit?: true
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

type NonEditableProps<T> = BaseProps<T> & {
  hasEdit: false
}

type Props<T> = EditableProps<T> | NonEditableProps<T>

const CustomTable = <T extends { id: number }>({
  openDrawer,
  setOpenDrawer,
  addText,
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
      {addText && (
        <Button
          type="primary"
          onClick={() => setOpenDrawer(true)}
          icon={<PlusOutlined />}
        >
          {addText}
        </Button>
      )}
      <Table
        className="table"
        rowSelection={rowSelection}
        columns={columns}
        {...props}
      />
      <Drawer
        title="Add Cuisine"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={500}
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  )
}

export default CustomTable
