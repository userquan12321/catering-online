import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'

import LoadingFallback from './components/LoadingFallback.tsx'
import { persistor, store } from './redux/store.ts'
import App from './App.tsx'

import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{ hashed: false }}>
          <LoadingFallback>
            <App />
          </LoadingFallback>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
