import React , { createContext, useState } from 'react'

export const NotificationContext = createContext({
  message: '',
  showNotification: () => {}
})

export const NotificationContextProvider = ({ children }) => {
  const [message, setMessage] = useState('')

  const showNotification = (msg) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage('')
    }, 2500)
  }

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      { children }
    </NotificationContext.Provider>
  )
}