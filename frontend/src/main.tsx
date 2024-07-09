import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingFallback from './components/LoadingFallback.tsx'
import App from './App.tsx'

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
