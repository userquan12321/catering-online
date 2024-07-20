import { Dispatch, Key, SetStateAction, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Flex, Table, TableColumnsType, TableProps } from 'antd'

type BaseProps<T> = TableProps<T> & {
  renderAddDrawerContent: () => JSX.Element
  renderEditDrawerContent?: () => JSX.Element
  openDrawer: boolean
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  customColumns: TableColumnsType<T>
  addText?: string
  hasEdit?: boolean
  openEditDrawer?: boolean
  setOpenEditDrawer?: Dispatch<SetStateAction<boolean>>
  onEdit?: (id: number) => void
  onDelete: (id: number) => void
}

const CustomTable = <T extends { id: number }>({
  openDrawer,
  setOpenDrawer,
  addText,
  renderAddDrawerContent,
  renderEditDrawerContent,
  openEditDrawer,
  setOpenEditDrawer,
  hasEdit = true,
  ...props
}: BaseProps<T>) => {
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
                onClick={() => (props.onEdit as (id: number) => void)(record.id)}
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => (props.onDelete as (id: number) => void)(record.id)}
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
        {renderAddDrawerContent()}
      </Drawer>
      {renderEditDrawerContent && (
        <Drawer
          title="Edit Cuisine"
          onClose={() => setOpenEditDrawer && setOpenEditDrawer(false)}
          open={openEditDrawer}
          width={500}
        >
          {renderEditDrawerContent()}
        </Drawer>
      )}
    </>
  )
}

export default CustomTable
