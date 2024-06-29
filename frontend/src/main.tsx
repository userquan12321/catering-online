import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ hashed: false }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
