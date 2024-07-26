import type { TabsProps } from 'antd'
import { Tabs } from 'antd'

import CateringList from '@/components/CatererDetail/CateringList'
import { CATERING_TYPES } from '@/constants/catering.constant'
import { useCaterer } from '@/hooks/caterer/useCaterer.hook'

const CateringTab = () => {
  const { data, isLoading } = useCaterer()
  const onChange = (key: string) => {
    console.log(key)
  }

  if (!data) return null

  const items: TabsProps['items'] = CATERING_TYPES.map((type, index) => ({
    key: `${index + 1}`,
    label: type,
    children: (
      <CateringList
        data={data.caterings.find((catering) => catering.itemType === index)}
      />
    ),
  }))

  return (
    <div className="flex-1">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default CateringTab
