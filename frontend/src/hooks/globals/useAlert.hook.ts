import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { message } from 'antd'
import { useCallback } from 'react'

type ErrorRes =
  | {
      data: string
      error?: undefined
    }
  | {
      data?: undefined
      error: FetchBaseQueryError | SerializedError
    }

export const useAlert = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const handleAlert = useCallback((res: ErrorRes) => {
    if (res.error && 'data' in res.error) {
      messageApi.open({
        type: 'error',
        content: res.error.data as string,
      })
      return
    }

    messageApi.open({
      type: 'success',
      content: res.data as string,
    })
  }, [])

  return { handleAlert, contextHolder }
}
