import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routes.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingFallback from './components/LoadingFallback.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{ hashed: false }}>
          <LoadingFallback>
            <RouterProvider router={router} />
          </LoadingFallback>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
