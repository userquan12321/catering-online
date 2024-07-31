import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Input, Select, Skeleton } from 'antd'

import { useGetCuisinesQuery } from '@/apis/cuisine-type.api'
import classes from '@/styles/components/caterers/filter-bar.module.css'

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading } = useGetCuisinesQuery({})
  const [query, setQuery] = useState({
    cuisineName: searchParams.get('cuisineName'),
    catererName: searchParams.get('catererName'),
  })

  const handleClear = () => {
    setQuery({ cuisineName: null, catererName: '' })
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.delete('cuisineName')
      newParams.delete('catererName')
      return newParams
    })
  }

  const handleFilter = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      query.catererName
        ? newParams.set('catererName', query.catererName)
        : newParams.delete('catererName')
      query.cuisineName && newParams.set('cuisineName', query.cuisineName)
      return newParams
    })
  }

  return (
    <div className={classes.filterBar}>
      {isLoading ? (
        <Skeleton.Input className={classes.selectCuisine} active />
      ) : (
        <Select
          className={classes.selectCuisine}
          options={
            data?.map((cuisine) => ({
              label: cuisine.cuisineName,
              value: cuisine.cuisineName,
            })) ?? []
          }
          value={query.cuisineName}
          onChange={(value) => setQuery({ ...query, cuisineName: value })}
          placeholder="Select a cuisine"
          disabled={!data}
        />
      )}
      <Input
        onChange={(e) => setQuery({ ...query, catererName: e.target.value })}
        value={query.catererName ?? ''}
        placeholder="Search caterer"
      />
      <Button onClick={handleClear} disabled={isLoading || !data}>
        Clear
      </Button>
      <Button
        type="primary"
        onClick={handleFilter}
        disabled={isLoading || !data}
      >
        Filter
      </Button>
    </div>
  )
}

export default FilterBar
