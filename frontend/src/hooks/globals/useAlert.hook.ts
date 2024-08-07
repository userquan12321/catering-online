import { useCallback } from 'react'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { message } from 'antd'

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

  const handleAlert = useCallback(
    (res: ErrorRes, callback?: () => void) => {
      if (res.error && 'data' in res.error) {
        messageApi.open({
          type: 'error',
          content: res.error.data as string,
        })
        return
      }
      messageApi.success(res.data as string)
      callback && callback()
    },
    [messageApi],
  )

  return { handleAlert, contextHolder }
}
