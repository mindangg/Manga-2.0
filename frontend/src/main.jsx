import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AdminContextProvider } from './contexts/AdminContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'
import { CardDetailsContextProvider } from './contexts/CardDetailsContext.jsx'
import { CartContextProvider } from './contexts/CartContext.jsx'
import { OrderContextProvider } from './contexts/OrderContext.jsx'
import { MangaContextProvider } from './contexts/MangaContext.jsx'
import { UserContextProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
      <AuthContextProvider>
        <NotificationContextProvider>
          <CartContextProvider>
            <MangaContextProvider>
              <UserContextProvider>
                <OrderContextProvider>
                  <CardDetailsContextProvider>
                    <App/>
                  </CardDetailsContextProvider>
                </OrderContextProvider>
              </UserContextProvider>
            </MangaContextProvider>
          </CartContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </AdminContextProvider>
  </StrictMode>,
)
