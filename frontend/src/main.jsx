import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { CardDetailsContextProvider } from './contexts/CardDetailsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <CardDetailsContextProvider>
          <App/>
        </CardDetailsContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
