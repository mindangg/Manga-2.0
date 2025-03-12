import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { CardDetailsContextProvider } from './contexts/CardDetailsContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'
import { OrderContextProvider } from './contexts/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <CardDetailsContextProvider>
              <App/>
            </CardDetailsContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
