import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localeData from 'dayjs/plugin/localeData'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import { PersistGate } from 'redux-persist/integration/react'

import Loading from '@/components/common/Loading.tsx'
import LoadingFallback from '@/components/LoadingFallback.tsx'
import { persistor, store } from '@/redux/store.ts'

import App from './App.tsx'

import '@/styles/index.css'

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(utc)
dayjs.extend(advancedFormat)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ConfigProvider theme={{ hashed: false }}>
          <LoadingFallback>
            <App />
          </LoadingFallback>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
