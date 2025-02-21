import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)

    if (!context)
        throw new Error('useNotificationContext must be used inside an NotificationContextProvider')

    return context
}